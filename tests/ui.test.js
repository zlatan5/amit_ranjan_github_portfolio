const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const puppeteer = require('puppeteer');

async function waitForServer(url, timeoutMs = 10000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      http.get(url, () => resolve()).on('error', () => {
        if (Date.now() - start > timeoutMs) return reject(new Error('Server not responding in time'));
        setTimeout(tryOnce, 250);
      });
    };
    tryOnce();
  });
}

(async () => {
  const PORT = 4312;
  const server = spawn('node', ['dev-server.js'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, PORT: String(PORT) }
  });

  try {
    await waitForServer(`http://localhost:${PORT}`);

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });

    // Verify navbar brand text contains roles
    const brandText = await page.$eval('#navbar a[href="#home"]', el => el.textContent.replace(/\s+/g,' ').trim());
    if (!brandText.includes('Amit Ranjan') || !brandText.includes('Software Designer')) {
      throw new Error('Navbar brand text missing roles');
    }

    // Verify hero subtitle updated
    const heroSubtitle = await page.$eval('#home h2', el => el.textContent.trim());
    if (!/Senior\s+Java\s+Backend\s+Developer/i.test(heroSubtitle)) {
      throw new Error('Hero subtitle not updated to Senior Java Backend Developer');
    }

    // Verify My Services subtitle readable in dark mode
    await page.evaluate(() => { document.documentElement.classList.add('dark'); localStorage.setItem('darkMode','true'); });
    await page.waitForTimeout ? page.waitForTimeout(100) : new Promise(r=>setTimeout(r,100));
    const servicesSubtitleColor = await page.$eval('#services h3', el => getComputedStyle(el).color);
    if (servicesSubtitleColor === 'rgb(0, 0, 0)') {
      throw new Error('Services subtitle appears black in dark mode');
    }

    // Ensure the removed highlights block is not present
    const highlightsExists = await page.$('#about-highlights');
    if (highlightsExists) {
      throw new Error('Old highlights block still present');
    }

    // Verify right-side grid stats exist with expected labels/values
    const statTexts = await page.$$eval('#about .card p', items => items.map(i => i.textContent.replace(/\s+/g,' ').trim()))
    const checks = [
      /Years of Experience:\s*9\+/.test(statTexts.join(' ')),
      /Microservices Built:\s*30\+/.test(statTexts.join(' ')),
      /UI Framework Experience:\s*2\+ years/.test(statTexts.join(' ')),
      /AWS Cloud Experience:\s*3\+ years/.test(statTexts.join(' '))
    ];
    if (!checks.every(Boolean)) {
      throw new Error('Right-side About stats missing or incorrect');
    }

    // Verify the profile image is loaded
    const imageOk = await page.$eval('img[alt="Amit Ranjan"]', img => img.complete && img.naturalWidth > 0);
    if (!imageOk) {
      throw new Error('Profile image not loaded correctly');
    }

    await browser.close();
    server.kill('SIGINT');
    console.log('UI test passed');
    process.exit(0);
  } catch (err) {
    console.error(err);
    server.kill('SIGINT');
    process.exit(1);
  }
})();



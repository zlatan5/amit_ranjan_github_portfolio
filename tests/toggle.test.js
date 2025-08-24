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
  const PORT = 4311;
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
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // Ensure initial state reflects localStorage (default true => dark)
    let hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log('Initial dark:', hasDark);

    // Click toggle
    await page.click('#dark-mode-toggle');
    await sleep(200);
    let hasDarkAfterFirst = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log('After first click dark:', hasDarkAfterFirst);

    // Click toggle again
    await page.click('#dark-mode-toggle');
    await sleep(200);
    let hasDarkAfterSecond = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log('After second click dark:', hasDarkAfterSecond);

    if (hasDark === hasDarkAfterFirst) throw new Error('Dark class did not toggle on first click');
    if (hasDark !== hasDarkAfterSecond) throw new Error('Dark class did not toggle back on second click');

    await browser.close();
    server.kill('SIGINT');
    console.log('Toggle test passed');
    process.exit(0);
  } catch (err) {
    console.error(err);
    server.kill('SIGINT');
    process.exit(1);
  }
})();



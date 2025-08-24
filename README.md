# Amit Ranjan - Portfolio Website

A modern, responsive portfolio website built with **Ext.js** and **Tailwind CSS**. This website showcases Amit Ranjan's skills as a Software Designer with a clean, professional design and excellent performance.

## 🌟 Features

- **Ext.js Framework**: Modern JavaScript framework for robust functionality
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Mobile-First**: Optimized for all devices and screen sizes
- **Performance Optimized**: Fast loading with optimized assets
- **Interactive Elements**: Smooth animations, hover effects, and dynamic content
- **SEO Ready**: Meta tags, structured data, and performance optimizations
- **PWA Ready**: Service worker support for offline functionality
- **Modern Animations**: CSS animations and JavaScript interactions
- **Accessibility**: WCAG compliant design patterns

## 🛠️ Tech Stack

- **Frontend Framework**: Ext.js 7.7.0
- **CSS Framework**: Tailwind CSS 3.4.0
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter, Poppins)
- **Build Tool**: Tailwind CLI
- **Development Server**: Live Server

## 📁 Project Structure

```
github_portfolio/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── setup.sh               # Setup script
├── src/
│   ├── input.css          # Tailwind input styles
│   └── app.js             # Ext.js application
├── dist/
│   └── output.css         # Compiled Tailwind CSS
├── resume/
│   └── Amit_Ranjan_-_Software_Designer.pdf
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone or download** the project files
2. **Run the setup script**:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   Or manually:
   ```bash
   npm install
   npm install @tailwindcss/forms @tailwindcss/typography
   npm run build
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and visit `http://localhost:3000`

## 📋 Available Scripts

```bash
npm run dev      # Start development with live reload
npm run build    # Build for production
npm start        # Start local server
```

## 🎨 Customization Guide

### Personal Information
Edit `index.html` to update your information:

#### Hero Section
```html
<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
    Hello, I'm <span class="text-secondary-300">Amit Ranjan</span>
</h1>
<h2 class="text-2xl md:text-3xl font-medium text-gray-200">
    Software Designer
</h2>
```

#### Contact Information
```html
<p class="text-gray-600">a.sonu786@gmail.com</p>
<p class="text-gray-600">+91 9637329748</p>
<p class="text-gray-600">amitranjan-253b1192</p>
```

### Styling with Tailwind CSS
Modify `src/input.css` for custom styles:

```css
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300;
  }
}
```

### Ext.js Functionality
Update `src/app.js` for custom interactions:

```javascript
setupCustomFeature: function() {
    // Your custom functionality here
}
```

### Color Scheme
Modify `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#2563eb', // Your primary color
      },
      secondary: {
        300: '#fde047', // Your accent color
      }
    }
  }
}
```

## 📱 Responsive Design

The website is built with a mobile-first approach:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

### Breakpoints Used
- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1600px

## 🔧 Ext.js Features

### Application Structure
```javascript
Ext.application({
    name: 'PortfolioApp',
    launch: function() {
        this.initApp();
    }
});
```

### Key Components
- **Navigation Management**: Smooth scrolling and active states
- **Animation System**: Intersection Observer for performance
- **Counter Animations**: Animated statistics
- **Skill Bars**: Progress indicators
- **Mobile Menu**: Responsive navigation
- **Contact Features**: Copy to clipboard functionality
- **Performance Monitoring**: Load time tracking

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and non-critical resources
- **Intersection Observer**: Efficient scroll-based animations
- **Debounced Events**: Optimized scroll and resize handlers
- **Preloaded Resources**: Critical assets loaded early
- **Minified CSS**: Production builds
- **Service Worker**: PWA capabilities

## 🚀 Deployment Options

### GitHub Pages
1. Create a new repository
2. Upload all files
3. Go to Settings > Pages
4. Select source branch
5. Your site will be available at `username.github.io/repository-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be deployed instantly
3. Get a custom domain if needed

### Vercel
1. Connect your GitHub repository
2. Deploy automatically on push
3. Get preview deployments for branches

### Manual Deployment
1. Run `npm run build`
2. Upload the entire folder to your web server
3. Ensure `dist/output.css` is accessible

## 🔍 SEO Features

- **Meta Tags**: Open Graph and Twitter Cards
- **Structured Data**: Schema.org markup
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Image descriptions
- **Performance**: Core Web Vitals optimized
- **Mobile-Friendly**: Responsive design

## 🛡️ Security Features

- **HTTPS Ready**: Secure connections
- **Content Security Policy**: XSS protection
- **No External Tracking**: Privacy-focused
- **Secure External Links**: Target="_blank" with rel="noopener"

## 📊 Performance Metrics

The website is optimized for:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Yellow (#fde047)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Display Font**: Poppins (Headings)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Spacing
- **Container**: max-width: 80rem
- **Section Padding**: 4rem (mobile), 6rem (desktop)
- **Component Spacing**: 1rem, 1.5rem, 2rem, 3rem

## 🔧 Development

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add Tailwind classes for styling
3. Add Ext.js functionality in `src/app.js`

### Adding New Animations
```css
@keyframes customAnimation {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-custom {
  animation: customAnimation 0.6s ease-out;
}
```

### Adding New Components
```javascript
setupNewComponent: function() {
    const component = document.querySelector('.new-component');
    if (component) {
        // Component logic here
    }
}
```

## 📞 Support

For questions or customization help:
- **Email**: a.sonu786@gmail.com
- **LinkedIn**: [Amit Ranjan](https://www.linkedin.com/in/amitranjan-253b1192/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔄 Updates

### Version 2.0 (Current)
- ✅ Ext.js integration
- ✅ Tailwind CSS framework
- ✅ Modern responsive design
- ✅ Performance optimizations
- ✅ PWA capabilities
- ✅ SEO improvements

### Future Enhancements
- [ ] Blog section
- [ ] Project showcase
- [ ] Contact form
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics integration

---

**Created with ❤️ by Amit Ranjan**

*Last updated: January 2025*

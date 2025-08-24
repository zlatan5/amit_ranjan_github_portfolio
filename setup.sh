#!/bin/bash

# Portfolio Website Setup Script
echo "🚀 Setting up Amit Ranjan's Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Tailwind CSS plugins
echo "🎨 Installing Tailwind CSS plugins..."
npm install @tailwindcss/forms @tailwindcss/typography

# Create dist directory if it doesn't exist
mkdir -p dist

# Build Tailwind CSS
echo "🔨 Building Tailwind CSS..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🎉 Your portfolio website is ready!"
echo ""
echo "📋 Available commands:"
echo "  npm run dev     - Start development server with live reload"
echo "  npm run build   - Build for production"
echo "  npm start       - Start local server"
echo ""
echo "🌐 To view your website:"
echo "  1. Run: npm start"
echo "  2. Open: http://localhost:3000"
echo ""
echo "📁 Project structure:"
echo "  ├── index.html          # Main HTML file"
echo "  ├── src/                # Source files"
echo "  │   ├── input.css       # Tailwind input"
echo "  │   └── app.js          # Ext.js application"
echo "  ├── dist/               # Built files"
echo "  │   └── output.css      # Compiled CSS"
echo "  ├── resume/             # Your resume"
echo "  └── package.json        # Dependencies"
echo ""
echo "🎨 Customization:"
echo "  - Edit index.html to change content"
echo "  - Modify src/input.css for custom styles"
echo "  - Update src/app.js for functionality"
echo ""
echo "🚀 Happy coding!"

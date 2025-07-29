#!/bin/bash

# Flannery Training App Setup Script
echo "🚀 Setting up Flannery 360 Excavator Training Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Create project directory structure
echo "📁 Creating project structure..."
mkdir -p src public

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Tailwind CSS as devDependency
echo "🎨 Setting up Tailwind CSS..."
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Initialize Tailwind CSS (if not already done)
if [ ! -f tailwind.config.js ]; then
    npx tailwindcss init -p
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Copy all the provided files to their respective locations"
echo "2. Run 'npm start' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Available commands:"
echo "  npm start     - Start development server"
echo "  npm run build - Build for production"
echo "  npm test      - Run tests"
echo ""
echo "🎉 Happy coding with the Flannery Training Platform!" 
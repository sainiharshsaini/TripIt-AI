#!/bin/bash

echo "🚀 Building TripIt AI for production..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build:prod

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output: dist/"
    echo "🌐 Preview your build: npm run preview:prod"
else
    echo "❌ Build failed!"
    exit 1
fi

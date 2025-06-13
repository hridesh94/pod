#!/bin/bash

# Deployment script for Hridesh Sapkota Portfolio Website

echo "🚀 Starting deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build process
echo "📦 Building project..."
npm run build

# Run tests if they exist
if [ -f "package.json" ] && grep -q "\"test\":" "package.json"; then
    echo "🧪 Running tests..."
    npm test
fi

# Optimize images
echo "🖼️ Optimizing images..."
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -exec sh -c 'echo "Optimizing $1"; if [[ "$1" == *.jpg ]]; then npx sharp-cli --input "$1" --output "$1" --quality 80; else npx sharp-cli --input "$1" --output "$1" --quality 80; fi' _ {} \;

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"

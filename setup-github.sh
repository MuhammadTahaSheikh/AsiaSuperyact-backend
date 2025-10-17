#!/bin/bash

# Setup GitHub repository for Asia Super Yachts Backend
# Run this after creating your GitHub repository

echo "🚀 Setting up GitHub repository for Asia Super Yachts Backend..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get repository URL from user
echo ""
echo "📋 Please provide your GitHub repository URL:"
echo "   Example: https://github.com/yourusername/asiasuperyachts-backend.git"
echo ""
read -p "GitHub repository URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ Error: Please provide a valid GitHub repository URL"
    exit 1
fi

# Add GitHub remote
echo "🔗 Adding GitHub remote..."
git remote add github $GITHUB_URL

# Verify remotes
echo ""
echo "📡 Current remotes:"
git remote -v

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u github main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your repository is now available at: $GITHUB_URL"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your GitHub repository"
    echo "2. Copy the repository URL for Render deployment"
    echo "3. Run: ./deploy-to-render.sh"
    echo ""
else
    echo "❌ Error: Failed to push to GitHub"
    echo "Please check your repository URL and try again"
fi

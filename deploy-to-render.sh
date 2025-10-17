#!/bin/bash

# Deploy Asia Super Yachts API to Render
# Make sure you have git configured and are in the project root

echo "🚀 Preparing Asia Super Yachts API for Render deployment..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if we have uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Prepare for Render deployment - $(date)"
fi

# Generate application key if not exists
if ! grep -q "APP_KEY=" .env 2>/dev/null; then
    echo "🔑 Generating application key..."
    export PATH="/usr/local/opt/php/bin:$PATH"
    php artisan key:generate --show
    echo "⚠️  Please copy the generated key and add it to your Render environment variables as APP_KEY"
fi

echo "✅ Repository is ready for deployment!"

echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin <your-github-repo-url>"
echo "   git push -u origin main"
echo ""
echo "2. Go to https://dashboard.render.com"
echo "3. Create a new Web Service"
echo "4. Connect your GitHub repository"
echo "5. Use these settings:"
echo "   - Environment: PHP"
echo "   - Build Command: composer install --no-dev --optimize-autoloader && php artisan key:generate --force && php artisan migrate --force"
echo "   - Start Command: php artisan serve --host=0.0.0.0 --port=\$PORT"
echo ""
echo "6. Create a PostgreSQL database"
echo "7. Import the database using: database/super-asia-yachts-postgresql.sql"
echo ""
echo "8. Set these environment variables in Render:"
echo "   - APP_ENV=production"
echo "   - APP_DEBUG=false"
echo "   - APP_URL=https://your-app-name.onrender.com"
echo "   - LOG_CHANNEL=stderr"
echo "   - DB_CONNECTION=pgsql"
echo "   - (Database credentials will be auto-filled)"
echo ""
echo "📖 For detailed instructions, see: RENDER_DEPLOYMENT.md"
echo ""
echo "🎉 Happy deploying!"

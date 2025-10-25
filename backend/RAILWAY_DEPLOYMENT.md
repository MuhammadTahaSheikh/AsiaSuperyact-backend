# Railway Deployment Guide for Asia Super Yachts

## Prerequisites
1. GitHub repository with your code
2. Railway account (free tier available)

## Step 1: Push Code to GitHub

```bash
# Add remote if not already added
git remote add origin https://github.com/YOUR_USERNAME/asia-super-yachts.git

# Push to GitHub
git add .
git commit -m "Prepare for Railway deployment"
git push -u origin main
```

## Step 2: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your `asia-super-yachts` repository**
6. **Select the `backend` folder** as the root directory

## Step 3: Configure the Service

Railway will automatically detect it's a PHP/Laravel application. The configuration will be:

- **Build Command**: `composer install --no-dev --optimize-autoloader`
- **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

## Step 4: Add Database

1. **Click "New" → "Database" → "PostgreSQL"**
2. **Railway will automatically create the database**
3. **Copy the database connection details**

## Step 5: Set Environment Variables

In your Railway project settings, add these environment variables:

```
APP_NAME=Asia Super Yachts
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.railway.app
LOG_LEVEL=error

# Database (Railway will provide these automatically)
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.DATABASE_HOST}}
DB_PORT=${{Postgres.DATABASE_PORT}}
DB_DATABASE=${{Postgres.DATABASE_NAME}}
DB_USERNAME=${{Postgres.DATABASE_USER}}
DB_PASSWORD=${{Postgres.DATABASE_PASSWORD}}
```

## Step 6: Deploy and Test

1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Test your API endpoints:**
   - `https://your-app-name.railway.app/api/categories`
   - `https://your-app-name.railway.app/api/products`
   - `https://your-app-name.railway.app/api/jobs`

## Step 7: Run Database Migrations

After deployment, you can run migrations using Railway's CLI or dashboard:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Connect to your project
railway link

# Run migrations
railway run php artisan migrate

# Seed database (optional)
railway run php artisan db:seed
```

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `APP_NAME` | Asia Super Yachts | Application name |
| `APP_ENV` | production | Environment |
| `APP_DEBUG` | false | Debug mode |
| `APP_URL` | https://your-app.railway.app | Your app URL |
| `LOG_LEVEL` | error | Log level |
| `DB_CONNECTION` | pgsql | Database type |
| `DB_HOST` | ${{Postgres.DATABASE_HOST}} | Database host |
| `DB_PORT` | ${{Postgres.DATABASE_PORT}} | Database port |
| `DB_DATABASE` | ${{Postgres.DATABASE_NAME}} | Database name |
| `DB_USERNAME` | ${{Postgres.DATABASE_USER}} | Database user |
| `DB_PASSWORD` | ${{Postgres.DATABASE_PASSWORD}} | Database password |

## Troubleshooting

1. **Build Fails**: Check that all dependencies are in composer.json
2. **Database Connection**: Verify environment variables are set correctly
3. **App Key Missing**: Run `php artisan key:generate` in Railway CLI
4. **Storage Permissions**: Railway handles this automatically

## Benefits of Railway

- ✅ Automatic HTTPS
- ✅ Zero-config deployments
- ✅ Built-in database
- ✅ Environment variable management
- ✅ Automatic scaling
- ✅ Free tier available
- ✅ Great Laravel support

## Next Steps

1. Deploy your backend to Railway
2. Test all API endpoints
3. Update your frontend to use the new API URL
4. Set up custom domain (optional)
5. Configure monitoring and alerts

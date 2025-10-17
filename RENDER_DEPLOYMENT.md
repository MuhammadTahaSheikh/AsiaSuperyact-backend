# Render Deployment Guide for Asia Super Yachts API

## Prerequisites
- GitHub repository with your Laravel code
- Render account (free tier available)

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 1.2 Environment Variables
Create these environment variables in Render dashboard:

**Required Variables:**
- `APP_KEY` - Generate with: `php artisan key:generate --show`
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://your-app-name.onrender.com`
- `LOG_CHANNEL=stderr`
- `DB_CONNECTION=pgsql`

**Database Variables (Auto-filled by Render):**
- `DB_HOST` - Auto-filled from database service
- `DB_PORT=5432`
- `DB_DATABASE` - Auto-filled from database service
- `DB_USERNAME` - Auto-filled from database service
- `DB_PASSWORD` - Auto-filled from database service

## Step 2: Deploy on Render

### 2.1 Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `asia-super-yachts-api`
   - **Environment**: `PHP`
   - **Plan**: `Free`
   - **Build Command**: 
     ```bash
     composer install --no-dev --optimize-autoloader
     php artisan key:generate --force
     php artisan migrate --force
     ```
   - **Start Command**: 
     ```bash
     php artisan serve --host=0.0.0.0 --port=$PORT
     ```

### 2.2 Create Database
1. In Render Dashboard, click "New +" → "PostgreSQL"
2. Configure:
   - **Name**: `asia-super-yachts-db`
   - **Plan**: `Free`
   - **Database**: `asiasuperyachts`
   - **User**: `asiasuperyachts_user`

### 2.3 Import Database
After creating the database, you'll need to import your data:

1. **Option A: Using Render Shell**
   ```bash
   # Connect to your database
   psql $DATABASE_URL
   
   # Import your SQL file
   \i /path/to/super-asia-yachts.sql
   ```

2. **Option B: Using pgAdmin or similar tool**
   - Connect using the database URL from Render
   - Import the `super-asia-yachts.sql` file

## Step 3: Database Migration (MySQL to PostgreSQL)

Since your current database is MySQL and Render uses PostgreSQL, you'll need to convert:

### 3.1 Convert SQL File
1. Use a tool like [MySQL to PostgreSQL converter](https://www.sqlines.com/online)
2. Or manually convert the SQL syntax

### 3.2 Key Changes Needed:
- `AUTO_INCREMENT` → `SERIAL`
- `ENGINE=InnoDB` → Remove (PostgreSQL doesn't use engines)
- `DEFAULT CHARSET=utf8mb4` → Remove
- `COLLATE utf8mb4_unicode_ci` → Remove
- Backticks `` ` `` → Double quotes `"` or remove entirely

## Step 4: Configure Environment

### 4.1 Update .env for Production
```env
APP_NAME="Asia Super Yachts API"
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://asia-super-yachts-api.onrender.com

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=pgsql
# Database credentials will be auto-filled by Render

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

## Step 5: Deploy

1. **Connect Services**: Link your web service to the database
2. **Deploy**: Render will automatically build and deploy
3. **Test**: Visit your app URL to verify it's working

## Step 6: Post-Deployment

### 6.1 Run Migrations
```bash
php artisan migrate --force
```

### 6.2 Seed Database (if needed)
```bash
php artisan db:seed --force
```

### 6.3 Clear Cache
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Troubleshooting

### Common Issues:
1. **Database Connection**: Ensure PostgreSQL credentials are correct
2. **File Permissions**: Render handles this automatically
3. **Memory Issues**: Free tier has 512MB RAM limit
4. **Cold Starts**: Free tier apps sleep after 15 minutes of inactivity

### Logs:
- View logs in Render Dashboard → Your Service → Logs
- Check both build logs and runtime logs

## Cost
- **Free Tier**: 750 hours/month (enough for development/testing)
- **Paid Plans**: Start at $7/month for always-on service

## Next Steps
1. Set up custom domain (optional)
2. Configure SSL (automatic with Render)
3. Set up monitoring and alerts
4. Configure CI/CD for automatic deployments

## Support
- [Render Documentation](https://render.com/docs)
- [Laravel on Render Guide](https://render.com/docs/deploy-laravel)

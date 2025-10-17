# Asia Super Yachts - Backend Deployment Guide

## Local Development

The Laravel backend is now running locally at: `http://localhost:8000`

### API Endpoints Available:
- `GET /api/categories` - Get all categories
- `GET /api/products` - Get all products
- `GET /api/jobs` - Get all jobs
- `GET /api/gallery` - Get all gallery items
- `GET /api/videos` - Get all videos
- `GET /api/crew` - Get all crew members
- `POST /api/contact-us` - Submit contact form
- And many more...

## Render Deployment

### Prerequisites
1. GitHub repository with your code
2. Render account (free tier available)

### Steps to Deploy on Render:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the Web Service**
   - **Name**: `asia-super-yachts-api`
   - **Environment**: `PHP`
   - **Build Command**: `composer install --no-dev --optimize-autoloader`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

4. **Set Environment Variables**
   - `APP_ENV` = `production`
   - `APP_DEBUG` = `false`
   - `APP_URL` = `https://your-app-name.onrender.com`
   - `LOG_LEVEL` = `error`

5. **Create a Database**
   - Click "New +" → "PostgreSQL" (or MySQL if preferred)
   - Name: `asia-super-yachts-db`
   - Plan: Free

6. **Configure Database Environment Variables**
   - `DB_CONNECTION` = `pgsql` (or `mysql`)
   - `DB_HOST` = (from database service)
   - `DB_PORT` = (from database service)
   - `DB_DATABASE` = (from database service)
   - `DB_USERNAME` = (from database service)
   - `DB_PASSWORD` = (from database service)

7. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

8. **Run Database Migrations**
   - After deployment, go to the service shell
   - Run: `php artisan migrate`

### Alternative: Using render.yaml

You can also use the provided `render.yaml` file for automatic deployment:

1. Push your code with the `render.yaml` file
2. Connect your repository to Render
3. Render will automatically detect and use the configuration

### Health Check

The application includes a health check endpoint at `/api/categories` that Render can use to monitor the service.

### File Structure for Deployment

```
├── app/                    # Laravel application code
├── config/                 # Configuration files
├── database/              # Migrations and seeders
├── public/                # Public assets
├── routes/                # API routes
├── storage/               # File storage
├── vendor/                # Composer dependencies
├── .env                   # Environment variables
├── .env.production        # Production environment template
├── artisan                # Laravel command line tool
├── composer.json          # PHP dependencies
├── composer.lock          # Locked dependency versions
├── Dockerfile             # Docker configuration
├── render.yaml            # Render deployment config
└── DEPLOYMENT.md          # This file
```

### Troubleshooting

1. **Database Connection Issues**
   - Ensure database service is running
   - Check environment variables are correctly set
   - Verify database credentials

2. **Application Key Issues**
   - Run `php artisan key:generate` in the service shell

3. **Permission Issues**
   - Ensure storage directories are writable
   - Run `chmod -R 755 storage bootstrap/cache`

4. **Memory Issues**
   - Consider upgrading to a paid plan for more resources

### Monitoring

- Check Render dashboard for logs and metrics
- Monitor database performance
- Set up alerts for service downtime

### Security Notes

- Never commit `.env` files to version control
- Use strong database passwords
- Enable HTTPS (automatic on Render)
- Regularly update dependencies

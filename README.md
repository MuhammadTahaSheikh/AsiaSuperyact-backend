# Asia Super Yachts API Backend

A comprehensive Laravel API backend for Asia Super Yachts - managing yacht sales, luxury properties, crew recruitment, and more.

## 🚀 Features

- **Yacht Management** - List, create, and manage luxury yachts
- **Property Listings** - Waterfront properties and luxury real estate
- **Crew Recruitment** - Job postings and crew member applications
- **Gallery System** - Image and video management
- **Contact Management** - Lead generation and customer inquiries
- **RESTful API** - Clean, well-documented API endpoints

## 🛠️ Tech Stack

- **Framework:** Laravel 10
- **PHP Version:** 8.4+
- **Database:** MySQL/PostgreSQL
- **Authentication:** Laravel Sanctum
- **API:** RESTful API with JSON responses

## 📋 Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL
- Git

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/asiasuperyachts-backend.git
   cd asiasuperyachts-backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Environment setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup:**
   ```bash
   # For MySQL
   mysql -u root -p < database/super-asia-yachts.sql
   
   # For PostgreSQL
   psql -U postgres -d asiasuperyachts < database/super-asia-yachts-postgresql.sql
   ```

5. **Run migrations:**
   ```bash
   php artisan migrate
   ```

6. **Start the server:**
   ```bash
   php artisan serve
   ```

Your API will be available at `http://localhost:8000`

## 🌐 Deployment

### Deploy to Render (Recommended)

1. **Run the deployment script:**
   ```bash
   ./deploy-to-render.sh
   ```

2. **Follow the detailed guide:** [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

### Deploy to Hostinger

1. Upload files via FTP/File Manager
2. Set document root to `public` folder
3. Import database using provided SQL files
4. Update environment variables

## 📊 Database Schema

The application includes the following main entities:

- **Categories** - Product categories
- **Products** - Yachts and services
- **Properties** - Real estate listings
- **Jobs** - Job postings
- **Job Submissions** - Job applications
- **Recruiting Crews** - Crew member applications
- **Galleries** - Image galleries
- **Videos** - Video content
- **Reach Outs** - Contact inquiries

## 🔧 API Endpoints

### Yachts & Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/products/{id}` - Get specific product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Properties
- `GET /api/properties` - List all properties
- `POST /api/properties` - Create new property
- `GET /api/properties/{id}` - Get specific property

### Jobs & Recruitment
- `GET /api/jobs` - List all job postings
- `POST /api/jobs` - Create new job posting
- `POST /api/job-submissions` - Submit job application
- `POST /api/recruiting-crews` - Submit crew application

### Media
- `GET /api/galleries` - List all gallery images
- `GET /api/videos` - List all videos

### Contact
- `POST /api/reach-outs` - Submit contact form

## 📁 Project Structure

```
asiasuperyachts-backend/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   └── Models/              # Eloquent Models
├── database/
│   ├── migrations/          # Database migrations
│   ├── super-asia-yachts.sql           # MySQL database
│   └── super-asia-yachts-postgresql.sql # PostgreSQL database
├── public/
│   └── assets/             # Static assets (images, videos)
├── routes/
│   └── api.php            # API routes
├── render.yaml            # Render deployment config
├── deploy-to-render.sh    # Deployment script
└── RENDER_DEPLOYMENT.md   # Detailed deployment guide
```

## 🔐 Environment Variables

```env
APP_NAME="Asia Super Yachts API"
APP_ENV=production
APP_KEY=your-app-key
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=asiasuperyachts
DB_USERNAME=your-username
DB_PASSWORD=your-password

LOG_CHANNEL=stderr
CACHE_DRIVER=file
SESSION_DRIVER=file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@asiasuperyachts.com or create an issue in this repository.

## 🚀 Deployment Status

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

---

**Asia Super Yachts** - Luxury Yachts, Properties & Crew Services
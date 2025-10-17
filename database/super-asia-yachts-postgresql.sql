-- PostgreSQL version of super-asia-yachts database
-- Converted from MySQL for Render deployment

-- Create database (this will be done by Render)
-- CREATE DATABASE asiasuperyachts;

-- Connect to the database
-- \c asiasuperyachts;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- Table structure for table 'cache'
-- --------------------------------------------------------

CREATE TABLE cache (
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  expiration INTEGER NOT NULL,
  PRIMARY KEY (key)
);

-- --------------------------------------------------------
-- Table structure for table 'cache_locks'
-- --------------------------------------------------------

CREATE TABLE cache_locks (
  key VARCHAR(255) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  expiration INTEGER NOT NULL,
  PRIMARY KEY (key)
);

-- --------------------------------------------------------
-- Table structure for table 'categories'
-- --------------------------------------------------------

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'failed_jobs'
-- --------------------------------------------------------

CREATE TABLE failed_jobs (
  id BIGSERIAL PRIMARY KEY,
  uuid VARCHAR(255) NOT NULL UNIQUE,
  connection TEXT NOT NULL,
  queue TEXT NOT NULL,
  payload TEXT NOT NULL,
  exception TEXT NOT NULL,
  failed_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table 'galleries'
-- --------------------------------------------------------

CREATE TABLE galleries (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'jobs'
-- --------------------------------------------------------

CREATE TABLE jobs (
  id BIGSERIAL PRIMARY KEY,
  queue VARCHAR(255) NOT NULL,
  payload TEXT NOT NULL,
  attempts SMALLINT NOT NULL,
  reserved_at INTEGER NULL,
  available_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX jobs_queue_index ON jobs (queue);

-- --------------------------------------------------------
-- Table structure for table 'job_batches'
-- --------------------------------------------------------

CREATE TABLE job_batches (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  total_jobs INTEGER NOT NULL,
  pending_jobs INTEGER NOT NULL,
  failed_jobs INTEGER NOT NULL,
  failed_job_ids TEXT NOT NULL,
  options TEXT NULL,
  cancelled_at INTEGER NULL,
  created_at INTEGER NOT NULL,
  finished_at INTEGER NULL
);

-- --------------------------------------------------------
-- Table structure for table 'job_submissions'
-- --------------------------------------------------------

CREATE TABLE job_submissions (
  id BIGSERIAL PRIMARY KEY,
  job_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  resume_path VARCHAR(255) NOT NULL,
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- Table structure for table 'jobs_table'
-- --------------------------------------------------------

CREATE TABLE jobs_table (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary_range VARCHAR(100),
  employment_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'migrations'
-- --------------------------------------------------------

CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  migration VARCHAR(255) NOT NULL,
  batch INTEGER NOT NULL
);

-- --------------------------------------------------------
-- Table structure for table 'password_reset_tokens'
-- --------------------------------------------------------

CREATE TABLE password_reset_tokens (
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'personal_access_tokens'
-- --------------------------------------------------------

CREATE TABLE personal_access_tokens (
  id BIGSERIAL PRIMARY KEY,
  tokenable_type VARCHAR(255) NOT NULL,
  tokenable_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  abilities TEXT NULL,
  last_used_at TIMESTAMP(0) NULL,
  expires_at TIMESTAMP(0) NULL,
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON personal_access_tokens (tokenable_type, tokenable_id);

-- --------------------------------------------------------
-- Table structure for table 'products'
-- --------------------------------------------------------

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category_id BIGINT NULL,
  image_path VARCHAR(255),
  specifications TEXT,
  features TEXT,
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- --------------------------------------------------------
-- Table structure for table 'properties'
-- --------------------------------------------------------

CREATE TABLE properties (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10,2),
  property_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  images TEXT, -- JSON array of image paths
  amenities TEXT, -- JSON array of amenities
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'reach_outs'
-- --------------------------------------------------------

CREATE TABLE reach_outs (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'recruiting_crews'
-- --------------------------------------------------------

CREATE TABLE recruiting_crews (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  experience_years INTEGER NOT NULL,
  certifications TEXT,
  resume_path VARCHAR(255) NOT NULL,
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'sessions'
-- --------------------------------------------------------

CREATE TABLE sessions (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  user_id BIGINT NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  payload TEXT NOT NULL,
  last_activity INTEGER NOT NULL
);

CREATE INDEX sessions_user_id_index ON sessions (user_id);
CREATE INDEX sessions_last_activity_index ON sessions (last_activity);

-- --------------------------------------------------------
-- Table structure for table 'users'
-- --------------------------------------------------------

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified_at TIMESTAMP(0) NULL,
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Table structure for table 'videos'
-- --------------------------------------------------------

CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_path VARCHAR(255) NOT NULL,
  thumbnail_path VARCHAR(255),
  duration INTEGER, -- in seconds
  created_at TIMESTAMP(0) NULL,
  updated_at TIMESTAMP(0) NULL
);

-- --------------------------------------------------------
-- Insert sample data
-- --------------------------------------------------------

-- Insert sample categories
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('Yachts', 'Luxury yachts and superyachts', NOW(), NOW()),
('Services', 'Yacht services and maintenance', NOW(), NOW()),
('Properties', 'Luxury waterfront properties', NOW(), NOW());

-- Insert sample products
INSERT INTO products (name, description, price, category_id, image_path, created_at, updated_at) VALUES
('Luxury Superyacht', 'Premium 50ft luxury superyacht with modern amenities', 2500000.00, 1, '/assets/images/yacht1.jpg', NOW(), NOW()),
('Yacht Maintenance', 'Complete yacht maintenance and servicing', 5000.00, 2, '/assets/images/service1.jpg', NOW(), NOW());

-- Insert sample jobs
INSERT INTO jobs_table (title, description, requirements, location, salary_range, employment_type, status, created_at, updated_at) VALUES
('Yacht Captain', 'Experienced captain for luxury yacht operations', 'Valid captain license, 5+ years experience', 'Singapore', '$8000-12000/month', 'Full-time', 'active', NOW(), NOW()),
('Marine Engineer', 'Maintenance and repair of yacht systems', 'Marine engineering degree, 3+ years experience', 'Hong Kong', '$6000-9000/month', 'Full-time', 'active', NOW(), NOW());

-- Insert sample properties
INSERT INTO properties (title, description, location, price, bedrooms, bathrooms, area, property_type, status, created_at, updated_at) VALUES
('Luxury Marina Villa', 'Stunning waterfront villa with private dock', 'Monaco', 15000000.00, 5, 4, 350.50, 'Villa', 'available', NOW(), NOW()),
('Penthouse with Harbor View', 'Modern penthouse overlooking the marina', 'Dubai', 8500000.00, 3, 3, 250.00, 'Penthouse', 'available', NOW(), NOW());

-- Insert sample galleries
INSERT INTO galleries (title, description, image_path, created_at, updated_at) VALUES
('Yacht Interior', 'Luxurious interior design', '/assets/images/gallery1.jpg', NOW(), NOW()),
('Marina View', 'Beautiful marina landscape', '/assets/images/gallery2.jpg', NOW(), NOW());

-- Insert sample videos
INSERT INTO videos (title, description, video_path, thumbnail_path, duration, created_at, updated_at) VALUES
('Yacht Tour', 'Complete tour of our luxury yacht', '/assets/videos/yacht-tour.mp4', '/assets/images/video-thumb1.jpg', 300, NOW(), NOW()),
('Marina Services', 'Overview of our marina services', '/assets/videos/services.mp4', '/assets/images/video-thumb2.jpg', 180, NOW(), NOW());

-- Create indexes for better performance
CREATE INDEX products_category_id_index ON products (category_id);
CREATE INDEX job_submissions_job_id_index ON job_submissions (job_id);
CREATE INDEX properties_status_index ON properties (status);
CREATE INDEX reach_outs_status_index ON reach_outs (status);
CREATE INDEX recruiting_crews_status_index ON recruiting_crews (status);

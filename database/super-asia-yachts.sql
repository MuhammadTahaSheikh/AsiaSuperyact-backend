-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 12:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `super-asia-yachts`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageURL` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `description`, `imageURL`, `created_at`, `updated_at`) VALUES
(7, 'Chartered Yacht', 'We offer a wide range of private and private charter yachts.', 'http://192.168.18.79:8000/assets/images/category/1729782689_about-us-bg-pic1.png', '2024-10-24 10:11:29', '2024-10-24 10:11:29');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `enquiry` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `email`, `subject`, `enquiry`, `created_at`, `updated_at`) VALUES
(1, 'Moughees', 'moughees@360synergytech.com', 'First record', 'This is my first post api call using laravel', '2024-10-21 15:06:21', '2024-10-21 10:06:21'),
(2, 'Taha', 'taha@360synergytech.com', 'First record', 'This is my first post api call using laravel', '2024-10-21 15:12:06', '2024-10-21 10:12:06'),
(3, 'Hasan Sohail', 'hasan@360synergytech.com', 'First record', 'This is my first post api call using laravel', '2024-10-21 16:16:39', '2024-10-21 11:16:39'),
(4, 'Ali', 'ali@360synergytech.com', 'First record', 'This is my first post api call using laravel', '2024-10-21 20:58:53', '2024-10-21 15:58:53'),
(5, 'Ali', 'ali@360synergytech.com', 'First record', 'This is my first post api call using laravel', '2024-10-28 11:28:55', '2024-10-28 06:28:55');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `imageURL` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `imageURL`, `created_at`, `updated_at`) VALUES
(10, 'http://192.168.18.79:8000/assets/images/gallery/1729782188_ship1.png', '2024-10-24 10:03:08', '2024-10-24 10:03:08'),
(11, 'http://192.168.18.79:8000/assets/images/gallery/1729782188_ship2.png', '2024-10-24 10:03:08', '2024-10-24 10:03:08'),
(12, 'http://192.168.18.79:8000/assets/images/gallery/1729782188_ship3.png', '2024-10-24 10:03:08', '2024-10-24 10:03:08'),
(13, 'http://192.168.18.79:8000/assets/images/gallery/1729782188_ship4.png', '2024-10-24 10:03:08', '2024-10-24 10:03:08'),
(14, 'http://192.168.18.79:8000/assets/images/gallery/1729782222_ship1.png', '2024-10-24 10:03:42', '2024-10-24 10:03:42'),
(15, 'http://192.168.18.79:8000/assets/images/gallery/1729782222_ship2.png', '2024-10-24 10:03:42', '2024-10-24 10:03:42'),
(16, 'http://192.168.18.79:8000/assets/images/gallery/1729782222_ship3.png', '2024-10-24 10:03:42', '2024-10-24 10:03:42'),
(17, 'http://192.168.18.79:8000/assets/images/gallery/1729782222_ship4.png', '2024-10-24 10:03:42', '2024-10-24 10:03:42');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_10_21_122056_create_contact_us_table', 2),
(5, '2024_10_21_164746_create_products_table', 3),
(6, '2024_10_21_183004_create_categories_table', 4),
(7, '2024_10_23_123000_create_reach_outs_table', 5),
(8, '2024_10_23_134656_create_galleries_table', 6),
(9, '2024_10_23_141807_create_videos_table', 7),
(10, '2024_10_21_164746_create_product_table', 8),
(11, '2024_10_23_185149_add_category_id_foreign_key_to_products_table', 9),
(12, '2024_10_24_131505_add_thumbnail_for_videos_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `categoryID` bigint(20) UNSIGNED DEFAULT NULL,
  `displayedDescription` text NOT NULL,
  `exteriorDesignDescription` text NOT NULL,
  `amenitiesDescription` text NOT NULL,
  `interiorDesignDescription` text NOT NULL,
  `toysAndTendersDescription` text NOT NULL,
  `imageURL` text NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `capacity` int(10) UNSIGNED NOT NULL,
  `pictureSpots` int(10) UNSIGNED NOT NULL,
  `bedrooms` int(10) UNSIGNED NOT NULL,
  `repairDate` datetime DEFAULT NULL,
  `ratioOfSpace` decimal(8,2) NOT NULL,
  `perk` varchar(255) NOT NULL,
  `length` varchar(255) DEFAULT NULL,
  `beam` varchar(255) DEFAULT NULL,
  `draft` varchar(255) DEFAULT NULL,
  `cruisingSpeed` varchar(255) DEFAULT NULL,
  `builder` varchar(255) DEFAULT NULL,
  `navalArchitect` varchar(255) DEFAULT NULL,
  `exteriorDesigner` varchar(255) DEFAULT NULL,
  `interiorDesigner` varchar(255) DEFAULT NULL,
  `hullMaterial` varchar(255) DEFAULT NULL,
  `superstructureMaterial` varchar(255) DEFAULT NULL,
  `grossTonnage` int(10) UNSIGNED DEFAULT NULL,
  `deckMaterial` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `categoryID`, `displayedDescription`, `exteriorDesignDescription`, `amenitiesDescription`, `interiorDesignDescription`, `toysAndTendersDescription`, `imageURL`, `price`, `capacity`, `pictureSpots`, `bedrooms`, `repairDate`, `ratioOfSpace`, `perk`, `length`, `beam`, `draft`, `cruisingSpeed`, `builder`, `navalArchitect`, `exteriorDesigner`, `interiorDesigner`, `hullMaterial`, `superstructureMaterial`, `grossTonnage`, `deckMaterial`, `created_at`, `updated_at`) VALUES
(10, 'Prod1', 7, 'Hello this is displayedDescription', 'Hello this is exteriorDesignDescription', 'Hello this is amenitiesDescription', 'Hello this is interiorDesignDescription', 'Hello this is toysAndTendersDescription', 'http://192.168.18.79:8000/assets/images/product/1729782715_ship1.png,http://192.168.18.79:8000/assets/images/product/1729782715_ship2.png,http://192.168.18.79:8000/assets/images/product/1729782715_ship3.png', 12345, 25, 2, 1, '2024-10-24 00:53:36', 10.50, 'Hello this is perk', 'Hello this is length', 'Hello this is beam', 'Hello this is draft', 'Hello this is cruisingSpeed', 'Hello this is builder', 'Hello this is navalArchitect', 'Hello this is exteriorDesigner', 'Hello this is interiorDesigner', 'Hello this is hullMaterial', 'Hello this is superstructureMaterial', 5, 'Hello this is deckMaterial', '2024-10-24 10:11:55', '2024-10-24 10:11:55'),
(11, 'Prod2', 7, 'Hello this is displayedDescription', 'Hello this is exteriorDesignDescription', 'Hello this is amenitiesDescription', 'Hello this is interiorDesignDescription', 'Hello this is toysAndTendersDescription', 'http://192.168.18.79:8000/assets/images/product/1729784110_ship1.png,http://192.168.18.79:8000/assets/images/product/1729784110_ship2.png,http://192.168.18.79:8000/assets/images/product/1729784110_ship3.png', 12345, 25, 2, 1, '2024-10-24 00:53:36', 10.50, 'Hello this is perk', 'Hello this is length', 'Hello this is beam', 'Hello this is draft', 'Hello this is cruisingSpeed', 'Hello this is builder', 'Hello this is navalArchitect', 'Hello this is exteriorDesigner', 'Hello this is interiorDesigner', 'Hello this is hullMaterial', 'Hello this is superstructureMaterial', 5, 'Hello this is deckMaterial', '2024-10-24 10:35:10', '2024-10-24 10:35:10'),
(12, 'Prod3', 7, 'Hello this is displayedDescription', 'Hello this is exteriorDesignDescription', 'Hello this is amenitiesDescription', 'Hello this is interiorDesignDescription', 'Hello this is toysAndTendersDescription', 'http://192.168.18.79:8000/assets/images/product/1729784290_ship1.png,http://192.168.18.79:8000/assets/images/product/1729784290_ship2.png,http://192.168.18.79:8000/assets/images/product/1729784290_ship3.png', 12345, 25, 2, 1, '2024-10-24 00:53:36', 10.50, 'Hello this is perk', 'Hello this is length', 'Hello this is beam', 'Hello this is draft', 'Hello this is cruisingSpeed', 'Hello this is builder', 'Hello this is navalArchitect', 'Hello this is exteriorDesigner', 'Hello this is interiorDesigner', 'Hello this is hullMaterial', 'Hello this is superstructureMaterial', 5, 'Hello this is deckMaterial', '2024-10-24 10:38:10', '2024-10-24 10:38:10'),
(13, 'Prod4', 7, 'Hello this is displayedDescription', 'Hello this is exteriorDesignDescription', 'Hello this is amenitiesDescription', 'Hello this is interiorDesignDescription', 'Hello this is toysAndTendersDescription', 'http://192.168.18.79:8000/assets/images/product/1729784312_ship1.png,http://192.168.18.79:8000/assets/images/product/1729784312_ship2.png,http://192.168.18.79:8000/assets/images/product/1729784312_ship3.png', 12345, 25, 2, 1, '2024-10-24 00:53:36', 10.50, 'Hello this is perk', 'Hello this is length', 'Hello this is beam', 'Hello this is draft', 'Hello this is cruisingSpeed', 'Hello this is builder', 'Hello this is navalArchitect', 'Hello this is exteriorDesigner', 'Hello this is interiorDesigner', 'Hello this is hullMaterial', 'Hello this is superstructureMaterial', 5, 'Hello this is deckMaterial', '2024-10-24 10:38:32', '2024-10-24 10:38:32');

-- --------------------------------------------------------

--
-- Table structure for table `reach_outs`
--

CREATE TABLE `reach_outs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('WtNat4vCUj6XCRvtak0NRnxNgUYh3aWVJVApCveN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTGJqUkdyR2pKbFZTcFFGNDhYcFJNbVd1V25YYThTcXdnNXVSZ3QwSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729511794),
('zZlCPXdcHz8TiZ5lHKBxjVfpxMbUMVYqJn8s9zWk', NULL, '127.0.0.1', 'PostmanRuntime/7.42.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoic1JNM1FuMklHalVWaGp4THM4N05YZmlZV2d0TXNBdDdNNUlYdndYMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1729514753);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `videoURL` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_categoryid_foreign` (`categoryID`);

--
-- Indexes for table `reach_outs`
--
ALTER TABLE `reach_outs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `reach_outs`
--
ALTER TABLE `reach_outs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_categoryid_foreign` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

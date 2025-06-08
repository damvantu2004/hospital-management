-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2025 at 11:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
  `reason` text NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `appointment_date`, `appointment_time`, `status`, `reason`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-06-09', '09:00:00', 'confirmed', 'Khám tim định kỳ', 'Đã xác nhận lịch hẹn. Vui lòng đến đúng giờ và mang theo giấy tờ tùy thân.', '2025-06-07 19:26:30', '2025-06-07 19:47:35'),
(2, 2, 2, '2025-06-10', '14:00:00', 'confirmed', 'Khám nhi khoa cho con', 'Đã xác nhận lịch hẹn', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(3, 3, 3, '2025-06-07', '10:30:00', 'completed', 'Điều trị mụn trứng cá', 'Đã hoàn thành khám, kê đơn thuốc', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(4, 1, 2, '2025-06-13', '15:30:00', 'pending', 'Tư vấn sức khỏe tổng quát', NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(5, 1, 3, '2025-06-15', '14:30:00', 'pending', 'Khám da liễu - điều trị mụn', NULL, '2025-06-07 19:44:35', '2025-06-07 19:44:35'),
(6, 6, 1, '2025-06-13', '08:00:00', 'pending', 'đau bụng và ho', NULL, '2025-06-08 02:17:11', '2025-06-08 02:17:11');

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
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `specialty` varchar(255) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `license_number` varchar(255) DEFAULT NULL,
  `experience_years` int(11) NOT NULL DEFAULT 0,
  `consultation_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `bio` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `achievements` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `working_days` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`working_days`)),
  `morning_start` time DEFAULT NULL,
  `morning_end` time DEFAULT NULL,
  `afternoon_start` time DEFAULT NULL,
  `afternoon_end` time DEFAULT NULL,
  `break_duration` int(11) NOT NULL DEFAULT 30,
  `max_patients_per_day` int(11) NOT NULL DEFAULT 20,
  `advance_booking_days` int(11) NOT NULL DEFAULT 30,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `qualification`, `degree`, `license_number`, `experience_years`, `consultation_fee`, `bio`, `education`, `achievements`, `address`, `languages`, `working_days`, `morning_start`, `morning_end`, `afternoon_start`, `afternoon_end`, `break_duration`, `max_patients_per_day`, `advance_booking_days`, `is_available`, `created_at`, `updated_at`) VALUES
(1, 2, 'Tim mạch', 'Thạc sĩ Y khoa', NULL, NULL, 10, 500000.00, 'Chuyên khoa tim mạch với 10 năm kinh nghiệm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 20, 30, 1, '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(2, 3, 'Nhi khoa', 'Tiến sĩ Y khoa', NULL, NULL, 15, 400000.00, 'Chuyên gia nhi khoa hàng đầu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 20, 30, 1, '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(3, 4, 'Da liễu', 'Bác sĩ CKI', NULL, NULL, 8, 300000.00, 'Chuyên khoa da liễu và thẩm mỹ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 20, 30, 1, '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(4, 14, 'Chuyên khoa chung', 'Cần cập nhật', NULL, NULL, 0, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 20, 30, 0, '2025-06-07 21:21:11', '2025-06-07 21:21:11');

-- --------------------------------------------------------

--
-- Table structure for table `email_verification_tokens`
--

CREATE TABLE `email_verification_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_verification_tokens`
--

INSERT INTO `email_verification_tokens` (`email`, `token`, `created_at`) VALUES
('patient_test@example.com', '$2y$10$fBV6zBxK/AUlc1ueYLLbZu.IKfAO4cvvrEM7.A3glQADLclgH.Phq', '2025-06-07 19:37:59'),
('unverified@example.com', 'test-verification-token', '2025-06-07 19:26:30');

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
(19, '0001_01_01_000000_create_users_table', 1),
(20, '0001_01_01_000001_create_cache_table', 1),
(21, '0001_01_01_000002_create_jobs_table', 1),
(22, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(23, '2024_01_01_000002_create_email_verification_tokens_table', 1),
(24, '2025_06_08_014033_add_roles_and_phone_to_users_table', 1),
(25, '2025_06_08_014111_create_doctors_table', 1),
(26, '2025_06_08_014131_create_patients_table', 1),
(27, '2025_06_08_014147_create_appointments_table', 1),
(28, '2025_06_08_085116_add_profile_fields_to_doctors_table', 2),
(29, 'yyyy_mm_dd_hhmmss_add_profile_fields_to_doctors_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('reset@example.com', '$2y$10$LwnRm5ZgR71W4mcIQoSfkOtmvqdEzWioeZimKJR7iz7/YQkipNdCe', '2025-06-07 19:26:31');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `user_id`, `date_of_birth`, `gender`, `address`, `emergency_contact`, `created_at`, `updated_at`) VALUES
(1, 5, '1990-05-15', 'male', '123 Nguyễn Văn Cừ, Quận 1, TP.HCM', '0987654322', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(2, 6, '1985-12-20', 'female', '456 Lê Lợi, Quận 3, TP.HCM', '0987654324', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(3, 7, '1992-08-10', 'male', '789 Võ Văn Tần, Quận 10, TP.HCM', '0987654326', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(4, 10, NULL, NULL, NULL, NULL, '2025-06-07 19:37:59', '2025-06-07 19:37:59'),
(6, 15, NULL, NULL, NULL, NULL, '2025-06-08 02:11:10', '2025-06-08 02:11:10');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user','doctor','patient') NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `is_active`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$10$WkG4AcJEHU4zULiXxYQFF.GtSuLfpzeN8gG1dwD5SDCvP4LFmnha.', 'admin', 1, 'n14o6oBBAH', '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(2, 'Dr. Nguyễn Văn A', 'doctor1@hospital.com', '0901234567', '$2y$10$bQxNuSGwYVJRjUadG5tXoOWR4ApfDB6o9qARoZKpA.y9iziztMaGy', 'doctor', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(3, 'Dr. Trần Thị B', 'doctor2@hospital.com', '0901234568', '$2y$10$pFxQI91/jhv4wYiP3n5Ja.o9/yMixrXy0auqrKQ/ZmqxB4RAV89am', 'doctor', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(4, 'Dr. Lê Văn C', 'doctor3@hospital.com', '0901234569', '$2y$10$iv36M3/pPCULoM99EHxtruxCPn/JsflW9nu5PAuvZbsifZfdF3.k6', 'doctor', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(5, 'Hoàng Văn X', 'patient1@example.com', '0987654321', '$2y$10$eexwQFY0QZuS64mKLLIDI.jfip3H687uV.WH7vU.Thw/KkaVl8CUW', 'patient', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(6, 'Nguyễn Thị Y', 'patient2@example.com', '0987654323', '$2y$10$LEdyqyphAod6hjvACCYa8eT1eCwRr5mV9E.BewVJIIp2Q92XY4sWO', 'patient', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(7, 'Trần Văn Z', 'patient3@example.com', '0987654325', '$2y$10$49sLCaqtJ5JF2lgbMnPfj.dfRITiVTx6xjnMUHR4.DCN36AhP5Zc.', 'patient', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 19:26:30', '2025-06-07 19:26:30'),
(10, 'Bệnh nhân Test', 'patient_test@example.com', NULL, '$2y$10$zFjS0u1QcBsPGbPoOmB6COIa0C0NGuSnY9GYmKIwMPPSIgUp81bwO', 'patient', 0, NULL, '2025-06-07 19:26:30', '2025-06-07 19:37:59', '2025-06-07 19:37:59'),
(11, 'Nguyễn văn mạnh', 'patient11@example.com', NULL, '$2y$10$ricB0gNj01OVqnLWy6skh.rd3xpL6h1hBCa8BS6GFyzS.lVfIsDxa', 'patient', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 21:13:20', '2025-06-07 21:13:20'),
(12, 'Nguyễn văn mạnh1', 'doctor11@hospital.com', NULL, '$2y$10$oBaczV0XGVV5J3Hv69vnGuu5sqP3EvVxz2JHaKeGujVzeqx6fVFX6', 'doctor', 1, NULL, '2025-06-07 19:26:30', '2025-06-07 21:14:56', '2025-06-07 21:14:56'),
(14, 'Nguyễn văn mạnh1', 'thtisun2k@gmail.com', NULL, '$2y$10$OuBM45jezqP0AOnBhqO5cucWVzIGJ/cQC2RijoIYMlnS9tMWp7ceG', 'doctor', 1, NULL, '2025-06-07 21:21:37', '2025-06-07 21:21:11', '2025-06-07 21:21:37'),
(15, 'Nguyễn văn mạnh1', 'kbtisun2k@gmail.com', NULL, '$2y$10$4T1R0EwVjaYcng/T7tt8l.gQCM5Lsxootd.Ia7xszm5d.Ka5ZnR8m', 'patient', 1, NULL, '2025-06-08 02:12:06', '2025-06-08 02:11:10', '2025-06-08 02:12:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_patient_id_foreign` (`patient_id`),
  ADD KEY `appointments_doctor_id_foreign` (`doctor_id`);

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
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctors_user_id_foreign` (`user_id`);

--
-- Indexes for table `email_verification_tokens`
--
ALTER TABLE `email_verification_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

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
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patients_user_id_foreign` (`user_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

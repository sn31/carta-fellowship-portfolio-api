-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 25, 2018 at 12:07 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carta-api`
--
CREATE DATABASE IF NOT EXISTS `carta-api` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `carta-api`;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(32) NOT NULL,
  `date` date NOT NULL,
  `company` varchar(255) NOT NULL,
  `quantity` int(32) NOT NULL,
  `cost` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `date`, `company`, `quantity`, `cost`) VALUES
(1, '2018-11-22', 'Meetly', 1000, 2000),
(3, '2018-10-23', 'Meetly', 1000, 1000),
(4, '2018-11-01', 'Meetly', 100, 200),
(6, '2018-08-01', 'IMIM', 100, 300),
(7, '2018-11-15', 'IMIM', 200, 500),
(10, '2018-02-27', 'skye', 101, 203),
(11, '2018-10-25', 'AMZ', 301, 601);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

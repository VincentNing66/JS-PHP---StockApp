-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jan 28, 2016 at 02:27 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

--
-- Database: `COMP333`
--

-- --------------------------------------------------------

--
-- Table structure for table `Stocks`
--

CREATE TABLE `Stocks` (
  `companyname` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `currentprice` decimal(11,2) NOT NULL,
  `recentchange` decimal(11,2) NOT NULL,
  `annualtrend` varchar(5) NOT NULL,
  `recentchangedirection` varchar(5) NOT NULL
);
--
-- Dumping data for table `Stocks`
--

--
-- Indexes for table `Stocks`
--
ALTER TABLE `Stocks`
  ADD PRIMARY KEY (`id`);

INSERT INTO `Stocks` (`companyname`, `id`, `currentprice`, `recentchange`, `annualtrend`, `recentchangedirection`) VALUES
('ABC Company', 1, '0.40', '0.02', 'Up', 'Up'),
('XYZ Logistics', 2, '1.00', '0.05', 'Down', 'Down'),
('Acme Publishing', 3, '1.33', '0.08', 'Up', 'Down'),
('Fling Fing', 4, '0.94', '0.11', 'Down', 'Up'),
('Neutral Networks', 5, '1.25', '0.40', 'Up', 'Up'),
('Total Solutions Inc', 6, '0.55', '0.01', 'Down', 'Up');




--
-- AUTO_INCREMENT for table `Stocks`
--
ALTER TABLE `Stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
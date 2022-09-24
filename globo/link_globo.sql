-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25-Set-2022 às 01:12
-- Versão do servidor: 10.4.17-MariaDB
-- versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `link_globo`
--
DROP DATABASE IF EXISTS `link_globo`;
CREATE DATABASE IF NOT EXISTS `link_globo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `link_globo`;

-- --------------------------------------------------------
--
-- Estrutura da tabela `links`
--
DROP TABLE IF EXISTS `links`;

CREATE TABLE `links` (
  `url_link` varchar(400) NOT NULL,
  PRIMARY KEY (`url_link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabela para salvar os links cadastrados';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

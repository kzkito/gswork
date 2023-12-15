-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost
-- 生成日時: 2023 年 12 月 15 日 04:28
-- サーバのバージョン： 10.4.28-MariaDB
-- PHP のバージョン: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `sushi_business`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `neta`
--

CREATE TABLE `neta` (
  `id` int(12) NOT NULL,
  `sushiya_id` varchar(64) NOT NULL,
  `neta` varchar(64) NOT NULL,
  `cooking` varchar(32) NOT NULL,
  `form` varchar(32) NOT NULL,
  `explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `neta`
--

INSERT INTO `neta` (`id`, `sushiya_id`, `neta`, `cooking`, `form`, `explanation`) VALUES
(1, 'nohachi', 'マグロ', '漬け', '握り', 'Marinated from Oma in a soysource-based special sauce for 3 hours.'),
(2, 'nohachi', 'ホッカイシマエビ', '茹で', '握り', 'Shrimp caught with a unique tateami net in places like Notsuke Bay, Hokkaido. A simple taste boiled in salt.'),
(3, 'nohachi', 'いくら', '軍艦', '生', 'Ikura-gunakn, \"Salmon Roe Battleship\", is a Japanese delight, topped with ikura (salmon roe). The roe offers a burst of briny, slightly sweet flavor and a unique \"pop\" texture, contrasting with the rice tender chewiness. Enjoyed best in one bite, it pairs well with sake or light beer, offering a memorable experience for seafood lovers.');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `neta`
--
ALTER TABLE `neta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `neta`
--
ALTER TABLE `neta`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20064
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 8.4.5)
# 数据库: joy_read_basis
# 生成时间: 2025-06-12 12:10:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 Articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Articles`;

CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `Articles` WRITE;
/*!40000 ALTER TABLE `Articles` DISABLE KEYS */;

INSERT INTO `Articles` (`id`, `title`, `content`, `createdAt`, `updatedAt`)
VALUES
	(3,'文章的标题 3','文章的内容 3','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(4,'文章的标题 4','文章的内容 4','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(5,'文章的标题 5','文章的内容 5','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(6,'文章的标题 6','文章的内容 6','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(7,'文章的标题 7','文章的内容 7','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(8,'文章的标题 8','文章的内容 8','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(9,'文章的标题 9','文章的内容 9','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(10,'文章的标题 10','文章的内容 10','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(11,'文章的标题 11','文章的内容 11','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(12,'文章的标题 12','文章的内容 12','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(13,'文章的标题 13','文章的内容 13','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(14,'文章的标题 14','文章的内容 14','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(15,'文章的标题 15','文章的内容 15','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(16,'文章的标题 16','文章的内容 16','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(17,'文章的标题 17','文章的内容 17','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(18,'文章的标题 18','文章的内容 18','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(19,'文章的标题 19','文章的内容 19','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(20,'文章的标题 20','文章的内容 20','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(21,'文章的标题 21','文章的内容 21','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(22,'文章的标题 22','文章的内容 22','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(23,'文章的标题 23','文章的内容 23','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(24,'文章的标题 24','文章的内容 24','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(25,'文章的标题 25','文章的内容 25','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(26,'文章的标题 26','文章的内容 26','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(27,'文章的标题 27','文章的内容 27','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(28,'文章的标题 28','文章的内容 28','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(29,'文章的标题 29','文章的内容 29','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(30,'文章的标题 30','文章的内容 30','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(31,'文章的标题 31','文章的内容 31','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(32,'文章的标题 32','文章的内容 32','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(33,'文章的标题 33','文章的内容 33','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(34,'文章的标题 34','文章的内容 34','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(35,'文章的标题 35','文章的内容 35','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(36,'文章的标题 36','文章的内容 36','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(37,'文章的标题 37','文章的内容 37','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(38,'文章的标题 38','文章的内容 38','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(39,'文章的标题 39','文章的内容 39','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(40,'文章的标题 40','文章的内容 40','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(41,'文章的标题 41','文章的内容 41','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(42,'文章的标题 42','文章的内容 42','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(43,'文章的标题 43','文章的内容 43','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(44,'文章的标题 44','文章的内容 44','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(45,'文章的标题 45','文章的内容 45','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(46,'文章的标题 46','文章的内容 46','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(47,'文章的标题 47','文章的内容 47','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(48,'文章的标题 48','文章的内容 48','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(49,'文章的标题 49','文章的内容 49','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(50,'文章的标题 50','文章的内容 50','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(51,'文章的标题 51','文章的内容 51','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(52,'文章的标题 52','文章的内容 52','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(53,'文章的标题 53','文章的内容 53','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(54,'文章的标题 54','文章的内容 54','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(55,'文章的标题 55','文章的内容 55','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(56,'文章的标题 56','文章的内容 56','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(57,'文章的标题 57','文章的内容 57','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(58,'文章的标题 58','文章的内容 58','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(59,'文章的标题 59','文章的内容 59','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(60,'文章的标题 60','文章的内容 60','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(61,'文章的标题 61','文章的内容 61','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(62,'文章的标题 62','文章的内容 62','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(63,'文章的标题 63','文章的内容 63','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(64,'文章的标题 64','文章的内容 64','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(65,'文章的标题 65','文章的内容 65','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(66,'文章的标题 66','文章的内容 66','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(67,'文章的标题 67','文章的内容 67','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(68,'文章的标题 68','文章的内容 68','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(69,'文章的标题 69','文章的内容 69','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(70,'文章的标题 70','文章的内容 70','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(71,'文章的标题 71','文章的内容 71','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(72,'文章的标题 72','文章的内容 72','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(73,'文章的标题 73','文章的内容 73','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(74,'文章的标题 74','文章的内容 74','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(75,'文章的标题 75','文章的内容 75','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(76,'文章的标题 76','文章的内容 76','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(77,'文章的标题 77','文章的内容 77','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(78,'文章的标题 78','文章的内容 78','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(79,'文章的标题 79','文章的内容 79','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(80,'文章的标题 80','文章的内容 80','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(81,'文章的标题 81','文章的内容 81','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(82,'文章的标题 82','文章的内容 82','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(83,'文章的标题 83','文章的内容 83','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(84,'文章的标题 84','文章的内容 84','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(85,'文章的标题 85','文章的内容 85','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(86,'文章的标题 86','文章的内容 86','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(87,'文章的标题 87','文章的内容 87','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(88,'文章的标题 88','文章的内容 88','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(89,'文章的标题 89','文章的内容 89','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(90,'文章的标题 90','文章的内容 90','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(91,'文章的标题 91','文章的内容 91','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(92,'文章的标题 92','文章的内容 92','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(93,'文章的标题 93','文章的内容 93','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(94,'文章的标题 94','文章的内容 94','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(95,'文章的标题 95','文章的内容 95','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(96,'文章的标题 96','文章的内容 96','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(97,'文章的标题 97','文章的内容 97','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(98,'文章的标题 98','文章的内容 98','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(99,'文章的标题 99','文章的内容 99','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(100,'文章的标题 100','文章的内容 100','2025-06-09 15:45:00','2025-06-09 15:45:00'),
	(101,'1122','','2025-06-10 16:45:00','2025-06-10 16:45:00'),
	(102,'测试11','sfdsfsf ','2025-06-10 16:47:43','2025-06-10 16:55:03');

/*!40000 ALTER TABLE `Articles` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 Categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Categories`;

CREATE TABLE `Categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rank` int unsigned NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;

INSERT INTO `Categories` (`id`, `name`, `rank`, `createdAt`, `updatedAt`)
VALUES
	(1,'前端开发',1,'2025-06-10 19:30:57','2025-06-10 19:30:57'),
	(2,'后端开发',2,'2025-06-10 19:30:57','2025-06-10 19:30:57'),
	(3,'移动端开发',3,'2025-06-10 19:30:57','2025-06-10 19:30:57'),
	(4,'数据库',4,'2025-06-10 19:30:57','2025-06-10 19:30:57'),
	(5,'服务器运维',5,'2025-06-10 19:30:57','2025-06-10 19:30:57'),
	(6,'公共',6,'2025-06-10 19:30:57','2025-06-10 19:30:57');

/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 Chapters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Chapters`;

CREATE TABLE `Chapters` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int unsigned NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rank` int unsigned NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chapters_course_id` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# 转储表 Courses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Courses`;

CREATE TABLE `Courses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `categoryId` int unsigned NOT NULL,
  `userId` int unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `recommended` tinyint(1) NOT NULL DEFAULT '0',
  `introductory` tinyint(1) NOT NULL DEFAULT '0',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `likesCount` int unsigned NOT NULL DEFAULT '0',
  `chaptersCount` int unsigned NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_category_id` (`categoryId`),
  KEY `courses_user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `Courses` WRITE;
/*!40000 ALTER TABLE `Courses` DISABLE KEYS */;

INSERT INTO `Courses` (`id`, `categoryId`, `userId`, `name`, `image`, `recommended`, `introductory`, `content`, `likesCount`, `chaptersCount`, `createdAt`, `updatedAt`)
VALUES
	(1,1,1,'CSS 入门',NULL,1,1,NULL,0,0,'2025-06-12 19:41:53','2025-06-12 19:41:53'),
	(2,2,1,'Node.js 项目实践',NULL,1,0,NULL,0,0,'2025-06-12 19:41:53','2025-06-12 19:41:53'),
	(3,3,1,'HTML',NULL,1,0,NULL,0,0,'2025-06-12 19:41:53','2025-06-12 19:41:53');

/*!40000 ALTER TABLE `Courses` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 Likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Likes`;

CREATE TABLE `Likes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int unsigned NOT NULL,
  `userId` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `likes_course_id` (`courseId`),
  KEY `likes_user_id` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# 转储表 SequelizeMeta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SequelizeMeta`;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;

INSERT INTO `SequelizeMeta` (`name`)
VALUES
	('20250609065324-create-article.js'),
	('20250610110224-create-category.js'),
	('20250610110452-create-user.js'),
	('20250610111043-create-course.js'),
	('20250610111848-create-chapter.js'),
	('20250610112056-create-like.js'),
	('20250610112254-create-setting.js'),
	('20250611135616-add-avatar-to-user.js');

/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 Settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Settings`;

CREATE TABLE `Settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `copyright` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `extra` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `Settings` WRITE;
/*!40000 ALTER TABLE `Settings` DISABLE KEYS */;

INSERT INTO `Settings` (`id`, `name`, `icp`, `copyright`, `extra`, `createdAt`, `updatedAt`)
VALUES
	(1,'知悦','joy_read','© 2026 ZhiYue Inc. All Rights Reserved.',NULL,'2025-06-10 22:40:23','2025-06-10 22:40:23');

/*!40000 ALTER TABLE `Settings` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gender` tinyint unsigned NOT NULL DEFAULT '2',
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `role` tinyint unsigned NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email` (`email`),
  UNIQUE KEY `users_username` (`username`),
  KEY `users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `email`, `username`, `password`, `nickname`, `gender`, `company`, `introduce`, `role`, `createdAt`, `updatedAt`, `avatar`)
VALUES
	(1,'admin@lebang.cn','admin','$2b$10$5E9X0gLUGrMTNAarFb9wJOn38CL5A9A8vYELTc6nRW53Gv89xRwC2','管理员',1,NULL,NULL,100,'2025-06-11 22:57:48','2025-06-11 22:57:48',NULL),
	(2,'user1@lebang.cn','user1','$2b$10$FydPbZkduML5OJRUU6cLB.R1iM7Wx8fXtdkOce2uOwu5P8/XURSYS','普通用户1',0,NULL,NULL,0,'2025-06-11 22:57:48','2025-06-11 22:57:48',NULL),
	(3,'user2@lebang.cn','user2','$2b$10$0wX6MDc9qClm6H32avjdA.JcmEfa66i/CMoO/4/0mxoLsqdI7F2ta','普通用户2',0,NULL,NULL,0,'2025-06-11 22:57:48','2025-06-11 22:57:48',NULL),
	(4,'user3@lebang.cn','user3','$2b$10$0bTtiZfjusdXe9VE5qHaSOyzhIxVVfsF1nSnpjCn02UAZIvMLcKke','普通用户3',1,NULL,NULL,0,'2025-06-11 22:57:48','2025-06-11 22:57:48',NULL);

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

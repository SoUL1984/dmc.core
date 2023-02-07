-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dmcdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.10.2-MariaDB-1:10.10.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Индентификатор пользователя',
  `userId` int(11) DEFAULT NULL COMMENT 'Индентификатор пользователя который завел заказ-наряд',
  `orderNum` varchar(13) NOT NULL COMMENT 'Номер заказ-наряда',
  `doctorName` varchar(255) DEFAULT NULL COMMENT 'ФИО доктора',
  `pacientName` varchar(255) DEFAULT NULL COMMENT 'ФИО пациента',
  `technician` varchar(255) NOT NULL COMMENT 'ФИО техника',
  `color` enum('none','A1','A2','A3','A3,5','A4','B1','B2','B3','B4','C1','C2','C3','C4','D2','D3','D4','Blich') DEFAULT 'none' COMMENT 'Цвет конструкции',
  `deliveryWork` datetime DEFAULT NULL COMMENT 'Дата сдачи работы (окончательная, которая произошла)',
  `certComplete` varchar(255) DEFAULT NULL COMMENT 'Акт выполненных работ',
  `factPayment` varchar(255) DEFAULT NULL COMMENT 'Факт оплаты (подтверждение оплаты)',
  `isComplete` tinyint(1) DEFAULT 0 COMMENT 'Флаг, работа сдана',
  `isPayment` tinyint(1) DEFAULT 0 COMMENT 'Флаг, оплаты работы',
  `isDelivery` tinyint(1) DEFAULT 0 COMMENT 'Флаг, работу можно отправить (выставляет администратор, когда узнает,что работа готова к отправке)',
  `isDeliveryMade` tinyint(1) DEFAULT 0 COMMENT 'Флаг, доставка произведена',
  `uploadFiles` varchar(600) NOT NULL COMMENT 'Прикрпеленные файлы',
  `desc` varchar(250) DEFAULT NULL COMMENT 'Дополнительные комментарии',
  `descCourier` varchar(256) DEFAULT NULL COMMENT 'Коментарий для курьера',
  `executor_n1` int(11) NOT NULL COMMENT 'Исполнитель, который учавствовал в работе №1',
  `executor_n2` int(11) DEFAULT NULL COMMENT 'Исполнитель, который учавствовал в работе №2',
  `executor_n3` int(11) DEFAULT NULL COMMENT 'Исполнитель, который учавствовал в работе №3',
  `fittingDateN1` datetime NOT NULL COMMENT 'Примерка №1',
  `fittingDateN2` datetime DEFAULT NULL COMMENT 'Примерка №2',
  `fittingDateN3` datetime DEFAULT NULL COMMENT 'Примерка №3',
  `isDelete` tinyint(1) DEFAULT 0 COMMENT 'Флаг удаления Заказ-наряда',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `orderNum` (`orderNum`),
  KEY `userId` (`userId`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_price`
--

DROP TABLE IF EXISTS `order_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Индентификатор связи заказ-наряд и прайс',
  `priceId` int(11) DEFAULT NULL COMMENT 'Индентификатор прайса',
  `orderId` int(11) DEFAULT NULL COMMENT 'Индентификатор заказ-наряда',
  `amount` int(11) NOT NULL COMMENT 'Количество выбранных позиций',
  `tprice` decimal(8,2) NOT NULL COMMENT 'Цена позиции на текущий момент времени',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Флаг удаления связи заказ-наряда___прайс',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `priceId` (`priceId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `order_price_ibfk_1` FOREIGN KEY (`priceId`) REFERENCES `price` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `order_price_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_price`
--

LOCK TABLES `order_price` WRITE;
/*!40000 ALTER TABLE `order_price` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pricegroupId` int(11) NOT NULL COMMENT 'Индентификатор группы в прайс-листе',
  `name` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `pricegroupId` (`pricegroupId`),
  CONSTRAINT `price_ibfk_1` FOREIGN KEY (`pricegroupId`) REFERENCES `pricegroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (12,1,'Титановый абатмент',2000.00,'',0,'2023-01-17 18:51:15','2023-01-17 18:51:15',NULL),(13,1,'Титановый абатмент Wax-up',1800.00,'',0,'2023-01-17 18:51:53','2023-01-17 18:51:53',NULL),(14,1,'Титановая вкладка',1800.00,'',0,'2023-01-17 18:52:34','2023-01-17 18:52:34',NULL),(16,1,'Титановая вкладка Wax-up',1600.00,'',0,'2023-01-17 18:53:21','2023-01-17 18:53:21',NULL),(18,2,'Стеклокерамика Emax (коронка/вкладка)',4500.00,'',0,'2023-01-17 18:58:18','2023-01-17 18:58:18',NULL),(19,2,'Стеклокерамика Emax (коронка/вкладка) Wax-up',4300.00,'',0,'2023-01-17 18:58:43','2023-01-17 18:58:43',NULL),(20,3,'Пластик PMMA',1500.00,'',0,'2023-01-17 19:01:44','2023-01-17 19:01:44',NULL),(21,3,'Пластик PMMA Wax-up',1300.00,'',0,'2023-01-17 19:02:00','2023-01-17 19:02:00',NULL),(22,4,'Воск Wax-up',450.00,'',0,'2023-01-17 19:03:06','2023-01-17 19:03:06',NULL),(23,5,'Циркониевый абатмент',6500.00,'',0,'2023-01-17 19:04:09','2023-01-17 19:04:09',NULL),(24,5,'Циркониевый абатмент Wax-up',6300.00,'',0,'2023-01-17 19:04:29','2023-01-17 19:04:29',NULL),(25,5,'Циркониевая коронка',5000.00,'',0,'2023-01-17 19:05:05','2023-01-17 19:05:05',NULL),(26,5,'Циркониевая коронка Wax-up',4800.00,'',0,'2023-01-17 19:05:24','2023-01-17 19:05:24',NULL),(27,5,'Циркониевая вкладка',3000.00,'',0,'2023-01-17 19:06:11','2023-01-17 19:06:11',NULL),(28,5,'Циркониевая вкладка Wax-up',2800.00,'',0,'2023-01-17 19:06:26','2023-01-17 19:06:26',NULL),(29,6,'Полировка',250.00,'',0,'2023-01-17 19:09:08','2023-01-17 19:09:08',NULL),(30,6,'Опак',150.00,'',0,'2023-01-17 19:09:31','2023-01-17 19:09:31',NULL),(31,7,'ICX/Astra/Ankylos/и др.',1500.00,'',0,'2023-01-17 19:19:33','2023-01-17 19:19:33',NULL);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricegroup`
--

DROP TABLE IF EXISTS `pricegroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricegroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pricegroup_name` varchar(255) NOT NULL,
  `pricegroup_desc` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `pricegroup_name` (`pricegroup_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricegroup`
--

LOCK TABLES `pricegroup` WRITE;
/*!40000 ALTER TABLE `pricegroup` DISABLE KEYS */;
INSERT INTO `pricegroup` VALUES (1,'Титановые работы','Абатменты/вкладки',0,'2023-01-16 11:44:24','2023-01-16 11:44:24',NULL),(2,'Стеклокерамика Emax','Коронки/вкладки',0,'2023-01-17 18:17:38','2023-01-17 18:17:38',NULL),(3,'Пластик PMMA','Коронки',0,'2023-01-17 18:29:01','2023-01-17 18:29:01',NULL),(4,'Воск Wax-up','Коронки',0,'2023-01-17 18:30:49','2023-01-17 18:30:49',NULL),(5,'Цирконивые работы','Коронки/абатменты/вкладки',0,'2023-01-17 18:40:10','2023-01-17 18:40:10',NULL),(6,'Доп.услуги','Полировка/опак',0,'2023-01-17 18:49:31','2023-01-17 18:49:31',NULL),(7,'Титановые основания','ICX/Astra/Ankylos/и др.',0,'2023-01-17 19:15:23','2023-01-17 19:15:23',NULL);
/*!40000 ALTER TABLE `pricegroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` enum('Москва','Санкт-Петербург','Самара') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `role` enum('customer','dentaltechn','director','courier','admin') NOT NULL DEFAULT 'customer',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `lastVisit` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Мalera@mail.ru','$2a$05$bKH5TpVhU/iqj5mBu9Kyp.z/odxtBcRdwKiE8HQ7ed1GX2BHjL7F.','Марелов Сергей Андреевич','Самара','Ленинская ул., дом 13, кв. 16','Дополнительное описание','+7(927)333-50-50','1989-11-01 00:00:00','customer',0,NULL,'2023-01-15 17:24:13','2023-01-15 17:24:13',NULL),(3,'Smirnova@gmail.com','$2a$05$O9nWTwWSARF80V/HHkVZ5u7WJeaBy.itcsX//AT3blAzfNd.qS8bW','Смирнова Наталья Олеговна','Самара','7-ая просека ул., дом 19, кв. 166','Дополнительное описание','+7(999)222-50-60','1969-01-21 00:00:00','admin',0,NULL,'2023-01-15 17:27:27','2023-01-15 17:27:27',NULL),(4,'Bonderenko@gmail.com','$2a$05$BBsF0T.EjvDkCse.ycNEjeO52R88gn66gjj73KMsY4Ynf3uvCc/mq','Бондеренко Сергей Николаевич','Самара','Осипенко ул., дом 39, кв. 9','Дополнительное описание','+7(919)232-40-66','1989-05-01 00:00:00','courier',0,NULL,'2023-01-15 17:29:23','2023-01-15 17:29:23',NULL),(5,'Muratov@yandex.ru','$2a$05$Yipvv95vdrruQtwOAbHou.ygitZVVae1KCwNrNuQoNDBaIrTPZBnG','Мурат Муратов Муратович','Самара','Победы ул., дом 88, кв. 79','Дополнительное описание','+7(937)732-40-56','1999-05-01 00:00:00','dentaltechn',0,NULL,'2023-01-15 17:31:33','2023-01-15 17:31:33',NULL),(6,'Blinov@yandex.ru','$2a$05$Tw53OmyOBrFIQPFSXJ1vnuHp8DGlEsajzxFv91AAQjwO9lcD3.scG','Блинов Анатолий Анатольевич','Санкт-Петербург','проспект Сизова ул., дом 23, кв. 779','Дополнительное описание','+7(987)737-80-66','1966-05-21 00:00:00','director',0,NULL,'2023-01-15 17:34:02','2023-01-15 17:34:02',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dmcdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-27 22:59:31

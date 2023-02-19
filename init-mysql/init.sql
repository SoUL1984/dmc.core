CREATE DATABASE IF NOT EXISTS dmcdb;
CREATE DATABASE IF NOT EXISTS dmcdb_test;

USE dmcdb_test;

-- dmcdb_test.pricegroup definition

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- dmcdb_test.price definition

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- dmcdb_test.users definition

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

-- dmcdb_test.`order` definition

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

-- dmcdb_test.order_price definition

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

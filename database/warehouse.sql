-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: warehouse
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `count` int NOT NULL,
  `project` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (28,'Henry','2024-06-05','Transceiver(MMA4Z00-NS)','Transfer',8,'Microsoft','GDL'),(29,'Li','2024-06-18','Fiber splitter cables(MFP7E20-N005)','Cable',15,'Microsoft','Naqing_RA01'),(30,'Rayden','2024-06-21','BlueField 3(900-9D3B6-00CV-AA0)','Card',50,'NVIDIA','Naqing_RA04'),(31,'Oliver','2024-06-21','BlueField 3(900-9D3B6-00CV-AA0)','Card',20,'AWS','Naqing_RA07'),(32,'Jed','2024-06-14','Fiber splitter cables(MFP7E20-N005)','Cable',2,'Microsoft','Naqing_RA04'),(33,'Henry','2024-06-22','光纖線(MFP7E10-N010)','Cable',6,'Microsoft','GDL'),(44,'Kevin','2024-06-07','Optical Transceiver 100GbE QSFP28(MMA1B00-C100D)','Transceiver',2,'Microsoft','HuYao'),(45,'Li','2024-05-08','Gigabit PoE Switch','Switch',5,'Microsoft','GDL');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total`
--

DROP TABLE IF EXISTS `total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `totalcount` int NOT NULL,
  `currentcount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total`
--

LOCK TABLES `total` WRITE;
/*!40000 ALTER TABLE `total` DISABLE KEYS */;
INSERT INTO `total` VALUES (1,'QM9700(MQM9700-NS2R)','Switch',27,0),(2,'SN5600(920-9N42F-00RI-7C0)','Switch',2,0),(3,'SN3700(MSN3700-VS2RC)','Switch',2,NULL),(4,'SN2201(MSN2201-CB2RC)','Switch',7,NULL),(5,'Gigabit PoE Switch','Switch',4,NULL),(6,'光纖線(MFP7E10-N010)','Cable',2331,NULL),(7,'AOC(MFS1S00-H005V)','Cable',127,NULL),(8,'Fiber splitter cables(MFP7E20-N005)','Cable',57,NULL),(9,'DAC(MCP1600-C002E30N)','Cable',94,NULL),(10,'BlueField 3(900-9D3B6-00CV-AA0)','Card',2,NULL),(11,'CX7(MCX75310AAS-NEAT)','Card',6,NULL),(12,'Optical Transceiver 100GbE QSFP28(MMA1B00-C100D)','Transceiver',10,NULL),(13,'Transceiver(MMA4Z00-NS)','Transceiver',1000,NULL),(14,'Transceiver(MMA4Z00-NS400','Transceiver',673,NULL),(15,'Transceiver(MMA1Z00-NS400)','Transceiver',264,NULL);
/*!40000 ALTER TABLE `total` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07 14:17:37

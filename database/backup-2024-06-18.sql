/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: devices
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `count` int NOT NULL,
  `project` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 92 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: total
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `total` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `totalcount` int NOT NULL,
  `receivedcount` int DEFAULT NULL,
  `NaQing` varchar(255) NOT NULL,
  `HuYao` varchar(255) NOT NULL,
  `GDL` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: trash
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `trash` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: devices
# ------------------------------------------------------------

INSERT INTO
  `devices` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`
  )
VALUES
  (
    86,
    'Oliver',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'none',
    'NaQing(INPUT)'
  );
INSERT INTO
  `devices` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`
  )
VALUES
  (
    87,
    'Oliver',
    '2024-06-17',
    'DAC(MCP1600-C002E30N)',
    'Cable',
    32,
    'none',
    'NaQing(INPUT)'
  );
INSERT INTO
  `devices` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`
  )
VALUES
  (
    88,
    'Oliver',
    '2024-06-17',
    'AOC(MFS1S00-H005V)',
    'Cable',
    32,
    'none',
    'NaQing(INPUT)'
  );
INSERT INTO
  `devices` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`
  )
VALUES
  (
    89,
    'Oliver',
    '2024-06-17',
    'CX7(MCX75310AAS-NEAT)',
    'Card',
    6,
    'none',
    'NaQing(INPUT)'
  );
INSERT INTO
  `devices` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`
  )
VALUES
  (
    90,
    'Oliver',
    '2024-06-17',
    'BlueField 3(900-9D3B6-00CV-AA0)',
    'Card',
    2,
    'none',
    'NaQing(INPUT)'
  );
INSERT INTO
  `devices` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`
  )
VALUES
  (
    91,
    'Oliver',
    '2024-06-17',
    'Fiber splitter cables(MFP7E20-N005)',
    'Cable',
    19,
    'none',
    'NaQing(INPUT)'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: total
# ------------------------------------------------------------

INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    1,
    'QM9700(MQM9700-NS2R)',
    'Switch',
    27,
    22,
    '22',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    2,
    'SN5600(920-9N42F-00RI-7C0)',
    'Switch',
    2,
    0,
    '0',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    3,
    'SN3700(MSN3700-VS2RC)',
    'Switch',
    2,
    0,
    '0',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    4,
    'SN2201(MSN2201-CB2RC)',
    'Switch',
    7,
    0,
    '0',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (5, 'Gigabit PoE Switch', 'Switch', 4, 0, '0', '0', '0');
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (6, '光纖線(MFP7E10-N010)', 'Cable', 2331, 0, '0', '0', '0');
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    7,
    'AOC(MFS1S00-H005V)',
    'Cable',
    127,
    32,
    '32',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    8,
    'Fiber splitter cables(MFP7E20-N005)',
    'Cable',
    57,
    19,
    '19',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    9,
    'DAC(MCP1600-C002E30N)',
    'Cable',
    94,
    32,
    '32',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    10,
    'BlueField 3(900-9D3B6-00CV-AA0)',
    'Card',
    2,
    2,
    '2',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    11,
    'CX7(MCX75310AAS-NEAT)',
    'Card',
    6,
    6,
    '6',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    12,
    'Optical Transceiver 100GbE QSFP28(MMA1B00-C100D)',
    'Transceiver',
    10,
    0,
    '0',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    13,
    'Transceiver(MMA4Z00-NS)',
    'Transceiver',
    1000,
    0,
    '0',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    14,
    'Transceiver(MMA4Z00-NS400)',
    'Transceiver',
    673,
    0,
    '0',
    '0',
    '0'
  );
INSERT INTO
  `total` (
    `id`,
    `name`,
    `model`,
    `totalcount`,
    `receivedcount`,
    `NaQing`,
    `HuYao`,
    `GDL`
  )
VALUES
  (
    15,
    'Transceiver(MMA1Z00-NS400)',
    'Transceiver',
    264,
    0,
    '0',
    '0',
    '0'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: trash
# ------------------------------------------------------------

INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    1,
    'Rayden',
    '2024-06-14',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    2,
    'NVIDIA',
    'Naqing_RA01',
    '2024-06-17 11:52:23'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    2,
    'Jimmy',
    '2024-06-14',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    4,
    'NVIDIA',
    'NaQing(INPUT)',
    '2024-06-17 11:53:39'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    3,
    'Jimmy',
    '2024-06-14',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'HuYao',
    '2024-06-17 11:53:40'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    4,
    'Jimmy',
    '2024-06-14',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    7,
    'Microsoft',
    'GDL',
    '2024-06-17 11:53:41'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    5,
    'Dennis',
    '2024-06-14',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'NVIDIA',
    'NaQing(INPUT)',
    '2024-06-17 11:53:41'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    6,
    'Jimmy',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    '',
    'NaQing(INPUT)',
    '2024-06-17 13:39:40'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    7,
    'Jeff',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'HuYao',
    '2024-06-17 13:39:41'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    8,
    'Oliver',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'none',
    'NaQing(INPUT)',
    '2024-06-17 13:48:47'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    9,
    'Jeff',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'HuYao',
    '2024-06-17 13:48:47'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    10,
    'Oliver',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'none',
    'NaQing(INPUT)',
    '2024-06-17 13:49:14'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    11,
    'Oliver',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'none',
    'NaQing(INPUT)',
    '2024-06-17 13:49:14'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    12,
    'Jimmy',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'GDL',
    '2024-06-17 13:49:59'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    13,
    'Jimmy',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'GDL',
    '2024-06-17 13:50:01'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    14,
    'Oliver',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'none',
    'NaQing(INPUT)',
    '2024-06-17 13:50:15'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    15,
    'Jimmy',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'GDL',
    '2024-06-17 13:50:16'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    16,
    'Jimmy',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'Microsoft',
    'GDL',
    '2024-06-17 17:04:27'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    17,
    'Oliver',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    22,
    'none',
    'NaQing(INPUT)',
    '2024-06-17 17:05:05'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    18,
    'Li',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    5,
    'NVIDIA',
    'Naqing_RA01',
    '2024-06-17 17:05:17'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    19,
    'Jeff',
    '2024-06-17',
    'QM9700(MQM9700-NS2R)',
    'Switch',
    7,
    'NVIDIA',
    'HuYao',
    '2024-06-17 17:12:25'
  );
INSERT INTO
  `trash` (
    `id`,
    `owner`,
    `date`,
    `name`,
    `model`,
    `count`,
    `project`,
    `location`,
    `deleted_at`
  )
VALUES
  (
    20,
    'Kevin',
    '2024-06-17',
    'BlueField 3(900-9D3B6-00CV-AA0)',
    'Card',
    2,
    'Microsoft',
    'Naqing_RA04',
    '2024-06-17 17:12:27'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

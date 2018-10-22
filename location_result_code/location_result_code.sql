# 创建数据表
DROP TABLE IF EXISTS location_result_code;
CREATE TABLE location_result_code
(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  platform ENUM('Android', 'iOS', 'Unknown'),
  network ENUM('Wifi', '2G', '3G', '4G', 'Unknown'),
  province VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci,
  operator VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci,
  request_time TIMESTAMP,
  speed INT,
  latitude FLOAT,
  altitude FLOAT,
  longitude FLOAT,
  duration INT,
  accuracy INT,
  sdk VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci,
  invokerId VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY(id)
);

# 整体情况：最大值，最小值，平均值，众数，中位数
SELECT MIN(accuracy), MAX(accuracy), AVG(accuracy) FROM location_result_code;
SELECT COUNT(*), accuracy FROM location_result_code GROUP BY accuracy ORDER BY COUNT(*) DESC LIMIT 1;
SET @half = (SELECT COUNT(*) FROM location_result_code) / 2;
SELECT @half;
SELECT accuracy FROM location_result_code ORDER BY accuracy LIMIT @half, 2;

# Android：最大值，最小值，平均值，众数，中位数
SELECT MIN(accuracy), MAX(accuracy), AVG(accuracy) FROM location_result_code WHERE platform = 'Android';
SELECT COUNT(*), accuracy FROM location_result_code WHERE platform = 'Android' GROUP BY accuracy ORDER BY COUNT(*) DESC LIMIT 1;
SET @half = (SELECT COUNT(*) FROM location_result_code WHERE platform = 'Android') / 2;
SELECT @half;
SELECT accuracy FROM location_result_code  WHERE platform = 'Android' ORDER BY accuracy LIMIT @half, 2;

# iOS：最大值，最小值，平均值，众数，中位数
SELECT MIN(accuracy), MAX(accuracy), AVG(accuracy) FROM location_result_code WHERE platform = 'iOS';
SELECT COUNT(*), accuracy FROM location_result_code WHERE platform = 'iOS' GROUP BY accuracy ORDER BY COUNT(*) DESC LIMIT 1;
SET @half = (SELECT COUNT(*) FROM location_result_code WHERE platform = 'iOS') / 2;
SELECT @half;
SELECT accuracy FROM location_result_code  WHERE platform = 'iOS' ORDER BY accuracy LIMIT @half, 2;

# 统计PLATFORM分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code);
SELECT @totalCount;
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'Android';
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'iOS';
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'Unknown';

# 统计NETWORK分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code);
SELECT @totalCount;
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = 'Wifi';
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '4G';
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '3G';
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '2G';
SELECT COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = 'Unknown';

# 统计整体业务分布
SET @totalCount = (SELECT COUNT(*) FROM location_result_code);
SELECT @totalCount;
SELECT invokerId, COUNT(*) AS totalCount, CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code GROUP BY invokerId ORDER BY totalCount DESC;

# 统计Android端业务分布
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE platform = 'Android');
SELECT @totalCount;
SELECT invokerId, COUNT(*) AS totalCount, CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'Android' GROUP BY invokerId ORDER BY totalCount DESC;

# 统计iOS端业务分布
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE platform = 'iOS');
SELECT @totalCount;
SELECT invokerId, COUNT(*) AS totalCount, CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'iOS' GROUP BY invokerId ORDER BY totalCount DESC;

# 统计整体的定位精度分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code);
SELECT @totalCount;
SELECT FLOOR(accuracy / 50) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 50) * 50, '~', (FLOOR(accuracy / 50) + 1) * 50, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code GROUP BY accuracyRange ORDER BY  accuracyRange LIMIT 21;
SELECT FLOOR(accuracy / 1000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 1000) * 1000, '~', (FLOOR(accuracy / 1000) + 1) * 1000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code GROUP BY accuracyRange ORDER BY accuracyRange LIMIT 11;
SELECT FLOOR(accuracy / 10000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 10000) * 10000, '~', (FLOOR(accuracy / 10000) + 1) * 10000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code GROUP BY accuracyRange ORDER BY  accuracyRange;

# 统计Android端定位精度分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE platform = 'Android');
SELECT @totalCount;
SELECT FLOOR(accuracy / 50) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 50) * 50, '~', (FLOOR(accuracy / 50) + 1) * 50, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'Android' GROUP BY accuracyRange ORDER BY accuracyRange LIMIT 21;
SELECT FLOOR(accuracy / 1000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 1000) * 1000, '~', (FLOOR(accuracy / 1000) + 1) * 1000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'Android' GROUP BY accuracyRange ORDER BY  accuracyRange LIMIT 11;
SELECT FLOOR(accuracy / 10000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 10000) * 10000, '~', (FLOOR(accuracy / 10000) + 1) * 10000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'Android' GROUP BY accuracyRange ORDER BY  accuracyRange;

# 统计iOS端定位精度分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE platform = 'iOS');
SELECT @totalCount;
SELECT FLOOR(accuracy / 50) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 50) * 50, '~', (FLOOR(accuracy / 50) + 1) * 50, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'iOS' GROUP BY accuracyRange ORDER BY accuracyRange LIMIT 21;
SELECT FLOOR(accuracy / 1000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 1000) * 1000, '~', (FLOOR(accuracy / 1000) + 1) * 1000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'iOS' GROUP BY accuracyRange ORDER BY  accuracyRange LIMIT 11;
SELECT FLOOR(accuracy / 10000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 10000) * 10000, '~', (FLOOR(accuracy / 10000) + 1) * 10000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE platform = 'iOS' GROUP BY accuracyRange ORDER BY  accuracyRange;

# 统计Wifi定位精度分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE network = 'Wifi');
SELECT @totalCount;
SELECT FLOOR(accuracy / 50) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 50) * 50, '~', (FLOOR(accuracy / 50) + 1) * 50, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = 'Wifi' GROUP BY accuracyRange ORDER BY accuracyRange LIMIT 21;
SELECT FLOOR(accuracy / 1000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 1000) * 1000, '~', (FLOOR(accuracy / 1000) + 1) * 1000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = 'Wifi' GROUP BY accuracyRange ORDER BY  accuracyRange LIMIT 11;
SELECT FLOOR(accuracy / 10000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 10000) * 10000, '~', (FLOOR(accuracy / 10000) + 1) * 10000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = 'Wifi' GROUP BY accuracyRange ORDER BY  accuracyRange;

# 统计4G定位精度分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE network = '4G');
SELECT @totalCount;
SELECT FLOOR(accuracy / 50) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 50) * 50, '~', (FLOOR(accuracy / 50) + 1) * 50, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '4G' GROUP BY accuracyRange ORDER BY accuracyRange LIMIT 21;
SELECT FLOOR(accuracy / 1000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 1000) * 1000, '~', (FLOOR(accuracy / 1000) + 1) * 1000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '4G' GROUP BY accuracyRange ORDER BY  accuracyRange LIMIT 11;
SELECT FLOOR(accuracy / 10000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 10000) * 10000, '~', (FLOOR(accuracy / 10000) + 1) * 10000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '4G' GROUP BY accuracyRange ORDER BY  accuracyRange;

# 统计3G定位精度分布情况
SET @totalCount = (SELECT COUNT(*) FROM location_result_code WHERE network = '3G');
SELECT @totalCount;
SELECT FLOOR(accuracy / 50) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 50) * 50, '~', (FLOOR(accuracy / 50) + 1) * 50, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '3G' GROUP BY accuracyRange ORDER BY accuracyRange LIMIT 21;
SELECT FLOOR(accuracy / 1000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 1000) * 1000, '~', (FLOOR(accuracy / 1000) + 1) * 1000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '3G' GROUP BY accuracyRange ORDER BY  accuracyRange LIMIT 11;
SELECT FLOOR(accuracy / 10000) AS accuracyRange, CONCAT('[', FLOOR(accuracy / 10000) * 10000, '~', (FLOOR(accuracy / 10000) + 1) * 10000, ']') AS 'range', COUNT(*), CONCAT(COUNT(*) / @totalCount * 100, '%') AS 'percentage' FROM location_result_code WHERE network = '3G' GROUP BY accuracyRange ORDER BY  accuracyRange;


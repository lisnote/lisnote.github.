# 26测试事物实现转账

* mysql默认开启事务自动提交

```
-- 自动提交事务开关
# SET AUTOCOMMIT = 0;
# set AUTOCOMMIT = 1;

--  事务开始
# Start TRANSACTION

-- 提交事务
# COMMIT

-- 回滚: 回到原来的样子
# ROLLBACK

-- 设置一个事务的保存点
# SAVEPOINT
-- 回滚到保存点
# ROLLBACK TO SAVEPOINT
-- 撤销保存点
# RELEASE SAVEPOINT
```

* 前置数据库

```
DROP DATABASE IF EXISTS `bank`;
CREATE DATABASE `bank` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bank`;
CREATE TABLE `account`
(
    `id`    int,
    `name`  varchar(10),
    `money` decimal(10, 2),
    PRIMARY KEY (`id`)
) ENGINE = INNODB
  DEFAULT CHARSET = utf8;

ALTER TABLE `account`
    MODIFY `id` int AUTO_INCREMENT;
INSERT INTO `account`
VALUES (0, 'lisnote', 1000),
       (0, 'FStudent', 1000);
```

* 测试事务

```
-- 关闭自动提交
SET AUTOCOMMIT = 0;

-- 开始事务
START TRANSACTION;
UPDATE `account`
SET `money` = `money` - 500
WHERE `id` = 1;
UPDATE `account`
SET `money` = `money` + 500
WHERE `id` = 2;
-- 提交事务
COMMIT;
-- 回滚
ROLLBACK;

-- 开启自动提交
SET AUTOCOMMIT = 1;
```

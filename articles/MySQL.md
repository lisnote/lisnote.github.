# 01认识数据库

* 作用 : 存放信息

* DB : DataBase,数据库

* 概念 : 数据仓库

* 数据库语言

  * DDL数据定义语言

  * DML数据操作语言

  * DQL数据查询语言

  * DCL数据控制语言

## 关系型和非关系型数据库

* 关系型数据库 : 通过表和表之间,行和列之间的关系进行数据存储

  MySQL , Oracle , Sql Server,DB2,SQLite

* 非关系型数据库 : 对象存储 , 通过对象自身的属性决定

  Redis,MongoDB

* DBMS : database management system 数据库管理系统

# 02安装MySQL

## install安装方法

* Install版本
* 密码:复杂密码

## 压缩包安装方法

* MySQL : 关系型数据库管理系统,适用于中小型数据库(大型网站可以配合集群使用)

* 稳定版本 : 5.7   8.0

* 不推荐exe,推荐压缩包版本

* 安装流程

  1. 下载MySQL Server压缩包

  2. 解压到任意目录

  3. 设定解压缩内的bin目录进path环境变量

  4. 在与bin同级目录新建文件my.ini

     ```
     [mysqld]
     basedir=D:\AWork\mysql\
     datadir=D:\AWork\mysql\data\
     port=3306
     ```
     
  5. 安装服务(管理员cmd)
  
     ```
     mysqld -install
     //提示:Service successfully installed.
     ```
  
  6. 初始化数据文件
  
     ```
     //初始化数据文件
     mysqld --initialize-insecure --user=mysql
     ```
  
  7. 启动mysql
  
     ```
     net start mysql
     //关闭为:
     //net stop mysql
     ```
  
  8. 连接mysql
  
     ```
     mysql -u root
     //初始无密码,直接进入
     ```
  
  9. 更改密码
  
     ```
     update mysql.user set authentication_string=password('PublicSecret') where user='root' and Host = 'localhost';
     //8.0修改密码:
     //alter user 'root'@'localhost' identified with mysql_native_password by '私有密码';
     
     //更新权限
     flush privileges;
     ```

# 03可视化软件安装和使用

* 创建数据库
* 创建表
* 插入数据
* 查看数据
* 删除数据

# 04基本的命令行操作

* 启动mysql

```
net start mysql
```

* 关闭mysql

```
net stop mysql
```

* 连接数据库

```
use `DataBaseName`;
```

* 创建数据库

```
create database `DatabaseName`;
```

* 删除数据库

```
drop database `DatabaseName`;
```

* 查看数据库中所有的表

```
show tables;
```

* 显示表信息

```
describe `TableName`;
```

* 退出连接

```
exit;
```

* 注释

```
-- 单行注释
/*
多行注释
*/
```

# 05操作数据库语句

* 创建

```
create database if not exists `DataBaseName`;
```

* 删除数据库

```
drop database if exists `DatabaseName`;
```

* 使用数据库

```
use `DatabaseName`;
```

* 查看所有的数据库

```
show databases
```

# 06数据类型

| 类型      | 大小或格式             | 作用         |
| --------- | ---------------------- | ------------ |
| tinyint   | 1字节                  | 十分小的整数 |
| smallint  | 2字节                  | 较小的整数   |
| int       | 4字节                  | 标准整数     |
| bigint    | 8字节                  | 大整数       |
| float     | 4字节                  | 单精度浮点数 |
| double    | 8字节                  | 双精度浮点数 |
| decimal   | x                      | 精确浮点数   |
| char      | 0-255                  | 定长字符串   |
| varchar   | 0-65535                | 不定长字符串 |
| tinytext  | 2^8-1                  | 微型文本     |
| text      | 2^16-1                 | 文本串       |
| date      | YYYY-MM-DD             | 日期格式     |
| time      | HH:mm:ss               | 时间格式     |
| datetime  | YYYY-MM-DD HH:mm:ss    | 日期时间格式 |
| timestamp | 1970.1.1到现在的毫秒数 | 时间戳       |

* decimal(M,D)
	M -> 指定小数点左边和右边可以存储的十进制数字的最大个数，   （M的范围是0~38）
	D -> 小数点右侧，小数位的长度，不能超过D，超过部分四舍五入，（D的范围是0~30）

# 07数据库的字段约束

| 修饰名         | 作用             |
| -------------- | ---------------- |
| PRIMARY KEY    | 主键             |
| UNSIGNED       | 无符号整数       |
| ZEROFILL       | 不足的位数填充零 |
| AUTO_INCREMENT | 自增             |
| NOT NULL       | 非空             |
| DEFAULT        | 默认值           |
| COMMENT        | 注释             |

编码规范拓展 : 每一表都必须存在以下五个字段

| 字段名     | 租用     |
| ---------- | -------- |
| id         | 主键     |
| version    | 乐观锁   |
| is_delete  | 伪删除   |
| gmt_create | 创建时间 |
| gmt_update | 修改时间 |

# 08创建数据库和表

* 表的名称和字段名都尽量用 ` 括起来

 ```
 CREATE DATABASE `school`;
 
 /*
 CREATE DATABASE `school` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
 */
 ```

* 创建表student

```
CREATE TABLE `student`  (
  `name` varchar(255)
);

/*
CREATE TABLE `student`  (
  `id` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '学生id',
  `name` varchar(255) NULL DEFAULT 'Unnamed' COMMENT '学生姓名',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4;
*/
/*
CREATE TABLE `表名`  (
  `字段名` 数据类型 [属性] [索引] [注释],
  `字段名` 数据类型 [属性] [索引] [注释],
  ...
  `字段名` 数据类型 [属性] [索引] [注释]
)[表类型][字符集设置][注释]
*/
```

- 查看创建语句

```
SHOW CREATE DATABASE `school`;
SHOW CREATE TABLE `student`;
```

* 查看表结构

```
DESC student;
```

# 09MyISAM和InnoDB的区别

|                  | MYISAM | INNODB         |
| ---------------- | ------ | -------------- |
| 事务支持         | ×      | √              |
| 数据行锁定       | 表锁定 | √              |
| 外键约束         | ×      | √              |
| 全文索引         | ×      | √              |
| 表空间大小       | 较小   | 约MYISAM两倍   |
| 自增量的存储位置 | 文件   | 内存(断电归零) |

* 常规操作
  * MYISAM : 节约空间,速度更快
  * INNODB : 安全性高,事务处理,多表多用户操作

# 10修改和删除数据表字段

```
-- 修改表名
ALTER TABLE `student` RENAME `teacher`;
-- 添加字段
ALTER TABLE `teacher` ADD `age` INT ( 3 );
-- 删除字段
ALTER TABLE `teacher` DROP `age`;
-- 修改字段参数
ALTER TABLE `teacher` MODIFY `name` VARCHAR ( 10 );
-- 修改字段名和数据类型
ALTER TABLE teacher CHANGE `sex` `gender` VARCHAR ( 10 );
```

  * RENAME : 修改表名
  * ADD : 添加字段
  * DROP : 删除字段
  * MODIFY : 操作字段约束
  * CHANGE : 更改字段名和数据类型

* 所有创建和删除操作尽量增加判断,避免报错

# 11外键

* 作用 : 保持数据一致性，完整性，主要目的是控制存储在外键表中的数据。使两张表形成关联，外键只能引用外表中列的值
* MySQL中的外键由于作用小,性能低等问题,一般不使用
* 方式一

```
CREATE TABLE gender
(
    `genderId`   int(1),
    `genderName` varchar(1),
    PRIMARY KEY (`genderId`)
);
CREATE TABLE `student`
(
    id       int(3) AUTO_INCREMENT,
    name     varchar(3),
    genderId int(1),
    PRIMARY KEY (`id`),
    KEY `FK_genderId` (`genderId`),
    CONSTRAINT `FK_genderId` FOREIGN KEY (`genderId`) REFERENCES `gender` (`genderId`)
)
```

* 方式二

```
USE school;
CREATE TABLE gender
(
    `genderId`   int(1),
    `genderName` varchar(1),
    PRIMARY KEY (`genderId`)
);
CREATE TABLE `student`
(
    id       int(3) AUTO_INCREMENT,
    name     varchar(3),
    genderId int(1),
    PRIMARY KEY (`id`)
);
ALTER TABLE `student`
    ADD CONSTRAINT `fk_genderId` FOREIGN KEY (`genderId`) REFERENCES `gender` (`genderId`);
```

# 12数据操作语言DML

## insert语句详解

| 关键字      | 作用 |
| ----------- | ---- |
| INSERT INTO | 插入 |
| VALUES      | 值   |



* 对应参数插入

```
INSERT INTO `student`(`name`, `genderId`)
VALUES ('lisnote', 1);
```

* 批量插入

```
INSERT INTO `student`(`name`, `genderId`)
VALUES ('lisnote', 1),
       ('FStudent', 0);
```

* 省略字段插入 : 
  * 传入数据必须一一对应
  * 可以批量插入
  * 当传入自增字段的值为`0`时,会变为自动自增

```
INSERT INTO `student`
VALUES (0, 'lisnote', 1);
```

## Update语句详解

* 基本语法

```
UPDATE `student`
SET `name` = 'lisnote'
WHERE id = 1;
```

* 修改多个字段

```
UPDATE `student`
SET `name`     = 'lisnote',
    `genderId` = 0
WHERE `id` = 1;
```

| 关键字 | 作用                     |
| ------ | ------------------------ |
| UPDATE | 更新                     |
| SET    | 设置值或使用函数返回变量 |
| WHERE  | 条件判断                 |

## Delete和Truncate详解

| 关键字      | 说明     |
| ----------- | -------- |
| DELETE FROM | 删除     |
| WHERE       | 条件判断 |

```
DELETE
FROM `student`
WHERE `id` < 1;
```

| 关键字   | 说明                         |
| -------- | ---------------------------- |
| TRUNCATE | 清空表,并重置自增列计数器为0 |

```
TRUNCATE `student`;
```

# 13基本的Select语句和别名使用

| 关键字   | 说明             |
| -------- | ---------------- |
| SELECT   | 选择字段         |
| FROM     | 来源             |
| AS       | 为字段和表作别名 |
| DISTINCT | 去重             |

* 前置数据库 :  [student_score.sql](assets\MySQL.md\student_score.sql)
* 查询全部字段

```
-- 查询全部字段
SELECT *
FROM `student`;

-- 查询字段
SELECT `studentId`, `name`
FROM `student`;

-- 别名
SELECT `name` AS '姓名'
FROM `student`;

-- 使用函数
SELECT CONCAT('姓名 : ', `name`)
FROM `student`;

-- 去重
SELECT DISTINCT `studentId`
FROM score;

-- 查询 函数(此处为mysql版本)
SELECT VERSION();

-- 查询 表达式
SELECT 9 * 9 AS `计算结果`;

-- 查询 系统变量(此处为自增步长)
SELECT @@auto_increment_increment

-- 转换结果查看
SELECT `score` + 2
FROM score;
```

# 14Where子句之逻辑运算符

* 作用 : 检索数据中符合条件的值

| 符号     | 说明     |
| -------- | -------- |
| =        | 等于     |
| <> 或 != | 不等于   |
| >        | 大于     |
| >=       | 大于等于 |
| <        | 小于     |
| <=       | 小于等于 |
| AND      | 与       |
| OR       | 或       |
| NOT      | 非       |

```
SELECT score
FROM score
WHERE score >= 80;
```

# 15模糊查询操作符

| 运算符              | 说明                   |
| ------------------- | ---------------------- |
| IS NULL             | 空判断                 |
| IS NOT NULL         | 非空判断               |
| BETWEEN ... AND ... | 在某个范围内 例如[1,2] |
| LIKE                | sql匹配                |
| IN(...,...,...)     | 在指定项中             |

* 在 LIKE 中, "%"表示任意个任意字符,"_"表示一个任意字符

```
SELECT `mark`
FROM `student`
WHERE `mark` IS NOT NULL;

SELECT `score`
FROM `score`
WHERE `score` BETWEEN 70 AND 80;

SELECT *
FROM `student`
WHERE `name` LIKE '李%';

SELECT *
FROM `student`
WHERE `name` IN ('程明', '李方方');
```

# 16联表查询JoinON

| 关键字     | 说明                                             |
| ---------- | ------------------------------------------------ |
| INNER JOIN | 内连接,获取两个表中匹配关系的记录                |
| LEFT JOIN  | 左连接,获取左表所有记录,即使右表没有对应匹配关系 |
| RIGHT JOIN | 右连接,获取右表所有记录,即使左表没有对应匹配关系 |
```
SELECT `student`.`name`, `course`.`name`, `score`
FROM `score`
         INNER JOIN `student` ON `student`.`studentId` = `score`.`studentId`
         INNER JOIN `course` ON `score`.`courseId` = `course`.`courseId`;

```

# 17自连接及联表查询练习

* 自连接 : 本质是将一张表使用不同的别名,看作是两张表进行操作

# 18排序和分页

| 关键字   | 说明                                              |
| -------- | ------------------------------------------------- |
| ORDER BY | 排序                                              |
| ASC      | 顺序排序(默认,可省略)                             |
| DESC     | 倒序排序                                          |
| LIMIT    | 分页:.LIMIT 0,3 表示从下标为0的数据开始,取3个数据 |

```
SELECT `name`
FROM `student`
ORDER BY name DESC
LIMIT 0,3;
```

# 19子查询

```
-- 联表查询 离散数学的课程考试结果
SELECT `score`
FROM `course`
         JOIN `score` ON `course`.`courseId` = `score`.`courseId`
WHERE name = '离散数学';

-- 子查询 离散数学的课程考试结果
SELECT `score`
FROM `score`
WHERE `courseId` = (SELECT `courseId`
                  FROM `course`
                  WHERE `name` = '离散数学');
```

# 20MySQL常用函数

* [mysql函数和操作符](https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html)

```
-- 数学函数
-- 获取随机数
SELECT RAND();
-- 向上取整
SELECT CEILING(1.2);
-- 向下取整
SELECT FLOOR(1.6);
-- 取绝对值
SELECT ABS(-1);

-- 字符串函数
-- 获取长度
SELECT CHAR_LENGTH('asdf');
-- 拼接字符串
SELECT CONCAT('Hello', 'World', '!');
-- 替换字符串
SELECT INSERT('Hallo!', 2, 1, 'e');
-- 转大写
SELECT UPPER('HelloWorld!');
-- 转小写
SELECT LOWER('HelloWorld!');
-- 替换字符串
SELECT REPLACE('banana', 'an', '**');
-- 截取字符串
SELECT SUBSTR('Hello', 2);
SELECT SUBSTR('Hello', 2, 2);
-- 反转字符串
SELECT REVERSE('Hello');

-- 日期函数
-- 获取当前日期
SELECT CURRENT_DATE();
-- 获取当前时间
SELECT CURRENT_TIME();
-- 获取当前日期时间
SELECT NOW();
-- 单独获取年月日时分秒
SELECT YEAR(NOW());
SELECT MONTH(NOW());
SELECT DAY(NOW());
SELECT HOUR(NOW());
SELECT MINUTE(NOW());
SELECT SECOND(NOW());
```

# 21聚合函数

```
-- 统计列数量 三种方式效率不同
SELECT COUNT(*) -- 不会忽略NULL
FROM `student`;
SELECT COUNT(1) -- 不会忽略NULL
FROM `student`;
SELECT COUNT(`mark`) -- 会忽略NULL
FROM `student`;
-- 求和
SELECT SUM(`score`)
FROM `score`;
-- 求平均值
SELECT AVG(`score`)
FROM `score`;
-- 取最大值
SELECT MAX(`score`)
FROM `score`;
-- 取最小值
SELECT MIN(`score`)
FROM `score`;
```

# 22分组过滤

| 关键字   | 说明       |
| -------- | ---------- |
| GROUP BY | 分组依据   |
| HAVING   | 分组后过滤 |

```
SELECT `name`, AVG(score) AS `avg`
FROM course
         INNER JOIN score ON course.courseId = score.courseId
GROUP BY name
HAVING `avg` >= 75;
```

# 23MD5加密

```
SELECT MD5('HelloWorld!');
```

# 24Select小结

```
SELECT DISTINCT `table`.`field` AS `fieldNickname`
FROM `table` AS `tableNickname`
         JOIN `table`
WHERE `table`.`field` IS NOT NULL
GROUP BY `table`.`field`
HAVING `table`.`field`
LIMIT 0,10;
```

# 25事务

* 事务 : 执行某些相关任务时, 要么都成功, 要么都失败
* ACID原则
  * 原子性
    * 规定最小完成单位
    * 要么都成功, 要么都失败
  * 一致性
    * 一个事务操作前与操作后的状态一致
    * A和B总资产为1000,A和B相互转账,他们的总资产依旧为1000
  * 隔离性
    * 要么多用户并发访问数据库时,数据库为每一个用户开启的事务,不能被其他事务的操作数据所干扰,事务之间要相互隔离
  * 持久性
    * 事务一旦提交则不可逆

* 隔离所导致的一些问题
  * 脏读
    * 一个事务读取了另一个事务未提交的数据
  * 不可重复读
    * 同一个事务内,重复读取表中的数据,表数据发生了改变
  * 幻读
    * 一个事务读取时,别的事务插入了数据导致前后读取不一致

# 26测试事务实现转账

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

# 27索引介绍及索引的分类

* 索引 : 提高数据库查找速度的一种数据结构
* 索引种类 : 
  * 主键索引(PRIMARY KEY) : 
    唯一标识,主键不可重复,只能有一个主键
  * 唯一索引(UNIQUE KEY) :
    避免重复列出现,索引列可以重复,可以有多个唯一索引
  * 常规索引(INDEX/KEY) :
    默认索引
  * 全文索引(FULLTEXT) :
    快速匹配数据

```
-- 显示所有索引信息
SHOW INDEX FROM `student_score`.`student`;
-- 增加一个全文索引
ALTER TABLE `student_score`.`student`
    ADD FULLTEXT INDEX `mark` (`mark`);

-- 全文查询
SELECT *
FROM `student`
WHERE MATCH(`mark`) AGAINST('补考');

-- 分析SQL语句执行情况
EXPLAIN
SELECT *
FROM `student`;
```

# 28SQL编程创建一百万条数据测试索引

* 简单SQL函数案例

```
-- 设置参数 log_bin_trust_function_creators,二进制日志启用后，这个变量就会启用。它控制是否可以信任存储函数创建者，不会创建写入二进制日志引起不安全事件的存储函数
SET GLOBAL log_bin_trust_function_creators = 1;

-- 创建函数
DELIMITER $$
CREATE FUNCTION simple_function(n int) RETURNS int
BEGIN
    DECLARE i int DEFAULT 0;
    WHILE i < 1000000
        DO
            SET i = i + 1;
        END WHILE;
    RETURN n * RAND();
END;
SELECT simple_test(10);
```

* 插入百万条数据并测试查询速度

```
SET GLOBAL log_bin_trust_function_creators = 1;
DELIMITER $$
CREATE FUNCTION insert_million() RETURNS int
BEGIN
    DECLARE i int DEFAULT 0;
    WHILE i < 1000000
        DO
            INSERT `account` VALUES (0, CONCAT('用户', i), 1000);
            SET i = i + 1;
        END WHILE;
    RETURN 1;
END;

SELECT insert_million();


SELECT *
FROM account
WHERE name = '用户10000'; -- 无索引查询耗时264ms
SELECT *
FROM account
WHERE id = '10000'; -- 主键索引查询耗时28ms
```

# 29索引原则和明日安排

* 索引不是越多越好
* 不要对经常变动的数据增加索引
* 小数据量的表不需要家索引
* 索引一般加载在常用来查询的字段上

* 索引的数据结构
  * BTREE
  * HASH
  * FULLTEXT

# 30数据库用户管理

```
-- 创建用户
CREATE USER 'lisnote' IDENTIFIED BY 'password';

-- 修改密码
SET PASSWORD FOR 'lisnote' = 'newPassword';

-- 重命名
RENAME USER 'lisnote' TO 'FStudent';

-- 授予全部权限(无授权权限)
GRANT ALL PRIVILEGES ON *.* TO 'FStudent';

-- 查看权限
SHOW GRANTS FOR 'FStudent';
SHOW GRANTS FOR root@localhost;

-- 撤销权限
REVOKE ALL PRIVILEGES ON *.* FROM 'FStudent';

-- 删除用户
DROP USER 'FStudent';
```

# 31MySQL备份

* 方法1 : 复制数据库文件,恢复时直接粘贴
* 方法二 : mysqldump
  ```
  -- 导出
  mysqldump -hlocalhost -uUsername -pPassword DatabaseName >F:/FileName.sql
  -- 导入方式一(未登录)
  mysql -uUsername -pPassword DatabaseName<F:/FileName.sql
  -- 导入方式二(已登录)
  USE DatabaseName;
  SOURCE F:/FileName.sql;
  ```

# 32如何设计一个项目的数据库

* 良好的数据库设计 : 
  * 节省内存空间
  * 保证数据库的完整性
  * 高性能
  * 便于开发

* 设计数据库包括
  1. 分析需求 : 分析业务和需要处理的数据库的需求
  2. 概要设计 : 设计关系图E-R图

* 设计数据库的步骤(以个人博库为例)
  1. 收集信息,分析需求
  
     * 用户表 : 用户注销登录,用户个人信息,写博客,创建分类
     * 分类表 : 文章分类,创建文章的用户
     * 文章表 : 文章信息
     * 评论表
     * 友链表 : 友情链接信息
  
  2. 标识实体 : 将需求落实到每个字段
  3. 标识实体之间的关系
     * 写博客 : user > blog
     * 创建分类 : user > category
     * 关注 : user > user
     * 友链 : links
     * 评论 : user > user > blog

# 33数据库的三大范式

* 三大范式
  * 第一范式
    * 每一列不可再分
  
  * 第二范式
    * 前提 : 满足第一范式
    * 每张表只描述一件事情
  
  * 第三范式
    * 前提 : 满足第一范式和第二范式
    * 第三范式要确保每一列数据都和主键直接相关,而不是间接相关
  
* 关联查询的表不建议超过三张
* 规范性和性能问题 :
  * 考虑到商业化和需求的目标(成本和用户体验等),数据库的性能更加重要
  * 在规范性能的问题的时候需要适当考虑一下规范性
  * 偶尔会给一些表增加一些冗余字段(使多表查询变为单表查询)
  * 故意增加一些计算列(从大数据量降低为小数据量)


# 34数据库驱动和JDBC

* JDBC : Java DataBase Connectivity
* java数据库连接,数据库接口

# 35第一个JDBC程序

```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) throws Exception {
        //1.加载驱动
        //驱动程序通过SPI自动注册，手动加载驱动程序类通常是不必要的

        //2.用户信息和url
        String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=TRUE&characterEncoding=utf8&useSSL=TRUE";
        String username = "root";
        String password = "PassWord";

        //3.获取数据库对象 Connection
        Connection connection = DriverManager.getConnection(url, username, password);

        //4.获取执行sql的对象 Statement
        Statement statement = connection.createStatement();

        //5.执行sql,可能存在结果,查看返回结果
        String sql = "select * from `test`";
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()) {
            System.out.println("id : " + resultSet.getObject("id"));
            System.out.println("name : " + resultSet.getObject("name"));
        }

        //6.关闭连接
        resultSet.close();
        statement.close();
        connection.close();
    }
}
```

# 36JDBC中对象解释

* URL和用户信息
  * mysqlURL : 
  
    协议://主机地址:端口号/数据库名?参数1&参数2&参数3

    String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=TRUE&characterEncoding=utf8&useSSL=TRUE";

* Connection : 
  
  数据库对象,拥有数据库级别的各种方法

  ```
  Connection connection = DriverManager.getConnection(url, username, password);
  connection.setAutoCommit(false);
  connection.commit();
  connection.rollback();
  ```

* Statement :
  
  执行SQL的对象,可以执行SQL语句
  ```
  Statement statement = connection.createStatement();
  // 可以执行任何SQL语句
  statement.execute();
  //可以执行查询语句
  statement.executeQuery();
  //可以执行所有的更新语句(更新,删除,插入都算更新)
  statement.executeUpdate();
  ```

* ResultSet :
  
  结果集对象,封装所有的查询结果

  ```
  String sql = "select * from `test`";
  ResultSet resultSet = statement.executeQuery(sql);
  while (resultSet.next()) {
      System.out.println("id : " + resultSet.getObject("id"));
      System.out.println("name : " + resultSet.getObject("name"));
  }
  ```

* 释放资源(关闭连接)
  ```
  resultSet.close();
  statement.close();
  connection.close();
  ```

# 37JDBC使用实践

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

public class Main {
    private static String url = null;
    private static String username = null;
    private static String password = null;

    static {
        try (InputStream inputStream = new FileInputStream("src/main/resources/sql.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        //更新
        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {
            statement.executeUpdate("INSERT `test` VALUE (0, 'UserTest')");
        }
        //查找
        String sql = "SELECT * FROM `test`";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                System.out.println("id : " + resultSet.getObject("id"));
                System.out.println("name : " + resultSet.getObject("name"));
            }
        }
    }
}
```

# 38SQL注入问题

* 通过字符串拼接,弱类型语言自动转换参数类型等非常规操作对数据库进行各种攻击

# 39PreparedStatement对象

* 使用PreparedStatement的好处:
  1. 可以避免SQL注入
  2. 效率更高

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class Main {
    private static String url = null;
    private static String username = null;
    private static String password = null;

    static {
        try (InputStream inputStream = new FileInputStream("src/main/resources/sql.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        //PreparedStatement使用?作为占位符
        String sql;
        //更新
        sql = "INSERT `test` values(?,?)";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, 0);
            statement.setString(2, "PreparedTest");
            int result = statement.executeUpdate();
            if (result > 0) {
                System.out.println("插入成功");
            }
        }

        //查找
        sql = "select * from `test` where `id` < ?";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, 5);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getObject("name"));
            }
        }
    }
}
```

# 40使用IDEA连接数据库

* 不做笔记

# 41JDBC操作事务

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class Main {
    private static String url = null;
    private static String username = null;
    private static String password = null;

    static {
        try (InputStream inputStream = new FileInputStream("src/main/resources/sql.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        String sql = "UPDATE test SET money = money + ? where id = ?";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            connection.setAutoCommit(false);
            statement.setInt(1, 100);
            statement.setInt(2, 1);
            statement.executeUpdate();
            statement.setInt(1, -100);
            statement.setInt(2, 2);
            statement.executeUpdate();
            connection.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

# 42数据库连接池

* 频繁的获取和释放数据库连接十分消耗系统资源,因此准备一个数据库连接池,当有需要的时候,可以直接使用连接池中的连接,有效减小系统资源的消耗

* 目前最广泛被使用的连接池是HikariCP,此处以HikariCP为例,使用数据库连接池

* pom.xml
```
<!--HikariCP-->
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>2.7.1</version>
</dependency>
```

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;

public class Main {
    private static String url = null;
    private static String username = null;
    private static String password = null;

    static {
        try (InputStream inputStream = new FileInputStream("src/main/resources/sql.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/jdbc");
        hikariConfig.setUsername("root");
        hikariConfig.setPassword("PrivateSecret");
        hikariConfig.addDataSourceProperty("connectionTimeout", "1000"); // 连接超时：1秒
        hikariConfig.addDataSourceProperty("idleTimeout", "60000"); // 空闲超时：60秒
        hikariConfig.addDataSourceProperty("maximumPoolSize", "10"); // 最大连接数：10
        DataSource dataSource = new HikariDataSource(hikariConfig);
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("SELECT * FROM `test`")) {
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getObject("name"));
            }
        }
    }
}
```





# 43常见语句

* 创建数据库school

  ```mysql
  create database `school`;
  ```

* 使用数据库school

  ```
  use school;
  ```

* 创建表student

  ```
  CREATE TABLE `student`  (
    `id` int NOT NULL COMMENT '学生id',
    `name` varchar(255) NOT NULL COMMENT '学生姓名',
    PRIMARY KEY (`id`)
  );
  ```

* 修改表student

  ```
  ALTER TABLE `school`.`student` 
  MODIFY COLUMN `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'Unnamed' COMMENT '学生姓名' AFTER `id`;
  ```

* 插入数据

  ```
  INSERT INTO `student`(`name`) VALUES ('FStudent')
  ```

* 查找表

  ```
  SHOW CREATE TABLE `student`
  ```

  
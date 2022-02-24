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

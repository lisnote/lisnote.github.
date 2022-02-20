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

  
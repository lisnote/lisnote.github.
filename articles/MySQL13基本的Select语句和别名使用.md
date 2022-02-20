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

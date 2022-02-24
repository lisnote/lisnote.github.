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

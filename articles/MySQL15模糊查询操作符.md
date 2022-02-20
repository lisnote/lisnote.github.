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

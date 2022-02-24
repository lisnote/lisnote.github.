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

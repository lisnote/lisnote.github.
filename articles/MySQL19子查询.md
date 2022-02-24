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

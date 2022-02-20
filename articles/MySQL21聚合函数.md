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

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

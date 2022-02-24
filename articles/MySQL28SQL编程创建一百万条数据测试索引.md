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

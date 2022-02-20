# 20MySQL常用函数

* [mysql函数和操作符](https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html)

```
-- 数学函数
-- 获取随机数
SELECT RAND();
-- 向上取整
SELECT CEILING(1.2);
-- 向下取整
SELECT FLOOR(1.6);
-- 取绝对值
SELECT ABS(-1);

-- 字符串函数
-- 获取长度
SELECT CHAR_LENGTH('asdf');
-- 拼接字符串
SELECT CONCAT('Hello', 'World', '!');
-- 替换字符串
SELECT INSERT('Hallo!', 2, 1, 'e');
-- 转大写
SELECT UPPER('HelloWorld!');
-- 转小写
SELECT LOWER('HelloWorld!');
-- 替换字符串
SELECT REPLACE('banana', 'an', '**');
-- 截取字符串
SELECT SUBSTR('Hello', 2);
SELECT SUBSTR('Hello', 2, 2);
-- 反转字符串
SELECT REVERSE('Hello');

-- 日期函数
-- 获取当前日期
SELECT CURRENT_DATE();
-- 获取当前时间
SELECT CURRENT_TIME();
-- 获取当前日期时间
SELECT NOW();
-- 单独获取年月日时分秒
SELECT YEAR(NOW());
SELECT MONTH(NOW());
SELECT DAY(NOW());
SELECT HOUR(NOW());
SELECT MINUTE(NOW());
SELECT SECOND(NOW());
```

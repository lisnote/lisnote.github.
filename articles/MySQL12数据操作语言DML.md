# 12数据操作语言DML

## insert语句详解

| 关键字      | 作用 |
| ----------- | ---- |
| INSERT INTO | 插入 |
| VALUES      | 值   |



* 对应参数插入

```
INSERT INTO `student`(`name`, `genderId`)
VALUES ('lisnote', 1);
```

* 批量插入

```
INSERT INTO `student`(`name`, `genderId`)
VALUES ('lisnote', 1),
       ('FStudent', 0);
```

* 省略字段插入 : 
  * 传入数据必须一一对应
  * 可以批量插入
  * 当传入自增字段的值为`0`时,会变为自动自增

```
INSERT INTO `student`
VALUES (0, 'lisnote', 1);
```

## Update语句详解

* 基本语法

```
UPDATE `student`
SET `name` = 'lisnote'
WHERE id = 1;
```

* 修改多个字段

```
UPDATE `student`
SET `name`     = 'lisnote',
    `genderId` = 0
WHERE `id` = 1;
```

| 关键字 | 作用                     |
| ------ | ------------------------ |
| UPDATE | 更新                     |
| SET    | 设置值或使用函数返回变量 |
| WHERE  | 条件判断                 |

## Delete和Truncate详解

| 关键字      | 说明     |
| ----------- | -------- |
| DELETE FROM | 删除     |
| WHERE       | 条件判断 |

```
DELETE
FROM `student`
WHERE `id` < 1;
```

| 关键字   | 说明                         |
| -------- | ---------------------------- |
| TRUNCATE | 清空表,并重置自增列计数器为0 |

```
TRUNCATE `student`;
```

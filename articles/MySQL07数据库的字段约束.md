# 07数据库的字段约束

| 修饰名         | 作用             |
| -------------- | ---------------- |
| PRIMARY KEY    | 主键             |
| UNSIGNED       | 无符号整数       |
| ZEROFILL       | 不足的位数填充零 |
| AUTO_INCREMENT | 自增             |
| NOT NULL       | 非空             |
| DEFAULT        | 默认值           |
| COMMENT        | 注释             |

编码规范拓展 : 每一表都必须存在以下五个字段

| 字段名     | 租用     |
| ---------- | -------- |
| id         | 主键     |
| version    | 乐观锁   |
| is_delete  | 伪删除   |
| gmt_create | 创建时间 |
| gmt_update | 修改时间 |

# 18排序和分页

| 关键字   | 说明                                              |
| -------- | ------------------------------------------------- |
| ORDER BY | 排序                                              |
| ASC      | 顺序排序(默认,可省略)                             |
| DESC     | 倒序排序                                          |
| LIMIT    | 分页:.LIMIT 0,3 表示从下标为0的数据开始,取3个数据 |

```
SELECT `name`
FROM `student`
ORDER BY name DESC
LIMIT 0,3;
```

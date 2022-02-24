# 24Select小结

```
SELECT DISTINCT `table`.`field` AS `fieldNickname`
FROM `table` AS `tableNickname`
         JOIN `table`
WHERE `table`.`field` IS NOT NULL
GROUP BY `table`.`field`
HAVING `table`.`field`
LIMIT 0,10;
```

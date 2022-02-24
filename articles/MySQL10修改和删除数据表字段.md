# 10修改和删除数据表字段

```
-- 修改表名
ALTER TABLE `student` RENAME `teacher`;
-- 添加字段
ALTER TABLE `teacher` ADD `age` INT ( 3 );
-- 删除字段
ALTER TABLE `teacher` DROP `age`;
-- 修改字段参数
ALTER TABLE `teacher` MODIFY `name` VARCHAR ( 10 );
-- 修改字段名和数据类型
ALTER TABLE teacher CHANGE `sex` `gender` VARCHAR ( 10 );
```

  * RENAME : 修改表名
  * ADD : 添加字段
  * DROP : 删除字段
  * MODIFY : 操作字段约束
  * CHANGE : 更改字段名和数据类型

* 所有创建和删除操作尽量增加判断,避免报错

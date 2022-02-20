# 11外键

* 作用 : 保持数据一致性，完整性，主要目的是控制存储在外键表中的数据。使两张表形成关联，外键只能引用外表中列的值
* MySQL中的外键由于作用小,性能低等问题,一般不使用
* 方式一

```
CREATE TABLE gender
(
    `genderId`   int(1),
    `genderName` varchar(1),
    PRIMARY KEY (`genderId`)
);
CREATE TABLE `student`
(
    id       int(3) AUTO_INCREMENT,
    name     varchar(3),
    genderId int(1),
    PRIMARY KEY (`id`),
    KEY `FK_genderId` (`genderId`),
    CONSTRAINT `FK_genderId` FOREIGN KEY (`genderId`) REFERENCES `gender` (`genderId`)
)
```

* 方式二

```
USE school;
CREATE TABLE gender
(
    `genderId`   int(1),
    `genderName` varchar(1),
    PRIMARY KEY (`genderId`)
);
CREATE TABLE `student`
(
    id       int(3) AUTO_INCREMENT,
    name     varchar(3),
    genderId int(1),
    PRIMARY KEY (`id`)
);
ALTER TABLE `student`
    ADD CONSTRAINT `fk_genderId` FOREIGN KEY (`genderId`) REFERENCES `gender` (`genderId`);
```

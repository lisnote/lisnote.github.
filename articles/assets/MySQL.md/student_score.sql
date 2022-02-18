DROP DATABASE IF EXISTS student_score;

CREATE DATABASE student_score CHARACTER SET gbk;

USE student_score;

CREATE TABLE student
(
    studentId   char(6),
    name        char(8)    NOT NULL,
    major       char(8),
    sex         tinyint(1) NOT NULL,
    birthday    date       NOT NULL,
    totalCredit tinyint,
    faceId      blob,
    mark        text,
    PRIMARY KEY (studentid)
);

CREATE TABLE course
(
    majorId   char(3),
    name      char(16)   NOT NULL,
    quarter   tinyint(1) NOT NULL,
    classHour tinyint(1) NOT NULL,
    credit    tinyint(1),
    PRIMARY KEY (majorid)
);

CREATE TABLE student_course
(
    studentId char(6),
    majorId   char(3),
    score     tinyint(1),
    credit    tinyint(1),
    PRIMARY KEY (studentid, majorid)
);

INSERT INTO student
VALUES ('081101', '王林', '计算机', 1, '1990-02-10', 50, NULL, NULL),
       ('081102', '程明', '计算机', 1, '1989-10-06', 50, NULL, NULL),
       ('081103', '王燕', '计算机', 0, '1989-10-06', 50, NULL, NULL),
       ('081104', '韦严严', '计算机', 1, '1990-08-26', 50, NULL, NULL),
       ('081106', '李方方', '计算机', 1, '1990-11-20', 50, NULL, NULL),
       ('081107', '李明', '计算机', 1, '1990-05-01', 54, NULL, '提前修完《数据结构》，成绩游戏'),
       ('081108', '林一帆', '计算机', 1, '1989-08-05', 52, NULL, '已提前修完一门课'),
       ('081109', '张强民', '计算机', 1, '1989-08-11', 50, NULL, NULL),
       ('081110', '张蔚', '计算机', 0, '1991-07-22', 50, NULL, '三好生'),
       ('081111', '赵琳', '计算机', 0, '1990-03-18', 50, NULL, NULL),
       ('081113', '严红', '计算机', 0, '1989-08-11', 48, NULL, '有一门功课不及格，待补考'),
       ('081201', '王敏', '通信工程', 1, '1989-06-10', 42, NULL, NULL),
       ('081202', '王林', '通信工程', 1, '1989-01-29', 40, NULL, '有一门功课不及格，待补考');

INSERT INTO course
VALUES ('101', '计算机基础', 1, 80, 5),
       ('102', '程序设计与语言', 2, 68, 4),
       ('206', '离散数学', 4, 68, 4),
       ('208', '数据结构', 5, 68, 4),
       ('209', '操作系统', 6, 68, 4),
       ('210', '计算机原理', 5, 85, 5),
       ('212', '数据库原理', 7, 68, 4),
       ('301', '计算机网络', 7, 51, 3),
       ('302', '软件工程', 7, 51, 3);

INSERT INTO student_course
VALUES ('081101', '101', 80, 5),
       ('081101', '102', 78, 4)
        ,
       ('081101', '206', 76, 4)
        ,
       ('081102', '102', 78, 4)
        ,
       ('081102', '206', 78, 4)
        ,
       ('081103', '101', 62, 5)
        ,
       ('081103', '102', 70, 4)
        ,
       ('081103', '206', 81, 4);
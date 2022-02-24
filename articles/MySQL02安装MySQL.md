# 02安装MySQL

## install安装方法

* Install版本
* 密码:复杂密码

## 压缩包安装方法

* MySQL : 关系型数据库管理系统,适用于中小型数据库(大型网站可以配合集群使用)

* 稳定版本 : 5.7   8.0

* 不推荐exe,推荐压缩包版本

* 安装流程

  1. 下载MySQL Server压缩包

  2. 解压到任意目录

  3. 设定解压缩内的bin目录进path环境变量

  4. 在与bin同级目录新建文件my.ini

     ```
     [mysqld]
     basedir=D:\AWork\mysql\
     datadir=D:\AWork\mysql\data\
     port=3306
     ```
     
  5. 安装服务(管理员cmd)
  
     ```
     mysqld -install
     //提示:Service successfully installed.
     ```
  
  6. 初始化数据文件
  
     ```
     //初始化数据文件
     mysqld --initialize-insecure --user=mysql
     ```
  
  7. 启动mysql
  
     ```
     net start mysql
     //关闭为:
     //net stop mysql
     ```
  
  8. 连接mysql
  
     ```
     mysql -u root
     //初始无密码,直接进入
     ```
  
  9. 更改密码
  
     ```
     update mysql.user set authentication_string=password('PublicSecret') where user='root' and Host = 'localhost';
     //8.0修改密码:
     //alter user 'root'@'localhost' identified with mysql_native_password by '私有密码';
     
     //更新权限
     flush privileges;
     ```

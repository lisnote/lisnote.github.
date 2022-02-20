# 30数据库用户管理

```
-- 创建用户
CREATE USER 'lisnote' IDENTIFIED BY 'password';

-- 修改密码
SET PASSWORD FOR 'lisnote' = 'newPassword';

-- 重命名
RENAME USER 'lisnote' TO 'FStudent';

-- 授予全部权限(无授权权限)
GRANT ALL PRIVILEGES ON *.* TO 'FStudent';

-- 查看权限
SHOW GRANTS FOR 'FStudent';
SHOW GRANTS FOR root@localhost;

-- 撤销权限
REVOKE ALL PRIVILEGES ON *.* FROM 'FStudent';

-- 删除用户
DROP USER 'FStudent';
```

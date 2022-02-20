# 36JDBC中对象解释

* URL和用户信息
  * mysqlURL : 
  
    协议://主机地址:端口号/数据库名?参数1&参数2&参数3

    String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=TRUE&characterEncoding=utf8&useSSL=TRUE";

* Connection : 
  
  数据库对象,拥有数据库级别的各种方法

  ```
  Connection connection = DriverManager.getConnection(url, username, password);
  connection.setAutoCommit(false);
  connection.commit();
  connection.rollback();
  ```

* Statement :
  
  执行SQL的对象,可以执行SQL语句
  ```
  Statement statement = connection.createStatement();
  // 可以执行任何SQL语句
  statement.execute();
  //可以执行查询语句
  statement.executeQuery();
  //可以执行所有的更新语句(更新,删除,插入都算更新)
  statement.executeUpdate();
  ```

* ResultSet :
  
  结果集对象,封装所有的查询结果

  ```
  String sql = "select * from `test`";
  ResultSet resultSet = statement.executeQuery(sql);
  while (resultSet.next()) {
      System.out.println("id : " + resultSet.getObject("id"));
      System.out.println("name : " + resultSet.getObject("name"));
  }
  ```

* 释放资源(关闭连接)
  ```
  resultSet.close();
  statement.close();
  connection.close();
  ```

# 35第一个JDBC程序

```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) throws Exception {
        //1.加载驱动
        //驱动程序通过SPI自动注册，手动加载驱动程序类通常是不必要的

        //2.用户信息和url
        String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=TRUE&characterEncoding=utf8&useSSL=TRUE";
        String username = "root";
        String password = "PassWord";

        //3.获取数据库对象 Connection
        Connection connection = DriverManager.getConnection(url, username, password);

        //4.获取执行sql的对象 Statement
        Statement statement = connection.createStatement();

        //5.执行sql,可能存在结果,查看返回结果
        String sql = "select * from `test`";
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()) {
            System.out.println("id : " + resultSet.getObject("id"));
            System.out.println("name : " + resultSet.getObject("name"));
        }

        //6.关闭连接
        resultSet.close();
        statement.close();
        connection.close();
    }
}
```

# 39PreparedStatement对象

* 使用PreparedStatement的好处:
  1. 可以避免SQL注入
  2. 效率更高

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class Main {
    private static String url = null;
    private static String username = null;
    private static String password = null;

    static {
        try (InputStream inputStream = new FileInputStream("src/main/resources/sql.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        //PreparedStatement使用?作为占位符
        String sql;
        //更新
        sql = "INSERT `test` values(?,?)";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, 0);
            statement.setString(2, "PreparedTest");
            int result = statement.executeUpdate();
            if (result > 0) {
                System.out.println("插入成功");
            }
        }

        //查找
        sql = "select * from `test` where `id` < ?";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            statement.setInt(1, 5);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getObject("name"));
            }
        }
    }
}
```

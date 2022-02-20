# 37JDBC使用实践

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
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
        //更新
        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement()) {
            statement.executeUpdate("INSERT `test` VALUE (0, 'UserTest')");
        }
        //查找
        String sql = "SELECT * FROM `test`";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                System.out.println("id : " + resultSet.getObject("id"));
                System.out.println("name : " + resultSet.getObject("name"));
            }
        }
    }
}
```

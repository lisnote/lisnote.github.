# 41JDBC操作事务

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
        String sql = "UPDATE test SET money = money + ? where id = ?";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(sql)
        ) {
            connection.setAutoCommit(false);
            statement.setInt(1, 100);
            statement.setInt(2, 1);
            statement.executeUpdate();
            statement.setInt(1, -100);
            statement.setInt(2, 2);
            statement.executeUpdate();
            connection.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

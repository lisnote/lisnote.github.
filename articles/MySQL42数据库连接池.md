# 42数据库连接池

* 频繁的获取和释放数据库连接十分消耗系统资源,因此准备一个数据库连接池,当有需要的时候,可以直接使用连接池中的连接,有效减小系统资源的消耗

* 目前最广泛被使用的连接池是HikariCP,此处以HikariCP为例,使用数据库连接池

* pom.xml
```
<!--HikariCP-->
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>2.7.1</version>
</dependency>
```

```
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;

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
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/jdbc");
        hikariConfig.setUsername("root");
        hikariConfig.setPassword("PrivateSecret");
        hikariConfig.addDataSourceProperty("connectionTimeout", "1000"); // 连接超时：1秒
        hikariConfig.addDataSourceProperty("idleTimeout", "60000"); // 空闲超时：60秒
        hikariConfig.addDataSourceProperty("maximumPoolSize", "10"); // 最大连接数：10
        DataSource dataSource = new HikariDataSource(hikariConfig);
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("SELECT * FROM `test`")) {
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getObject("name"));
            }
        }
    }
}
```





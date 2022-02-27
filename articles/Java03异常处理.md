# 03异常处理

## java的异常

* `Error`一般表示程序无法处理的异常,`Exception`一般表示可以被捕获并处理的异常
* `Checked Exception`必须捕获的异常:`Exception`及其子类,但不包括`RuntimeException`及其子类
* 不需要捕获的异常:`Error`及其子类,`RuntimeException`及其子类
* 抛出异常使用`throw`和`throws`,捕获异常使用`try ... catch{}`
* 当某个方法`throws`异常时,异常就会被要求抛到上层调用方法,直到遇到`try...catch`


```java
import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        try {
            byte[] bs = toGBK("中文");
            System.out.println(Arrays.toString(bs));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    static byte[] toGBK(String s) throws UnsupportedEncodingException {
        return s.getBytes("UTF-8");
    }
}
```

## 捕获异常

* 多`catch`捕获异常只有一个`catch`生效
* 无论异常是否发生,`finally`都会执行
* 可以没有`catch`只有`finally`
* 不同异常处理代码方式相同时可以使用`|`合并异常处理

```java
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            process1();
            process2();
            process3();
        } catch (IOException | NumberFormatException e) { // IOException或NumberFormatException
            System.out.println("Bad input");
        } catch (Exception e) {
            System.out.println("Unknown error");
        } finally {
            System.out.println("Finally!");
        }
    }

    private static void process3() throws IOException {
    }

    private static void process2() throws NumberFormatException {
    }

    private static void process1() throws Exception {
    }
}
```

## 抛出异常

* 抛出异常:创建`Exception`的实例,使用`throw`语句抛出

```java
public class Main {
    public static void main(String[] args) {
        try {
            process1();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void process1() {
        try {
            process2();
        } catch (NullPointerException e) {
            //catch后throw不同类型的异常时,传入原始异常，确保异常可追踪
            throw new IllegalArgumentException(e);
        }
    }

    //抛出异常
    static void process2() {
        throw new NullPointerException();
    }
}
```

* 异常只能抛出一次,当`catch`到一个异常后,在后面连续的`catch`将不会被执行
* 要抛出多个异常,使用`Exception`类型变量保存原始异常,在`finally`抛出

```java
public class Main {
    public static void main(String[] args) throws Exception {
        Exception exception = null;
        try {
            throw new IllegalArgumentException();
        } catch (IllegalArgumentException e) {
            exception = e;
        } finally {
            Exception e = new Exception();
            if (exception == null) {
                exception = e;
            } else {
                exception.addSuppressed(e);
            }
            throw exception;
        }
    }
}
```

## 自定义异常

* 当需要抛出异常时,尽量使用`java`中已有的异常类型

```ascii
Exception
│
├─ RuntimeException
│  │
│  ├─ NullPointerException
│  │
│  ├─ IndexOutOfBoundsException
│  │
│  ├─ SecurityException
│  │
│  └─ IllegalArgumentException
│     │
│     └─ NumberFormatException
│
├─ IOException
│  │
│  ├─ UnsupportedCharsetException
│  │
│  ├─ FileNotFoundException
│  │
│  └─ SocketException
│
├─ ParseException
│
├─ GeneralSecurityException
│
├─ SQLException
│
└─ TimeoutException
```

* 在大型项目中可以自定义新的异常类型,一般自定义一个继承自`RuntimeException`的`BaseException`作为"根异常",其它异常类型从`BaseException`继承
* 自定义异常建议提供多种构造方法

## NullPointerException

* `NullPointerException`即空指针错误,严禁使用`catch`隐藏这种编码错误
* 编写业务时用空字符串`""`或空数组`{}`比`null`更安全
* 如果一定要根据`null`判断,可以考虑返回`Optional<T>`

```java
import java.util.Optional;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println(notNull(null));
    }

    private static Optional<String> notNull(String s) {
        return s == null ? Optional.empty() : Optional.of("Not Null");
    }
}
```

## 使用断言

* 再源码中使用`assert`语句,当结果不符合`assert`的判断时会抛出异常
* 使用断言时需要传递参数`-enableassertions`或`-ea`给虚拟机,否则断言会被忽略

```cmd
java -ea Main.java
```

```java
public class Main {
    public static void main(String[] args) throws Exception {
        int x = 1;
        assert x == 1;
        //在判断后可添加断言消息
        assert x != 1 : "x must == 0";
        System.out.println("x = 0");
    }
}
```

## 使用JDK Logging

* `JDK Logging`为日志工具,可以
  * 定义输出样式
  * 控制输出级别
  * 重定向到文件
  * ...(许多功能)

* `JDK Logging`分为七个等级,默认`info`以下不打印
  1. severe
  2. warning
  3. info
  4. config
  5. fine
  6. finer
  7. finest

```java
import java.util.logging.Logger;

public class Main {
    public static void main(String[] args) {
        Logger log = Logger.getGlobal();

        //默认info以下不打印
        log.fine("In working order.");
        log.info("Star process.");
        log.severe("Catch Exception");
        Exception e = new NullPointerException();
        e.printStackTrace();
    }
}
```

## 使用Commons Logging

* `Commons Logging`是由`Apache`软件基金会创建的第三方日志库,可挂接指定的日志系统
* `Commons Logging`会自动搜索`Log4j`(另一个流行日志系统),没有找到`Log4j`时再使用`JDK Logging`
* 使用`Commons Logging`前需要在[Apache](https://www.Apache.org)下载`commons-logging`,并在启动时传入`-cp`参数
* `Commons Logging`定义了六个日志级别,默认`info`以下不打印
  1. fatal
  2. error
  3. warning
  4. info
  5. debug
  6. trace

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Main {
    public static void main(String[] args) {
        Player player = new Player();
        player.logOut();
    }

}

class User {
//    Log log = LogFactory.getLog(User.class);
//    传入参数使用getClass方法,子类可继承
//    有异议,传入User.class时,player.logOut()仍可正常打印日志
    Log log = LogFactory.getLog(getClass());

    void logOut() {
        log.trace("In working order.");
        log.info("Start process.");
        log.fatal("Catch Exception", new Exception());
    }
}

class Player extends User {
}
```

## 使用Log4j

* `Log4j`是日志框架,支持将日志同时输出到不同的目的地
  * console:输出到屏幕
  * file:输出到文件
  * socket:输出到远程计算机
  * jdbc:输出到数据库
* 使用`Log4j`前需要使用
  * log4j-api-2.x.jar
  * log4j-core-2.x.jar
  * log4j-jcl-2.x.jar

* 使用`Log4j`时需要配置文件,以`XML配置`为例,创建一个`log4j2.xml`文件,放在`classpath`下,`Log4j`就会自动读取配置文件并输出日志

  ```xml
  <!-- log4j2.xml文件案例 -->
  <?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
  	<Properties>
          <!-- 定义日志格式 -->
  		<Property name="log.pattern">%d{MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}%n%msg%n%n</Property>
          <!-- 定义文件名变量 -->
  		<Property name="file.err.filename">log/err.log</Property>
  		<Property name="file.err.pattern">log/err.%i.log.gz</Property>
  	</Properties>
      <!-- 定义Appender，即目的地 -->
  	<Appenders>
          <!-- 定义输出到屏幕 -->
  		<Console name="console" target="SYSTEM_OUT">
              <!-- 日志格式引用上面定义的log.pattern -->
  			<PatternLayout pattern="${log.pattern}" />
  		</Console>
          <!-- 定义输出到文件,文件名引用上面定义的file.err.filename -->
  		<RollingFile name="err" bufferedIO="true" fileName="${file.err.filename}" filePattern="${file.err.pattern}">
  			<PatternLayout pattern="${log.pattern}" />
  			<Policies>
                  <!-- 根据文件大小自动切割日志 -->
  				<SizeBasedTriggeringPolicy size="1 MB" />
  			</Policies>
              <!-- 保留最近10份 -->
  			<DefaultRolloverStrategy max="10" />
  		</RollingFile>
  	</Appenders>
  	<Loggers>
  		<Root level="info">
              <!-- 对info级别的日志，输出到console -->
  			<AppenderRef ref="console" level="info" />
              <!-- 对error级别的日志，输出到err，即上面定义的RollingFile -->
  			<AppenderRef ref="err" level="error" />
  		</Root>
  	</Loggers>
  </Configuration>
  ```

##  使用SLF4J和Logback

* `SLF4J`和`Logback`类似`Commons Logging`和`Log4j`,`SLF4J`负责日志`API`,`Logback`负责日志的底层实现

* `SLF4J`与`Commons Logging`相比支持占位符替换

* `SLF4J`的日志等级分为5个等级

  1. trace
  2. debug
  3. info
  4. warn
  5. error

* 需要一个`logback.xml`配置文件放在`classpath`

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <configuration>
  
  	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
  		<encoder>
  			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
  		</encoder>
  	</appender>
  
  	<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
  		<encoder>
  			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
  			<charset>utf-8</charset>
  		</encoder>
  		<file>log/output.log</file>
  		<rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
  			<fileNamePattern>log/output.log.%i</fileNamePattern>
  		</rollingPolicy>
  		<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
  			<MaxFileSize>1MB</MaxFileSize>
  		</triggeringPolicy>
  	</appender>
  
  	<root level="INFO">
  		<appender-ref ref="CONSOLE" />
  		<appender-ref ref="FILE" />
  	</root>
  </configuration>
  ```

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {
    public static void main(String[] args) {
        Logger log = LoggerFactory.getLogger(Main.class);
        String user = "lisnote";
        log.trace("Start process.");
        log.info("user login {}", user);
        log.error("Catch Exception", new Exception());
    }
}
```

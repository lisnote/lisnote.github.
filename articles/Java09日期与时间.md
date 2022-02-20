# 09日期与时间

## 基本概念

* 本地时间

  用于确定本地区时间

* 时区

  用于确定指定地区的时间

  以`GMT`或者`UTC`加时区偏移表示，例如：`GMT+08:00`或者`UTC+08:00`表示东八区

* 夏令时

  计算夏令时请使用标准库提供的相关类，不要试图自己计算夏令时。

* 本地化

  在计算机中，通常使用`Locale`表示一个国家或地区的日期、时间、数字、货币等格式。

  `Locale`由`语言_国家`的字母缩写构成，例如，`zh_CN`表示中文+中国，`en_US`表示英文+美国。语言使用小写，国家使用大写

## Date和Calendar

* `Epoch Time`是计算从1970年1月1日零点（格林威治时区／GMT+00:00）到现在所经历的秒数,又称为时间戳

* 在不同的编程语言中，会有几种存储方式：

  - 以秒为单位的整数：1574208900，缺点是精度只能到秒；
  - 以毫秒为单位的整数：1574208900123，最后3位表示毫秒数；
  - 以秒为单位的浮点数：1574208900.123，小数点后面表示零点几秒。

  在Java程序中，时间戳通常是用`long`表示的毫秒数

* Date

  `java.util.Date`是用于表示一个日期和时间的对象，注意与`java.sql.Date`区分

  ```
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          // 获取当前时间:
          Date date = new Date();
          System.out.println(date.getYear() + 1900); // 必须加上1900
          System.out.println(date.getMonth() + 1); // 0~11，必须加上1
          System.out.println(date.getDate()); // 1~31，不能加1
          // 转换为String:
          System.out.println(date.toString());
          // 转换为GMT时区:
          System.out.println(date.toGMTString());
          // 转换为本地时区:
          System.out.println(date.toLocaleString());
      }
  }
  ```

* 自定义的格式输出
  yyyy：年

  MM：月

  dd: 日

  HH: 小时

  mm: 分钟

  ss: 秒

  ```
  import java.text.*;
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          // 获取当前时间:
          Date date = new Date();
          var sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
          System.out.println(sdf.format(date));
      }
  }
  ```

  Java的格式化预定义了许多不同的格式。可以从[JDK文档](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/text/SimpleDateFormat.html)查看详细的格式说明,一般来说，字母越长，输出越长。以`M`为例

  - `M`：输出`9`
  - `MM`：输出`09`
  - `MMM`：输出`Sep`
  - `MMMM`：输出`September`

* Calendar

  用于获取并设置年、月、日、时、分、秒，它和`Date`比，主要多了一个可以做简单的日期和时间运算的功能

  ```
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          // 获取当前时间:
          Calendar c = Calendar.getInstance();
          int y = c.get(Calendar.YEAR);
          int m = 1 + c.get(Calendar.MONTH);
          int d = c.get(Calendar.DAY_OF_MONTH);
          int w = c.get(Calendar.DAY_OF_WEEK);
          int hh = c.get(Calendar.HOUR_OF_DAY);
          int mm = c.get(Calendar.MINUTE);
          int ss = c.get(Calendar.SECOND);
          int ms = c.get(Calendar.MILLISECOND);
          System.out.println(y + "-" + m + "-" + d + " " + w + " " + hh + ":" + mm + ":" + ss + "." + ms);
      }
  }
  ```

  设定特定时间,并利用`Calendar.getTime()`将`Calendar`对象转换成`Date`对象

  ```
  import java.text.*;
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          // 当前时间:
          Calendar c = Calendar.getInstance();
          // 清除所有:
          c.clear();
          // 设置2019年:
          c.set(Calendar.YEAR, 2019);
          // 设置9月:注意8表示9月:
          c.set(Calendar.MONTH, 8);
          // 设置2日:
          c.set(Calendar.DATE, 2);
          // 设置时间:
          c.set(Calendar.HOUR_OF_DAY, 21);
          c.set(Calendar.MINUTE, 22);
          c.set(Calendar.SECOND, 23);
          System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(c.getTime()));
          // 2019-09-02 21:22:23
      }
  }
  ```

* TimeZone

  `Calendar`和`Date`相比，它提供了时区转换的功能。时区用`TimeZone`对象表示

  ```java
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          TimeZone tzDefault = TimeZone.getDefault(); // 当前时区
          TimeZone tzGMT9 = TimeZone.getTimeZone("GMT+09:00"); // GMT+9:00时区
          TimeZone tzNY = TimeZone.getTimeZone("America/New_York"); // 纽约时区
          System.out.println(tzDefault.getID()); // Asia/Shanghai
          System.out.println(tzGMT9.getID()); // GMT+09:00
          System.out.println(tzNY.getID().getClass()); // America/New_York
      }
  }
  ```

  要列出系统支持的所有ID，请使用`TimeZone.getAvailableIDs()`

* 利用`Calendar`进行时区转换的步骤是：

  1. 清除所有字段；
  2. 设定指定时区；
  3. 设定日期和时间；
  4. 创建`SimpleDateFormat`并设定目标时区；
  5. 格式化获取的`Date`对象（注意`Date`对象无时区信息，时区信息存储在`SimpleDateFormat`中）。

## LocalDateTime

* 从Java 8开始，`java.time`包提供了新的日期和时间API，主要涉及的类型有：
  - 本地日期和时间：`LocalDateTime`，`LocalDate`，`LocalTime`；
  - 带时区的日期和时间：`ZonedDateTime`；
  - 时刻：`Instant`；
  - 时区：`ZoneId`，`ZoneOffset`；
  - 时间间隔：`Duration`
  - 用于取代`SimpleDateFormat`的格式化类型`DateTimeFormatter`。
  
* LocalDateTime

  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          LocalDate d = LocalDate.now(); // 当前日期
          LocalTime t = LocalTime.now(); // 当前时间
          LocalDateTime dt = LocalDateTime.now(); // 当前日期和时间
          System.out.println(d); // 严格按照ISO 8601格式打印
          System.out.println(t); // 严格按照ISO 8601格式打印
          System.out.println(dt); // 严格按照ISO 8601格式打印
      }
  }
  ```
  
  由于执行一行代码总会消耗一点时间，因此，3个类型的日期和时间很可能对不上,可以改写如下
  
  ```
  LocalDateTime dt = LocalDateTime.now(); // 当前日期和时间
  LocalDate d = dt.toLocalDate(); // 转换到当前日期
  LocalTime t = dt.toLocalTime(); // 转换到当前时间
  ```
  
  指定时间日期
  
  ```
  LocalDateTime dt = LocalDateTime.parse("2019-11-19T15:16:17");
  LocalDate d = LocalDate.parse("2019-11-19");
  LocalTime t = LocalTime.parse("15:16:17");
  ```

* DateTimeFormatter

  自定义格式输出和输入(解析)

  ```
  import java.time.*;
  import java.time.format.*;
  public class Main {
      public static void main(String[] args) {
          // 自定义格式化:
          DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
          System.out.println(dtf.format(LocalDateTime.now()));
  
          // 用自定义格式解析:
          LocalDateTime dt2 = LocalDateTime.parse("2019/11/30 15:16:17", dtf);
          System.out.println(dt2);
      }
  }
  ```

* `LocalDateTime`提供了对日期和时间进行加减的非常简单的链式调用

  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          LocalDateTime dt = LocalDateTime.of(2019, 10, 26, 20, 30, 59);
          System.out.println(dt);
          // 加5天减3小时:
          LocalDateTime dt2 = dt.plusDays(5).minusHours(3);
          System.out.println(dt2); // 2019-10-31T17:30:59
          // 减1月:
          LocalDateTime dt3 = dt2.minusMonths(1);
          System.out.println(dt3); // 2019-09-30T17:30:59
      }
  }
  ```

  月份加减会自动调整日期，例如从`2019-10-31`减去1个月得到的结果是`2019-09-30`，因为9月没有31日

  对日期和时间进行调整则使用`withXxx()`方法，例如：`withHour(15)`会把`10:11:12`变为`15:11:12`：

  - 调整年：withYear()
  - 调整月：withMonth()
  - 调整日：withDayOfMonth()
  - 调整时：withHour()
  - 调整分：withMinute()
  - 调整秒：withSecond()

  `LocalDateTime`还有一个通用的`with()`方法允许我们做更复杂的运算

  ```
  import java.time.*;
  import java.time.temporal.*;
  public class Main {
      public static void main(String[] args) {
          // 本月第一天0:00时刻:
          LocalDateTime firstDay = LocalDate.now().withDayOfMonth(1).atStartOfDay();
          System.out.println(firstDay);
  
          // 本月最后1天:
          LocalDate lastDay = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
          System.out.println(lastDay);
  
          // 下月第1天:
          LocalDate nextMonthFirstDay = LocalDate.now().with(TemporalAdjusters.firstDayOfNextMonth());
          System.out.println(nextMonthFirstDay);
  
          // 本月第1个周一:
          LocalDate firstWeekday = LocalDate.now().with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
          System.out.println(firstWeekday);
      }
  }
  ```

* 判断两个`LocalDateTime`的先后，可以使用`isBefore()`、`isAfter()`方法，对于`LocalDate`和`LocalTime`类似
  
  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          LocalDateTime now = LocalDateTime.now();
          LocalDateTime target = LocalDateTime.of(2019, 11, 19, 8, 15, 0);
          System.out.println(now.isBefore(target));
          System.out.println(LocalDate.now().isBefore(LocalDate.of(2019, 11, 19)));
          System.out.println(LocalTime.now().isAfter(LocalTime.parse("08:15:00")));
      }
  }
  ```
  
* `Duration`表示两个时刻之间的时间间隔。另一个类似的`Period`表示两个日期之间的天数
  
  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          LocalDateTime start = LocalDateTime.of(2019, 11, 19, 8, 15, 0);
          LocalDateTime end = LocalDateTime.of(2020, 1, 9, 19, 25, 30);
          Duration d = Duration.between(start, end);
          System.out.println(d); // PT1235H10M30S
  
          Period p = LocalDate.of(2019, 11, 19).until(LocalDate.of(2020, 1, 9));
          System.out.println(p); // P1M21D
      }
  }
  ```
  
  利用`ofXxx()`或者`parse()`方法也可以直接创建`Duration`：
  
  ```
  Duration d1 = Duration.ofHours(10); // 10 hours
  Duration d2 = Duration.parse("P1DT2H3M"); // 1 day, 2 hours, 3 minutes
  ```
  
  

## ZonedDateTime

* 创建一个`ZonedDateTime`对象，有以下几种方法

  一种是通过`now()`方法返回当前时间 
  
  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          ZonedDateTime zbj = ZonedDateTime.now(); // 默认时区
          ZonedDateTime zny = ZonedDateTime.now(ZoneId.of("America/New_York")); // 用指定时区获取当前时间
          System.out.println(zbj);
          System.out.println(zny);
      }
  }
  ```
  
  另一种方式是通过给一个`LocalDateTime`附加一个`ZoneId`
  
  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          LocalDateTime ldt = LocalDateTime.of(2019, 9, 15, 15, 16, 17);
          ZonedDateTime zbj = ldt.atZone(ZoneId.systemDefault());
          ZonedDateTime zny = ldt.atZone(ZoneId.of("America/New_York"));
          System.out.println(zbj);
          System.out.println(zny);
      }
  }
  ```
  
  打印的两个`ZonedDateTime`，发现它们时区不同，但表示的时间都是同一时刻
  
* 时区转换

  通过`ZonedDateTime`对象使用`withZoneSameInstant()`方法转换时区,日期和时间也会相应调整

  ```
  import java.time.*;
  public class Main {
      public static void main(String[] args) {
          // 以中国时区获取当前时间:
          ZonedDateTime zbj = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
          // 转换为纽约时间:
          ZonedDateTime zny = zbj.withZoneSameInstant(ZoneId.of("America/New_York"));
          System.out.println(zbj);
          System.out.println(zny);
      }
  }
  ```

  由于夏令时的存在，不同的日期转换的结果很可能是不同的

* `ZonedDateTime`仍然提供了`plusDays()`等加减操作

## DateTimeFormatter

* 使用旧的`Date`对象时,我们使用`SimpleDateFormat`进行格式化显示

  使用新的`LocalDateTime`或`ZonedLocalDateTime`时，我们要进行格式化显示，就要使用`DateTimeFormatter`

* 创建`DateTimeFormatter`对象

  ```
  DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
  ```

  指定地区创建`DateTimeFormatter`对象

  ```
  DateTimeFormatter formatter = DateTimeFormatter.ofPattern("E, yyyy-MMMM-dd HH:mm", Locale.US);
  ```
  
* 实际案例

  ```
  import java.time.*;
  import java.time.format.*;
  import java.util.Locale;
  public class Main {
      public static void main(String[] args) {
          ZonedDateTime zdt = ZonedDateTime.now();
          var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm ZZZZ");
          System.out.println(formatter.format(zdt));
  
          var zhFormatter = DateTimeFormatter.ofPattern("yyyy MMM dd EE HH:mm", Locale.CHINA);
          System.out.println(zhFormatter.format(zdt));
  
          var usFormatter = DateTimeFormatter.ofPattern("E, MMMM/dd/yyyy HH:mm", Locale.US);
          System.out.println(usFormatter.format(zdt));
      }
  }
  ```

* 当我们直接调用`System.out.println()`对一个`ZonedDateTime`或者`LocalDateTime`实例进行打印的时候，实际上，调用的是它们的`toString()`方法，默认的`toString()`方法显示的字符串就是按照`ISO 8601`格式显示的，我们可以通过`DateTimeFormatter`预定义的几个静态变量来引用：

  ```
  var ldt = LocalDateTime.now();
  System.out.println(DateTimeFormatter.ISO_DATE.format(ldt));
  System.out.println(DateTimeFormatter.ISO_DATE_TIME.format(ldt));
  ```

## Instant

* java中的时间戳以`Instant`表示

* `Instant`就是时间戳，那么，给它附加上一个时区，就可以创建出`ZonedDateTime`

  ```
  // 以指定时间戳创建Instant:
  Instant ins = Instant.ofEpochSecond(1568568760);
  ZonedDateTime zdt = ins.atZone(ZoneId.systemDefault());
  System.out.println(zdt); // 2019-09-16T01:32:40+08:00[Asia/Shanghai]
  ```

* `LocalDateTime`，`ZoneId`，`Instant`，`ZonedDateTime`和`long`都可以互相转换

## 最佳实践

* 旧API转新API

  通过`toInstant()`方法转换为`Instant`对象，再继续转换为`ZonedDateTime`

  ```
  // Date -> Instant:
  Instant ins1 = new Date().toInstant();
  
  // Calendar -> Instant -> ZonedDateTime:
  Calendar calendar = Calendar.getInstance();
  Instant ins2 = calendar.toInstant();
  ZonedDateTime zdt = ins2.atZone(calendar.getTimeZone().toZoneId());
  ```

* 新API转旧API

  借助`long`型时间戳进行转换

  ```
  // ZonedDateTime -> long:
  ZonedDateTime zdt = ZonedDateTime.now();
  long ts = zdt.toEpochSecond() * 1000;
  
  // long -> Date:
  Date date = new Date(ts);
  
  // long -> Calendar:
  Calendar calendar = Calendar.getInstance();
  calendar.clear();
  calendar.setTimeZone(TimeZone.getTimeZone(zdt.getZone().getId()));
  calendar.setTimeInMillis(zdt.toEpochSecond() * 1000);
  ```

* 在数据库中存储时间和日期

  在数据库中，也存在几种日期和时间类型：

  - `DATETIME`：表示日期和时间；
  - `DATE`：仅表示日期；
  - `TIME`：仅表示时间；
  - `TIMESTAMP`：和`DATETIME`类似，但是数据库会在创建或者更新记录的时候同时修改`TIMESTAMP`。

  在使用Java程序操作数据库时，我们需要把数据库类型与Java类型映射起来。下表是数据库类型与Java新旧API的映射关系：

  | 数据库    | 对应Java类（旧）   | 对应Java类（新） |
  | :-------- | :----------------- | :--------------- |
  | DATETIME  | java.util.Date     | LocalDateTime    |
  | DATE      | java.sql.Date      | LocalDate        |
  | TIME      | java.sql.Time      | LocalTime        |
  | TIMESTAMP | java.sql.Timestamp | LocalDateTime    |

  实际上，在数据库中，我们需要存储的最常用的是时刻`Instant`,因为有了时刻信息，就可以根据用户自己选择的时区，显示出正确的本地时间。所以，最好的方法是直接用长整数`long`表示，在数据库中存储为`BIGINT`类型

  通过存储`long`型时间戳，我们可以编写一个`timestampToString()`的方法，为不同用户显示不同的本地时间

  ```
  import java.time.*;
  import java.time.format.*;
  import java.util.Locale;
  public class Main {
      public static void main(String[] args) {
          long ts = 1574208900000L;
          System.out.println(timestampToString(ts, Locale.CHINA, "Asia/Shanghai"));
          System.out.println(timestampToString(ts, Locale.US, "America/New_York"));
      }
  
      static String timestampToString(long epochMilli, Locale lo, String zoneId) {
          Instant ins = Instant.ofEpochMilli(epochMilli);
          DateTimeFormatter f = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM, FormatStyle.SHORT);
          return f.withLocale(lo).format(ZonedDateTime.ofInstant(ins, ZoneId.of(zoneId)));
      }
  }
  ```

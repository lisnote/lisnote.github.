# 02面向对象编程

## 面向对象基础

### 方法

* 使用`private`修饰的`field(字段)`和`method(方法)`不可以被外部访问
* `this`变量始终指向当前实例
* 方法参数用于接收传递给方法的变量
* 使用可变参数`DataType...`定义,调用时可以不构造数组

```java
public class Main {
    public static void main(String[] args) {
        Player player = new Player();
        player.setName("lisnote", "FStudent");
        String[] i = player.getNames();
        for (int i1 = 0; i1 <= i.length - 1;i1++){
            System.out.println(i[i1]);
        }
    }
}

class Player {
    private String[] name;

    public void setName(String... name) {
        this.name = name;
    }

    public String[] getNames() {
        return name;
    }
}
```

### 构造方法

* 构造方法的方法名就是类名
* 构造方法没有返回值
* 调用构造方法必须用`new`操作符
* 多构造方法时,编译器会通过构造方法的参数数量,位置,类型自动区分
* 使用`this()`调用其他构造方法时,`this()`语句必须为构造器中的第一句

```java
public class Main {
    public static void main(String[] args) {
        Player player = new Player("lisnote", 21);
        System.out.println(player.getAll());
    }
}

class Player {
    private String name = "unnamed";
    private int age = 0;

    public Player(String name, int age) {
        this(name);
        setAge(age);
    }

    private Player(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAll() {
        return name + " is " + age + ".";
    }
}
```

### 方法重载

* 方法名相同,但各自参数不同
* 目的是功能类似的方法使用同一名字便于记忆
* 返回值类型通常是相同的

```java
public class Main {
    public static void main(String[] args) {
        Player player = new Player();
        player.setName("LisNote");
        player.printName();
        player.setName("Lis", "Note");
        player.printName();
    }
}

class Player {
    private String name = "unmaned";
    private String[] names;

    public void setName(String name) {
        this.name = name;
    }

    public void setName(String firstName, String lastName) {
        name = firstName + " " + lastName;
    }

    public void printName() {
        System.out.println(name);
    }
}
```

### 继承

* 没有写`extends`时编译器会自动加`extends Object`
* 子类无法访问`private`修饰的`field`和`method`,但可以放问`protected`修饰的字段和方法
* `final`修饰的类会阻止被继承,`final`修饰的字段初始化后会不可被修改,`final`修饰的方法会阻止被覆写
* 子类不会继承父类的构造方法
* 当父类没有默认的构造方法时,子类必须显式调用`super()`被给出参数定位到父类的构造方法

```java
public class Main {
    public static void main(String[] args) {
        Player player = new Player("lisnote", 10);
        player.print();
    }
}

class User {
    protected String name;

    public User(String name) {
        setName(name);
    }

    public void setName(String name) {
        this.name = name;
    }

    public void print() {
        System.out.println(name);
    }
}

final class Player extends User {
    private int score;

    public Player(String name, int score) {
        super(name);
        setScore(score);
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void print() {
        super.print();
        System.out.println(score);
    }
}
```

* 向下转型前可以使用`instanceof`判断变量指向的实例是否为所属类型

```java
public class Main {
    public static void main(String[] args) {
        Object obj = "HELLO";
        if (obj instanceof String) {
            String s = (String) obj;
            System.out.println(s.toLowerCase());
        }
    }
}
```

### 多态

* 覆写父类方法称为`override`,重载方法称为`overload`
* 加上`Override`可让编译器检查是否正确覆写,非必要但不建议省略
* 调用方法时调用的是实例的实际类型的方法
* 子类可用`super`调用被覆写的父类方法

```java
//设计一个报税软件,包含普通税收,高收入税收,免税税收
public class Main {
    public static void main(String[] args) {
        Income[] incomes = {
                new Income(5000),
                new HighIncome(10000),
                new FreeIncome(1000)
        };

        //计算总税收
        double totalTax = 0;
        for (Income i : incomes) {
            totalTax += i.getTax();
        }
        System.out.println(totalTax);
    }
}


//普通税收
class Income {
    protected double income;

    public Income(double income) {
        this.income = income;
    }

    public double getTax() {
        return income * 0.1;
    }
}

//高收入税收
class HighIncome extends Income {
    public HighIncome(double income) {
        super(income);
    }

    public double getTax() {
        return income * 0.2;
    }
}

//免税税收
class FreeIncome extends Income {
    public FreeIncome(double income) {
        super(income);
    }

    public double getTax() {
        return 0;
    }
}
```

### 抽象类

* 如果父类方法不是先任何功能,只是定义方法签名,需要使用`abstract`声明为抽象方法
* 抽象方法所在的类必须使用`abstract`声明为抽象类
* 抽象类无法被实例化
* 尽量使用高层类型,避免使用实际子类型的方式,被称为面向抽象编程

```java
public class Main {
    public static void main(String[] args) {
        Income[] incomes = {
                new CommonIncome(5000),
                new HighIncome(10000)
        };
        double totalTax = 0;
        for (Income i : incomes) {
            totalTax += i.getTax();
        }
        System.out.println(totalTax);
    }
}

//定义规范
abstract class Income {
    protected double income;

    public Income(double income) {
        this.income = income;
    }

    public abstract double getTax();
}

//实现
class CommonIncome extends Income {
    public CommonIncome(double income) {
        super(income);
    }

    public double getTax() {
        return income * 0.1;
    }
}

class HighIncome extends Income {
    public HighIncome(double income) {
        super(income);
    }

    public double getTax() {
        return income * 0.2;
    }
}
```

### 接口

* 接口`interface`只能有`static final`字段,且所有方法都为抽象方法
* 接口可以省略`public abstract`修饰符,因为接口所有方法都是`public abstract`的
* 类`class`只能单继承,但是接口`interface`可以多继承
* 实现接口使用`implement`关键字，继承接口使用`extends`
* 当需要给接口新增方法时,使用`default`方法可以不必修改全部子类

|            | abstract class       | interface                   |
| :--------- | :------------------- | --------------------------- |
| 继承       | 只能extends一个class | 可以implements多个interface |
| 字段       | 可以定义实例字段     | 不能定义实例字段            |
| 抽象方法   | 可以定义抽象方法     | 可以定义抽象方法            |
| 非抽象方法 | 可以定义非抽象方法   | 可以定义default方法         |

```java
public class Main {
    public static void main(String[] args) {
        Person lisnote = new Player("lisnote");
        lisnote.helloName();
    }
}

interface Person {
    String getName();

    default void helloName() {
        System.out.println("Hello," + getName() + ".");
    }
}

class Player implements Person {
    private String name;

    public Player(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

### 静态字段和静态方法

* 使用`static`修饰的字段和方法并不属于实例`instance`,而是属于类`class`
* 静态方法使用不需要实例,也无法访问实例字段和`this`,可以访问静态字段和静态方法(有异议)

```java
//计算Person实例个数
public class Main {
    public static void main(String[] args) {
        Person lisnote = new Person("lisnote");
        Person FStudent = new Person("FStudent");
        Person.printCount();
    }
}

class Person {
    private static int count;
    private String name = "unnamed";
    
    public Person(String name) {
        this.name = name;
        count++;
    }

    public static void printCount() {
        System.out.println(count);
    }
}
```

### 包

* 包的主要作用为解决类名冲突
* 一个类总是属于某个包,完整的类名应该是`包名.类名
* 定义`class`的时候需要再第一行使用`package`声明这个`class`属于哪个包
* 使用`import`可以导入其他包的`class`,也可以使用完整类名直接导入
* 编译器会自动`import`当前`package`的其他`class`和`java.lang.*`
* 使用`import static`可以只导入静态字段和静态方法
* 位于同一个包的类可以访问包作用域的字段和方法

**编译命令**:在src文件夹将`.java`文件编译成`.class`到上级目录的`bin`文件夹下

```cmd
javac -d ../bin ming/Person.java hong/Person.java mr/jun/Arrays.java
```

### 作用域

* 定义为`public`的`class`和`interface`可以被其他任何类访问
* 定义为`public`的`field`和`method`可以被其他类访问,但需要有访问`class`的权限
* 定义为`private`的`field`和`method`无法被该类外部访问
* 定义为`protected`的`field`和`method`可以被子类访问
* 一个`class`允许访问同一个`package`的没有被`public`/`private`的类,及其没有被`public`/`private`/`protected`修饰的字段和方法
* 一个`.java`文件只能有一个`public`类

### 内部类

* `Inner Class`指被定义在一个类内部的`class`

* `Static Nested Class`使用`static`修饰,不依附外部实例,可以访问外部类的静态`field`和`method`
* `Anonymous Class`指在方法内部通过匿名类定义的`class`

```java
public class Main {
    public static void main(String[] args) {
        Hello hello = new Hello();
        hello.doSomething();
        Hello hi = new Hello() {
            public void doSomething() {
                System.out.println(("Hi"));
            }
        };
        hi.doSomething();
    }
}

class Hello {
    public void doSomething() {
        Runnable runnable = new Runnable() {
            public void run() {
                System.out.println("Hello");
            }
        };
        new Thread(runnable).start();
    }
}
```

### classpath和jar

* `classpath`旨在告诉`JVM`应该从哪里找`class`
* 不推荐在环境变量设置`class path`推荐在启动`jvm`时添加`class path`参数

**在cmd启动时添加`class path`参数**

```cmd
java -classpath F:\0STUDY\JAVA\Study\bin com.lisnote.Main
```

```cmd
java -classpath Main.jar com.lisnote.Main
```

**将src目录下的`java`文件编译到bin目录下**

```cmd
javac -d bin src/com/lisnote/Main.java src/com/lisnote/util/Arrays.java
```

**将bin文件夹下的所有文件打包到当前文件夹并添加`main-class`参数**

```cmd
jar --create --file Main.jar --main-class com.lisnote.Main -C bin .
```

**运行带有`main-class`参数的`jar`文件**

```cmd
java -jar Main.jar
```

### 模块

* 模块`module`用于解决依赖问题
* 模块增加了一个模块描述文件`module-info.java`

```java
package com.lisnote;

import javax.xml.XMLConstants;

public class Main {
    public static void main(String[] args) {
        Greeting g = new Greeting();
        System.out.println(g.hello(XMLConstants.XML_NS_PREFIX));
    }
}
```

```java
//module-info.java
module com.lisnote.Main {
	requires java.base; // 可不写，任何模块都会自动引入java.base
	requires java.xml;
}
```

* 将含有`module-info.class`的`jar`包转换成`jmod`

```cmd
jmod create --class-path Main.jar Main.jmod
```

* 打包java运行环境`JRE`至当前路径

```cmd
jLink --module-path Main.jmod --add-modules java.base,java.xml,com.lisnote.Main --output jre/
```

**有异议**:此处省略`java.xml`编译也可通过,原因是源码`java`编译成字节码`class`之后常量`XMLConstants.XML_NS_PREFIX`被替换成了`"xml"`

* 进入`jre/bin`路径运行此`JRE`

```cmd
java --module com.lisnote.Main
```

* 外部代码只允许访问`module-info.java`文件声明该模块导出的类`class`

## java核心类

### 字符串和编码

* 字符串比较使用`equals()`方法而不能用`==`
* java编译器在编译期会自动将相同字符串放入同一常量池
* `java`的`String`和`char`在内存中总是以万国码`Unicode`编码表示

```java
import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws UnsupportedEncodingException {
        //判断是否包含字符串
        System.out.println("Hello".contains("ll"));     //true
        //获取该字符最小的索引
        System.out.println("Hello".indexOf("l"));   //2
        //获取该字符最大的索引
        System.out.println("Hello".lastIndexOf("l"));  //3
        //判断某字符是否是开始的字符
        System.out.println("Hello".startsWith("H"));    //true
        //判断某字符是否为结束的字符
        System.out.println("Hello".endsWith("o"));    //true
        //从传入的索引开始获取字符
        System.out.println("Hello".substring(2));   //llo
        //从传入的索引中间获取字符
        System.out.println("Hello".substring(2, 4));     //ll
        //去除首位空白字符(不包括全角符空格\u3000)
        System.out.println(" \t\r\n\u3000Hello".trim());    //　Hello
        //去除首位空白字符(包括全角符空格\u3000)
        System.out.println(" \t\r\n\u3000Hello".strip());   //Hello
        //判断空字符串
        System.out.println("".isEmpty());   //true
        //判断空白字符串
        System.out.println(" \t\r\n\u3000".isBlank());  //true
        //替换字符串
        System.out.println("Hello".replace("e", "a"));   //Hallo
        //使用正则表达式替换字符
        System.out.println("btn\\n!".replaceAll("[t\\\\!]", "a"));   //banana
        //分割字符串
        System.out.println(Arrays.toString("Hello".split("l")));    //{"He","","o"}
        //拼接字符串
        System.out.println(String.join("l", new String[]{"He", "", "o"}));     //Hello
        //格式化字符串
        System.out.println(String.format("Hi,%s.", "lisnote"));      //Hi,lisnote.
        //将任意基本类型或其引用类型转换为字符串
        System.out.println(new char[]{'H', 'e', 'l', 'l', 'o'});    //Hello
        //把字符串转换为boolean类型
        System.out.println(Boolean.parseBoolean("true"));   //true
        //把字符串转换为Int类型
        System.out.println(Integer.parseInt("123"));    //123
        //将字符串转换为char[]
        System.out.println(Arrays.toString("Hello".toCharArray()));     //{'H','e','l','l','o'}
        //将char[]转换为字符串
        System.out.println(new String(new char[]{'H', 'e', 'l', 'l', 'o'}));
        //获取字符编码
        System.out.println(Arrays.toString("Hello".getBytes("UTF-8")));
    }
}
```

### StringBuilder

* `StringBuilder`是可变对象,相比`String`在拼接字符串时更高效
* 链式操作需要方法返回`this`
* 对于普通的字符串`+`操作并不需要改写为`StringBuilder`,java编译器在编译期会自动优化
* `StringBuilder`对于字符拼接高效,对于`delete`和`deleteCharAt`并不高效

```java
public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder();
        sb.append("Mr ")
                .append("Bob!")
                .insert(0, "*Hello, ")
                .delete(sb.length() - 1, sb.length())
                .deleteCharAt(0);
        System.out.println(sb.toString());
    }
}
```

### StringJoiner

* `StringJoiner`仅仅是更加优雅的代码管理,处理速度并不高效

```java
import java.util.StringJoiner;

public class Main {
    public static void main(String[] args) {
        String[] names = {"lisnote", "FStudent"};

        //不指定开头结尾,建议使用String.join
        var sj = new StringJoiner(",");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj);

        //指定开头结尾
        sj = new StringJoiner(",", "Hello ", "!");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj);
    }
}
```

### 包装类型

| 基本类型 | 对应的引用类型      |
| -------- | ------------------- |
| byte     | java.lang.Byte      |
| short    | java.lang.Short     |
| int      | java.lang.Int       |
| long     | java.lang.Long      |
| float    | java.lang.Float     |
| double   | java.lang.Double    |
| boolean  | java.lang.Boolean   |
| char     | java.lang.Character |

* `Auto Boxing`:编译器可以自动在基本类型和包装类型转换

```java
public class Main {
    public static void main(String[] args) {
        //无Auto Boxing
        Integer notAutoInteger = Integer.valueOf(100);
        int notAutoInt = notAutoInteger.intValue();

        //有Auto Boxing
        Integer autoInteger = 100;   //编译器自动调用valueOf
        int autoInt = autoInteger;  //编译器自动调用intValue
    }
}
```

* 所有包装类都是不变类,创建后就不可修改(可以给变量返回新的地址)

* 能创建"新"对象的静态方法称为`静态工厂方法`,例如`Integer.valueOf()`,`静态工厂方法`尽可能的返回缓存的实例以节省内存

```java
public class Main {
    public static void main(String[] args) {
        //转换为十进制
        System.out.println(Integer.parseInt("100", 2));
        //转换为其他进制
        System.out.println(Integer.toString(100, 2));
        //最大值
        System.out.println(Integer.MAX_VALUE);
        //最小值
        System.out.println(Integer.MIN_VALUE);
        //内存占用:比特bit
        System.out.println(Integer.SIZE);
        //内存占用:字节byte
        System.out.println(Integer.BYTES);
        //所有整数型和浮点型的包装类都继承自Number
        Number num = Integer.valueOf(128);
        System.out.println(num.byteValue());
        System.out.println(num.longValue());
        System.out.println(num.floatValue());
        //转换为无符号整型
        num = -1;
        System.out.println(Byte.toUnsignedInt(num.byteValue()));
    }
}
```

### JavaBean

* `private field`通过`public method`进行读写,写方法都为`setField`,读方法除了`boolean`是`isField`以外都为`setField`的`class`被称为`JavaBean`
* `JavaBean`的`private field`可以只写,可以只读

```
import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;

public class Main {
    public static void main(String[] args) throws Exception {
        //枚举一个JavaBean的所有属性
        BeanInfo beanInfo = Introspector.getBeanInfo(JavaBean.class);
        for (PropertyDescriptor pd : beanInfo.getPropertyDescriptors()) {
            System.out.println(pd.getName());
            System.out.println("    " + pd.getReadMethod());
            System.out.println("    " + pd.getWriteMethod());
        }
    }
}

//JavaBean格式的class
class JavaBean {
    public int getGetAndSet() {
        return getAndSet;
    }

    public void setGetAndSet(int getAndSet) {
        this.getAndSet = getAndSet;
    }

    public boolean isAndSet() {
        return isAndSet;
    }

    public void setAndSet(boolean andSet) {
        isAndSet = andSet;
    }

    private int getAndSet;
    private boolean isAndSet;
}
```

### 枚举类

* 枚举类使用`enum`定义
* 枚举类无法通过`new`操作符创建实例
* 枚举类的每个枚举的常量都有对应的唯一实例

```java
public class Main {
    public static void main(String[] args) {
        Colors color = Colors.RED;
        //name()获取常量名
        System.out.println(color.name());
        //toString()获取常量名,不建议使用,因为可以Override
        System.out.println(Colors.GREEN);
        //ordinal获取索引值
        System.out.println(Colors.BLUE.ordinal());
        switch (Colors.BLUE) {
            case RED -> System.out.println("red");
            case GREEN -> System.out.println("green");
            case BLUE -> System.out.println("blue");
        }
    }
}

enum Colors {
    RED(0),
    GREEN(1),
    BLUE(2);
    public int index;

    private Colors(int index) {
        this.index = index;
    }
}
```

### 记录类

* **记录类目前仍是预览功能,因此不作学习记录**

### BigInteger

* `BigInteger`可以表示任意大小的整数
* 建议使用`compareTo()`进行比较运算

```java
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        BigInteger max = new BigInteger("999");
        BigInteger min = new BigInteger("100");
        BigInteger[] temp;
        //BigInteger继承自Number,因此实现了整数和浮点数的基本类型转换方法
        System.out.println(max.intValue());
        //当BigInteger的大小超过浮点数能表示的大小,转换时会返回Infinity
        System.out.println(max.pow(100).floatValue());
        //确保正确的整数型转换
        System.out.println(max.longValueExact());
        System.out.println(max.intValueExact());
        System.out.println(max.shortValueExact());
        System.out.println(min.byteValueExact());
        //BigInteger比较
        System.out.println(max.compareTo(min) > 0);   //max>min
        System.out.println(max.compareTo(min) >= 0);  //max>=min
        System.out.println(max.compareTo(min) < 0);   //max<min
        System.out.println(max.compareTo(min) <= 0);  //max<=min
        System.out.println(max.compareTo(min) == 0);  //max==min
        //BigInteger运算
        System.out.println(max.add(min));   //max+min
        System.out.println(max.subtract(min));  //max-min
        System.out.println(max.multiply(BigInteger.TEN));  //max*10
        System.out.println(max.divide(min));    //max/min(无小数)
        System.out.println(max.remainder(min));    //max%min
        System.out.println(min.pow(2)); //求幂
        System.out.println(new BigInteger("-100").abs());   //绝对值
        temp = max.divideAndRemainder(min);    //求商求余,返回数组
        System.out.println("商是" + temp[0] + ",余数是" + temp[1]);
        System.out.println(max.gcd(min));   //最大公约数
    }
}
```

### BigDecimal

* `BigDecimal`可以精确表示任意大小的浮点数
* `BigDecimal`本质是`BigInteger`字段和记录小数点位置的`int`类型字段`scale`
* `BigDecimal`支持`BigInteger`的大部分方法

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        BigDecimal min = new BigDecimal("100.000");
        BigDecimal max = new BigDecimal("999.999");
        BigDecimal temp;
        //获取小数位
        System.out.println(min.scale());
        //清除尾部零串,scale为负数表示小数点向右移动
        System.out.println(min.stripTrailingZeros().scale());
        //向下取整保留一位小数
        System.out.println(max.setScale(1, RoundingMode.DOWN));
        //四舍五入保留一位小数
        System.out.println(max.setScale(1, RoundingMode.HALF_UP));
        //BigDecimal的除法运算可能除不尽,因此需要设置保留小数位及进位方法
        System.out.println(min.divide(max, 10, RoundingMode.HALF_UP));
    }
}
```

**有异议:因为记录小数点位置的的`scale`是`int`类型的,所以`BigDecimal`可能只能精确表示小数点后`2147483647`位**

### 常用工具类

* `Math`类提供了大量的便于计算的静态方法

```java
public class Main {
    public static void main(String[] args) {
        //求绝对值
        System.out.println(Math.abs(-1));
        //取最大值
        System.out.println(Math.max(1, 2));
        //取最小值
        System.out.println(Math.min(1, 2));
        //计算2的3次方
        System.out.println(Math.pow(2, 3));
        //开根4
        System.out.println(Math.sqrt(4));
        //计算以e为底4的对数
        System.out.println(Math.log(4));
        //计算以10位底100的对数
        System.out.println(Math.log10(100));
        //计算以4为底30的对数(换底公式)//
        System.out.println(Math.log(30) / Math.log(4));
        //三角函数
        System.out.println(Math.asin(0));
        System.out.println(Math.acos(0));
        System.out.println(Math.tan(0));
        //常用常量e和π
        System.out.println(Math.E);
        System.out.println(Math.PI);
        //生成[0,1)的随机数
        System.out.println(Math.random());
    }
}
```

* `Random`类创建伪随机数

```java
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        //不指定种子时,默认使用当前系统时间戳作为种子
        Random random = new Random();
        System.out.println(random.nextInt());
        System.out.println(random.nextLong());
        System.out.println(random.nextFloat());
        System.out.println(random.nextDouble());
        System.out.println(random.nextBoolean());
        System.out.println(random.nextGaussian());
        //指定种子时,生成固定的随机数序列
        random = new Random(0);
        for (int i = 0; i <= 5; i++) {
            System.out.print("[" + random.nextInt(5) + "] ");
        }
    }
}
```

* `SecureRandom`类创建真随机数

```java
import java.security.SecureRandom;

public class Main {
    public static void main(String[] args) {
        SecureRandom secureRandom = new SecureRandom();
        System.out.println(secureRandom.nextInt(5));
    }
}
```

# 01java入门

## java初识

### 安装JDK

设置环境变量：JAVA_HOME

```
C:\Program Files\Java\jdk-15
```

设置环境变量：Path

```
Path=%JAVA_HOME%\bin;
```

使用cmd运行命令

```cmd
java -version
```

如输出结果显示java版本则为JDK安装成功

### 第一个java程序

```java
public class Hello {
	public static void main(String[] args){
		System.out.println("Hello,world");
	}
}
```

文件名必须与类名相同，文件后缀为.java

编译源文件为字节码文件

```cmd
javac Hello.java
```

执行字节码文件

```cmd
java Hello
```

从java11开始,单文件源码可以直接运行

```cmd
java Hello.java
```

## java程序基础

### 变量和数据结构

不同的数据类型占用的字节数

| 基本数据类型 | 字节占用 | 默认值  |
| :----------- | :------- | ------- |
| byte         | 1        | 0       |
| short        | 2        | 0       |
| int          | 4        | 0       |
| long         | 8        | 0       |
| float        | 4        | 0.0     |
| double       | 8        | 0.0     |
| char         | 2        | (char)0 |
| boolean      | 不指定   | false   |

* `java`中的基本类型有`byte` `short` `int` `long` `float` `double` `boolean` `char`
* 引用类型:所有`class`和`interface`
* 基本类型不能为`null`,引用类型可以为`null`
* 除了基本类型的变量，剩下的都是引用类型，例如String字符串
* 定义变量的时候，如果加上final修饰符，这个变量就变成了常量
* 变量的范围为通常为被最近{}包围的范围



###  整数运算

| 计算方法         | java符号 |
| ---------------- | -------- |
| 加               | +        |
| 减               | -        |
| 乘               | *        |
| 除               | /        |
| 求余             | %        |
| 自增             | +=       |
| 自减             | -=       |
| 自乘             | *=       |
| 自除             | /=       |
| 加一             | ++       |
| 减一             | --       |
| 左移位           | <<       |
| 右移位           | >>       |
| 忽略符号位右移位 | >>>      |
| 位运算与         | &        |
| 位运算或         | \|       |
| 位运算非         | ~        |
| 位运算异或       | ^        |

**使用例程：**

```java
public class Main {
    public static void main(String[] args){
    	byte a = 127;
        System.out.println(a);
        a++;
        System.out.println(a);  //输出为-128，注意byte类型的范围限制
		int b = -1;
		b = b << 1;
		System.out.println(b);  //输出为-2，不改变符号位时，相当于b*2
		b = b >>> 1;	
		System.out.println(b);  //输出为2147483647，忽略符号位移位，最高位总是补零
        
    }
}
```

**从高到低的运算优先级**

- `()`
- `!` `~` `++` `--`
- `*` `/` `%`
- `+` `-`
- `<<` `>>` `>>>`
- `&`
- `|`
- `+=` `-=` `*=` `/=`





### 浮点数运算

小数强制转型时为向下取整，如需四舍五入可以`+0.5`后在强制转型

```java
public class Main {
    public static void main(String[] args) {
        double d = 2.6;
        int n = (int) (d + 0.5);
        System.out.println(n);
    }
}
```

### 布尔运算

**从高到低的运算优先级**

- `!`
- `>`，`>=`，`<`，`<=`
- `==`，`!=`
- `&&`
- `||`

**短路运算:** 布尔运算的表达式能提前确定结果，则后续的计算不再执行，直接返回结果

三元运算符：b？x：y

?	第一个表达式的结果为真，则返回第一个表达式的结果，相反则返回第二个表达式的结果

```java
public class Main {
    public static void main(String[] args){
        String i = 1>2?"对":"错";
        System.out.println(i);	//输出为"错"
    }
}
```



### 字符和字符串

**常见的转义字符包括：**

| 字符                  | java转义符 |
| --------------------- | ---------- |
| "                     | \\"        |
| '                     | \\'        |
| \|                    | \\|        |
| \\                    | \\\        |
| 换行符                | \n         |
| 回车符                | \r         |
| Tab                   | \\t        |
| 一个Unicode编码的字符 | \u####     |

**多行字符串(Text Blocks):** 从java13开始，可以使用 “”“...”“”表示多行字符串,多行字符串前面共同的空格会被去掉

```java
public class Main{
    public static void main(String[] args){
        String a = """
        	Hello,
        	World.
        	""";
        System.out.println(a);
    }
}
```

* char是一个基本类型，String是一个引用类型
* 引用类型的变量可以指向一个空值null，他表示不存在，即该变量不指向任何对象

### 数组类型

* 整数类型的数组默认值为0，浮点型是0.0，布尔型是false
* 数组的索引从0开始
* 可以用 `数组变量.length ` 获取数组大小
* 数组的实质内容是一个内存地址

```java
public class Main {
    public static void main(String[] args) {
        int[] array1 = new int[5];
        int[] array2 = new int[]{1,2,3};
        int[] array3 = {1,2,3};
        System.out.println(array3);		//输出的是一个类似[I@16b98e56的内存地址
    }
}
```

## 流程控制

### 输入和输出

**输出**


```java
public class Main{
    public static void main(String[] args){
        System.out.print("H");		//输出
		System.out.print("i");	
        System.out.println("");		//输出后换行
        System.out.println("!");
    }
}
```

**格式化输出**

```
public class Main{
	public static void main(String[] args){
		System.out.printf("%f",3.14159);
	}
}
```


| 占位符 | 说明                             |
| :----- | :------------------------------- |
| %d     | 格式化输出整数                   |
| %x     | 格式化输出十六进制整数           |
| %f     | 格式化输出浮点数                 |
| %e     | 格式化输出科学计数法表示的浮点数 |
| %s     | 格式化字符串                     |



**输入**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);       //创建一个Scanner对象
        System.out.println("please input your your name:");
        String name = scanner.nextLine();   //读取输入并获取字符串
        System.out.println("please input your age.");
        int age = scanner.nextInt();    //读取输入并获取整数
        System.out.printf("Hi,%s,you are %d.",name,age);
    }
}
```

### if判断

语法案例`else if` 和 ` else`为可选 。

```java
public class Main {
    public static void main(String[] args) {
        int i = 0;
        if (i < 0) {
            System.out.println("如果n<0,文字将被输出");
        } else if (i > 0) {
            System.out.println("如过n>0,文字将被输出");
        } else {
            System.out.println("如果n不大于零,也不小于0,文字将被输出");
        }
    }
}
```

要判断引用类型的变量内容是否相等,必须使用`equals()`方法

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "Hello".toLowerCase();
        if (s1.equals(s2)) {
            System.out.println("s1 = s2");
        }
    }
}
```

### switch多重选择

* 常规语法

```java
public class Main {
    public static void main(String[] args) {
        switch(1+3){
            case 1:
                System.out.println(1);
                break;
            case 2:
                System.out.println(2);
                break;
            default:	//可选,当以上case都不匹配时执行
                System.out.println(">3");
                break;
        }
    }
}
```

* `switch`可以匹配引用类型String

* 当遗漏`break`时,匹配到一次条件后,后面的语句都不需匹配并且将会被执行。

**从java12开始新增无需`break`的switch语法:**

```java
public class Main {
    public static void main(String[] args) {
        switch ("he") {
            case "she" -> System.out.println("she");
            case "he" -> {
                System.out.println("he");
            }
            default -> {
                System.out.println("other");
            }
        }
    }
}
```

**新的switch语法可以返回值**

```java
public class Main {
    public static void main(String[] args) {
        String food = switch ("") {
            case "apple" -> "apple";
            case "苹果" -> "苹果";
            default -> {
                String s = "水";
                yield s;	//返回参数s
            }
        };
        System.out.println("获得食物:" + food);
    }
}
```

### while循环

**先判断后执行**

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 5) {
            System.out.println(i + "<=5");
            i++;
        }
    }
}
```

### do while循环

**先执行后判断**

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;
        do {
            System.out.println(i + "<=5");
            i++;
        } while (i <= 5);
    }
}
```

### for循环

* for循环语句三个参数都可省略
* for循环顺序:`初始化语句`、`判断语句`、`循环体`、`更新语句`

```java
public class Main {
    public static void main(String[] args) {
        int[] n = {1, 2, 3};
        for (int i = 0; i <= n.length; i++) {	//i只作自变量
            System.out.println(n[i]);
        }
    }
}
```

**for each**

```java
public class Main {
    public static void main(String[] args) {
        int[] n = {1, 2, 3};
        for (int i : n) {	//i返回数组指向的内容
            System.out.println(i);
        }
    }
}
```

### break和continue

**break:退出当前循环**

**continue:结束本次循环**

## 数组操作

### 历遍数组

以下两个历遍数组的代码与[for循环](#for循环)中的代码一致

```java
public class Main {
    public static void main(String[] args) {
        int[] n = {1, 2, 3};
        for (int i = 0; i <= n.length; i++) {	//i只作自变量
            System.out.println(n[i]);
        }
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        int[] n = {1, 2, 3};
        for (int i : n) {	//i返回数组指向的内容
            System.out.println(i);
        }
    }
}
```

**使用`Arrays.toString()`快速打印数组指向的内容**

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] array = {1, 2, 3};
        System.out.println(Arrays.toString(array));        //输出[1,2,3]
    }
}
```

### 数组操作

**冒泡排序:** 每轮循环后最大的数被交换至末尾

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] array = {1, 4, 2, 5, 2};
        System.out.println(Arrays.toString(array));
        for (int i1 = 1; i1 <= array.length - 1; i1++) {
            int temp;
            for (int i2 = 0; i2 <= array.length - 2; i2++) {
                if (array[i2] > array[i2 + 1]) {
                    temp = array[i2 + 1];
                    array[i2 + 1] = array[i2];
                    array[i2] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(array));
    }
}

```

**Arrays方法**

```java
public class Main {
    public static void main(String[] args) {
        int[] array = {1, 4, 2, 5, 2};
        System.out.println(Arrays.toString(array));
        // 排序
        Arrays.sort(array);
        System.out.println(Arrays.toString(array));
        //数组比较
        System.out.println(Arrays.equals(array, new int[]{1, 2, 2, 4, 5}));
        //二分查找数组
        System.out.println(Arrays.binarySearch(array, 4));
        //填充内容
        Arrays.fill(array, 1);
        System.out.println(Arrays.toString(array));
    }
}
```

### 多维数组

* 二维数组即是数组的数组,多维数组同理
* 打印多维数组使用`Arrays.deepToString()`

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] array1 = new int[3][];
        int[][] array2 = new int[][]{
                {1, 2, 3},
                {2, 4, 3}
        };
        int[][] array3 = {
                {2, 4, 2},
                {2, 4, 2, 3, 6},
                {}
        };
        for (int i = 0; i <= array2.length - 1; i++) {
            System.out.println(Arrays.toString(array2[i]));
        }
        System.out.println(Arrays.deepToString(array3));
    }
}

```

### 命令行参数

* java的程序入口是`main`方法,而main方法可以接受一个命令行参数,它是一个`String[]`数组
* 数组参数使用空格` `分隔

1. 编写java程序


   ```java
   import java.util.Arrays;
   
   public class Main {
       public static void main(String[] args) {
           System.out.println(Arrays.toString(args));
       }
   }
   ```

2. cmd运行程序
   
   ```cmd
   java Main.java Hello,world!
   ```
   
   输出为:
   
   ```cmd
   [Hello,World!]
   ```

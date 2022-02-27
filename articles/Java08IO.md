# 08IO

* IO是指Input/Output，即输入和输出。

* IO流是一种顺序读写数据的模式，它的特点是单向流动，所以我们把它称为IO流。

  IO流以`byte`（字节）为最小单位，因此也称为*字节流*。

  `InputStream`代表输入字节流，`OuputStream`代表输出字节流

* 如果我们需要读写的是字符，并且字符不全是单字节表示的ASCII字符，那么，按照`char`来读写显然更方便，这种流称为*字符流*

  Java提供了`Reader`和`Writer`表示字符流，字符流传输的最小数据单位是`char`

* 同步和异步

  * 同步IO:读写IO时代码必须等待数据返回后才继续执行后续代码，它的优点是代码编写简单，缺点是CPU执行效率低。

    异步IO:读写IO时仅发出请求，然后立刻执行后续代码，它的优点是CPU执行效率高，缺点是代码编写复杂。

  * Java标准库的包`java.io`提供了同步IO，而`java.nio`则是异步IO。上面我们讨论的`InputStream`、`OutputStream`、`Reader`和`Writer`都是同步IO的抽象类，对应的具体实现类，以文件为例，有`FileInputStream`、`FileOutputStream`、`FileReader`和`FileWriter`

## File对象

* Java的标准库`java.io`提供了`File`对象来操作文件和目录 

```java
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File file = new File("Resources/NoneFile");
        //构建File对象并不会对磁盘进行操作,因此即使路径或文件不存在,也不会报错
        System.out.println(file.getPath()); //输出相对路径
        System.out.println(file.getAbsolutePath()); //输出绝对路径
    }
}
```

* 其他方法

  * `boolean createNewFile() `:创造文件
  * `boolean delete()` :删除文件
  * `File createTempFile()`创建临时文件
  * `void deleteOnExit()`JVM退出时删除临时文件

  - `boolean canRead()`：是否可读；
  - `boolean canWrite()`：是否可写；
  - `boolean canExecute()`：是否可执行；
  - `long length()`：文件字节大小。

* 如果File对象表示一个目录,则有

  - `boolean mkdir()`：创建当前File对象表示的目录；
  - `boolean mkdirs()`：创建当前File对象表示的目录，并在必要时将不存在的父目录也创建出来；
  - `boolean delete()`：删除当前File对象表示的目录，当前目录必须为空才能删除成功。

* Java标准库还提供了一个`Path`对象,和`File`对象类似，但操作更加简单

```java
import java.io.*;
import java.nio.file.*;
public class Main {
    public static void main(String[] args) throws IOException {
        Path p1 = Paths.get(".", "project", "study"); // 构造一个Path对象
        System.out.println(p1);
        Path p2 = p1.toAbsolutePath(); // 转换为绝对路径
        System.out.println(p2);
        Path p3 = p2.normalize(); // 转换为规范路径
        System.out.println(p3);
        File f = p3.toFile(); // 转换为File对象
        System.out.println(f);
        for (Path p : Paths.get("..").toAbsolutePath()) { // 可以直接遍历Path
            System.out.println("  " + p);
        }
    }
}
```

* 当File对象表示一个目录时，可以使用`list()`和`listFiles()`列出目录下的文件和子目录名。`listFiles()`提供了一系列重载方法，可以过滤不想要的文件和目录

```java
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        File f = new File("C:\\Windows");
        File[] fs1 = f.listFiles(); // 列出所有文件和子目录
        printFiles(fs1);
        File[] fs2 = f.listFiles(new FilenameFilter() { // 仅列出.exe文件
            public boolean accept(File dir, String name) {
                return name.endsWith(".exe"); // 返回true表示接受该文件
            }
        });
        printFiles(fs2);
    }

    static void printFiles(File[] files) {
        System.out.println("==========");
        if (files != null) {
            for (File f : files) {
                System.out.println(f);
            }
        }
        System.out.println("==========");
    }
}
```

## InputStream

* InputStream只是一个接口,定义了read()方法,最常用的实现类是FileInputStream,

* 用`try ... finally`来保证`InputStream`在无论是否发生IO错误的时候都能够正确地关闭

```java
// // 改进前的代码
// public void readFile() throws IOException {
//     InputStream input = null;
//     try {
//         input = new FileInputStream("src/readme.txt");
//         int n;
//         while ((n = input.read()) != -1) { // 利用while同时读取并判断
//             System.out.println(n);
//         }
//     } finally {
//         if (input != null) { input.close(); }
//     }
// }

// 改进后的代码
public void readFile() throws IOException {
    try (InputStream input = new FileInputStream("src/readme.txt")) {
        int n;
        while ((n = input.read()) != -1) {
            System.out.println(n);
        }
    } // 编译器在此自动为我们写入finally并调用close()
}
```

* 编译器并不会特别地为`InputStream`加上自动关闭。编译器只看`try(resource = ...)`中的对象是否实现了`java.lang.AutoCloseable`接口，如果实现了，就自动加上`finally`语句并调用`close()`方法。`InputStream`和`OutputStream`都实现了这个接口，因此，都可以用在`try(resource)`中

* 利用缓冲区同时读取多个字符

  `InputStream`提供了两个重载方法来支持读取多个字节：

  - `int read(byte[] b)`：读取若干字节并填充到`byte[]`数组，返回读取的字节数
  - `int read(byte[] b, int off, int len)`：指定`byte[]`数组的偏移量和最大填充数

```java
public void readFile() throws IOException {
    try (InputStream input = new FileInputStream("src/readme.txt")) {
        // 定义1000个字节大小的缓冲区:
        byte[] buffer = new byte[1000];
        int n;
        while ((n = input.read(buffer)) != -1) { // 读取到缓冲区
            System.out.println("read " + n + " bytes.");
        }
    }
}
```

* 使用`ByteArrayInputStream`可以在内存中模拟一个`InputStream`

  ```java
  import java.io.*;
  
  public class Main {
      public static void main(String[] args) throws IOException {
          try (InputStream inputStream = new ByteArrayInputStream("test".getBytes())) {
              int character;
              while ((character = inputStream.read()) != -1) {
                  System.out.print((char) character);
              }
          }
      }
  }
  ```

  

## OutputStream

* `OutputStream`是Java标准库提供的最基本的输出流,常见的实现类有`FileOutputStream`

  ```java
  import java.io.*;
  
  public class Main {
      public static void main(String[] args) throws IOException {
          try (OutputStream outputStream = new FileOutputStream("Resources/test.txt")) {
              outputStream.write('t');
              outputStream.write("est".getBytes());
          }
      }
  }
  ```

* `ByteArrayOutputStream`可以在内存中模拟一个`OutputStream`

  ```java
  import java.io.*;
  
  public class Main {
      public static void main(String[] args) throws IOException {
          try (OutputStream outputStream = new ByteArrayOutputStream()) {
              outputStream.write("test".getBytes());
              System.out.println(outputStream.toString());
          }
      }
  }
  ```

## Filter模式

* 通过一个“基础”组件再叠加各种“附加”功能组件的模式，称之为Filter模式（或者装饰器模式：Decorator）。它可以让我们通过少量的类来实现各种功能的组合：

```ascii
                 ┌─────────────┐
                 │ InputStream │
                 └─────────────┘
                       ▲ ▲
┌────────────────────┐ │ │ ┌─────────────────┐
│  FileInputStream   │─┤ └─│FilterInputStream│
└────────────────────┘ │   └─────────────────┘
┌────────────────────┐ │     ▲ ┌───────────────────┐
│ByteArrayInputStream│─┤     ├─│BufferedInputStream│
└────────────────────┘ │     │ └───────────────────┘
┌────────────────────┐ │     │ ┌───────────────────┐
│ ServletInputStream │─┘     ├─│  DataInputStream  │
└────────────────────┘       │ └───────────────────┘
                             │ ┌───────────────────┐
                             └─│CheckedInputStream │
                               └───────────────────┘
```

类似的，`OutputStream`也是以这种模式来提供各种功能：

```ascii
                  ┌─────────────┐
                  │OutputStream │
                  └─────────────┘
                        ▲ ▲
┌─────────────────────┐ │ │ ┌──────────────────┐
│  FileOutputStream   │─┤ └─│FilterOutputStream│
└─────────────────────┘ │   └──────────────────┘
┌─────────────────────┐ │     ▲ ┌────────────────────┐
│ByteArrayOutputStream│─┤     ├─│BufferedOutputStream│
└─────────────────────┘ │     │ └────────────────────┘
┌─────────────────────┐ │     │ ┌────────────────────┐
│ ServletOutputStream │─┘     ├─│  DataOutputStream  │
└─────────────────────┘       │ └────────────────────┘
                              │ ┌────────────────────┐
                              └─│CheckedOutputStream │
                                └────────────────────┘
```





## 操作Zip

* `ZipInputStream`是一种`FilterInputStream`，它可以直接读取zip包的内容 

* `JarInputStream`是从`ZipInputStream`派生，它增加的主要功能是直接读取jar文件里面的`MANIFEST.MF`文件

  ```java
  try (ZipInputStream zip = new ZipInputStream(new FileInputStream(...))) {
      ZipEntry entry = null;
      while ((entry = zip.getNextEntry()) != null) {
          String name = entry.getName();
          if (!entry.isDirectory()) {
              int n;
              while ((n = zip.read()) != -1) {
                  ...
              }
          }
      }
  }
  ```

  ```java
  try (ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(...))) {
      File[] files = ...
      for (File file : files) {
          zip.putNextEntry(new ZipEntry(file.getName()));
          zip.write(getFileDataAsBytes(file));
          zip.closeEntry();
      }
  }
  ```

** 补课 ** : 廖雪峰对zip操作的教程较为精简应继续学习

## 读取classpath资源

* 在`classpath`中的资源文件，路径总是以`／`开头
* 将资源文件放到`jar`包中可以避免对文件路径的依赖

## 序列化

* `序列化`指将一个java对象变成二进制内容,本质上就是一个byte[]数组

```java
import java.io.*;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        try (ObjectOutputStream output = new ObjectOutputStream(buffer)) {
            // 写入int:
            output.writeInt(12345);
            // 写入String:
            output.writeUTF("Hello");
            // 写入Object:
            output.writeObject(Double.valueOf(123.456));
        }
        System.out.println(Arrays.toString(buffer.toByteArray()));
    }
}
```

* `反序列化`指将一个序列化内容回复成序列化前的内容

```java
try (ObjectInputStream input = new ObjectInputStream(...)) {
    int n = input.readInt();
    String s = input.readUTF();
    Double d = (Double) input.readObject();
}
```

* Java对象要能序列化，必须实现一个特殊的`java.io.Serializable`接口

* Java本身提供的基于对象的序列化和反序列化机制既存在安全性问题，也存在兼容性问题。更好的序列化方法是通过JSON这样的通用数据结构来实现，只输出基本类型（包括String）的内容，而不存储任何与代码相关的信息

## Reader

* `InputStream`是一个字节流，即以`byte`为单位读取，而`Reader`是一个字符流，即以`char`为单位读取

  ```java
  public void readFile() throws IOException {
      try (Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8)) {
          char[] buffer = new char[1000];
          int n;
          while ((n = reader.read(buffer)) != -1) {
              System.out.println("read " + n + " chars.");
          }
      }
  }
  ```

* 要避免乱码问题，我们需要在创建`FileReader`时指定编码

  ```java
  Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8);
  ```

* `CharArrayReader`可以在内存中模拟一个`Reader`

  ```java
  try (Reader reader = new CharArrayReader("Hello".toCharArray())) {
  }
  ```

* `StringReader`可以直接把`String`作为数据源，它和`CharArrayReader`几乎一样

  ```
  try (Reader reader = new StringReader("Hello")) {
  }
  ```

* 转换`InputStream`

  ```
  try (Reader reader = new InputStreamReader(new FileInputStream("src/readme.txt"), "UTF-8")) {
  }
  ```

  

## Writer

* `Reader`是带编码转换器的`InputStream`，它把`byte`转换为`char`，而`Writer`就是带编码转换器的`OutputStream`，它把`char`转换为`byte`并输出

```java
try (Writer writer = new FileWriter("readme.txt", StandardCharsets.UTF_8)) {
    writer.write('H'); // 写入单个字符
    writer.write("Hello".toCharArray()); // 写入char[]
    writer.write("Hello"); // 写入String
}
```

* `CharArrayWriter`可以在内存中创建一个`Writer`

  ```
  try (CharArrayWriter writer = new CharArrayWriter()) {
      writer.write(65);
      writer.write(66);
      writer.write(67);
      char[] data = writer.toCharArray(); // { 'A', 'B', 'C' }
  }
  ```

* `StringWriter`也是一个基于内存的`Writer`，它和`CharArrayWriter`类似

* 转换`OutputStream`

  ```
  try (Writer writer = new OutputStreamWriter(new FileOutputStream("readme.txt"), "UTF-8")) {
      // TODO:
  }
  ```

## PrintStream和PrintWriter

* `PrintStream`是一种`FilterOutputStream`，它在`OutputStream`的接口上，额外提供了一些写入各种数据类型的方法：
  - 写入`int`：`print(int)`
  - 写入`boolean`：`print(boolean)`
  - 写入`String`：`print(String)`
  - 写入`Object`：`print(Object)`，实际上相当于`print(object.toString())`
  - ...
* `PrintStream`不会抛出`IOException`，

* `PrintStream`最终输出的总是byte数据，而`PrintWriter`则是扩展了`Writer`接口，它的`print()`/`println()`方法最终输出的是`char`数据

  ```
  import java.io.*;
  public class Main {
      public static void main(String[] args)     {
          StringWriter buffer = new StringWriter();
          try (PrintWriter pw = new PrintWriter(buffer)) {
              pw.println("Hello");
              pw.println(12345);
              pw.println(true);
          }
          System.out.println(buffer.toString());
      }
  }
  ```

## 使用Files

* `Files`和`Paths`这两个工具类，封装了很多读写文件的简单方法，例如，我们要把一个文件的全部内容读取为一个`byte[]`

  ```
  byte[] data = Files.readAllBytes(Paths.get("/path/to/file.txt"));
  ```

  把一个文件的全部内容读取为`String`：

  ```
  // 默认使用UTF-8编码读取:
  String content1 = Files.readString(Paths.get("/path/to/file.txt"));
  // 可指定编码:
  String content2 = Files.readString(Paths.get("/path/to/file.txt"), StandardCharsets.ISO_8859_1);
  // 按行读取并返回每行内容:
  List<String> lines = Files.readAllLines(Paths.get("/path/to/file.txt"));
  ```

  写入文件也非常方便：

  ```
  // 写入二进制文件:
  byte[] data = ...
  Files.write(Paths.get("/path/to/file.txt"), data);
  // 写入文本并指定编码:
  Files.writeString(Paths.get("/path/to/file.txt"), "文本内容...", StandardCharsets.ISO_8859_1);
  // 按行写入文本:
  List<String> lines = ...
  Files.write(Paths.get("/path/to/file.txt"), lines);
  ```

* `Files`提供的读写方法，受内存限制，只能读写小文件,读写大型文件仍然要使用文件流，每次只读写一部分文件内容





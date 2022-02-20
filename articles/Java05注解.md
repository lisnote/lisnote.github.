# 05注解

## 使用注解

* 注解可分三类:
  * 编译器使用的注解,使编译器检查或忽略部分代码等
  * 工具处理`class`文件使用的注解,在加载`Class`时对`class`进行动态修改
  * 程序运行期能读取的注解,由`java`代码读取注解并实现

* 定义注解时,可以自定义配置参数,包括:
  * 基本类型
  * String,class,枚举类
* 配置参数必须为常量,可以有默认值
* 对名为`value`的配置参数赋值,可以只写常量
* 对名为`value`的配置参数数组只赋值一个元素时,可以省略数组写法

````java
public class Hello {
    @Check(min=0, max=100, value=55)
    public int n;

    @Check(value=99)
    public int p;

    @Check(99) // @Check(value=99)
    public int x;

    @Check
    public int y;
}
````

## 定义注解

* java使用`@interface`定义注解`Annotation`

* 可以修饰其他注解的注解称为元注解

* 使用元注解`@Target`可以定义`Annotation`能够被应用在源码的位置

  * 类或接口:`ElementType.TYPE`
  * 字段:`ElementType.FIELD`
  * 方法:`ElementType.METHOD`
  * 构造方法:`ElementType.CONSTRUCTOR`
  * 方法参数:`ElementType.PARAMETER`

  ```java
  //定义注解应用于字段
  @Target(ElementType.FIELD)
  //定义注解应用于字段和方法
  @Target({ElementType.FIELD,ElementType.METHOD})
  ```

* 使用元注解`@Retention`可以定义`Annotation`的生命周期(默认为`CLASS`)

  * 仅编译期:`RetentionPolicy.SOURCE`
  * 仅class文件:`RetentionPolicy.CLASS`
  * 运行期:`RetentionPolicy.RUNTIME`

  `@Retention`不存在时默认为`CLASS`

* 使用元注解`@Repeatable`可以定义`Annotation`是否可重复使用

* 使用`@Inherited`可以定义子类是否可继承父类定义的`Annotation`,`@Inherited`仅对`class`有效,对`interface`的继承无效

* 每个注解都必须设置`@Target`和`@Retention`

```java
import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Annotation {
    int value() default 0;
}
```

## 处理注解

* * `SOURCE`类型的注解由编译器使用,一般不编写
  * `CLASS`类型的注解主要由底层工具库使用,涉及`class`的加载,一般很少用
  * `RUNTIME`类型的注解经常需要编写和使用
  
* 注解本身也是一种`class`所有的注解都继承自`java.lang.annotation.Annotation`,因此,读取注解,需要使用反射API

  ```java
  package com.lisnote;
  
  import java.lang.annotation.*;
  import java.lang.reflect.Constructor;
  
  public class Main {
      public static void main(String[] args) throws Exception {
          //反射读取 class/method/field/constructor 的 Annotation
          if (Person.class.isAnnotationPresent(Student.class)) {
              Student classAnnotation = Person.class.getAnnotation(Student.class);
              System.out.println(classAnnotation.classAnnotation());
          }
  
          //反射读取方法参数的Annotation
          Constructor constructor = Person.class.getConstructor(String.class);
          //传入参数可以是数组,传入参数的Annotation也可以是数组,因此使用Annotation[][]
          Annotation[][] annotations = constructor.getParameterAnnotations();
          Annotation[] annotationOfName = constructor.getParameterAnnotations()[0];
          for (Annotation annotation : annotationOfName) {
              if (annotation instanceof Student) {
                  Student parameterAnnotation = (Student) annotation;
                  System.out.println(parameterAnnotation.parameterAnnotation());
              }
          }
      }
  }
  
  @Student
  class Person {
      String name;
  
      public Person(@Student String name) {
          this.name = name;
      }
  }
  
  @Target({ElementType.TYPE, ElementType.PARAMETER})
  @Retention(RetentionPolicy.RUNTIME)
  @interface Student {
      String classAnnotation() default "Class Annotation is present.";
  
      String parameterAnnotation() default "Parameter Annotation is present.";
  }
  ```

* 编写注解检查

  ```java
  package com.lisnote;
  
  import java.lang.annotation.*;
  import java.lang.reflect.Field;
  
  public class Main {
      public static void main(String[] args) throws Exception {
          Student lisnote = new Student("lisnote", 50);
          //调用检查方法
          check(lisnote);
      }
  
      static void check(Student student) throws IllegalAccessException {
          Field[] fields = Student.class.getFields();
          for (Field field : fields) {
              if (field.isAnnotationPresent(Range.class)) {
                  continue;
              }
              Object value = field.get(student);
              int max = field.getAnnotation(Range.class).max();
              int min = field.getAnnotation(Range.class).min();
              //String字段检查
              if (field.getType() == String.class) {
                  if (value.toString().length() > max) {
                      throw new IllegalArgumentException();
                  } else if (value.toString().length() < min) {
                      throw new IllegalArgumentException();
                  }
              }
              //int字段检查
              if (field.getType() == int.class) {
                  if ((int) value > max) {
                      throw new IllegalArgumentException();
                  } else if ((int) value < min) {
                      throw new IllegalArgumentException();
                  }
              }
          }
      }
  }
  
  class Student {
      @Range(max = 20, min = 1)
      public String name;
      @Range()
      public int score;
  
      public Student(String name, int score) {
          this.name = name;
          this.score = score;
      }
  }
  
  //一个定义字段范围的注解
  @Target({ElementType.FIELD})
  @Retention(RetentionPolicy.RUNTIME)
  @interface Range {
      int min() default 0;
  
      int max() default 100;
  }
  ```

# 04反射

## Class类

* `class`的本质是数据类型,无继承关系的数据类型无法赋值
* 以`String`类为例，当JVM加载`String`类时,它首先读取`String.class`文件到内存,然后,为`String`类创建一个`Class`实例并关联起来
* 不执行的`class`将不会被创造`Class`实例及加载到内存
* 通过`Class`实例获取`class`信息的方法称为`反射`
* `Class`类包含了指定`class`的所有信息
* `Class`实例在JVM中是唯一的

```java
public class Main {
    public static void main(String[] args) throws Exception {
        //定义Class的三种方式
        Class cls;
        cls = char.class;
        cls = "".getClass();
        cls = Class.forName("java.lang.String");
        //Class常用方法
        System.out.println("class name: " + cls.getName());
        System.out.println("simple class name: " + cls.getSimpleName());
        System.out.println("package name: " + cls.getPackage());
        System.out.println("type is interface: " + cls.isInterface());
        
        //JVM中Class实例唯一
        System.out.println("".getClass() == "A".getClass());    //true
        //基本数据类型也有Class
        System.out.println(int.class.getName());
        //数组类型与非数组类型不一致
        System.out.println(int[].class.getName());
        //通过Class创造String实例
        String s = (String) cls.getDeclaredConstructor(String.class).newInstance("");
    }
}
```


## 访问字段

* 通过反射读写字段
* 通过反射读写字段是非常规方法,会破坏对象的封装

```java
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        Class cls = new Student().getClass();
        //获取指定public字段(包括父类)
        System.out.println(cls.getField("name"));
        //获取所有public字段(包括父类)
        System.out.println(Arrays.toString(cls.getFields()));
        //获取指定字段(不含父类)
        System.out.println(cls.getDeclaredField("score"));
        //获取所有字段(不含父类)
        System.out.println(Arrays.toString(cls.getDeclaredFields()));

        Field field = String.class.getDeclaredField("value");
        //获取字段名
        System.out.println(field.getName());
        //获取字段类型
        System.out.println(field.getType());

        //判断字段final属性,还有public/protected/private/static
        int modifier = field.getModifiers();
        System.out.println("是否为final: " + Modifier.isFinal(modifier));

        Student student = new Student();
        field = Student.class.getDeclaredField("score");
        //解锁访问非public字段
        field.setAccessible(true);
        //获取字段值
        Object object = field.get(student);
        System.out.println(object);
        //返回值为Object类型,赋值需要强制转型
        int i = (int) field.get(student);
        System.out.println(i);
        //修改字段值
        field.set(student, 99);
        System.out.println(field.get(student));
    }
}

class Person {
    public String name = "unnamed";
}

class Student extends Person {
    private int score = 100;
}
```

## 调用方法

* 一个`Method`对象包含对应方法的所有信息
* 通过反射调用方法

```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        Class cls = Student.class;
        //获取指定public方法(包含父类)
        Method method = cls.getMethod("setName", String.class);
        System.out.println(cls.getMethod("setName", String.class));
        //获取所有public方法(包含父类)
        System.out.println(Arrays.toString(cls.getMethods()));
        //获取指定方法(不含父类)
        System.out.println(cls.getDeclaredMethod("setScore", int.class));
        //获取所有方法(不含父类)
        System.out.println(Arrays.toString(cls.getDeclaredMethods()));

        //获取方法信息
        System.out.println("方法名:" + method.getName());
        System.out.println("返回值类型:" + method.getReturnType());   //返回值为Class实例
        System.out.println("返回方法的参数类型:" + Arrays.toString(method.getParameterTypes()));   //返回Class数组

        //判断方法final属性,还有public/protected/private/static
        int modifier = method.getModifiers();
        System.out.println("是否为final: " + Modifier.isFinal(modifier));

        //调用方法
        Student lisnote = new Student();
        method = Student.class.getDeclaredMethod("setScore", int.class);
        //解锁访问非public方法
        method.setAccessible(true);
        method.invoke(lisnote, 100);
        System.out.println(lisnote.score);
        //调用静态方法时,因为不需要实例,所以invoke第一参数为null
        method = Student.class.getMethod("getType");
        System.out.println(method.invoke(null));
    }
}

class Person {
    String name = "unnamed";

    public void setName(String name) {
        this.name = name;
    }

    public static String getType() {
        return "Person";
    }
}


class Student extends Person {
    int score = 60;

    private void setScore(int score) {
        this.score = score;
    }

    public static String getType() {
        return "Student";
    }
}
```

## 使用构造方法

* 通过反射创建实例

```java
import java.lang.reflect.Constructor;
import java.util.Arrays;

class Main {
    public static void main(String[] args) throws Exception {
        //直接创建实例
        Person lisnote = Person.class.getConstructor(String.class).newInstance("lisnote1");
        System.out.println(lisnote.name);
        //转换创造实例
        Class cls = Person.class;
        lisnote = (Person) cls.getConstructor(String.class).newInstance("lisnote2");
        System.out.println(lisnote.name);
        //使用Constructor类创造实例
        Constructor constructor = cls.getConstructor(String.class);
        lisnote = (Person) constructor.newInstance("lisnote3");
        System.out.println(lisnote.name);

        //解锁非public方法
        constructor = Person.class.getDeclaredConstructor();
        constructor.setAccessible(true);
        lisnote = (Person) constructor.newInstance();
        System.out.println(lisnote.name);

        //获取指定public的Constructor
        System.out.println(Person.class.getConstructor(String.class));
        //获取public的Constructor数组
        System.out.println(Arrays.toString(String.class.getConstructors()));
        //获取指定Constructor
        System.out.println(Person.class.getDeclaredConstructor());
        //获取Constructor数组
        System.out.println(Arrays.toString(Person.class.getDeclaredConstructors()));
    }
}

class Person {
    String name;

    private Person() {
        name = "unnamed";
    }

    public Person(String nam) {
        this.name = name;
    }
}
```

## 获取继承关系

* `Class`类使用`isAssignableFrom`判断继承关系

```java
import java.util.Arrays;

class Main {
    public static void main(String[] args) {
        //获取父类Class
        Class son = Son.class;
        Class parent = son.getSuperclass();
        System.out.println(parent);
        //获取interface(不含父类接口)
        Class[] sonInterfaces = parent.getInterfaces();
        System.out.println(Arrays.toString(sonInterfaces));
        //获取父类interface
        Class[] parentInterface = sonInterfaces[0].getInterfaces();
        System.out.println(Arrays.toString(parentInterface));
        //Class类使用isAssignableFrom判断继承关系
        System.out.println(Son.class.isAssignableFrom(Parent.class));
        System.out.println(Parent.class.isAssignableFrom(Son.class));
    }
}

interface ParentInterface {
}

interface SonInterface extends ParentInterface {
}

class Parent implements SonInterface {
}

class Son extends Parent {
}
```

## 动态代理

* `JDK`提供的动态创建接口对象的方式,就叫动态代理
* 使用动态代理,可以在`JVM`运行期编写并创建实例

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Main {
    public static void main(String[] args) {
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                if (method.getName().equals("toString")) {
                    System.out.println(Person.class.getSimpleName());
                }
                return null;
            }
        };
        Person lisnote = (Person) Proxy.newProxyInstance(
                Person.class.getClassLoader(),
                new Class[]{Person.class},
                handler
        );
        lisnote.toString();
    }
}

interface Person {
    @Override
    String toString();
}
```

**补课:动态代理**

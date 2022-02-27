# 06泛型

## 什么是泛型

* 参数化类型,可以使一套代码适应多种类型

* 以`ArrayList`为例

  ```java
  import java.util.ArrayList;
  
  class Main {
      public static void main(String[] args) {
          //普通类
          ArrayList array = new ArrayList();
          array.add("0");
          //返回Object类型,使用普通类需要强制转型
          String string = (String) array.get(0);
  
          //使用泛型
          ArrayList<String> stringArray = new ArrayList<>();
          //编译器检查传入参数合法性
          stringArray.add("0");
          //返回指定类型
          string = stringArray.get(0);
      }
  }
  ```

## 使用泛型

* `强类型`指定义了泛型类型的泛型,如`List<String>`
* 不同的强类型不能相互赋值

```java
import java.util.ArrayList;
import java.util.List;

class Main {
    public static void main(String[] args) {
        ArrayList<String> array = new ArrayList<>();
        array.add("0");
        String string = array.get(0);
        System.out.println(string);
        //可以转换为List<String>,但是不能转换为ArrayList<Object>
        System.out.println(((List<String>) array).get(0));
    }
}
```

## 编写泛型

* 静态方法内的泛型不是`field`中的泛型

```java
class Main {
    public static void main(String[] args) {
        Generic<String> generic = new Generic<>("");
        String string = generic.get();
        System.out.println(string);
        System.out.println(Generic.same(string, "2"));
    }
}

class Generic<T> {
    T value;

    Generic(T value) {
        this.value = value;
    }

    T get() {
        return value;
    }

    public static <A, B> Boolean same(A a, B b) {
        return a.getClass() == b.getClass();
    }
}
```

## 擦拭法

* `擦拭法`是java实现泛型的方法

* `JVM`并不认识泛型,所有的工作都是编译器所做

* 编译器把泛型视作`Object`,并根据`<T>`进行安全的类型转换

* 目前java的泛型仍有不少限制,例如
  1. 不能使用`new`操作符创建可变类
  
     可以通过反射创建
  
  2. 泛型不能是基本类型
  
     可以使用包装类
  
  3. 泛型的`Class`中,可变类都是`Object`引用
  
     可以通过字段反射获得实际类型

```java
import java.lang.reflect.Array;

class Main {
    public static void main(String[] args) {
        //使用包装类Integer
        ArrayList<Integer> stringList = new ArrayList<>();
        stringList.add(233);
        System.out.println(stringList.get(0));
    }
}

class ArrayList<T> {
    T[] array;
    int index;

    ArrayList() {
    }

    void add(T value) {
        index++;
        //通过反射获取可变类的类型，并通过反射创建可变类
        T[] temp = (T[]) Array.newInstance(value.getClass(), index);
        int index = 0;
        if (array != null) {
            for (T partOfArray : array) {
                temp[index] = partOfArray;
                index++;
            }
        }
        array = temp;
        array[index] = value;
    }

    T get(int index) {
        return array[index];
    }
}
```

**有异议:**泛型方法覆写非泛型方法会被阻止?个人测试通过编译↓

```java
public class Main {
    public static void main(String[] args) throws Exception {
    }
}
class Pair<T> {
    public boolean same(T t) {
        return true;
    }
}
```

## extends通配符

* 使用`? extends Type`可以使传入参数接受`Type`类型及其子类型

* 使用`? extends Type`获得的参数,参数内部只可读,不可写,传入`null`除外,例如该代码不可通过编译

  ```java
  public void test(Gen<? extends Number> num) {
  	num.setFirst(new Integer(first.intValue() + 100);
  }
  ```
  
  因为当传入参数为`Gen<Double>`时,`Gen<Double>`不可接受`Integer`类型的参数

* 定义泛型时使用`<T extends Type>`可以限定T类型为`Type`或其子类型

```java
public class Main {
    public static void main(String[] args) {
        Pair<Integer> p = new Pair<>(1);
        System.out.println(p.getValue());
        System.out.println(zero(p));
    }

    //限制传入参数为Number及其子类型
    static Number zero(Pair<? extends Number> p) {
        p.setValue(null);
        return p.getValue();
    }
}

//限制T类型为Number及其子类型
class Pair<T extends Number> {
    Pair(T value) {
        this.value = value;
    }

    private T value;
shi
    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

## super通配符

* 使用`? super Type`可以使传入参数接受`Type`类型及其父类类型

* 使用`? super Type`获得的参数,参数内泛型数据不可为`object`类型以外的类型赋值,以下代码不可通过编译

  ```java
  static void test(Pair<? super Integer> p, Integer n) {
          Integer x = p.getFirst();
  }
  ```

* 比较`super`和`extends`

  `<? extends T>`允许调用读方法`T get()`获取`T`的引用，但不允许调用写方法`set(T)`传入`T`的引用（传入`null`除外）

  `<? super T>`允许调用写方法`set(T)`传入`T`的引用，但不允许调用读方法`T get()`获取`T`的引用（获取`Object`除外）

* **PECS原则**:Producer Extends Consumer Super(返回值为生产者,写入值为消费者,生产者使用extends,消费者使用super)

## 泛型和反射

* 部分反射API是泛型,例如`Class<T>`
* 创建带泛型的数组需要强制转型
* 通过`Array.newInstance(Class<T>,int)`可以创建带泛型的数组,需要强制转型

# 07集合

## java集合简介

- `List`：有序表
- `Set`：无重复元素的表
- `Map`：映射表







## 使用List

* ArrayList

  顺序存储集合

* LinkedList

  链式存储集合
  
* 常用方法

```java
在末尾添加一个元素：boolean add(E e)
在指定索引添加一个元素：boolean add(int index, E e)
删除指定索引的元素：E remove(int index)
删除某个元素：boolean remove(Object e)
获取指定索引的元素：E get(int index)
获取链表大小（包含元素的个数）：int size()
```

* 使用List

  ```java
  import java.util.ArrayList;
  import java.util.List;
  
  class Main{
      public static void main(String args[]) {
          List<String> list = new ArrayList<>();
          list.add("1");
          System.out.println(list.get(0));
          list.remove(0);
          System.out.println(list.size());
          System.out.println();
      }
  }
  ```

* 迭代器遍历List

  ```java
  import java.util.Iterator;
  import java.util.List;
  
  public class Main {
      public static void main(String[] args) {
          List<String> list = List.of("apple", "pear", "banana");
          for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
              String s = it.next();
              System.out.println(s);
          }
      }
  }
  ```

* 迭代器遍历List简化

  ```java
  import java.util.List;
  public class Main {
      public static void main(String[] args) {
          List<String> list = List.of("apple", "pear", "banana");
          for (String s : list) {
              System.out.println(s);
          }
      }
  }
  ```

* List和Array转换方法1(此方法会丢失类型信息)

  ```java
  import java.util.List;
  public class Main {
      public static void main(String[] args) {
          List<String> list = List.of("apple", "pear", "banana");
          Object[] array = list.toArray();
          for (Object s : array) {
              System.out.println(s);
          }
      }
  }
  ```

* List和Array转换方法2

```java
import java.util.List;
public class Main {
    public static void main(String[] args) {
        List<Integer> list = List.of(12, 34, 56);
        //Integer[] array = list.toArray(new Integer[3]);
        //一般不采用上述方法
		//通过接口定义的方法创建传入一个刚好够大的数组
        Integer[] array = list.toArray(Integer[]::new);
        for (Integer n : array) {
            System.out.println(n);
        }
    }
}
```



## 编写equals方法

* 要正常使用List的contains(),indexOf()等方法,放入的实例必须正确覆写equals()方法(因为直接进行比较的是索引地址而不是实例字段)
* 不调用`List`的`contains()`、`indexOf()`这些方法，那么放入的元素就不需要实现`equals()`方法
* 覆写样本

```
public boolean equals(Object o) {
    if (o instanceof Person) {
        Person p = (Person) o;
        return Objects.equals(this.name, p.name) && this.age == p.age;
    }
    return false;
}
```

## 使用Map

* 使用Map通过键值查找对应的值比List高效

```java
import java.util.HashMap;

public class Main{
    public static void main(String[] args) {
        String lisnote = "lisnote";
        HashMap<String,Integer> map = new HashMap<>();
        map.put(lisnote,22);
        System.out.println(map.get("lisnote"));
    }
}
```

* 使用同样的key,不同样的value将会更新对应key值的value而不会新增映射

* Map也支持迭代器和for each循环

  遍历key的for each

  ```java
  import java.util.HashMap;
  
  public class Main {
      public static void main(String[] args) {
          HashMap<String, Integer> map = new HashMap<>();
          map.put("apple", 123);
          map.put("pear", 456);
          map.put("banana", 789);
          for (String key : map.keySet()) {
              Integer value = map.get(key);
              System.out.println(key + " = " + value);
          }
      }
  }
  ```

  遍历key和value的for each

  ```java
  import java.util.HashMap;
  import java.util.Map;
  public class Main {
      public static void main(String[] args) {
          Map<String, Integer> map = new HashMap<>();
          map.put("apple", 123);
          map.put("pear", 456);
          map.put("banana", 789);
          for (Map.Entry<String, Integer> entry : map.entrySet()) {
              String key = entry.getKey();
              Integer value = entry.getValue();
              System.out.println(key + " = " + value);
          }
      }
  }
  ```

## 编写equals和hashCode√

* 要正常使用Map对象,Map的key类型必须正确覆写equals()和hashCode()方法

* 覆写hashCode()方法举例

```java
int hashCode() {
    int h = 0;
    h = 31 * h + firstName.hashCode();
    h = 31 * h + lastName.hashCode();
    h = 31 * h + age;
    return h;
}
```

* 编写`equals()`和`hashCode()`遵循的原则：

  `equals()`用到的用于比较的每一个字段，都必须在`hashCode()`中用于计算；`equals()`中没有使用到的字段，绝不可放在`hashCode()`中计算

## 使用EnumMap

* 作为key值的对象是enum类型时,使用EnumMap将会提高效率且没有额外的空间浪费

  ```java
  import java.time.DayOfWeek;
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          Map<DayOfWeek, String> map = new EnumMap<>(DayOfWeek.class);
          map.put(DayOfWeek.MONDAY, "星期一");
          map.put(DayOfWeek.TUESDAY, "星期二");
          map.put(DayOfWeek.WEDNESDAY, "星期三");
          map.put(DayOfWeek.THURSDAY, "星期四");
          map.put(DayOfWeek.FRIDAY, "星期五");
          map.put(DayOfWeek.SATURDAY, "星期六");
          map.put(DayOfWeek.SUNDAY, "星期日");
          System.out.println(map);
          System.out.println(map.get(DayOfWeek.MONDAY));
      }
  }
  ```

* 使用`EnumMap`的时候，我们总是用`Map`接口来引用它，因此，实际上把`HashMap`和`EnumMap`互换，在客户端看来没有任何区别

## 使用TreeMap

* HashMap是无序映射,而SortMap是有序映射

* TreeMap实现了SortMap接口,是SortMap最常用的的实现

* 使用`TreeMap`时,key类必须正确实现`Comparable`接口,如果作为Key的class没有实现`Comparable`接口，那么，必须在创建`TreeMap`时同时指定一个自定义排序算法


```java
import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Map<Student, Integer> map = new TreeMap<>(new Comparator<Student>() {
            public int compare(Student p1, Student p2) {
                if (p1.score == p2.score) {
                    return 0;
                }
                return p1.score > p2.score ? -1 : 1;
            }
        });
        map.put(new Student("Tom", 77), 1);
        map.put(new Student("Bob", 66), 2);
        map.put(new Student("Lily", 99), 3);
        for (Student key : map.keySet()) {
            System.out.println(key);
        }
        System.out.println(map.get(new Student("Bob", 66))); // null?
    }
}

class Student {
    public String name;
    public int score;
    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    public String toString() {
        return String.format("{%s: score=%d}", name, score);
    }
}
  
```

## 使用Properties

* Java集合库提供的`Properties`用于读写配置文件`.properties`。`.properties`文件可以使用UTF-8编码。

* 可以从文件系统、classpath或其他任何地方读取`.properties`文件。

* 读写`Properties`时，注意仅使用`getProperty()`和`setProperty()`方法，不要调用继承而来的`get()`和`put()`等方法。

* 代码案例

  ```java
  import java.io.*;
  import java.nio.charset.StandardCharsets;
  import java.util.Properties;
  
  public class Main {
      public static void main(String[] args) throws IOException {
          Properties props = new Properties();
          props.load(new FileReader("Resources/setting.properties", StandardCharsets.UTF_8));
          System.out.println(props.getProperty("time"));
          int time = Integer.parseInt(props.getProperty("time")) + 1;
          props.setProperty("time", Integer.toString(time));
          System.out.println(props.getProperty("time"));
          props.store(new FileWriter("Resources/setting.properties", StandardCharsets.UTF_8), null);
      }
  }
  ```

* /Resources/setting.properties

  ```properties
  中文测试=Yes
  time=0
  ```

## 使用Set

* 用于存放不重复的元素集合

- `HashSet`是无序的，因为它实现了`Set`接口，并没有实现`SortedSet`接口
- `TreeSet`是有序的，因为它实现了`SortedSet`接口
- 使用`TreeSet`添加的元素必须正确实现`Comparable`接口

* HashSet使用HashMap查找元素,因此要正常使用HashSet,需要正确覆写equals()和hashCode()方法

* 常用语法

  - 将元素添加进`Set<E>`：`boolean add(E e)`
  - 将元素从`Set<E>`删除：`boolean remove(Object e)`
  - 判断是否包含元素：`boolean contains(Object e)`

  ```java
  import java.util.*;
  public class Main {
      public static void main(String[] args) {
          Set<String> set = new HashSet<>();
          System.out.println(set.add("abc")); // true
          System.out.println(set.add("xyz")); // true
          System.out.println(set.add("xyz")); // false，添加失败，因为元素已存在
          System.out.println(set.contains("xyz")); // true，元素存在
          System.out.println(set.contains("XYZ")); // false，元素不存在
          System.out.println(set.remove("hello")); // false，删除失败，因为元素不存在
          System.out.println(set.size()); // 2，一共两个元素
      }
  }
  ```

## 使用Queue

* 先进先出的队列集合
  - `int size()`：获取队列长度；
  - `boolean add(E)`/`boolean offer(E)`：添加元素到队尾；
  - `E remove()`/`E poll()`：获取队首元素并从队列中删除；
  - `E element()`/`E peek()`：获取队首元素但并不从队列中删除。

|                    | throw Exception | 返回false或null    |
| :----------------- | :-------------- | ------------------ |
| 添加元素到队尾     | add(E e)        | boolean offer(E e) |
| 取队首元素并删除   | E remove()      | E poll()           |
| 取队首元素但不删除 | E element()     | E peek()           |

* `LinkedList`即实现了`List`接口，又实现了`Queue`接口，但是，在使用的时候，如果我们把它当作List，就获取List的引用，如果我们把它当作Queue，就获取Queue的引用 

```
// 这是一个List:
List<String> list = new LinkedList<>();
// 这是一个Queue:
Queue<String> queue = new LinkedList<>();
```

* 要避免把`null`添加到队列。

## 使用PriorityQueue

* 带有优先级的队列,使用需要实现`Comparable`接口或是提供一个提供一个`Comparator`对象

* `PriorityQueue`实现了一个优先队列：从队首获取元素时，总是获取优先级最高的元素。

```java
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;
public class Main {
    public static void main(String[] args) {
        Queue<User> q = new PriorityQueue<>(new UserComparator());
        // 添加3个元素到队列:
        q.offer(new User("Bob", "A1"));
        q.offer(new User("Alice", "A2"));
        q.offer(new User("Boss", "V1"));
        System.out.println(q.poll()); // Boss/V1
        System.out.println(q.poll()); // Bob/A1
        System.out.println(q.poll()); // Alice/A2
        System.out.println(q.poll()); // null,因为队列为空
    }
}

class UserComparator implements Comparator<User> {
    public int compare(User u1, User u2) {
        if (u1.number.charAt(0) == u2.number.charAt(0)) {
            // 如果两人的号都是A开头或者都是V开头,比较号的大小:
            return u1.number.compareTo(u2.number);
        }
        if (u1.number.charAt(0) == 'V') {
            // u1的号码是V开头,优先级高:
            return -1;
        } else {
            return 1;
        }
    }
}

class User {
    public final String name;
    public final String number;

    public User(String name, String number) {
        this.name = name;
        this.number = number;
    }

    public String toString() {
        return name + "/" + number;
    }
}
```

## 使用Duque

* `Deque`是一个接口，它的实现类有`ArrayDeque`和`LinkedList`

|                    | Queue                  | Deque                           |
| :----------------- | :--------------------- | ------------------------------- |
| 添加元素到队尾     | add(E e) / offer(E e)  | addLast(E e) / offerLast(E e)   |
| 取队首元素并删除   | E remove() / E poll()  | E removeFirst() / E pollFirst() |
| 取队首元素但不删除 | E element() / E peek() | E getFirst() / E peekFirst()    |
| 添加元素到队首     | 无                     | addFirst(E e) / offerFirst(E e) |
| 取队尾元素并删除   | 无                     | E removeLast() / E pollLast()   |
| 取队尾元素但不删除 | 无                     | E getLast() / E peekLast()      |

```
import java.util.Deque;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        Deque<String> deque = new LinkedList<>();
        deque.offerLast("A"); // A
        deque.offerLast("B"); // A <- B
        deque.offerFirst("C"); // C <- A <- B
        System.out.println(deque.pollFirst()); // C, 剩下A <- B
        System.out.println(deque.pollLast()); // B, 剩下A
        System.out.println(deque.pollFirst()); // A
        System.out.println(deque.pollFirst()); // null
    }
}
```

## 使用Stack

* Stack是一种先进先出的数据结构
* Java 的集合类并没有单独的Stack接口,但是Deque接口实现了Stack的方法,可以使用Deque模拟栈

* 栈（Stack）是一种后进先出（LIFO）的数据结构，操作栈的元素的方法有：
  - 把元素压栈：`push(E)`
  - 把栈顶的元素“弹出”：`pop(E)`
  - 取栈顶元素但不弹出：`peek(E)`

## 使用Iterator
* 如果我们自己编写了一个集合类，想要使用for each循环，只需满足以下条件：
  * 集合类实现Iterable接口，该接口要求返回一个Iterator对象；
  * 用Iterator对象迭代集合内部数据。

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        ReverseList<String> rlist = new ReverseList<>();
        rlist.add("Apple");
        rlist.add("Orange");
        rlist.add("Pear");
        for (String s : rlist) {
            System.out.println(s);
        }
    }
}

class ReverseList<T> implements Iterable<T> {

    private List<T> list = new ArrayList<>();

    public void add(T t) {
        list.add(t);
    }

    @Override
    public Iterator<T> iterator() {
        return new ReverseIterator(list.size());
    }

    class ReverseIterator implements Iterator<T> {
        int index;

        ReverseIterator(int index) {
            this.index = index;
        }

        @Override
        public boolean hasNext() {
            return index > 0;
        }

        @Override
        public T next() {
            index--;
            return ReverseList.this.list.get(index);
        }
    }
}
```

**补课**

## 使用Collections

* `Collections`类提供了一组工具方法来方便使用集合类：

  - 创建空集合；
  
    - 创建空List：`List<T> emptyList()`
    - 创建空Map：`Map<K, V> emptyMap()`
    - 创建空Set：`Set<T> emptySet()`
  
  - 创建单元素集合；
  
    - 创建一个元素的List：`List<T> singletonList(T o)`
    - 创建一个元素的Map：`Map<K, V> singletonMap(K key, V value)`
    - 创建一个元素的Set：`Set<T> singleton(T o)`
  
  - 封装集合为不可变集合；
  
    - 封装成不可变List：`List<T> unmodifiableList(List<? extends T> list)`
  
      如果我们希望把一个可变`List`封装成不可变`List`，那么，返回不可变`List`后，最好立刻扔掉可变`List`的引用，因为继续对原始的可变`List`进行增删是可以的，并且，会直接影响到封装后的“不可变”`List`
  
    - 封装成不可变Set：`Set<T> unmodifiableSet(Set<? extends T> set)`
  
    - 封装成不可变Map：`Map<K, V> unmodifiableMap(Map<? extends K, ? extends V> m)`
  
  - 对List进行排序和洗牌
  
    * Collections.sort(list);
    * Collections.shuffle(list);

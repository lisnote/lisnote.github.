# 12多线程

* 本章加入了比较多的个人理解,不能保证是正确的观点

## 多线程基础

* 一个jvm就是一个进程,jvm自带多线程

* 和多线程相比，多进程的缺点在于：

  - 创建进程比创建线程开销大，尤其是在Windows系统上；
  - 进程间通信比线程间通信要慢，因为线程间通信就是读写同一个变量，速度很快。

  而多进程的优点在于：

  * 多进程稳定性比多线程高，因为在多进程的情况下，一个进程崩溃不会影响其他进程，而在多线程的情况下，任何一个线程崩溃会直接导致整个进程崩溃。

## 创建新线程

* java内置的多线程支持:通过Thread类实现了Runnable接口定义的run()方法并运行该方法作为新线程,因此简单而言,有一下三种写法

  * 派生Thread子类

    ```
    public class Main {
        public static void main(String[] args) {
            Thread t = new MyThread();
            t.start(); // 启动新线程
        }
    }
    
    class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("start new thread!");
        }
    }
    ```

  * 传入Runnable实现类

    ```
    public class Main {
        public static void main(String[] args) {
            Thread t = new Thread(new MyRunnable());
            t.start(); // 启动新线程
        }
    }
    
    class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("start new thread!");
        }
    }
    ```

    可以用后面学的lambda语法简写为

    ```
    public class Main {
        public static void main(String[] args) {
            Thread t = new Thread(() -> System.out.println("Hello"));
            t.start();
        }
    }
    ```

  * 覆写run方法(其实和派生Thread差不多)

    ```
    public class Main {
        public static void main(String[] args) {
            Thread t = new Thread() {
                public void run() {
                    System.out.println("Hello");
                }
            };
            t.start();
        }
    }
    ```

* 基本方法

  * start() 开始运行线程
  * sleep(long millis) 强迫线程暂停
  * setPriority(int newPriority) 线程优先级,默认为5
  * currentThread() 获取当前线程名

## 线程的状态

* 进程有六种状态
  - New：新创建的线程，尚未执行；
  - Runnable：运行中的线程，正在执行`run()`方法的Java代码；
  - Blocked：运行中的线程，因为某些操作被阻塞而挂起；
  - Waiting：运行中的线程，因为某些操作在等待中；
  - Timed Waiting：运行中的线程，因为执行`sleep()`方法正在计时等待；
  - Terminated：线程已终止，因为`run()`方法执行完毕。

* 基本方法
  * start() 开始运行线程
  * sleep(long millis) 强迫线程暂停
  * setPriority(int newPriority) 线程优先级,默认为5,优先级越高,可能分配的处理器资源越多
  * stop()强制终止
  * join()调用方的线程等待被调用方结束运行后再运行

## 中断线程

* 在其他线程调用目标线程的`interrupt()`方法,目标线程检测到自身是否是interrupt状态,如果是,则目标线程结束运行

* interrupt()仅仅是发出中断请求,目标线程能否响应需要看具体代码

* 当线程处于waiting状态时,对该线程使用interrupt()方法会抛出错误,而blocked状态不会检测interrupt,因此也不会立即结束该线程

* 通过interrupt()关闭线程

  ```
  public class Main {
      public static void main(String[] args) throws InterruptedException {
          Thread thread = new Thread() {
              @Override
              public void run() {
                  while (!isInterrupted()) {
                      System.out.println("Running");
                  }
              }
          };
          thread.start();
          Thread.sleep(100);
          thread.interrupt();
      }
  }
  ```

  设置标志位关闭线程

  ```
  public class Main {
      public static void main(String[] args) throws InterruptedException {
          MarkThread thread = new MarkThread();
          thread.start();
          Thread.sleep(100);
          thread.running = false;
      }
  }
  
  class MarkThread extends Thread {
      public volatile boolean running = true;
  
      @Override
      public void run() {
          while (running) System.out.println("Running");
      }
  }
  ```

* `volatile`关键字:每次访问变量时,总是获取主内存的最新值,每次改变变量时,立刻写会主内存,确保程序更快响应状态切换(只能提高响应速度,并不保证同步)

## 守护线程

* 正常关闭JVM需要正确关闭普通线程,而守护线程在其他线程关闭后会自动关闭

* 守护线程不能持有任何需要关闭的资源，例如打开文件等，因为虚拟机退出时，守护线程没有任何机会来关闭文件，这会导致数据丢失

* 设置守护线程的方法时使用setDaemon(true)

  ```
  public class Main {
      public static void main(String[] args) throws InterruptedException {
          Thread x = new Thread(() -> {
              while (true) System.out.println("Running");
          });
          x.setDaemon(true);
          x.start();
          Thread.sleep(100);
      }
  }
  ```

## 线程同步

* 因为线程每次读取变量都是从主内存中取出到线程的工作内存,如果修改了变量,再在某个时刻再写回主内存

  那么,当一个线程在修改变量后未及时写入主内存时,其他线程也在读取并修改该变量,就容易出现数据不一致的问题

  ```
  public class Main {
      static int number = 0;
      
      public static void main(String[] args) throws InterruptedException {
          Thread add = new Thread(() -> {
              for (int i = 0; i < 10000; i++) Main.number++;
          });
          Thread sub = new Thread(() -> {
              for (int i = 0; i < 10000; i++) Main.number--;
          });
          add.start();
          sub.start();
          add.join();
          sub.join();
          //输出不确定
          System.out.println(number);
      }
  }
  ```

* 关键字`synchronized`可以保证同一时间,只能有一个线程可以读写,使用`synchronized`修改上方程序为

  ```
  public class Main {
      static final Object lock = new Object();
      static int number = 0;
  
      public static void main(String[] args) throws InterruptedException {
          Thread add = new Thread(() -> {
              for (int i = 0; i < 10000; i++) {
                  synchronized (lock) {
                      number++;
                  }
              }
          });
          Thread sub = new Thread(() -> {
              for (int i = 0; i < 10000; i++) {
                  synchronized (lock) {
                      number--;
                  }
              }
          });
          add.start();
          sub.start();
          add.join();
          sub.join();
          System.out.println(Main.number);
      }
  }
  ```

  概括一下如何使用`synchronized`：

  1. 找出修改共享变量的线程代码块；
  2. 选择一个共享实例作为锁；
  3. 使用`synchronized(lockObject) { ... }`

* synchronized会在代码块结束后自动解锁

* synchronized代码块无法并发执行,加锁和解锁都会消耗时间,因此synchronized会降低效率

* 对多变量可以使用不同的共享实例锁,每个变量分别处理以增加并发效率

* 原子操作:不需要`synchronized`也是线程安全的操作

  * 基本类型赋值(long和double除外)
  * 引用类型赋值:例如数组,String等

* 单条原子操作是线程安全的,并且也可以通过一些操作将非原子操作转换为原子操作

  例如

  ```
  public void setXY(int x, int y) {
      synchronized (lock) {
          this.x = x;
          this.y = y;
      }
  }
  ```

  可以转变为

  ```
  int[] xy;
  public void setXY(int x, int y) {
      xy = new int[]{x, y};
  }
  ```

  以上两个方法都是线程安全的

## 同步方法

* 自己选择对象锁容易造成逻辑混乱,因此我们可以把`synchronized`逻辑封装起来

  ```
  class Counter {
      public int count = 0;
  
      public int add() {
          synchronized (this) {
              return ++count;
          }
      }
  
      public int sub() {
          synchronized (this) {
              return --count;
          }
      }
  }
  ```

  这样写的好处是`synchronized`锁住的是this,也就是实例,我们可以对多实例进行并发操作而不会相互影响

  synchronized还可以修饰方法,上方代码等价于:

  ```
  class Counter {
      public int count = 0;
  
      public synchronized int add() {
          return ++count;
      }
  
      public synchronized int sub() {
          return --count;
      }
  }
  ```

  如果使用synchronized修饰静态方法,该方法所属的类的Class实例将会被锁住(注意Class实例不是class及其实例)

* 当一个类被设计为可以被多线程正确读写,这个类就是线程安全类,java中的类默认都不是线程安全的

* 线程安全类包括但不限于:

  * 不变类:例如String,Integer,LocalDate,他们的字段都是final,只能读不能写所以是线程安全的
  * 被设计为线程安全的类,例如StringBuffer

## 使用wait和notify

* synchronized解决了线程同步,却没有解决线程协调问题

  ```
  class TaskQueue {
      Queue<String> queue = new LinkedList<>();
  
      public synchronized void addTask(String s) {
          this.queue.add(s);
      }
  
      public synchronized String getTask() {
          while (queue.isEmpty()) {
          }	//此处死循环,形成死锁
          return queue.remove();
      }
  }
  ```

  因此需要使用wait和notify

  wait方法会解锁同步锁以让其他线程处理数据,但是被唤醒后会尝试重新获得锁

  ```
  public synchronized String getTask() {
      while (queue.isEmpty()) {
          this.wait();
      }
      return queue.remove();
  }
  ```

  线程进入wait之后需要唤醒, 使用`notifyAll()`将唤醒所有当前正在`this`锁等待的线程，而`notify()`只会唤醒其中一个(具体哪个依赖操作系统)

  如果当前有一个以上的wait线程,那么当其中一个获得this锁之后,其他线程将继续等待,因此不应该使用if启动wait,而是要用循环结构启动wait

## 使用ReentrantLock

* 可重入锁允许一个线程反复获取同一个锁,并且获取次数等同解锁次数,才算解锁

* `ReentrantLock`和`synchronized`都是可重入锁,但是ReentrantLock提供了等待机制,可以在一定时间没有响应时,做一些额外的处理

  ```
  public class Counter {
      private final Lock lock = new ReentrantLock();
      private int count;
  
      public void add(int n) {
          lock.lock();
          try {
              count += n;
          } finally {
              lock.unlock();
          }
      }
  }
  ```

  必须先获取到锁，再进入`try {...}`代码块，最后使用`finally`保证释放锁

* ReentrantLock可以尝试获取锁

```
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        ...
    } finally {
        lock.unlock();
    }
}
```

## 死锁

* 死锁 : 不可解锁

  ```
  import java.util.concurrent.locks.ReentrantLock;
  
  public class Main {
      public static void main(String[] args) throws InterruptedException {
          Thread thread = new Thread(() -> new ReentrantLock().lock());
          thread.start();
          thread.join();
      }
  }
  ```

  死锁一旦形成,只能强制结束,因此要尽量避免

## 使用Condition

使用`Condition`配合`ReentrantLock`可以代替`synchronized`的`wait`和`notify`功能

```
class TaskQueue {
    private final Lock lock = new ReentrantLock();
    private final Condition condition = lock.newCondition();
    private Queue<String> queue = new LinkedList<>();

    public void addTask(String s) {
        lock.lock();
        try {
            queue.add(s);
            condition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    public String getTask() {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                condition.await();
            }
            return queue.remove();
        } finally {
            lock.unlock();
        }
    }
}
```

* Condition实例需要从ReentrantLock实例中获取

* 常用方法

  - `await()`会释放当前锁，进入等待状态；

    可以选择等待时间

  - `signal()`会唤醒某个等待线程；

  - `signalAll()`会唤醒所有等待线程；

## 使用ReadWriteLock

* `synchronized`和`ReentrantLock`都只允许一个线程在读或者写

* `ReadWriteLock`只允许一个线程在写入,且允许多个线程在没有写入时同时读取

  ```
  public class Counter {
      private final ReadWriteLock rwlock = new ReentrantReadWriteLock();
      private final Lock rlock = rwlock.readLock();
      private final Lock wlock = rwlock.writeLock();
      private int[] counts = new int[10];
  
      public void inc(int index) {
          wlock.lock(); // 加写锁
          try {
              counts[index] += 1;
          } finally {
              wlock.unlock(); // 释放写锁
          }
      }
  
      public int[] get() {
          rlock.lock(); // 加读锁
          try {
              return Arrays.copyOf(counts, counts.length);
          } finally {
              rlock.unlock(); // 释放读锁
          }
      }
  }
  ```

## 使用StampedLock

* `StampedLock`是不可重入锁

* `StampedLock`主要有三个对锁对象:

  * 写锁`writeLock` : 获取时不允许其他线程获取写锁和悲观读锁(可以获取乐观读锁)
  * 乐观读锁`tryOptimisticRead` : 不论何时都可以获取乐观读锁(对任何锁获取都无影响)
  * 悲观读锁`readLock` : 获取时不允许其他线程获取写锁(可以获取乐观和悲观读锁)

  ```
  public class Point {
      private final StampedLock stampedLock = new StampedLock();
  
      private double x;
      private double y;
  
      public void move(double deltaX, double deltaY) {
          long stamp = stampedLock.writeLock(); // 获取写锁
          try {
              x += deltaX;
              y += deltaY;
          } finally {
              stampedLock.unlockWrite(stamp); // 释放写锁
          }
      }
  
      public double distanceFromOrigin() {
          long stamp = stampedLock.tryOptimisticRead(); // 获得一个乐观读锁
          // 注意下面两行代码不是原子操作
          // 假设x,y = (100,200)
          double currentX = x;
          // 此处已读取到x=100，但x,y可能被写线程修改为(300,400)
          double currentY = y;
          // 此处已读取到y，如果没有写入，读取是正确的(100,200)
          // 如果有写入，读取是错误的(100,400)
          if (!stampedLock.validate(stamp)) { // 检查乐观读锁后是否有其他写锁发生
              stamp = stampedLock.readLock(); // 获取一个悲观读锁
              try {
                  currentX = x;
                  currentY = y;
              } finally {
                  stampedLock.unlockRead(stamp); // 释放悲观读锁
              }
          }
          return Math.sqrt(currentX * currentX + currentY * currentY);
      }
  }
  ```

## 使用Concurrent集合

* `Concurrent`就是线程安全的集合类

  | interface | non-thread-safe         | thread-safe                              |
  | :-------- | :---------------------- | :--------------------------------------- |
  | List      | ArrayList               | CopyOnWriteArrayList                     |
  | Map       | HashMap                 | ConcurrentHashMap                        |
  | Set       | HashSet / TreeSet       | CopyOnWriteArraySet                      |
  | Queue     | ArrayDeque / LinkedList | ArrayBlockingQueue / LinkedBlockingQueue |
  | Deque     | ArrayDeque / LinkedList | LinkedBlockingDeque                      |

## 使用Atomic

* 除了线程安全的集合,java还提供了一些原子操作的封装类,他们位于java.util.concurrent.atomic包
* 以AtomicInteger为例,他提供了以下线程安全的操作
  - 增加值并返回新值：`int addAndGet(int delta)`
  - 加1后返回新值：`int incrementAndGet()`
  - 获取当前值：`int get()`
  - 用CAS方式设置：`int compareAndSet(int expect, int update)`

* Atomic类是通过无锁的方式实现的线程安全(原子操作以及CAS操作)

* 所谓CAS,即是Compare And Set,如果我们自己编写,就是这样

  ```
  public int incrementAndGet(AtomicInteger var) {
      int prev, next;
      do {
          prev = var.get();
          next = prev + 1;
      } while ( ! var.compareAndSet(prev, next));
      return next;
  }
  ```

* atomic包中还提供了LongAdder和LongAccumulator等对象,可以根据需要进行选择

* 使用atomic提供的原子操作可以简化多线程编程

* **有异议**CAS操作只能用于可用原子操作的对象,类似double等非原子操作的对象,不可以或是需要经过特殊操作后才可以使用CAS操作

  * 目前尚未验证

  * 发现java.util.concurrent.atomic包中没有AtomicDouble对象

  * java.util.concurrent.atomic.DoubleAccumulator以及

    源码中并没有CAS操作,而是使用不变类将double转换为引用

## 使用线程池

* 频繁创建和关闭线程需要消耗更多的时间,因此我们可以创建一个线程池,当有任务时可以加入线程池而无序创建新的线程;

* ExecutorService只是接口,常见实现有

  - FixedThreadPool：线程数固定的线程池；
  - CachedThreadPool：线程数根据任务动态调整的线程池；
  - SingleThreadExecutor：仅单线程执行的线程池。

  ```
  import java.util.concurrent.ExecutorService;
  import java.util.concurrent.Executors;
  
  class Main {
      public static void main(String[] args) {
          // 创建一个大小为2的线程池
          ExecutorService executor = Executors.newFixedThreadPool(2);
          for (int i = 0; i < 5; i++) executor.submit(new Task(i));
          System.out.println("投入任务的过程并不需要等待");
          executor.shutdown();
      }
  }
  
  class Task implements Runnable {
      int task;
  
      public Task(int task) {
          this.task = task;
      }
  
      @Override
      public void run() {
          System.out.println("任务" + task + "Start");
          try {
              Thread.sleep(200);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
          System.out.println("任务" + task + "End");
      }
  }
  ```

  因为线程池只有两个线程,因此需要等待线程池中有线程空闲时,后投入的任务才可以运行

  投入任务并不需要等待线程结束,线程会在空闲时自动运行已经投入的任务

* CatchedThreadPool可以不设定参数,也可以设定线程池大小范围,具体查看其重载方法

  ```
  public static ExecutorService newCachedThreadPool() {
      return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
  }
  ```

* ScheduleThreadPool是一种可以定期,反复执行的线程池,并且可以根据需要调动多个定时任务

  创建一个`ScheduledThreadPool`仍然是通过`Executors`类：

  ```
  ScheduledExecutorService ses = Executors.newScheduledThreadPool(4);
  ```

  我们可以提交一次性任务，它会在指定延迟后只执行一次：

  ```
  // 1秒后执行一次性任务:
  ses.schedule(new Task("one-time"), 1, TimeUnit.SECONDS);
  ```

  如果任务以固定的每3秒执行，我们可以这样写：

  ```
  // 2秒后开始执行定时任务，每3秒执行:
  ses.scheduleAtFixedRate(new Task("fixed-rate"), 2, 3, TimeUnit.SECONDS);
  ```

  如果任务以固定的3秒为间隔执行，我们可以这样写：

  ```
  // 2秒后开始执行定时任务，以3秒为间隔执行:
  ses.scheduleWithFixedDelay(new Task("fixed-delay"), 2, 3, TimeUnit.SECONDS);
  ```

  注意FixedRate和FixedDelay的区别。FixedRate是指任务总是以固定时间间隔触发，不管任务执行多长时间

## 使用Future

* Runnable没有返回值,因此java标准库提供了Callable接口
* Callable是一个泛型接口,他返回了一个Future类型,Future类型的实例代表一个未来能获取到结果的对象

```
import java.util.concurrent.*;

class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<String> future = executor.submit(new Task(1));
        System.out.println(future.get());
        //因为future.get()堵塞,需要等待返回值后线程Main才可以继续运行
        executor.submit(new Task(2));
        executor.shutdown();
    }
}

class Task implements Callable<String> {
    int task;

    public Task(int task) {
        this.task = task;
    }

    @Override
    public String call() {
        System.out.println("任务" + task + "Start");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务" + task + "End");
        return "任务" + task + "正确完成";
    }
}
```

* Future常用方法
  - `get()`：获取结果（可能会等待）
  - `get(long timeout, TimeUnit unit)`：获取结果，但只等待指定的时间；
  - `cancel(boolean mayInterruptIfRunning)`：取消当前任务；
  - `isDone()`：判断任务是否已完成。

## 使用CompletableFuture

* 使用`Future`获得异步执行结果时，要么调用阻塞方法`get()`，要么轮询看`isDone()`是否为`true`，这两种方法都不是很好，因为主线程也会被迫等待

* CompletableFuture可以传入回调对象,当异步任务完成或发生异常时,自动调用回调对象的回调方法

  ```
  public class Main {
      public static void main(String[] args) throws Exception {
          // 创建异步执行任务:
          CompletableFuture<Double> cf = CompletableFuture.supplyAsync(Main::fetchPrice);
          // 如果执行成功:
          cf.thenAccept((result) -> {
              System.out.println("price: " + result);
          });
          // 如果执行异常:
          cf.exceptionally((e) -> {
              e.printStackTrace();
              return null;
          });
          // 主线程不要立刻结束，否则CompletableFuture默认使用的线程池会立刻关闭:
          Thread.sleep(200);
      }
  
      static Double fetchPrice() {
          try {
              Thread.sleep(100);
          } catch (InterruptedException e) {
          }
          if (Math.random() < 0.3) {
              throw new RuntimeException("fetch price failed!");
          }
          return 5 + Math.random() * 20;
      }
  }
  ```

* `CompletableFuture`的优点是：

  * 异步任务结束时，会自动回调某个对象的方法；

  * 异步任务出错时，会自动回调某个对象的方法；

  * 主线程设置好回调后，不再关心异步任务的执行。

* CompletableFuture串行操作

  ```
  public class Main {
      public static void main(String[] args) throws Exception {
          // 第一个任务:
          CompletableFuture<String> cfQuery = CompletableFuture.supplyAsync(() -> {
              return queryCode("中国石油");
          });
          // cfQuery成功后继续执行下一个任务:
          CompletableFuture<Double> cfFetch = cfQuery.thenApplyAsync((code) -> {
              return fetchPrice(code);
          });
          // cfFetch成功后打印结果:
          cfFetch.thenAccept((result) -> {
              System.out.println("price: " + result);
          });
          // 主线程不要立刻结束，否则CompletableFuture默认使用的线程池会立刻关闭:
          Thread.sleep(2000);
      }
  
      static String queryCode(String name) {
          try {
              Thread.sleep(100);
          } catch (InterruptedException e) {
          }
          return "601857";
      }
  
      static Double fetchPrice(String code) {
          try {
              Thread.sleep(100);
          } catch (InterruptedException e) {
          }
          return 5 + Math.random() * 20;
      }
  }
  ```

* CompletableFuture并行操作

  ```
  // CompletableFuture
  import java.util.concurrent.CompletableFuture;
  public class Main {
      public static void main(String[] args) throws Exception {
          // 两个CompletableFuture执行异步查询:
          CompletableFuture<String> cfQueryFromSina = CompletableFuture.supplyAsync(() -> {
              return queryCode("中国石油", "https://finance.sina.com.cn/code/");
          });
          CompletableFuture<String> cfQueryFrom163 = CompletableFuture.supplyAsync(() -> {
              return queryCode("中国石油", "https://money.163.com/code/");
          });
  
          // 用anyOf合并为一个新的CompletableFuture:
          CompletableFuture<Object> cfQuery = CompletableFuture.anyOf(cfQueryFromSina, cfQueryFrom163);
  
          // 两个CompletableFuture执行异步查询:
          CompletableFuture<Double> cfFetchFromSina = cfQuery.thenApplyAsync((code) -> {
              return fetchPrice((String) code, "https://finance.sina.com.cn/price/");
          });
          CompletableFuture<Double> cfFetchFrom163 = cfQuery.thenApplyAsync((code) -> {
              return fetchPrice((String) code, "https://money.163.com/price/");
          });
  
          // 用anyOf合并为一个新的CompletableFuture:
          CompletableFuture<Object> cfFetch = CompletableFuture.anyOf(cfFetchFromSina, cfFetchFrom163);
  
          // 最终结果:
          cfFetch.thenAccept((result) -> {
              System.out.println("price: " + result);
          });
          // 主线程不要立刻结束，否则CompletableFuture默认使用的线程池会立刻关闭:
          Thread.sleep(200);
      }
  
      static String queryCode(String name, String url) {
          System.out.println("query code from " + url + "...");
          try {
              Thread.sleep((long) (Math.random() * 100));
          } catch (InterruptedException e) {
          }
          return "601857";
      }
  
      static Double fetchPrice(String code, String url) {
          System.out.println("query price from " + url + "...");
          try {
              Thread.sleep((long) (Math.random() * 100));
          } catch (InterruptedException e) {
          }
          return 5 + Math.random() * 20;
      }
  }
  ```

  * `anyOf()`可以实现“任意个`CompletableFuture`只要一个成功”，`allOf()`可以实现“所有`CompletableFuture`都必须成功

  - `xxx()`：表示该方法将继续在已有的线程中执行；
  - `xxxAsync()`：表示将异步在线程池中执行。

## 使用ForkJoin

* ForkJoin可以将大任务拆分成小任务进行执行

  ```
  public class Main {
      public static void main(String[] args) throws Exception {
          // 创建2000个随机数组成的数组:
          long[] array = new long[2000];
          long expectedSum = 0;
          for (int i = 0; i < array.length; i++) {
              array[i] = random();
              expectedSum += array[i];
          }
          System.out.println("Expected sum: " + expectedSum);
          // fork/join:
          ForkJoinTask<Long> task = new SumTask(array, 0, array.length);
          long startTime = System.currentTimeMillis();
          Long result = ForkJoinPool.commonPool().invoke(task);
          long endTime = System.currentTimeMillis();
          System.out.println("Fork/join sum: " + result + " in " + (endTime - startTime) + " ms.");
      }
  
      static Random random = new Random(0);
  
      static long random() {
          return random.nextInt(10000);
      }
  }
  
  class SumTask extends RecursiveTask<Long> {
      static final int THRESHOLD = 500;
      long[] array;
      int start;
      int end;
  
      SumTask(long[] array, int start, int end) {
          this.array = array;
          this.start = start;
          this.end = end;
      }
  
      @Override
      protected Long compute() {
          if (end - start <= THRESHOLD) {
              // 如果任务足够小,直接计算:
              long sum = 0;
              for (int i = start; i < end; i++) {
                  sum += this.array[i];
                  // 故意放慢计算速度:
                  try {
                      Thread.sleep(1);
                  } catch (InterruptedException e) {
                  }
              }
              return sum;
          }
          // 任务太大,一分为二:
          int middle = (end + start) / 2;
          System.out.println(String.format("split %d~%d ==> %d~%d, %d~%d", start, end, start, middle, middle, end));
          SumTask subtask1 = new SumTask(this.array, start, middle);
          SumTask subtask2 = new SumTask(this.array, middle, end);
          invokeAll(subtask1, subtask2);
          Long subresult1 = subtask1.join();
          Long subresult2 = subtask2.join();
          Long result = subresult1 + subresult2;
          System.out.println("result = " + subresult1 + " + " + subresult2 + " ==> " + result);
          return result;
      }
  }
  ```

* 核心代码`SumTask`继承自`RecursiveTask`，在`compute()`方法中，关键是如何“分裂”出子任务并且提交子任务

  ```
  class SumTask extends RecursiveTask<Long> {
      protected Long compute() {
          // “分裂”子任务:
          SumTask subtask1 = new SumTask(...);
          SumTask subtask2 = new SumTask(...);
          // invokeAll会并行运行两个子任务:
          invokeAll(subtask1, subtask2);
          // 获得子任务的结果:
          Long subresult1 = subtask1.join();
          Long subresult2 = subtask2.join();
          // 汇总结果:
          return subresult1 + subresult2;
      }
  }
  ```

## 使用ThreadLocal

* ThreadLocal相当于给每个线程都开辟了一个专属变量空间
* 在一个线程中,横跨若干方法调用,需要传递的对象,我们称之为上下文(Context),例如用户身份,任务信息等

```
void processUser(user) {
    try {
        threadLocalUser.set(user);
        step1();
        step2();
    } finally {
        threadLocalUser.remove();
    }
}
```

* 线程使用完ThreadLocal后必须及时关闭,否则下一次运行可能仍热在使用上一次的状态信息

  可以通过`AutoCloseable`接口配合`try (resource) {...}`结构，让编译器自动为我们关闭

  ```
  public class UserContext implements AutoCloseable {
  
      static final ThreadLocal<String> ctx = new ThreadLocal<>();
  
      public UserContext(String user) {
          ctx.set(user);
      }
  
      public static String currentUser() {
          return ctx.get();
      }
  
      @Override
      public void close() {
          ctx.remove();
      }
  }
  ```

  使用的时候，我们借助`try (resource) {...}`即可自动清除ThreadLocal

  ```
  try (var ctx = new UserContext("Bob")) {
      // 可任意调用UserContext.currentUser():
      String currentUser = UserContext.currentUser();
  } // 在此自动调用UserContext.close()方法释放ThreadLocal关联对象
  ```

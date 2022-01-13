[原始文件](https://lisnote.github.io/article/Markdown基本语法.md)

# 标题1

## 标题2

### 标题3

#### 标题4

##### 标题5

###### 标题6

**粗体**

* 无序列表
* 无序列表

1. 有序列表
2. 有序列表

- [x] 任务列表
- [ ] 任务列表

*斜体*

<u>下划线</u>

~~删除线

[超链接](https://lisnote.com)

![图片](assets/Markdown基本语法.md/background.jpg)

| 表格标题 | 表格列名 |
| -------- | -------- |
| 行头ID   | 行属性   |

```java
public class Test {
    public static void main(String[] args) {
        int count = 0;
        for (int num = 0; num < Math.pow(3, 4); num++) {
            Set<Integer> set = new HashSet<>();
            for (int base = (int)Math.pow(3,3);base>=1;base/=3){
                set.add(num/base%3);
            }
            if (set.size() == 3) count++;
        }
        System.out.println(count+" "+Math.pow(3,4));
    }
}
```

> 引用

分割线↓

---


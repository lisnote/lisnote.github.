<a charset="utf-8" href="https://raw.githubusercontent.com/lisnote/lisnote.github.io/dev/articles/Markdown%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95.md">ԭʼ�ļ�</a>

# ����1

## ����2

### ����3

#### ����4

##### ����5

###### ����6

**����**

* �����б�
* �����б�

1. �����б�
2. �����б�

- [x] �����б�
- [ ] �����б�

*б��*

<u>�»���</u>

~~ɾ����

[������](https://lisnote.com)

![ͼƬ](assets/Markdown�����﷨.md/background.jpg)

| ������ | ������� |
| -------- | -------- |
| ��ͷID   | ������   |

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

> ����

�ָ��ߡ�

---


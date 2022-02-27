# 14正则表达式

## 正则表达式简介

* 正则表达式可以用字符串来描述规则，并用来匹配字符串。例如，判断手机号，我们用正则表达式`\d{11}`

  ```
  boolean isValidMobileNumber(String s) {
      return s.matches("\\d{11}");
  }
  ```

* 使用正则表达式，不必编写复杂的代码来判断，只需给出一个字符串表达的正则规则即可

* Java标准库`java.util.regex`内建了正则表达式引擎

## 匹配规则

* 正则表达式在Java代码中也是一个字符串,特殊字符遵循java转义规则

* 如果想匹配非ASCII字符，例如中文，那就用`\u####`的十六进制表示，例如：`a\u548cc`匹配字符串`"a和c"`，中文字符`和`的Unicode编码是`548c`

* 特定字符可以匹配特定字符,例如`abc`可以匹配`abc`

* `.`可以匹配任意`一个字符`

* `\d`可以匹配任意`一个数字`

* `\w`可以匹配一个字母/数字/下划线

* `\s`可以匹配任意一个`空格字符`(`space`和`tab`)

* `\大写字符`可以匹配`\小写字符`不可匹配的字符,例如

  `\D`可以匹配非数字

  `\s`可以匹配非空格字符

  `\w`可以匹配一个非字母/非数字/非下划线

* `*`表示重复匹配任意个`*`前的字符

* `+`表示重复匹配至少一个的任意个`+`前的字符

* `?`表示匹配0个或1一个`?`前的字符

* `{n}`可以匹配n个`{n}`前的字符

  `{n,}`可以匹配n个或以上的`{n,}`前的字符

  `{n,m}`可以匹配n到m个`{n,m}`前的字符

```
public class Main {
    public static void main(String[] args) {
        System.out.println(" ".matches("\\s"));
        System.out.println("\t".matches("\\s"));
    }
}
```

| 正则表达式 | 规则                     | 可以匹配                       |
| :--------- | :----------------------- | :----------------------------- |
| `A`        | 指定字符                 | `A`                            |
| `\u548c`   | 指定Unicode字符          | `和`                           |
| `.`        | 任意字符                 | `a`，`b`，`&`，`0`             |
| `\d`       | 数字0~9                  | `0`~`9`                        |
| `\w`       | 大小写字母，数字和下划线 | `a`~`z`，`A`~`Z`，`0`~`9`，`_` |
| `\s`       | 空格、Tab键              | 空格，Tab                      |
| `\D`       | 非数字                   | `a`，`A`，`&`，`_`，……         |
| `\W`       | 非\w                     | `&`，`@`，`中`，……             |
| `\S`       | 非\s                     | `a`，`A`，`&`，`_`，……         |

多个字符的匹配规则如下：

| 正则表达式 | 规则             | 可以匹配                 |
| :--------- | :--------------- | :----------------------- |
| `A*`       | 任意个数字符     | 空，`A`，`AA`，`AAA`，…… |
| `A+`       | 至少1个字符      | `A`，`AA`，`AAA`，……     |
| `A?`       | 0个或1个字符     | 空，`A`                  |
| `A{3}`     | 指定个数字符     | `AAA`                    |
| `A{2,3}`   | 指定范围个数字符 | `AA`，`AAA`              |
| `A{2,}`    | 至少n个字符      | `AA`，`AAA`，`AAAA`，……  |
| `A{0,3}`   | 最多n个字符      | 空，`A`，`AA`，`AAA`     |

## 复杂匹配规则

* 匹配开头结尾

  用`^`表示开头，`$`表示结尾

  例如，`^A\d{3}$`，可以匹配`"A001"`、`"A380"`

* 匹配指定范围

  `[...]`表示匹配范围内的一个字符

  例如，`[1-9]`可以匹配`1`~`9`内的一个字符

  `[1-9]`等价于`[123456789]`

  - `0-9`：字符`0`~`9`；
  - `a-f`：字符`a`~`f`；
  - `A-F`：字符`A`~`F`

* 排除匹配范围

  `[^...]`可以排除指定范围内`...`匹配到的字符

  例如,`[^1-9]{2}`可以匹配`A0`不可以匹配`A1`

* 或匹配

  `n|m`表示匹配`n`规则或`m`规则

  例如,`java|php`可以匹配一个`java`或`php`

* 正则范围

  使用`()`可以限制正则运算的运算范围

  例如,`(java|php) test`可以匹配`java test`和`php test`

| 正则表达式 | 规则                 | 可以匹配                             |
| :--------- | :------------------- | :----------------------------------- |
| ^          | 开头                 | 字符串开头                           |
| $          | 结尾                 | 字符串结束                           |
| [ABC]      | […]内任意字符        | A，B，C                              |
| [A-F0-9xy] | 指定范围的字符       | `A`，……，`F`，`0`，……，`9`，`x`，`y` |
| [^A-F]     | 指定范围外的任意字符 | 非`A`~`F`                            |
| AB\|CD\|EF | AB或CD或EF           | `AB`，`CD`，`EF`                     |

## 分组匹配

* `(...)`除了限制正则运算的运算范围之外,还有一个很重要的功能 : 分组匹配

  例如当我们需要匹配`区号-电话号码`并且分别获取区号和电话号码的时候,使用`\d{3,4}\-\d{6,8}`无法很好地划分成分,正确的做法是使用`java.util.regex`包，用`Pattern`对象匹配，匹配后获得一个`Matcher`对象，如果匹配成功，就可以直接从`Matcher.group(index)`返回子串

```
import java.util.regex.*;
public class Main {
    public static void main(String[] args) {
        Pattern p = Pattern.compile("(\\d{3,4})\\-(\\d{7,8})");
        Matcher m = p.matcher("010-12345678");
        if (m.matches()) {
            System.out.println(m.group(1));
            System.out.println(m.group(2));
        } else {
            System.out.println("匹配失败!");
        }
    }
}
```

* 使用`Matcher`时，必须首先调用`matches()`判断是否匹配成功，匹配成功后，才能调用`group()`提取子串

## 非贪婪匹配

* 正则表达式匹配默认使用贪婪匹配，可以使用`?`表示对某一规则进行非贪婪匹配

## 搜索和替换

* 分割字符串

  ```
  System.out.println(Arrays.toString("a b  c\td".split("\\s+")));     //[a, b, c, d]
  ```

* 搜索字符串

  使用`Matcher.find`方法

  ```
  import java.util.regex.*;
  
  public class Main {
      public static void main(String[] args) {
          String s = "the quick brown fox jumps over the lazy dog.";
          Pattern p = Pattern.compile("\\wo\\w");
          Matcher m = p.matcher(s);
          while (m.find()) {
              String sub = s.substring(m.start(), m.end());
              System.out.println(sub);
          }
      }
  }
  ```

* 替换字符串

  ```
  System.out.println("a b  c\td".replaceAll("\\s+",""));     //abcd
  ```

* 反向引用

  ```
  System.out.println(" a b c d ".replaceAll(" (\\w) (\\w)","<$1>($2)"));     //<a>(b)<c>(d)
  ```

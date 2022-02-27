# HTML

## 初识HTML

* HTML 超文本标记语言

* W3C标准

  * 结构化标准语言(HTML,XML)
  * 表现标准语言(CSS)
  * 行为标准(DOM,ECMAScript)

* 基本结构

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <body>
  
  </body>
  </html>
  ```

## 网页基本信息

* 注释

  ```
  <!-- 注释内容 -->
  ```

* ```
  <meta> 用于描述网站信息,例如编码,关键词
  <title> 网站标题
  ```

## 网页基本标签

```
标题标签:
<h1>
段落标签
<p>
换行标签
<br>
水平线标签
<hr>
字体样式标签(粗体,斜体)
<strong>
<em>
注释
<!-- 注释内容 -->
特殊符号(转义字符),示例表示空格
&nbsp;
```

## 图片标签

* 相对路径

* 绝对路径

```
<img src="image.jpg" alt="图片">
```

## 超链接标签及应用

* 可以网址,邮件,页内跳转,电话等各种协议

```
<a href="http://baidu.com">内容</a>
```

## 块元素和行内元素

* 块元素 : 无论内容多少,该元素独占一行

  p,h1-h6...

* 行内元素 : 内容撑开宽度,可以在同一行

  a,strong...

## 列表标签

* 有序列表

  ```
  <ol>
      <li>有序列表</li>
      <li>有序列表</li>
  </ol>
  ```

* 无序列表

  ```
  <ul>
      <li>无序列表</li>
      <li>无序列表</li>
  </ul>
  ```

* 定义列表

  ```
  <dl>
      <dt>学科</dt>
      <dd>java</dd>
      <dd>python</dd>
      <dt>学员</dt>
      <dd>lisnote</dd>
      <dd>FStudent</dd>
  </dl>
  ```

## 表格标签

```
<table></table>  创建表格
<caption></caption> 定义表格标题
<tr></tr> 表格：行
<th></th> 表格：表头单元格
<td></td> 表格：内容
<thead></thead> 表格：定义表头
<tbody></tbody> 表格：定义表内容
<tfoot></tfoot> 表格：定义表脚

行列属性
rowspan行宽
colspan列宽
```

## 媒体标签

```
<video src="video.mp4" controls autoplay></video>
<audio src="video.mp4" controls autoplay></video>
video

属性
控制器
controls
自动播放
autoplay
```

## 页面结构分析

| 标签名  | 作用                         |
| ------- | ---------------------------- |
| header  | 头部区区                     |
| footer  | 底部区域                     |
| section | 页面中的独立区域             |
| article | 文章区域                     |
| aside   | 相关内容或应用(常用于侧边栏) |
| nav     | 导航类区域                   |

## iframe内联框架

```
<iframe src="index.html"></iframe>
<iframe src="//player.bilibili.com/player.html?aid=376260038&bvid=BV1Bo4y1k7AA&cid=359630127&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</body>
```

## 初识表单post和get提交

```
<form method="post" action="result.html">
 
 属性
 method 有post和get方法
 action 发送目的地
```

## 表单中的input

```
元素
input

属性
type 有text,password,checkbox,radio,submit,reset,file,hidden,image,button等,默认为text
name 指定表单元素的的名称
value 元素的初始值
size 表单元素的初始宽度
maxlength 最大输入字符数
checked type为radio或checkbox时,指定按钮是否被选中
```

![image-20210626113515540](assets/FrontEnd.md/image-20210626113515540.png)



## 列表框文本域

```
select 列表框
	option 列表框内容

textarea 文本域
```

## 滑块,搜索框,简单验证

```
滑块
<input type="range">
搜索框
<input type="search">

验证邮箱,URL,数字等
<input type="email">
<input type="url">
<input type="number">
```

## 表单的应用

```
初始值 value
长宽 hight width
只读 readonly
隐藏 hidden
禁用 disable
```

## 表单初级验证

```
提示 placeholder
非空判断 required
正则验证 pattern
```



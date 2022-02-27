# CSS

## CSS介绍

* 用于美化HTML工具

## 什么是CSS和CSS发展史

* Cascading style sheet 层叠样式表
* 作用 : 美化网页
* 修饰 : 字体,颜色,高宽,背景图片,网页定位,网页浮动,动画

* 发展史

  * CSS1.0

    基本样式

  * CSS2.0

    div+css		html与css分离,优化SEO

  * CSS2.1

    浮动,定位

  * CSS3.0

    圆角,阴影,动画

* 优势

  * 内容表现分离
  * 结构统一,可以复用
  * 样式丰富

## CSS的快速入门

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        h1 {
            color: red;
        }
    </style>
</head>
<body>
<h1>HelloWorld</h1>
</body>
</html>
```

## 四种CSS导入方式

* 优先级 : 就近原则

* 行内样式

```
<h1 style="color: red">HelloWorld</h1>
```

* 内部样式

```
<style>
    h1 {
        color: red;
    }
</style>
```

* 外部样式

```
<link href="css/style.css">
```

## 三种基本选择器

* 作用 : 选择页面的某个或某类元素
* 优先级 : id选择器 > Class选择器 > 标签选择器

```
标签选择器
h1{}
类选择器
.className{}
id选择器
#idName{}
```

## 层次选择器

```
后代选择器 body中的所有h1标签
body h1{}
子选择器 body下一级中的所有h1标签
body>h1{}
相邻兄弟选择器 id为idName的标签同级的下一个h1标签
#idName + h1{}
通用兄弟选择器 id为idName的标签同级的下方所有h1标签
#idName~h1{}
```

## 结构伪类选择器

```
选中ul的第一个li子元素
ul li:first-child{}
选中ul的最后一个li子元素
ul li:last-child{}
选择父级元素中的第一个子元素,且该元素需要为h1元素
h1:nth-child(1){}
选择父级元素中第一个标签为h1的子元素
h1:nth-of-type(1){}
```

## 属性选择器

```
选中h1标签中存在id属性的标签
h1[id]{}
选中h1中id为idName的标签(属性名可以使用正则表达式)
h1[id=idName]{}
选中h1中class为className的标签(完全相等)
h1[class=className]{}
选中h1中class存在className的标签(包含等于)
h1[class*=className]{}
选中h1中id为idN开头的标签
h1[id^=idN]{}
选中h1中id为Name结尾的标签
h1[id$=Name]{}
```

## CSS的作用及字体样式

* span 标签 一般用于突出重要内容(行内元素)
* div 区域标签(块级元素)

```
基本设置 此处为 : 斜体 宽度 大小 字体
font:oblique lighter 16px "楷体"
字体
font-family:楷体;
字体大小
font-size:50px;
字体粗细
font-weight:bold;
```

## 文本样式

```
颜色
color:red;
对齐方式
text-align:center;
首行缩进
text-indent:2em;
行高
line-height:20px;
装饰(下划线,删除线等)
text-decoration:underline;
text-decoration:line-through;
```

水平对齐

```
img,span{
	vertical-align:middle;
}
```

## 文本阴影和超链接伪类

* 文本阴影 颜色 水平偏移 垂直偏移 阴影半径

  ```
  text-shadow: red 10px 10px 10px
  ```

* 超链接伪类

  ```
  a:link{}    未访问的连接
  a:visited{} 已访问的连接
  a:hover{}   鼠标悬停时
  a:active{}  被选中的连接
  ```

## 背景图像应用及渐变

```
背景颜色
background-color: red;
背景图片
background-image: url("picture/image.jpg");
平铺方式
background-repeat:repeat-x;
渐变色
background-image: linear-gradient(10000deg,#FFF,#000);
```

## 盒子模型及边框使用

* margin 外边距
* border 边框
* padding 内边距

```
边框 厚度 显示 红色
border: 1px solid red;
```

## 内外边距及div居中

```
居中
margin: 0 auto;
```

## 圆角边框及阴影和经验分享

```
圆角
border-radius:10px
四角圆率 左上开始,顺时针
border-radius:10px 0 0 0;
```

```
阴影 x偏移 y偏移 模糊半径 阴影颜色
box-shadow:10px 10px 10px red;
```

## display和浮动

```
display:none; 不显示
display:block; 变为块级元素
display:inline;变为行内元素
display:inline-block; 是块元素,但是可以和其他元素在同一行
```

```
float:left; 向左浮动
clear:both; 两侧不允许有其他浮动元素
```

## overflow及父级边框坍塌问题

* overflow : 溢出属性

* 父级边框坍塌问题 : 当子元素都浮动的时候,父级边框的高度会被置零

  * 解决方案1:为父级边框设定固定高度

  * 解决方案2:为父级边框设定一个子元素div,设定该div属性为

    ```
    clear:both;
    margin:0;
    padding:0;
    ```

  * 为父级元素增加overflow属性

    ```
    overflow:hidden;
    ```

  * 为父级元素添加一个伪类(推荐使用)

    ```
    #father:after{
    	content:'';
    	display:block;
    	clear:both;
    }
    ```

## 相对定位的使用及练习

* 相对定位 : 相对自己原来的位置
* 使用相对定位时,原来的位置会被保留,不会造成父级元素塌陷

```
position:relative
top:10px;
bottom:10px;
left:0px;
right:0px;
```

## 绝对定位和固定定位

* 绝对定位不会保留原来的位置,但会会保留新的位置

* 没有父级元素定位时,会相对浏览器定位
* 父级元素有定位时,会相对父级元素定位

```
position:absolute;
top:10px;
bottom:10px;
left:0px;
right:0px;
```

* 固定定位不会随着浏览器页面的滑动而改变位置

```
position:fixed;
top:10px;
bottom:10px;
left:0px;
right:0px;
```

## z-index及透明度

```
层级
z-index:999;
透明度
opacity: 0.5;
```

## 动画及视野拓展

* 动画 : keyframes
* 2D转换
* 过渡
* CSS预处理语言 : less

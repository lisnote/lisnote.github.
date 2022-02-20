# JavaScript

## HelloWorld

```
<script>
    alert("HelloWorld!");
</script>
```

引用外部JavaScript文件

```
<script src = "js/index.js"></script>
```

## 使用控制台

```
控制台答应Hello
console.log("Hello");
```

## 数据类型快速浏览

数值,文本,图形,音频,视频

```
数值
number 不区分小数和整数
字符串
'abc' , "abc"
布尔值
true,false
与或非
&& || !

比较运算
== 等于(类型不同,值相同,也会判断为true)
=== 绝对等于(类型一样,值一样,结果才为true)

NaN与所有的数值都不相等,包括他自己,判断NaN应使用isNaN()方法
NaN===NaN 返回false
isNaN(NaN) 返回true

数组的元素不一定需要相同类型
var arr = [0,"String"];

对象 使用大括号包围
var person = {
	name = "lisnote",
	age = 10
}
取对象的值
person.name;
```



## 严格检查模式strict

* 启用严格检查模式

  ```
  <script>
  	'use strict'; //必须放在第一行
  </script>
  ```

## 字符串类型详解

* 正常字符串使用 `''` 或 `" "`包裹
* 特殊字符可以用`\`进行转义

```
\`
\n
\t
```

* 支持Unicode编码和ASCII字符

```
\u4e2d
\x41
```

* 多行字符串

```
let helloWorld = `Hello
World`;
```

* 模板字符串

```
let hello = `Hello`;
let helloWorld = `${hello}World!`;
console.log(helloWorld)
//HelloWorld!
```

* 字符串长度

```
str.length
```

* 大小写转换

```
str.toUpperCase();
str.toLowerCase();
```

* 获取索引

```
str.indexOf('t');
```

* 截取字符串

```
str.substring(1);
str.substring(1,3);
```

## 数组类型详解

* 数组可以包含不同类型的元素
* 对arr.length属性赋值可以改变数组大小

```
//数组排序
arr.sort();
//通过元素获取下标索引
arr.indexof(2);
//截取数组一部分,返回一个新数组
arr.slice(0,2);
//数组填充
arr.fill(1);
//栈操作 往尾部投入和投出
arr.push()
arr.pop()
//往头部投入和投出元素
arr.unshift()
arr.shift()
//元素反转
arr.reverse()
//数组连接,返回新数组
arr.concat([1,2,3]);
//打印数组并使用特定的字符串连接
arr.join('-');
```

## 对象类型详解

```
对象格式
var 对象名 = {
	属性名: 属性值,
	属性名: 属性值,
	...
}

动态删减属性 通过delete除对象属性
delete person.name;

动态添加属性 直接给新属性赋值即可
person.name = "lisnote";
```

* 对象中所有属性名都为字符串

```
判断一个属性是否在对象中
'toString' in person
//true (在父类中)
判断一个属性是否是自身拥有
hasOwnProperty('name');
```

## 分支和循环详解

```
//if
if(num == 0){
	console.log("if 0");
}else if(num == 1){
	console.log("if 0");
}else{
	console.log("if else");
};

//switch
switch(num){
	case 0:
		console.log("switch 0");
		break;
	case 1:
		console.log("switch 1");
		break;
	default:
		console.log("switch default");
}

//普通for循环
for (let i = 0; i < 5; i++) {
	console.log(i);
}
//forin循环(获取索引或属性名)
for (let i in arr) {
	console.log(arr[i]);
}
//forof循环(获取内容)
for (let i of arr) {
	console.log(i);
}
//数组forEach
arr.forEach(function(value){
	console.log(value);
})

//while
while (num < 3) {
	console.log(num);
	num++;
};
//do{}while
do {
	console.log(num);
	num++;
}while (num < 3);
```

## Map和Set集合

map:映射表

```
map = new Map([['lisnote',100],['FStudent',0]]);
map.get('lisnote');
map.set('didongxiaoli',60);
```

set:无序不重复集合

```
let set = new Set([1,2,2,3]);
set.add(0);
set.delete(1);
set.has(2);
```

遍历map和set只能用for of循环

## 函数的定义和参数获取

 ```
 function abs(value) {
 	if (value > 0) return value;
 	return -value;
 }
 ```

JavaScript方法可以传递任意个参数,也可以不传递参数

```
function abs() {
	console.log(arguments.length);
	for (let i of arguments) {
		console.log(i);
	}
}
abs(1, 3, 4, 5, 4, 3);
```

手动抛出异常

```
function abs() {
	if (arguments.length > 0) throw "Arguments Exception!";
}
```

额外参数

```
function print(a, ...args) {
	console.log(a);
	console.log(args);
}
```

## 变量的作用域,var,let,const

* var 的作用域只分为函数作用域和全局作用域,无块级作用域
* let存在块级作用域
* const为不可修改的常量,作用范围同let

* 养成规范 : 

  因为JavaScript中的var定义会自动提升变量声明,但是不提升变量赋值

  因此所有变量在定义之初都应该放在函数的头部,避免局部死区,便于维护

* 默认所有的全局变量都会绑定在windows对象下

```
var str = "Hello";
console.log(str);	//Hello
console.log(window.str);	//Hello
```

* let和const关键字即使在顶端定义也不会再window对象中创建新属性

```
let str = "Hello";
console.log(window.str);	//undefined
```

* JavaScript只有一个全局作用域window
* 由于全局变量都会绑定到window上,因此不同的js文件,如果使用了相同的全局变量就产生冲突,因此一般使用let或自定义一个全局变量,将自己定义的变量全部添加到这个全局变量中

```
var lisnoteApp = {}
lisnoteApp.str = "Hello";
console.log(lisnoteApp.str);
```

## 方法的定义和调用,apply

* 方法就是对象中的函数

```
var student = {
	name: "lisnote",
	age: 20,
	toString: function() {
		return this.name + " " + this.age;
	}
}
```

* this一般代表调用该方法的对象,可以改变this指向

```
var student = {
	name: "lisnote"
}
function getName() {
	console.log(this.name);
}
getName.apply(student);
```

## 常见类型

```
typeof 123
"number"
typeof NaN
"number"
typeof '1'
"string"
typeof true
"boolean"
typeof []
"object"
typeof {}
"object"
typeof Math.abs
"function"
```

* 数组类型常见方法

  ```
  let arr = [1,2,3];
  arr.push(4);	//数组末尾插入
  console.log(arr);	//1,2,3,4
  arr.pop();		//数组末尾删除
  console.log(arr);	//1,2,3
  arr.unshift(0);	//数组首位插入
  console.log(arr);	//0,1,2,3
  arr.shift();	//数组首位删除
  console.log(arr);	//1,2,3
  arr.reverse();	//数组倒序
  console.log(arr);	//3,2,1
  arr.sort();		//数组排序
  console.log(arr);	//1,2,3
  console.log(arr.join(' '));	//用字符分隔数组元素并返回字符串
  console.log(arr.toString());	//数组转字符串
  ```

JavaScript还有String,Number,Boolean包装类,提供了一系列方法可供部分使用需求

## Math对象

```
Math.random() //返回一个随机数,大小为[0,1);

```

## Date日期对象

```
let now = new Date();可传入时间戳
console.log(now); //格式化日期
console.log(now.getTime()); //时间戳
console.log(now.getFullYear()); //年
console.log(now.getMonth()); //月
console.log(now.getDate()); //日
console.log(now.getDay()); //星期几
console.log(now.getHours()); //时
console.log(now.getMinutes()); //分
console.log(now.getSeconds()); //秒
```

## JSON对象

* JSON是一种轻量级数据交换格式

```
//对象转换为JSON字符串
JSON.stringify(json);
//JSON字符串转换为对象
JSON.parse('{"name":"lisnote","age":"3"}')
```

## 面向对象原型继承

* JavaScript面向对象是面向原型继承
* 原型可变
* 继承步骤
  1. 定义自己不同于原型的属性
  2. 选择继承的原型

```
let human = {
	name: "unnamed",
	species: "human"
}
let bird = {
	name: "unnamed",
	species: "bird"
}
let lisnote = {
	name: "lisnote"
}
lisnote.__proto__ = human;
console.log(lisnote.species);
lisnote.__proto__ = bird;
console.log(lisnote.species);
```

## 面向对象class继承

* ES6之后可以定义类
* 本质上仍然是继承原型
* 继承步骤
  1. 定义一个类
  2. 使用new关键字构建对象

```
class Person {
	constructor(name) {
		this.name = name;
	}
}
class Student extends Person {
	constructor(name, score) {
		super(name)
		this.score = score;
	}
}
let lisnote = new Student("lisnote", 10);
console.log(lisnote)
```

## 操作BOM对象

* BOM全称Browser Object Model(浏览器对象模型)
* windows : 充当全局作用域,并表示浏览器窗口

```
window.innerWidth	//浏览器内宽
window.innerHeight	//浏览器内高
window.outerWidth	//浏览器外宽
window.outerHeight	//浏览器外高
```

* navigator : 表示浏览器信息(用户可以轻易修改,不一定正确)

```
navigator.appName 		//浏览器名称；
navigator.appVersion 	//浏览器版本；
navigator.language 		//浏览器设置的语言；
navigator.platform 		//操作系统类型；
navigator.userAgent 	//浏览器设定的User-Agent字符串。
```

* screen : 表示浏览器屏幕信息

```
screen.width 		//屏幕宽度，以像素为单位；
screen.height 		//屏幕高度，以像素为单位；
screen.colorDepth 	//返回颜色位深，如8、16、24。
```

* location : 显示当前URL信息

```
location.href 		// 获取完整链接 http://www.example.com:8080/path/index.html?a=1&b=2#TOP
location.protocol 	// 获取协议 'http'
location.host 		// 获取域名 'www.example.com'
location.port 		// 获取端口 '8080'
location.pathname 	// 获取连接后地址 '/path/index.html'
location.search 	// 获取查询参数(?及后方的文字) '?a=1&b=2'
location.hash 		// 获取标识符(#后方的文字) 'TOP'
```

* document : 文档对象(HTML在浏览器中以DOM形势表示为树形结构,document对象就是DOM树的根节点)

```
document.getElementById('lisnote') 	//根据id获取
document.cookie 					//获取cookie
```

* history : 历史记录(不建议使用,因为现在一般会使用很多的AJAX)

```
history.back() 		//后退
history.forward() 	//前进
```

## 操作DOM对象

* 更新DOM结点
* 遍历DOM结点
* 删除DOM结点
* 添加DOM结点

## 获得DOM结点

```
document.getElementsByTagName("div")		//根据标签名获取结点
document.getElementById('lisnote')			//根据ID获取结点
document.getElementsByClassName("FStudent")	//根据类名获取结点

let lisnote = document.getElementById("lisnote");
lisnote.childen;							//获取父结点下所有子结点
//更多方法(参考CSS选择器)...
lisnote.firstChild
lisnote.lastChild;
```

## 更新DOM结点

```
lisnote.innerText ="123"						//修改文本值为123(特殊符号自动转义)
lisnote.innerHTML = "<strong>123</strong>"		//修改内容(无转移)
lisnote.style.color								//修改样式中的color
```

## 删除DOM结点

* 步骤:
  1. 获取需要删除节点的父结点
  2. 通过父结点删除该结点

```
// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
removed === self; // true
```

## 创建和插入DOM结点

* 方式1. appendChild添加子结点

```
var
    js = document.getElementById('js'),
    list = document.getElementById('list');
list.appendChild(js);
```

* 方式2.insertBefore结点前插入

```
var 
    list = document.getElementById('list'),
    ref = document.getElementById('python'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.insertBefore(haskell, ref);
```

## 获得和设定表单的值

* 获取值

```
var mon = document.getElementById('monday');
var tue = document.getElementById('tuesday');
mon.value; // '1'
tue.value; // '2'
mon.checked; // true或者false
tue.checked; // true或者false
```

* 修改值

```
// <input type="text" id="email">
var input = document.getElementById('email');
input.value = 'test@example.com'; // 文本框的内容已更新
```

## 表单提交验证及前端密码MD5加密

```
var form = document.getElementById('test-form');
// 可以在此检查或修改form的input...
// 提交form:
form.submit();
```

## 正则表达式

**此处不含通用正则知识,仅对javascript使用方式作总结**

* str.match()

  返回包含首个匹配到字符串的对象,失败返回null

* str.matchAll()

  返回可迭代的包含所有匹配到字符串的对象,失败返回null

* str.search()

  返回查找到字符串的起始index,失败返回-1

* str.replace()

  替换匹配文本并返回新的字符串

* str.split()

  将匹配的内容作为分隔标记,把文本变为数组并返回

* reg.exec()

  类似match

* reg.test()

  匹配成功返回true,失败返回false

```
console.log([
    "banana".match(/\w/),
    "banana".matchAll(/\w/g),
    [..."banana".matchAll(/\w/g)],
    "banana".search(/a/),
    "banana".replace(/\w/,"a"),
    "banana".replace(/\w/g,"a"),
    "banana".split(/\a/),
    /a\w/.exec("banana"),
    /a\w/.test("banana")
])

// [
//     ['b', index: 0, input: 'banana', groups: undefined],
//     Object[RegExp String Iterator] { },
//     [
//         ['b', index: 0, input: 'banana', groups: undefined],
//         ['a', index: 1, input: 'banana', groups: undefined],
//         ['n', index: 2, input: 'banana', groups: undefined],
//         ['a', index: 3, input: 'banana', groups: undefined],
//         ['n', index: 4, input: 'banana', groups: undefined],
//         ['a', index: 5, input: 'banana', groups: undefined]
//     ],
//     0,
//     'aanana',
//     'aaaaaa',
//     ['b', 'n', 'n', ''],
//     ['an', index: 1, input: 'banana', groups: undefined],
//     true
// ]
```

### 进阶正则使用方法

* 根据匹配内容返回替换对应内容

  ```javascript
  "abnbnb".replace(/a|b/g, data => {
      switch (data) {
          case "a": return "b";
          case "b": return "a";
      }
  })
  // banana
  ```

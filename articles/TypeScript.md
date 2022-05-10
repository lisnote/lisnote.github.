---
date: 2022-03-01 00:00:00
---
**所有javascript代码都是有效TypeScript代码,将js文件后缀改为ts后缀不会对javascript造成负面影响**

**本教程对TypeScript的记录基本都是描述编译前与编译时,而不对编译后的javascript知识进行再描述**

# 初识TypeScript

## 快速开始

* TypeScript是微软开发法的javascript超集,最终会被编译成javascript代码,主要为javascript提供了类型系统和ES6+的支持,适用于大型项目和基础库,有效减少后期开发和维护的压力

* 安装typescript

  ```bash
  npm i -g typescript
  ```

  书写ts程序`HelloWorld.ts`

  ```typescript
  console.log("HelloWorld");
  ```

  编译代码

  ```bash
  tsc HelloWorld.ts
  ```

  生成`HelloWorld.js`文件

  使用node测试运行

  ```bash
  node HelloWorld.js
  ```

  输出 : HelloWorld

* vscode 自动编译ts

  ```bash
  tsc --init
  ```

  打开vscode命令行(ctrl+p)

  ```bash
  >Tasks: Configure Task
  >tsc: watch -tsconfig.json
  ```

  快捷键`ctrl+shift+b`开始构建

  使用nodemon即可自动运行重新构建的js文件

## 类型注解

使用`: string`进行注解,编译时将会对进行类型检查,例如这个例子会编译错误

```typescript
let user: string = ["lisnote"];
```

编译报错 : Type 'string[]' is not assignable to type 'string'

正确的例子

```javascript
let user: string = "lisnote";
```

同样在传入参数中也能使用这样的类型注解

```typescript
function greeter(user: string) {
    console.log("Hello," + user);
}
let user: string = "lisnote";
greeter(user);
```

## 接口

在TypeScript中,只要两个类型的内部结构兼容,那么这两个类型就是兼容的,不需要使用`implements`关键字

```typescript
interface Person {
    firstName: string;
    lastName: string;
}
function fullName(user: Person) {
    console.log(user.firstName + user.lastName);
}
let Lisnote = {
    firstName: "不知名",
    lastName: "名菜"
}
fullName(Lisnote);
```

## 类

TypeScript同样支持javascript的class

```typescript
class Student {
    firstName: string;
    lastName: string;
    score: number;
    constructor(
        firstName: string,
        lastName: string,
        score: number
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.score = 10;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function fullName(user: Person) {
    console.log(user.firstName + user.lastName);
}

let lisnote = new Student("不知名", "名菜", 100);
fullName(lisnote)
```

## 常见类型

javascript一切皆对象,包括基本类型,TypeScript的基础类型和引用类型并不可信,比如string并不能赋值给Object

| 名称             | 用例                                       | 说明                         |
| ---------------- | ------------------------------------------ | ---------------------------- |
| 数值 number      | let num: number = 1                        | 约束为数值                   |
| 布尔值 boolean   | let bl: boolean = true;                    | 约束为布尔值                 |
| 未定义 undefined | let udf: undefined = undefined;            | 约束为undefined,输出会报错   |
| 空值 null        | let nvll: null = null;                     | 约束null,输出不会报错        |
| 无类型 void      | let voi: void = undefined;                 | 约束为undefined或null        |
| 字符串 string    | let str: string = "str";                   | 约束为字符串                 |
| 数值Array        | let arr: number[] = [1, 2, 3];             | 约束为数组                   |
| 对象object       | let o: object = new String("lisnote");     | 约束为对象(几乎任意引用类型) |
| 枚举enum         | enum color {RED, GREEN, BLUE}              | 约束为枚举                   |
| 元组             | let tuple: [string, number] = ["human", 1] | 约束为一个包含不同类型的数组 |
| 联合             | let uni: number \| string = 0;             | 约束为多个类型               |
| 任意             | let ani: any = 0;                          | 无约束                       |

## 对未知类型的处理

由于TypeScript有着对javascript语法兼容的要求,存在着未能设定类型的值,以及允许跳过类型检查的情况

### 类型推断 :

TypeScript会根据直接量类型,返回类型等判断没有约束类型的值的类型

**但是并不推荐省略书写这些能被推断的东西**

```typescript
let foo = 123; // foo 是 'number'
let bar = 'hello'; // bar 是 'string'

foo = bar; // Error: 不能将 'string' 赋值给 `number`
```

**注意参数的使用** : 如果类型无法被推断,类型也不会流入函数参数中,例如下方例子

```typescript
const foo = (a, b) => {
  /* do something */
};
```

正确用例

```typescript
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => {
  /* do something */
};
```

### 类型断言

* 覆盖编译器的类型推断,有两种方式

```TypeScript
let str1: number = "1234" as any;
let str2: number = <any>"1234";
console.log(typeof str1,typeof str2);
```

由于str2的定义方式与JSX语法存在混淆,建议统一使用as type语法为类型断言

* 合理使用断言

```TypeScript
interface Foo {
  bar: number;
  bas: string;
}

const foo: Foo = {
  // 编译器将会提供 Foo 属性的代码提示
};
```

* 编译器如何判断单个断言是否通过

当被赋值对象和断言对象存在包含关系(不分大小),断言通过,毫无根据的断言非常危险,但是如果仍希望那么做,可以使用any

# 面向对象基础

## 函数

* 用例

```typescript
function add(x: number, y: number): number {
    return x + y;
}
let addition: (x: number, y: number) => number = add;
console.log(add(1, 3));
console.log(addition(2, 4));
```

* 可选参数

```
function fullName(firstName: string, lastName?: string): string {
    return firstName + lastName;
}
console.log(fullName("不知名"));
```

* 默认值

```javascript
function fullName(firstName: string, lastName : string = "名菜"): string {
    return firstName + lastName;
}
console.log(fullName("不知名"));
```



* 关于方法重载

**TypeScript的方法重载非常拉跨,与javascript后天逻辑实现方法重载的操作无异**

TypeScript利用编译器的类型检查可以比javascript更轻易的做到一个方法根据传入参数进行不同的行为,但是并算不上方法重载,特别是编译为javascript库使用时问题更多

如果真的有进行伪方法重载的需要,注意编译时检查使用TypeScript,而需要运行时检查则使用object.constructor.name进行判断

与TypeScript的编译时方法重载检查相比,object.constructor.name判断的方法重载再运行时的效率更低但是更稳定

**总而言之,不建议轻易使用TypeScript的编译时类型检查作为方法重载的考虑,更建议使用object.constructor.name进行判断的方法重载**

TypeScript方法重载的缺点

* 不支持根据参数数量不同的方法重载(或是用着麻烦以及不稳定)
* 不支持根据返回类型不同的方法重载
* 使用typeof进行判断,许多无法分辨的类型

举一个TypeScript的通过编译且符合方法重载逻辑的失败用例

较推荐的方法重载逻辑实现

```javascript
function typeOf(o: any): string {
    if (o === null) {
        return "null";
    } else if (o == undefined) {
        return "undefined";
    } else {
        return o.constructor.name;
    }
}
console.log(
    typeOf(null),
    typeOf(undefined),
    typeOf(true),
    typeOf(""),
    typeOf([]),
    typeOf({}),
    typeOf(new class Human { })
)
// Output :
// null undefined Boolean String Array Object Human
```

## 类

* 和javascript相比暂无已知新特性

## 接口

- 声明

```typescript
interface Point {
  x: number;
  y: number;
}
```

* 只读和可选属性

```typescript
interface Person {
    // 只读 readonly
    readonly id: number,
    name: string,
    // 可选属性 ?
    sex?: string,
    isLearning: () => boolean
}

let lisnote: Person = {
    id: 18,
    name: "lisnote",
    isLearning: function () {
        return true;
    }
}
```

* 类实现接口

```typescript
interface Person {
    readonly id: number,
    name: string,
    sex?: string,
    isLearning: () => boolean
}

class Student implements Person {
    id: number;
    name: string;
    sex?: string | undefined;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    isLearning = (): boolean => {
        return true;
    }
}
```

- 接口继承接口

```typescript
interface X {
    x: number
}
interface Point extends X {
    y: number
}
class myPoint implements Point {
    y: number;
    x: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
```

## 泛型

* 用例 : 创建一个包含count个value的数组

```typescript
function createArray<T>(count: number, value: T): Array<T> {
    return new Array(count).fill(value);
}
console.log(createArray(5, 1));
```

* 函数,接口,类都可以使用泛型

* 泛型约束

```typescript
function fn2 <T extends Lengthwise>(x: T): void {
  console.log(x.length)
}
```

## 声明文件

以JQuery为例,在TypeScript中,编译器并不认识jquery是什么类型,使用jquery会报错

```TypeScript
jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

这时使用declare var定义他的类型后即可使用

```TypeScript
declare var jQuery: (selector: string) => any;
jQuery('#foo');
```

declare就是声明关键字

通常我们会吧声明语句放到一个单独文件,作为声明文件,声明文件必须以`.d.ts`为后缀

将声明文件放到项目时,其他任何`.ts`文件就都可以获得该声明的类型定义

### 第三方声明文件

jquery的声明已经由社区为我们定义好,我们可以直接这样使用

```bash
npm i -D @types/jquery
```

### 声明文件相关配置项

tscconfig.json

–declaration
–declarationDir
–types
–typeRoots









* TypeScript使用第三方库时,需要使用声明文件才能获得对应的代码补全,接口提示等功能

```bash
npm i -D @types/jquery
```

## 内置对象

javascript中的内置对象已经在TypeScript中定义好了类型

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准

1. ECMAScript内置对象

   Boolean

   Number

   String

   Date

   RegExp

   Error

2. BOM和DOM内置对象

   Window
   
   Document
   
   HTMLElement
   
   DocumentFragment
   
   Event
   
   NodeList









k
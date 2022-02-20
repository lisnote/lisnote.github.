# 介绍及初步使用

Node.js 是一个javascript的运行平台,与浏览器的封闭环境相比,Nodejs提供了许多重要的api,使得用javascript访问系统功能成为可能

## 安装

[Nodejs官网](https://nodejs.org/)

## 第一个Nodejs程序

新建`HelloWorld.js`文件写入

```js
console.log("Hello World!");
```

在当前目录打开cmd运行

```bash
node HelloWorld.js
```

# 核心库

* 导入依赖库的方式(以fs库为例)

```js
const.fs = require('fs')
```

## fs

* fs,意为**File System**,常用于读写文件

fs.readFile()用于读取文件

fs.readFile(path[,options],callback)

```js
const fs = require('fs');
fs.readFile("test.txt", "utf8", function (error, data) {
    if (error) {
        console.log("读取失败");
    } else {
        console.log(["读取成功", data]);
    };
})
```

fs.writeFile()用于写入文件

fs.writeFiel(file,data[,options],callback)

```javascript
const fs = require('fs');
fs.writeFile("test.txt", "test", "utf8", (error) => {
    if (error) {
        console.log("写入失败");
    } else {
        console.log("写入成功");
    };
});
```

## path

* path,提供一些路径相关的方法

js中的相对路径会自动根据当前cmd地址进行拼接获得绝对路径,当cmd运行路径与文件路径不同时,就会发生错误,因此常常配合path包和`__dirname`一起使用

__dirname : 值为当前文件所在目录的绝对路径

__filename : 值为当前文件的绝对路径

path.join() : 更合理地拼接路径字符串,无参数数量限制

path.basename() : 获取文件名

path.extname() : 获取文件拓展名

```js
const fs = require("fs");
const path = require("path")
console.log(__dirname);
// f:\0STUDY\FrontEnd\Nodejs
console.log(__filename);
// f:\0STUDY\FrontEnd\Nodejs\01start.js
console.log(path.join(__dirname, "./html/test"));
// f:\0STUDY\FrontEnd\Nodejs\html\test
console.log(path.basename(__filename));
// 01start.js
console.log(path.extname(__filename));
// .js
console.log(path.basename(__filename, path.extname(__filename)));
// 01start
```

## http

* http提供http相关方法,类似的还有http2,https
* http.createServer()创建服务,其中的request和response常用属性和方法有 : 
  1. request.headers : 一个包含请求头信息的对象
  2. response.setheader : 设置请响应头
  3. response.end() : 返回请求信息

```javascript
const http = require('http');
http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("不知名名菜<br>" + JSON.stringify(request.headers).replace(/(",")|"|{|}/g, (match) => {
        return match == '","' ? "<br>" : ""
    }));
}).listen(80);
```

## https

于http类似

```javascript
let fs = require("fs");
let https = require("https");
const httpsOption = {
    key: fs.readFileSync("lisnote.com.key"),
    cert: fs.readFileSync("lisnote.com.pem")
}
https.createServer(httpsOption, (request, response) => {
    response.end("This is HTTPS")
}).listen(443);
```

# 模块化

## 模块作用域

模块作用域 : 文件内

通过require("模块名")获取模块

使用`exports.模块名/方法 = 模块名/方法`可以暴露模块属性和方法

使用exports实际上真实使用的是module.exports,exports只是被指向了module.exports对象,重新赋值exports将导致exports失效

```javascript
let field = "field";
function fn() {
    console.log("This is a function");
};
exports.field = field;
exports.fn = fn;
```

## 模块管理工具

在nodejs中常见的包管理器有npm和yarn,使用区别不是特别大,具体场景具体选择

常见的第三方npm包可以在[npmjs](https://www.npmjs.com/)找

## npm

一个javascript包管理工具

```bash
# 安装包
npm install moment
# 安装指定版本包
npm install moment@2.22.2
# 卸载包
npm uninstall moment
```

### 语义化版本规范

* 点分十进制 :

  一共三位数字,每位数字用`.`进行分离,例如`1.22.0`,每位数字的含义如下

  1.  : 大版本,重构后增加大版本号

  2.  : 功能版本,增加功能时增加功能版本号

  3. : Bug修复版本,修复Bug时增加Bug修复版本号

  前面的版本号正常时,后面的版本号归零

### 包管理配置文件

- package.json

  记录着项目的介绍,依赖等重要重要信息

初始创建包管理配置文件(运行路径仅在英文路径成功运行,且不包含空格)

```bash
 npm init-y
```

- package的重要节点

  * name

    包的名字

  * version

    包的版本

  * main

    包的入口

  * dependencies

    项目核心依赖

    在刚下载npm项目中,往往缺少依赖文件,使用npm install会读取package.json的dependencies并快速安装依赖

    在使用npm install时npm会自动增加package.json中对应依赖

    移除并删除package.json中对应的依赖使用

    ```bash
  npm uninstall 模块名 --save
    ```

  * devDependencies
  
    记录仅在开发阶段用到的依赖,项目上线之后不会用到的依赖
  
    安装开发依赖包使用-D参数
  
    ```bash
    npm install -D moment
    ```
    
    移除并删除package.json中对应的依赖
    
    ```bash
    npm uninstall 模块名 --save-dev
    ```

### 全局包和项目包

项目包 :

​	在npm install时,会被安装到项目的node_modules目录下

全局包 : 

​	在npm install时,如果使用了-g参数,将会想包安装为全局包

​	全局包可以在任意位置被打开,只有工具性质的包才有全局安装的必要性

```bash
npm install -g moment
```

### npm源管理

```bash
# 查看当前源
npm config get registry
# 切换npm源
npm config set registry=https://registry.npm.taobao.org/
```

* nrm

  一个npm源管理工具

  ```bash
  # 安装
  npm install -g nrm
  # 查看所有的镜像源
  nrm ls
  # 切换镜像源为淘宝镜像源
  nrm use taobao
  ```

### npm规范包结构

README.md 包的说明文档

index.js 包的入口文件

package.json 包的配置文件

### 发布npm包

**注意**

* npm包发布72小时后不可删除

登录npm账号(npm源必须为官方源,使用镜像源会导致发布包失败)

```bash
npm login
```

发布

```bash
npm publish
```

## 模块加载机制

模块首次加载后会被缓存,多次require()不会导致模块代码被执行多次

无论内置模块,用户自定义模块,还是第三方模块都会优先从缓存中加载

使用require()时,nodejs会按照以下顺序尝试加载文件

1. 按照完整文件名进行加载
2. 补全.js拓展名进行加载
3. 补全.json拓展名进行加载
4. 补全.node拓展名进行加载
5. 加载失败,报错

模块类型 : 

* 内置模块 : 

  nodejs官方提供的模块,加载优先级最高

* 自定义模块 : 

  加载自定义模块时如果没有指定相对路径标识符(./和../),则nodejs会把他当做内置模块和第三方模块加载

* 第三方模块 : 

  加载第三方模块时,如果没有找到对应的第三方模块,则移动到上一级父目录中尝试加载,知道文件系统的根目录

  当在F:\0Study\FrontEnd\Nodejs\Test\loader.js中require文件中require("print")时,nodejs会按照以下顺序寻找print.js

  1. `F:\0Study\FrontEnd\Nodejs\Test\`node_modules\print
  2. `F:\0Study\FrontEnd\Nodejs\`node_modules\print
  3. `F:\0Study\FrontEnd\`node_modules\print
  4. `F:\0Study\`node_modules\print
  5. `F:\`node_modules\print































# 好用的小工具

## anywhere

**随用随停的静态服务器**

1. 安装

   ```bash
   npm install anywhere -g
   ```

2. 使用

   ```bash
   anywhere
   anywhere --help
   ```

## uglifyjs

JS压缩

```bash
uglifyjs input.js -o output.js
```



## jsdelivr

**请不要随意发布无意义的包并占用宝贵的包名资源**

结合npm的包发布可以作为图床使用

结合npm的包发布以及视频切片可以作为视频源使用(直流使用需要经过处理),建议配合[Dplayer](https://github.com/DIYgod/DPlayer)使用

jsdelivr最大加速仓库为50M,最大单文件加速为20M(未验证)
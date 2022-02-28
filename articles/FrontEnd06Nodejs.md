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

### 跨域访问

浏览器的安全策略默认不允许访问跨域资源

但是存在一些例外

1. 允许访问通过src使用的资源(JSONP仅限get方法)
2. 允许访问带有特定cors响应头的资源

CORS的三个响应头

```javascript
// 指定允许被跨域访问的网站(例子为允许所有外域访问)
res.setHeader("Access-Control-Allow-Origin","*");
// 默认情况cors仅支持get,post,head方法
res.setHeader("Access-Control-Request-Method","POST");
// 默认情况下cors仅支持常见的9个请求头
res.setHeader("Access-Control-Request-Headers","X-PINGOTHER, Content-Type");
```

## https

与http类似

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
 npm init -y
```

- package的重要节点

  * name

    包的名字

  * version

    包的版本

  * main

    包的入口

  * scripts

    快如运行脚本

    ```bash
  npm run scriptName
    ```

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

### npx

* npx主要解决的问题是避免全局安装cli工具

  减少了环境变量的污染并且根据项目不同可以使用不同的cli工具

* 一般的cli工具使用流程(以nrm为例)

  1. 全局安装cli工具

     ```bash
     npm i -g nrm
     ```

  2. 测试可用

     ```
     nrm -v
     ```

     输出版本号

  使用npx工具在项目安装cli工具(测试前请先卸载之前全局安装的nrm)

  1. 项目安装nrm

     ```bash
     npm i nrm
     ```

  2. 测试可用

     ```
     npx nrm -v
     ```

     输出版本号

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

# Express

* Express是Nodejs的Web框架

1. 安装

   ```shell
   npm i express@4.17.1
   ```

2. 新建app.js

   ```
   const express = require("express");
   express().listen(80, () => console.log("express server running at http://127.0.0.1"));
   ```

## express监听get和post

```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("get请求成功"));
app.post("/", (req, res) => res.send("post请求成功"));
app.listen(80);
```

## 启用https

```javascript
const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");

app.get("/", (req, res) => res.send("now is https"))

const httpsOption = {
    key: fs.readFileSync("CA/lisnote.com.key"),
    cert: fs.readFileSync("CA/lisnote.com.pem")
}
https.createServer(httpsOption, app).listen(443);
```

## query和params

req.query是一个包含查询参数的对象

req.params是一个包含动态参数的对象

req.

1. 服务

   ```javascript
   const express = require("express");
   const app = express();
   app.get("/", (req, res) => res.send(req.query));
   app.listen(80);
   ```
   
2. get请求http://127.0.0.1?name=lisnote&gender=1

   ```json
   {
       "name": "lisnote",
       "gender": "1"
   }
   ```

1. 服务

   ```javascript
   const express = require("express");
   const app = express();
   app.get("/:name/:gender", (req, res) => res.send(req.params));
   app.listen(80);
   ```
   
2. get请求http://127.0.0.1/lisnote/1

   ```json
   {
       "name": "lisnote",
       "gender": "1"
   }
   ```

## 路由

基础路由格式为 : express().method(path,handler)

建立user路由

```javascript
const express = require("express");
const app = express();
app.get("/user", (req, res) => res.send("user路由成功"))
app.listen(80);
```

get请求http://127.0.0.1/user

```txt
user路由成功
```

### 路由模块化

新建路由模块`user-router`

```javascript
const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => res.send("get user router"))

module.exports = router;
```

在app.js挂在userRouter路由

```
const express = require("express");
const app = express();
const userRouter = require("./user-router");

app.use(userRouter);

app.listen(80);
```

## 中间件

express中间件的本质是在请求到响应的过程中进行的函数

express中间件使用use()进行挂载,next()函数切换下一个中间件

基本的中间件 :

```javascript
const express = require("express");
const app = express();

let middleware = function (req, res, next) {
    console.log("中间件被执行");
    next();
}
app.use(middleware)
app.get("/", (req, res) => res.send("middleware test"))

app.listen(80);
```

全局中间件

```javascript
app.use(middleware)
```

局部中间件

```javascript
// 等价于app.get("/", [middleware], (req, res)
app.get("/", middleware, (req, res) => res.send("middleware test"))
```

### 中间件级别及运行顺序

执行顺序 : 

1. 应用级别的中间件

   使用app.use,app.get,app.post绑定的中间件

2. 路由级别的中间件

   绑定到express.Router()实例的中间件

3. 错误级别的中间件

   处理错误的中间件,一般格式为(err, req, res, next);

同级别,越靠前越早执行

```
const express = require("express");
const app = express();

let a = function (req, res, next) {
    console.log("a");
    next();
}
let b = (req, res, next) => {
    console.log("b");
    next();
}
app.get("/", [a, b], (req, res) => res.send("middleware test"));

app.listen(80);

// 输出 :
// a
// b
```

完整顺序例子

```javascript
const express = require("express");
const app = express();

let appLevel = (req, res, next) => {
    console.log("application-level middleware");
    next();
};
app.get("/", appLevel, (req, res) => {
    console.log("router-level middleware");
    throw new Error("没错找错");
});
app.use((err, req, res, next) => {
    console.log("error-handing middleware")
    res.send("test success");
})

app.listen(80);
```



### Express内置中间件

* express.static()

  功能 : 设定静态文件服务

  设定服务

  ```javascript
  const express = require("express");
  const app = express();
  app.use(express.static("static"))
  // 该方法的默认文件为index.html
  app.listen(80);
  ```
```
  
新建子目录`static`并在该目录下创建test.txt
  
  ```txt
  test
```

get请求http://127.0.0.1/test.txtf返回

  ```txt
  test
  ```


* express.json()

  功能 : 解析 application/json 格式数据的内置中间件

  ```
  const express = require("express");
  const app = express();
  
  app.post("/", express.json(), (req, res) => res.send(req.body))
  
  app.listen(80);
  ```

  post请求体

  ```json
  {
      "name":"lisnote"
  }
  ```

  返回

  ```json
  {
      "name":"lisnote"
  }
  ```

* express.urlencoded()

  功能 : 解析application/x-www-form-urlencoded 格式数据的中间件

  ```javascript
  const express = require("express");
  const app = express();
  
  app.post("/", express.urlencoded({ extended: false }), (req, res) => res.send(req.body))
  
  app.listen(80);
  ```

  post请求

  | key  | value   | description |
  | ---- | ------- | ----------- |
  | name | lisnote | 用户名      |

  返回

  ```json
  {
      "name":"lisnote"
  }
  ```

### 自定义中间件

* 目标 : 自定义解析表单中间件(功能类似urlencoded)
* 注意点 : 当发送的数据量过大时,客户端会将数据切割并分批发送到服务器,所以req.data事件可能会触发多次

1. 逻辑

   ```javascript
   const express = require("express");
   const app = express();
   const qs = require("querystring");
   
   app.use((req, res, next) => {
       let str = "";
       req.on("data", chunk => str += chunk);
       req.on("end", () => {
           const body = qs.parse(str)
           // 被qs被删除时可以
           // const body = JSON.parse(`{"${decodeURI(str.replace(/=|&/g, data => data == "=" ? '":"' : '","'))}"}`);
           console.log(body);
           req.body = body;
           next();
       });
   })
   app.get("/", (req, res) => res.send(req.body))
   
   app.listen(80);
   ```

2. 模块化

   body-parser

   ```javascript
   const qs = require("querystring");
   
   const bodyParser = (req, res, next) => {
       let str = "";
       req.on("data", chunk => str += chunk);
       req.on("end", () => {
           const body = qs.parse(str)
           console.log(body);
           req.body = body;
           next();
       });
   }
   
   module.exports = bodyParser;
   ```

   app.js

   ```javascript
   const express = require("express");
   const app = express();
   const bodyParser = require("./body-parser")
   
   app.use(bodyParser)
   app.get("/", (req, res) => res.send(req.body))
   
   app.listen(80);
   ```

# Webpack

**打包工具**

* 初始化package.json

  ```
  npm init -y
  ```

* 项目安装webpack, webpack-cli, webpack-dev-server

  "webpack": "^5.69.1",
  "webpack-cli": "^4.9.2"
  
  
  
  ```bash
  npm i -g webpack webpack-cli webpack-dev-server
  ```

## webpack核心概念

* 从webpack 4.0开始,配置文件不再必须,但是仍可根据需求使用配置文件

  ```bash
  webpack --config webpack.config.js
  ```

1. Entry

   指示webpack使用哪个模块构建依赖图,默认值`./src/index.js`

   ```javascript
   module.exports = {
     entry: './path/to/my/entry/file.js',
   };
   ```

2. Output

   指示webpack在哪输出以及定义输出文件名,默认值`./dist/main.js

   ```
   const path = require('path');
   
   module.exports = {
     entry: './path/to/my/entry/file.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'my-first-webpack.bundle.js',
     },
   };
   ```

3. Loaders

   webpack只能处理javascript和json文件,使用loader能让webpack处理其他类型文件

   * webpack不能处理所有类型文件,但能通过import导入任何类型文件

   **test** : 定义需要转换的文件,支持正则

   **use** : 定义处理文件的加载器

   ```javascript
   const path = require('path');
   
   module.exports = {
     output: {
       filename: 'my-first-webpack.bundle.js',
     },
     module: {
       rules: [{ test: /\.txt$/, use: 'raw-loader' }],
     },
   };
   ```

4. Plugins

   loader用于加载特定类型的文件,而插件能做到更多的拓展,例如打包优化,资源管理,注入环境变量等

   ```javascript
   // 生成html文件并自动注入生成的打包文件
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const webpack = require('webpack'); //to access built-in plugins
   
   module.exports = {
     module: {
       rules: [{ test: /\.txt$/, use: 'raw-loader' }],
     },
     plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
   };
   ```

   [更多用例](https://webpack.js.org/concepts/plugins/)

5. Mode

   默认值production,可以设置为development,production

   development不压缩代码

   ```javascript
   module.exports = {
     mode: 'production',
   };
   ```

   不建议在配置文件中设定模式,可以使用运行参数选择模式

   ```bash
   webpack --mode production
   ```

6. Browser Compatibility

   浏览器兼容,暂时不需理会

## 基本常识

[name]为entry中的索引名

[chunkhash]为哈希值,[chunkhash:8]表示8位长度哈希值

## loaders

### css-loader

1. 安装style-loader,css-loader

   ```bash
   npm i -D style-loader css-loader
   ```

2. index.js导入样式文件

   ```javascript
   import "./css/index.css";
   ```

3. webpack.config.js添加loader

   ```javascript
   module.exports = {
       module:{
           rules : [
               {test:/\.css$/,use:["style-loader","css-loader"]},
               {test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]}
           ]
       }
   }
   ```

### scss-loader

## plugins

### clean-webpack-plugin

打包前清除上次生成的打包文件

```bash
npm install -D clean-webpack-plugin
```

基本配置

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```

### html-webpack-plugin

自动解析生成html文件

```bash
npm install -D html-webpack-plugin
```

基本配置

```
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve("../src/index.html")
        })
    ]
}
```

## webpack-dev-server

测试用自动构建,热重载工具

```bash
npm i -D webpack-dev-server
```

基本配置

```javascript
const resolve = dir => require("path").resolve(__dirname, dir);
module.exports = {
    devServer:{
        static: resolve("../dist"),
        port:80
    }
}
```

```bash
webpack-dev-server
// 或
webpack server
```









































# 小工具

## nodemon

**单文件持续集成工具**

1. 安装

```shell
npm i -g nodemon
```

2. 使用

```
nodemon <node项目>
```

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

免费且强大的全球cdn(但是国内内容分发服务器的出了不少次问题)

结合npm的包发布可以作为图床使用

npm经发布72小时即不可撤销,注意隐私保护且勿滥用包名

结合npm的包发布以及视频切片可以作为视频源使用(直流使用需要经过处理),建议配合[Dplayer](https://github.com/DIYgod/DPlayer)使用

jsdelivr最大加速仓库为50M,最大单文件加速为20M(未验证)
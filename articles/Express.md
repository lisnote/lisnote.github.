---
date: 2022-01-25 00:00:00
---

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

# express监听get和post

```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("get请求成功"));
app.post("/", (req, res) => res.send("post请求成功"));
app.listen(80);
```

# 启用https

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

# query和params

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

# 路由

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

## 路由模块化

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

# 中间件

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

## 中间件级别及运行顺序

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



## Express内置中间件

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

## 自定义中间件

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


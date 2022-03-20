---
date: 2022-02-10 00:00:00
---



# Webpack

**目前企业常见打包工具**

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

# webpack核心概念

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

# loaders

* css-loader & scss-loader

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



# plugins

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

# webpack-dev-server

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

## 配置代理

**仅适合开发环境,生产环境建议nginx配置代理**

当被请求的资源不存在时,服务器会自动从被代理的服务器中寻找资源

```javascript
module.exports = {
    devServer:{
        // 代理百度
        proxy: "https://baidu.com"
    }
}
```

```javascript
module.exports = {
    devServer:{
        // 根据不同的路径配置不同代理
        proxy: {
            "/api": {
                target: "https://baidu.com"
                // 替换掉路径中的 /api
                pathRewrite: {"/api",""}
            }
        }
    }
}
```


# 预定义变量

[name]为entry中的索引名

[chunkhash]为哈希值,[chunkhash:8]表示8位长度哈希值
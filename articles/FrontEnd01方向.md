# 方向

## 普通路线

* 阶段一 网页基础

  * HTML
  * CSS

* 阶段二 JavaScript

  * JavaScript入门
  * JQuery入门
  * AJAX入门

* 阶段三 开发工具

  * Git
  * WebPack

* 阶段四 前端框架

  Vue.js

* 阶段五 移动及服务端开发

  移动Web前端开发

  Node.js快速入门与实战

## 大前端知识脉络

### CSS预处理

* SASS 基于Ruby 学习成本高,解析效率高
* LESS 基于NodeJS 学习成本低,解析效率足够

### 原生JS : 按照ECMAScript标准开发

常用ES6标准,但是会webpack打包为ES5支持

目前已经有ES9标准,增加更多新特性

### TypeScript

JavaScript的超集,需要编译成为JS后才能被浏览器正确执行

### JavaScript框架

* JQuery : 简化DOM操作,缺点是DOM操作过于频繁,影响前端性能
* Angular : 将java后台的MVC开发模式搬到了前端,并增加了模块化开发的概念,采用TypeScript语法开发
* React : 高性能JS前端框架,在内存中模拟DOM操作(虚拟DOM),有效提升前端渲染效率,学习成本较高,需要额外学习JSX语言
* Vue : 渐进式JavaScript框架,实现模块化开发,路由,状态管理等新特性,综合了Angular(模块化)和React(虚拟DOM)的优点
* Axios : 前端通信框架 : 因为Vue并不具备通信能力,因此需要额外使用一个通信框架与服务器交互,或是选择JQuery提供的AJAX通信功能

### UI框架

* Ant-Design : 基于React的UI框架

* ElementUI ,iview,ice : 饿了么出品,基于Vue的UI框架

* Bootstrap : Twitter出品前端开源工具包
* AmazeUI : HTML5跨屏前端框架

### JavaScript构建工具

Babel: JS编译工具,主要用于浏览器不支持的ES新特性,比如编译TypeScript

WebPack : 模块打包器,主要作用是打包,压缩,合并及按序加载

### 三端统一

Hybrid App : 主要目的是实现一套代码三端统一(PC,Android,IOS)并能够调用设备底层硬件(传感器,GPS,摄像头等)

打包方式主要为以下两种

* 云打包 : HBuild ->HBuildX
* 本地打包  : Cordova

### 微信小程序

详见微信官网

小程序开发框架(可选) : WeUI

### 后端技术

前端人员为方便开发也需要掌握一定前端技术,但是Java后端庞大复杂,因此出现了NodeJS

NodeJS作者声称已经放弃了NodeJS,开始开发全新架构的Deno

* Express : NodeJS
* Koa : Express简化版
* NPM : 项目管理工具 ,类似于Maven
* YARN : NPM替代方案,类似于Maven和Gradle的关系



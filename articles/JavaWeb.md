# Web的基本概念
## 静态web和动态web
* 静态web
  * html ,css
  * 提供给所有人看的数据始终不会发生变化
  * web无法动态更新,所有用户看到的都是同一个页面
  * 无法和数据库交互
* 动态web
  * 网站数据可以变换的web,提供给每个人不同时间看到的网站都不一样
  * 技术栈 : Servlet/JSP , ASP ,PHP
  * 页面展示效果因人而异
  * 动态web资源出现错误时,需要停机维护,编写后台程序重新发布

* 在java中,动态资源开发技术统称为javaweb

## web应用程序

* web应用程序 : 可被浏览器访问的程序
  * a.html,b.html...多个web资源,这些资源可以被外界访问,对外界提供服务
  * 每个访问的资源,都有对应的计算机提供

* URL : 统一资源定位符
* 一个web应用程序由多个部分组成(静态,动态)
  * html,css,js
  * jsp,servlet
  * java应用程序
  * jar包
  * 配置文件(properties)

# Web服务器讲解

## 技术面
* B/S : 浏览器和服务器
* C/S : 客户端和服务端
* ASP : 
  * 微软 : 国内最早流行的web服务器
  * 在HTML中嵌入VB脚本
  * 在ASP开发中,基本一个页面都有几千行业务代码,页面混乱复杂
  * 维护成本高
  * C#
  * IIS
* PHP
  * 开服速度快,功能强大,,跨平台,代码简单
  * 无法承载大访问量
* JSP :
  * B/S架构
  * 基于java语言(所有大公司,一些开源组件,都是用java写的)
  * 可以解决三高问题(高并发,高性能,高可用)
  * 语法像JSP

## web服务器

* 用于处理用户请求及给用户响应信息
* IIS : Windows自带的web服务器
* Tomcat : 轻量级应用服务器,初学JSP的首选

# Tomca详解

* 目录结构
  * bin : 二进制文件,启动,关闭的脚本
  * conf : 配置文件
  * logs : 日志文件
  * webapps : 网站文件

* Tomcat常识 : 
  * 依赖java环境
  * 默认端口 : 8080
  * 默认网页存放位置 webapps/ROOT/
* 网站结构
```
-- webapps : Tomcat服务器web目录
  -- ROOT : Tomcat默认网站
  -- lisnote.com : 自建网站目录
    -- WEB-INF : 网站信息
      -- classes : java程序
      -- lib : web应用依赖
      --web.xml : 网站配置文件
    -- index.html : 默认首页,index.jsp也可
    -- static : 静态文件目录
```

# Http讲解

* Http : 超文本传输协议

* Https : 安全超文本传输协议

* 历史进程
  * 1.0 : 客户端与web服务器连接后,一次只能获取一个web资源
  * 2.0 : 客户端与web服务器连接后,可一次获取多个web资源

* HTTP请求

  ```
  Request URL: https://www.baidu.com/   请求地址
  Request Method: GET   请求方法(get/post)
  Status Code: 200    状态码 : 200
  Remote Address: 127.0.0.1:10809   远程地址
  ```

  * 请求行:

    请求方式: get, post, head, delete, put...

  * 消息头:

    ```
    Accept: 告诉浏览器自己所支持的数据类型
    Accept-Encoding: 支持的编码格式,如GBK,UTF-8等
    Accept-Language: 告诉浏览器自身的语言环境
    Cache-Control: 缓存控制
    Connection: 告诉浏览器,请求完成断开连接还是保持连接
    HOST: 主机
    Refresh:告诉客户端,多久刷新一次
    Location:让网页重定位
    ```

* HTTP 响应

```
Cache-Control:private   缓存控制
Connection:Keep-Alive   连接
Content-Encoding:gzip   编码
Content-Type:text/html  类型
```

  * 状态码
    * 1XX 信息
    * 2XX 成功
    * 3XX 重定向
    * 4XX 客户端错误
    * 5XX 服务端错误

# Maven环境搭建

* 架构管理工具,方便导入jar包
* maven仓库位置位于国外,因此需要加速可以使用镜像
* 配置本地仓库位置
* 约定大于配置

# IDEA中的maven操作

* 试构建一个JavaWeb应用
  1. 新建maven项目
  2. 选择webapp原型
  3. 配置Tomcat
  4. 运行

# Servlet

* 使用maven创建webapp原型后,使用Servlet需要

  1. 创建java和resource文件夹并标记功能文件夹

  2. 配置pom,引入Servlet依赖,设置打包方式

     
  
  3. 创建类并继承HttpServlet
  
     ```
     import java.io.*;
     import jakarta.servlet.*;
     import jakarta.servlet.http.*;
     
     public class HelloServlet extends HttpServlet {
         @Override
         protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
             resp.setContentType("text/html");
             PrintWriter out = resp.getWriter();
             out.println(req.getRemoteAddr());
         }
     
         @Override
         protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
             super.doPost(req, resp);
         }
     }
     ```

     导入包
  
  4. 在web.xml配置servlet及映射
  
     ```
     <web-app>
       <display-name>Archetype Created Web Application</display-name>
       <servlet>
         <servlet-name>test</servlet-name>
         <servlet-class>com.lisnote.helloServlet.HelloServlet</servlet-class>
       </servlet>
       <servlet-mapping>
         <servlet-name>test</servlet-name>
         <url-pattern>/test</url-pattern>
       </servlet-mapping>
     </web-app>
     ```
  
  5. 访问: localhost:端口号/项目名/test
  
     即可看到Servlet的显示界面

# Servlet原理

1. 浏览器请求web容器(此处以Tomcat为例)
2. web容器读取浏览器地址进行映射
3. web容器产生request和response对象
4. request和response调用Servlet的service方法
5. web容器读取response响应信息
6. web容器响应信息给浏览器

# ServletContext对象

# ServletContext应用

# Response下载文件

# Response重定向

# Request应用

# Cookie讲解

# Session讲解

# JSP原理解析

# JSP基础语法和指令

# JSP内置对象及作用域

# JSP,JSTL标签

# JavaBean及作业

# MVC三层架构

# 过滤器Filter

# 监听器

# 监听器中GUI理解

# Filter实现权限拦截

# JDBC复习

# JDBC事务

# smbms项目搭建

# smbms登录流程实现

# smbms密码修改实现

# ajax验证旧密码实现

# smbms用户管理的底层实现

# smbms用户管理分页OK

# smbms架构分析及方法学习

# 文件传输原理及介绍

# 文件上传及拓展鸡汤

# 邮件发送原理及实现

# 网站注册发送邮件实现

# 之后的学习路线





# 旧笔记
## XML语法

* 元素定义:以<元素>开始,</元素>结束

  ```xml
  <中国>
      <河北>
          <城市>张家界</城市>
          <城市>石家庄</城市>
      </河北>
      <山西>
          <城市>太原</城市>
          <城市>大同</城市>
      </山西>
      <广东>
          <城市>深圳</城市>
          <城市>湛江</城市>
      </广东>
  </中国>
  ```

* 属性定义: 定义元素中的属性

  ```xml
  <售价 单位="元">68</售价>
  ```

* 文档声明:声明文档格式,编码信息,文档独立性信息等

  ```xml
  <?xml version="1.0" encoding="utf-8" standalone="yes"
  ```

* 注释

  ```xml
  <!--注释信息-->
  ```

* 转义字符

  | 特殊字符 | 转义表示 |
  | -------- | -------- |
  | &        | \&amp;       |
  | < | \&lt; |
  | > | \&gt; |
  | " | \&quot; |
  | ' | \&apos; |
  
* CDATA:字符数据,不被程序解析的原始数据

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <java>
  <![CDATA[
      public class Main{
          public static void main(String[] args){
              System.out.println("Hello World");
          }
      }
  ]]>
  </java>
  ```

## 语法约束

* DTD约束:在一个DTD文件中,包含元素的定义,元素之间关系的定义,元素属性的定义以及实体和符号的定义


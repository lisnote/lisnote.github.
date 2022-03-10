[演示](https://lisnote.github.io)

一个简单的笔记blog

# 部署

1. fork本仓库

2. 命名仓库名为 你的用户名.github.io

3. 部署完成,网站地址为 你的用户名.github.io

# 基本用法

* 写好的markdown放到articles文件夹下就可以自动发布
* 在articles/assets/下的目录名如果存在对应的文章,该目录下的background.jpg文件将会成为该文章的标题图片
* 在config.js配置token可提高github api使用次数(每小时5000),还可以开启gitalk留言
* 如果你只用来写markdown,你的笔记库和你的github page可以分开存放,github api允许跨域访问
* articles的非markdown文件及文件夹会被直链导航

# 目录结构

* 不建议改动没有说明的文件

> articles/ : 文章资源的放置目录,其中的md和html将会被索引
>
> > assets/ : 文章资源的放置目录,其中的文件夹名称若对应了某篇文章,该文夹下的background.jpg将会成为文章的封面以及首页图
> >
> > index.html : markdown的载体
> >
> > *.md : 被解析的文章,可以删除
>
> assets/ : 一般资源的放置目录,比如背景,头像等
>
> css/ : 样式文件的放置目录
>
> js/ : js 文件的放置目录
>
> 404.html : 网页请求错误的页面
>
> config.js : 网页的配置内容
>
> favicon.ico : 网页图标
>
> index.html : 网站的主页

# 待办事项

1. 使用range请求头获取文章前部分,并解析yaml语法包含的时间

    以 [{article,time},...] 的格式,用于对文章进行排序,存储至LocalStore
    
    第二次访问对比articles是否相同,相同则不再请求,不同则再次请求

    ```javascript

    ```
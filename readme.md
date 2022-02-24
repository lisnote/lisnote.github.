# 部署

1. fork本仓库
2. 命名仓库名为 你的用户名.github.io

# 目录结构

> articles/ : 文章资源的放置目录,其中的md和html将会被索引
>
> > assets/ : 文章资源的放置目录,其中的文件夹名称若对应了某篇文章,该文夹下的background.jpg将会成为文章的封面以及首页图
> >
> > index.html : md文件的模板
> >
> > *.html : 被索引的网页文章
> >
> > *.md : 被索引并解析的文章
>
> assets/ : 一般资源的放置目录,比如背景,头像等
>
> css/ : 样式文件的放置目录
>
> js/ : js 文件的放置目录
>
> .gitignore : 不建议改动
>
> .nojekyll : 不建议改动
>
> 404.html : 网页请求错误的页面
>
> index.html : 网站的主页
>
> LICENSE : 不建议改动

# 基本用法

* 写好的markdown放到articles文件夹下就可以自动发布
* 在articles/assets/下的目录名如果存在对应的文章,该目录下的background.jpg文件将会成为该文章的标题图片
* 在config.js配置token可提高github api使用次数(每小时5000),还可以开启gitalk留言
* 如果你只用来写markdown,你的笔记库和你的github page可以分开存放,github api允许跨域访问
* articles的非markdown文件及文件夹会被直链导航

# 注意事项

* 请不要删掉一些空白文件,他们也许很重要


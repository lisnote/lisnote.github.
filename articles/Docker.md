---
date: 2020-10-03 00:00:00
---



**文章记录过程中主要使用debian**

# Docker

**使用容器化技术,统一环境,快速上线**

[docker doc](https://docs.docker.com/)

## Docker组成

镜像(image) : 模板,通过镜像可以创建多个服务

容器(container) : 通过镜像进行创建,独立运行一个或一组应用

仓库(repository) : 存放镜像的地方,默认使用DockerHub

## 安装Docker

1. 卸载旧版本

   ```bash
   apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 更新仓库

   ```bash
   apt-get update
   ```

3. 安装依赖包

   ```bash
   apt-get install \
   	ca-certificates \
   	curl \
   	gnupg \
   	lsb-release
   ```

4. 添加docker官方GPG key

   ```bash
   curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

5. 设置docker使用稳定版仓库

   ```bash
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

6. 安装docker社区版

   ```bash
   apt-get update
   apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

7. 验证安装

   ```bash
   docker version
   ```

8. 启动docker

   ```bash
   systemctl start docker
   ```

9. docker hello-world

   ```bash
   docker run hello-world
   # 可以看到输出有 Hello from Docker
   ```


## 配置镜像

以阿里云为例

1. 进入阿里云镜像容器服务页面 : https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

2. 复制加速地址(每个人都不同) : https://2bxdwzs3.mirror.aliyuncs.com

3. 配置daemon文件`/etc/docker/daemon.json`

   ```json
   {
     "registry-mirrors": ["https://2bxdwzs3.mirror.aliyuncs.com"]
   }
   ```

4. 重新加载daemon配置

   ```bash
   systemctl daemon-reload
   ```

5. 重启docker

   ```bash
   systemctl restart docker
   ```


# Docker入门

## 环境确认

```bash
# 获取版本信息
docker version
# 获取系统信息,包括镜像和容器数量
docker info
# 帮助
docker --help
```

## 镜像指令

在docker中镜像是不可变的,镜像只是用于创建容器

查看本地镜像信息

```bash
# 查看镜像
docker images
# 查看所有镜像(包括中间件)
docker images -a
# 只显示镜像id
docker images -q
```

查找镜像

建议在这里查找 : [DockerHub](https://hub.docker.com/)

```bash
# 查找mysql镜像
docker search mysql
# 过滤搜索 : 收藏数大于三千
docker search mysql --filter=STARS=3000
```

下载镜像

```bash
# 下载mysql镜像
# 该指令等价于 docker pull docker.io/library/mysql:latest
docker pull mysql
# 下载指定版本mysql
docker pull mysql:5.7
```

删除镜像

```bash
# 镜像删除可以通过名称和id删除
# 通过名称删除mysql5.7
docker rmi mysql:5.7
# 通过id和强制参数强制删除mysql
docker rmi -f 3218b38490ce
# 删除所有镜像
docker rmi -f $(docker images -aq)
```

## 容器指令

容器会保存我们在镜像之上的操作状态,

镜像实例化即得到容器, 所以先拉取一个centos镜像用于练习

```bash
# 安装centos
docker pull centos
```

创建容器

```bash
# docker run [可选参数] image
# 参数说明 刚接触时不要求全认识
# --name	容器名称
# -d 		后台方式运行
# -it		使用交互方式运行
# -p		容器端口映射 -p 主机端口:容器端口
# -p		随机指定端口
# -e		配置环境变量
# -v		配置数据卷

# 启动及进入容器的交互模式
docker run -it cnetos /bin/bash
```



启动和停止容器

```bash
# 启动容器
docker start 容器id
# 保持容器后台运行并退出容器
# Ctrl + P + Q
# 退出并关闭容器
exit
# 进入正在运行的容器
docker attach 容器id
# 进入正在运行的容器(新终端)
docker exec -it 容器id /bin/bash

# 重启容器
docker restart 容器id
# 停止容器
docker stop 容器id
# 强制停止容器
docker kill 容器id
```

查看容器

```bash
# 列出运行中的容器
docker ps
# 列出历史运行过的容器
docker ps -a
```

删除容器

```bash
# 删除容器
docker rm 容器id
# 强制删除所有容器
docker rm -f $(docker ps -aq)
```

## 查看信息

```bash
# 运行一个bash脚本输出日志
docker run -d centos /bin/bash -c "while true;do echo OutputLog;sleep 1;done"
# 查看日志
docker logs 容器ID
# 查看容器内部信息(环境,id,运行参数等很多相关信息)
docker inspect 容器ID
# 查看docker资源使用情况
docker stats
```

## 文件操作

```bash
# 访问容器内文件
# 创建一个文件在docker容器根目录
docker run centos -d /bin/bash -c "echo inner>/inner"
# output : 06371f7c2b313332fde818088efad86130feb54250f1b421567dafab19e3954b
# 复制刚刚创建的文件到当前目录
docker cp 06371f7c2b31:/inner ./
# 未来将会通过数据卷的技术实现容器内外数据同步
```

## 案例

### 部署tomcat

```bash
# 安装及运行(tomcat默认端口8080)
docker run -d -p 8080:8080 --name tomcat tomcat:9.0
# output : de0a5bfaad58c8475cf714e11750f25075299c3b73a2275f8e27b9de8a177ada
# 访问为404,进入镜像进行配置
docker exec -it tomcat /bin/bash
# 查看webapps文件夹,没有输出说明是空的
ls webapps
# 查看当前目录文件
ls ./
# 发现有webapps.dist文件夹,将改文件夹下的文件复制到webapps
cp -r webapps.dist/* webapps/
# 再访问tomcat,成功
```

## Commit镜像

将容器的状态保存为新的镜像

```bash
docker commit -m "提交的描述信息" -a "作者" 容器id 镜像名
```



### 联合文件系统

一种分层,轻量级,高性能的文件系统,支持对文件系统的修改作为一次提交来层层叠加, 同时可以将不同目录挂载在同一个虚拟文件系统下

镜像通过分层来继承基础镜像, 并记录该对镜像进行的额外操作

Commit可以将对镜像的操作提交,成为一个新的镜像版本



# 应用技术

## 数据卷

将容器中的数据挂载到容器外

且移除容器时, 数据卷不会被移除

```bash
# docker run -it -v 主机目录:容器目录
docker run -it -v /root/volume:/root/volume
touch /root/volume/test
exit
ls /root/volume/
# output test
# 可以看到容器内对/root/volume的操作对容器外的/root/volume生效了
# 查看容器挂载位置
docker volumes inspect 容器id
```

* 匿名挂载

当没有指定容器外目录时, 容器卷会被挂载到`/var/lib/docker/volumes/容器id`

```pash
docker run -it -v /root centos /bin/bash
```

* 具名挂载

当指定挂载名时,容器卷会被挂载到`/var/lib/docker/volumes/卷名`

```bash
docker run -it -v centos:/root centos /bin/bash
```

* 容器卷权限

```bash
# 只读
docker run -it -v /root:ro centos /bin/bash
# 可读可写
docker run -it -v /root:rw centos /bin/bash
```

* 数据卷容器

多个容器共享相同容器的数据卷

```bash
# docker run -it --volume-from 容器id
```

## DockerFile

* 用于构建Docker镜像的脚本

一个简单的Dockerfile案例

```dockerfile
# ./DockerFile
FROM centos
# 挂载数据卷
VOLUME ["/volume"]
# 运行shell指令
CMD echo "DockerFile is running"
```

通过该文件创建Docker镜像

```bash
docker build -f ./DockerFile -t dockerfile .
```

### DockerFile指令

| 指令       | 作用说明                                       | 用例                          |
| ---------- | ---------------------------------------------- | ----------------------------- |
| FROM       | 镜像继承于                                     | FROM centos                   |
| MAINTAINER | 维护信息                                       | MAINTIANER lisnote\<...@...\> |
| RUN        | 镜像构建时需要运行的命令                       | RUN apt-get install vim       |
| COPY       | 复制文件                                       | ADD tomcat.tar.gz             |
| ADD        | 复制文件,会自动解压                            | Add tomcat.tar.gz             |
| WORKDIR    | 启动时自动进入的工作目录                       | WORKDIR /root                 |
| VOLUME     | 挂载数据卷, 类似run -v                         | VOLUME ["/volume"]            |
| EXPOSE     | 暴露端口, 类似run -p                           | EXPOSE 80                     |
| ENV        | 设置环境变量, 类似run -e                       | ENV PATH $PATH:$JAVA_HOME/bin |
| CMD        | 容器启动时运行的指令,可被替代                  | CMD pwd                       |
| ENTRYPOINT | 容器启动时运行的指令<br>不被覆盖和可以追加参数 | ENTRYPOINT pwd                |
| ONBUILD    | 被用于构建时候触发的指令                       | ONBUILD CMD echo 'build'      |

查看其他镜像的构建历史

```bash
docker history 镜像ID
```

### 发布镜像

```bash
docker login
docker push user/容器名:容器版本
```

发布到镜像网站请自行参考镜像网站网站说明

此处以阿里云,发布lisnginx为例

1. 登录[阿里云容器镜像服务](https://cr.console.aliyun.com/cn-shenzhen/instances)

2. 选择个人实例创建免费空间

3. 创建命名空间lisnote

4. 创建仓库

5. 创建凭证密码

   在这里[获取凭证密码](https://cr.console.aliyun.com/cn-shenzhen/instance/credentials)

6. 本地docker登录阿里云

   ```bash
   docker login --username=didongxiaoli registry.cn-shenzhen.aliyuncs.com
   ```

7. 绑定镜像与仓库

   ```bash
   docker tag [ImageId] registry.cn-shenzhen.aliyuncs.com/lisnote/lisnginx:[镜像版本号]
   ```

8. 推送

   ```bash
   docker push lisnode
   ```

9. 在新机器拉取镜像

   ```bash
   docker pull registry.cn-shenzhen.aliyuncs.com/lisnote/lisnginx:[镜像版本号]
   ```

   





## Docker网络

### 网络模式

docker提供了以下四种网络模式

bridge : 桥接模式,docker默认

none : 不配置网络

host : 和宿主机共享网络

container : 容器网络连通

### 容器间通信

### 默认网络参数

容器启动的时候还有一个默认的网络参数

```bash
docker run -d -P tomcat
# 实际上等价于
# docker run -d -P --net bridge tomcat
```

使用默认的方式创建的容器,容器间可以通过主机进行通信,但是存在很多的问题

比如需要主动创建主机端口映射,还有不确定的ip地址等

### 主动创建网络

主动创建网络及指定网络

docker中存在很多种容器通信的方式,这种在真实开发环境中最为常用(在compose中默认使用的组件通信方式)

```bash
# 创建网络
# docker network create --driver bredge --subnet 子网/子网掩码 --gateway 网关 名称
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 innernet
# 查看网络元数据,此时的Containers中还没有数据
docker network inspect innernet
# 创建两个个容器并添加到innernet网络中
docker run -d --name tomcat1 --net innernet tomcat
docker run -d --name tomcat2 --net innernet tomcat
# 查看网络元数据,已经有了以上两个容器
# 进入容器尝试ping通(添加的网络会自动做地址映射)
docker exec -it tomcat1 ping tomcat2
# 新版本的tomcat镜像可能已经删掉了ping指令,安装iputils-ping即可
```

### 网络联通

当两个网段不同,容器又有联通需要的时候

可以将容器同时添加到两个虚拟网络适配器中

```bash
docker run -d --name tomcat3 tomcat
docker exec -it tomcat1 ping tomcat3
# 无法ping通
docker network connect innernet tomcat3
docker exec -it tomcat1 ping tomcat3
# ping通
```

## Compose

当一个服务器中有多个Compose时,每个容器的启动就变得麻烦

通过我个人只制作的docker安装脚本已经有compose

```bash
docker compose version
```

使用DockerCompose便捷的管理多个容器

### compose文件结构

```yaml
version: 版本号

services: 所有的服务都在这里
  服务名:
    image: 容器来源,也可以是build
    volumes: 数据卷
    restart: 重启规则
    environment:环境变量
    ports:端口映射
      - "80:80"
volumes: 数据卷
```



### Compose案例

* wordpress

书写文件`docker-compose.yml`

```yaml
version: "3.9"

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    
  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data: {}
  wordpress_data: {}
```

运行指令

```bash
docker compose up
```

即可运行一个wordpress服务

* 本地服务

比上一个方式启动要慢,但是更加经济的做法

做了一个纯yml启动

```yaml
version: "3.9"
services:
  lisnode:
    build:
      image: registry.cn-shenzhen.aliyuncs.com/lisnote/lisnode
  lisnginx:
    build:
      image: registry.cn-shenzhen.aliyuncs.com/lisnote/lisnginx
    ports:
      - "80:80"
      - "443:443"
```

但是个人的时候,分别管理多个仓库感觉很麻烦

可以使用github仓库,利用github webhook或是github action通知服务器运行下面两行代码即可

```bash
git pull
docker compose up
```

例如我的服务目录是这样的

```markdown
server
├── .git
├── README.md
├── docker-compose.yml
├── lisnginx
│   ├── Dockerfile
│   ├── README.md
│   └── nginx
└── lisnode
    ├── Dockerfile
    ├── InfoServer.js
    ├── README.md
    └── node
```

其中的docker-compose.yml是这样的

```yaml
version: "3.9"
services:
  lisnode:
    build:
      context: ./lisnode/
  lisnginx:
    build:
      context: ./lisnginx/
    ports:
      - "80:80"
      - "443:443"
```

运行指令, 即可更新

## k8s

与docker共同使用的技术,常见于集群管理

优点

* 跨主机容器编排
* 高可用
* 灰度更新
* 自动化部署及更新
* 快速,赶圩拓展容器应用及资源

主要还是提高稳定性和免去集团管理的繁杂

如果学的话可能会另起一篇笔记

# 个人工具集

一些服务器常用的服务

* 启动

```bash
docker compose
```

* 配置开机自启

```bash
cat << EOF > /etc/systemd/system/LisServer
```

习惯于一个容器只为一个程序服务,因此以下的容器的安装路径都将是根目录

## lisnginx

构建时支持的插件

```bash
# 构建参数
./configure \
--prefix=/nginx \
--with-http_v2_module \
--with-http_ssl_module
```

创建一个位于/nginx的绿色版本nginx1.20.2,压缩为nginx.tar.gz

```dockerfile
# DockerFile
FROM debian:bullseye-slim

LABEL name="lisnginx"
LABEL version="1.0.0"
LABEL maintainer="lisnote<lisnote@lisnote.com>"
ENV PATH=$PATH:/nginx/sbin/
WORKDIR /nginx

EXPOSE 80
EXPOSE 443
COPY ./nginx ./nginx
VOLUME /app
CMD ["nginx", "-g", "daemon off;"]
```

## lisnode

node环境下的工具集

### SyncVideo

提供了和朋友远程同步看视频的方法

服务端口 : 10000

* 已移出

### InfoServer

服务器信息查看服务

服务端口 : 10001

```javascript
// InfoServer.js
const http = require('http');
const os = require('os');
let networkInterfaces = os.networkInterfaces();
let remoteAddress;
let port = process.argv[2] || 80;
for (var devName in networkInterfaces) {
  var iface = networkInterfaces[devName];
  for (var i = 0; i < iface.length; i++) {
    var alias = iface[i];
    if (
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
    ) {
      remoteAddress = alias.address;
    }
  }
}
fetch('http://ip-api.com/json')
  .then((resp) => resp.json())
  .then(({ query }) => {
    remoteAddress = query ?? remoteAddress;
  });
http
  .createServer((request, response) => {
    response.setHeader('Content-Type', 'text/json; charset=utf-8');
    let localAddress =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    let userAgent = request.headers['user-agent'];
    let message = {
      localAddress,
      remoteAddress,
      userAgent,
    };
    response.end(JSON.stringify(message));
  })
  .listen(port);
```

编写DockerFile

```dockerfile
# DockerFile
FROM node:18

LABEL name="lisnode"
LABEL version="1.0.0"
LABEL maintainer="lisnote<lisnote@lisnote.com>"

COPY ./SimpleServer.js ./
EXPOSE 10001
CMD ["node","/SimpleServer.js","10001"]
```
































































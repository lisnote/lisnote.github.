---
date: 2020-08-24 14:18:00
---
做笔记时大多数都是CentOS, 但是现在我也不想用CentOS了



# 系统指令

## 用户管理

* 新建用户
* 设置密码
* 删除用户



## 端口管理

* 开放端口

  ```
  firewall-cmd --add-port=3000/tcp --permanent
  ```

* 重新加载防火墙规则

  ```
  firewall-cmd --reload
  ```

* 关闭端口

  ```
  firewall-cmd --remove-port=3000/tcp --permanent
  ```

* 检查防火墙规则

  ```
  firewall-cmd --list-all
  ```

* 显示端口占用情况

  ```
  netstat -ntlp
  ```

* 显示指定端口占用情况

  ```
  lsof -i tcp:80
  ```

## 服务 & 进程

* 打开自启与关闭自启服务

  ```
  systemctl enable frps
  systemctl disable frps
  ```

* 启动,关闭,重启服务

  ```
  systemctl start frps
  systemctl stop frps
  systemctl restart frps
  ```

* 查看服务

  ```
  systemctl status frps
  ```

* 显示服务列表

  ```
  systemctl list-units --type=service
  ```

* 显示进程列表

  ```
  ps -A
  ```

* 创建服务

  于路径`/etc/systemd/system/`下创建`服务名.service`文件

  填写服务内容

  服务内容示例(frps):

  ```
  [Unit]
  Description=Frp Server Service
  After=network.target
  
  [Service]
  Type=simple
  User=nobody
  Restart=on-failure
  RestartSec=5s
  ExecStart=/usr/bin/frps -c /etc/frp/frps.ini
  
  [Install]
  WantedBy=multi-user.target
  ```
  
* 后台相关指令

  ```
  启动进程并在后台运行(仍然会有输出)
  java test &
  启动进程并忽略输出
  nohup java test
  启动进程并在后台运行(忽略输出)
  nohup java test &
  启动进程并同时输出到控制台和文件
  java test|tee -a nohup.out
  查看后台进程
  jobs -l
  进入后台进程
  fg
  暂停当前进程并挂在后台
  ctrl+z
  运行后台暂停的进程
  bg
  ```
  
  * screen后台管理
  
  ```
  # 使用yum安装screen
  yum install screen
  # 创建一个名为test的会话窗口
  screen -S test
  # 暂离窗口
  Ctrl+a d(即按住Ctrl，依次再按a,d)
  # 查看存在的会话窗口
  screen -ls
  # 进入窗口
  screen -r test
  screen -r 进程ID
  # 关闭窗口
  exit
  # 窗口切换
  Ctrl+a c ：在当前screen会话中创建窗口
  Ctrl+a w ：窗口列表
  Ctrl+a n ：下一个窗口
  Ctrl+a p ：上一个窗口
  Ctrl+a 0-9 ：在第0个窗口和第9个窗口之间切换
  ```
  
  
  
  

### RPM(Red Hat Package Manager)

* 安装rpm包

  ```
  rpm -ivh packageName.rpm
  ```

## 系统信息

* 查看系统基本信息

  ```bash
  cat /etc/os-release
  ```

* 查看时间

  ```
  date -R
  ```

* 查看内核/操作系统/CPU信息

  ```
  uname -a
  ```

* 查看处理器信息

  ```
  cat /proc/cpuinfo
  ```

* 查看内存使用量

  ```
  free -m
  ```
  
* 查看linux版本

  ```bash
  lsb_release
  ```

  

## 文件管理

* 创建文件夹

  ```
  mkdir DirName
  ```

* 创建文件

  * linux中有许多指令可以创建文件,包含但不限于`touch`,`echo`,`vim`,`vi`,`nano`

  ```
  touch FileName
  echo >>FileName
  ```

* 删除文件或文件夹

  ```
  rm -r FileName
  ```

* 复制文件或文件夹

  ```
  cp FileName NewFileName
  ```

* 移动和重命名文件或文件夹

  ```
  mv FieldName FileName
  ```

* 下载资源

  ```
  wget DownloadLink
  ```

* 解压文件

  ```
  压缩类型:
  .tar.gz
  .tgz
  解包:
  tar zxvf FileName.tar.gz
  打包:
  tar zcvf FileName.tar.gz DirName
  --------------------------------------
  压缩类型:
  .tar
  解包:
  tar xvf FileName.tar
  打包:
  tar cvf FileName.tar DirName
  ---------------------------------------
  压缩类型:
  .gz
  gzip -d FileName.gz
  ---------------------------------------
  压缩类型:
  .zip
  解包:
  
  ```

## 文件处理

* 文件权限

   赋予所有用户读写权限

  ```
  chmod a+rw sshd_config
  ```

  

### nano

### vi

* 使用vi进入文件后进入普通模式

  普通模式下输入

  ```
  i  切换到插入模式
  c  切换到修改模式
  o  另起一行
  : 命令模式
  ```

  按ecs重新切换会普通模式

* 在命令模式下输入

  ```
  q! 立即退出(不保存
  wq 保存后退出
  ```

  

### vim

#  常规使用

## OpenWrt

### 连接信息

OpenWrt的热点信号(光猫连接需要手动设置网段)

ssh进入192.168.1.1

账号: root

密码: password

### 主路由



## 编译应用

### C++编译环境

* 编译器

  ```
  yum install gcc-c++
  ```

* 安装常用库

  ```
  yum pcre-devel zlib-devel openssl-devel
  ```

### GNU Autotools

* 构建编译环境

  ```
  ./configure
  ```

* 将配置文件编译成可执行的二进制文件

  ```
  ./make
  ```

* 将编译好点二进制文件复制到系统中，并设置应用环境

  ```
  make install
  ```

### CMake项目

* CMake入门
* 编写跨平台代码

# 进阶学习

## SSL自签名秘钥

```

```



## 系统日志

### 常用日志位置

### 常见错误



## 管道

上个指令的输出作为下个指令的输入





# 常用应用

## Nginx

官网: https://nginx.org/

### 常用指令

```
启动
nginx
关闭
nginx -s stop
重新加载配置文件
nginx -s reload
```

### 基本配置

```nginx
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        location / {
            rewrite ^(.*)$ https://$host$1;
        }
    }

    server {
        listen       443 ssl;

        ssl_certificate      "/app/ca/lisnote.com.pem";
        ssl_certificate_key  "/app/ca/lisnote.com.key";
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   html;
            index  index.html index.htm;
            add_header Cache-Control 'no-store, no-cache';
            try_files $uri $uri/ /index.html;
            autoindex_localtime  on;
        }

        location /info {
            proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
            proxy_pass http://localhost:10001;
        }
    }
}
```



### 基本应用

```
# 添加响应头
add_header Cache-Control 'no-store, no-cache';
```

### 常用变量

| 变量名 | 值举例       |
| ------ | ------------ |
| host   | lisnote.com/ |





## VM Ware中的linux

* 想要ping通主机和广域网需要注意以下几点

  ```
  主机和虚拟机存在相同的子网网段连接(Windows中的虚拟网卡不建议DHCP)
  Windows修改文件打印的ipv4入站规则(为什么会是文件打印我也不清楚)
  Windows防火墙规则
  linux防火墙规则
  ```

* 反虚拟机病毒

  通关识别自身位于虚拟机而作出与在实体机器中不同的反应来伪装自身安全性的病毒

  该类病毒的一般识别虚拟机的手段为:

  * 虚拟机特定程序
  * 虚拟机特定网关
  * 虚拟机注册表信息

## Nmap

* 常用指令

  ```
  扫描一个网段所有子网ip  效果同nmap 192.168.0.*
  nmap 192.168.0.0/24
  扫描一个连续的ip
  nmap 192.168.0-50
  扫描一个ip的1到65535的tcp端口
  nmap 192.168.0.10 -p1-65535
  ```



## 应用合辑

## 端口建议

22		  :	SSH

80		  :	Nginx

443		:	Nginx

3306	  :	MySQL

3389	  :	RDP

7000	  :	FRP

8080	  :	StudyTest

10000	:	SimpleServer

10001	:	code-server

25565	:	Minecraft











## 安装

### java17

```
addJava(){
cat << EOF >> /etc/profile
export JAVA_HOME=/app/jdk
export CLASSPATH=\$CLASSPATH:\$JAVA_HOME/lib/
export PATH=\$PATH:\$JAVA_HOME/bin
EOF
wget https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.3%2B7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz
tar zxvf OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz
rm OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz
mv jdk-17.0.3+7/ jdk
java -version
}
addJava
source /etc/profile
```

jdk17 tuna镜像地址 : https://mirrors.tuna.tsinghua.edu.cn/Adoptium/17/jdk/x64/linux/OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz

### SimpleServer

```
# 安装SimpleServer
# 开放端口
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload
# 编写代码文件SimpleServer
# import java.io.InputStream;
# import java.io.OutputStream;
# import java.net.ServerSocket;
# import java.net.Socket;
# 
# public class Main {
#     public static void main(String[] args) {
#         int port = 80;
#         if(args.length>0) port = Integer.parseInt(args[0]);
#         long num = 0;
#         try {
#             ServerSocket serverSocket = new ServerSocket(port);
#             while (true) {
#                 try {
#                     Socket socket = serverSocket.accept();
#                     num++;
#                     if (num % 2 == 0) {
#                         System.out.println(num/2 + "" + socket.getRemoteSocketAddress());
#                     }
#                     Thread socketThread = new SocketThread(socket);
#                     socketThread.start();
#                 } catch (Exception e) {
#                     e.printStackTrace();
#                 }
#             }
#         } catch (Exception e) {
#             e.printStackTrace();
#         }
#     }
# }
# class SocketThread extends Thread {
#     final Socket socket;
# 
#     public SocketThread(Socket socket) {
#         this.socket = socket;
#     }
# 
#     @Override
#     public void run() {
#         try (InputStream inputStream = socket.getInputStream()) {
#             byte[] buffer = new byte[2048];
#             inputStream.read(buffer);
#             String data = "IP:"+socket.getRemoteSocketAddress()+"<br>"+new String(buffer).replace("\n", "<br>");
#             try (OutputStream output = socket.getOutputStream()) {
#                 output.write("HTTP/1.1 200 OK\r\n".getBytes());
#                 output.write("Content-Type: text/html\r\n".getBytes());
#                 output.write(("Content-Length: " + data.length() + "\r\n").getBytes());
#                 output.write("\r\n".getBytes());
#                 output.write(data.getBytes());
#             }
#         } catch (Exception e) {
#             e.printStackTrace();
#         } finally {
#             try {
#                 socket.close();
#             } catch (Exception e) {
#                 e.printStackTrace();
#             }
#         }
#     }
# }
echo -e "import java.io.InputStream;\nimport java.io.OutputStream;\nimport java.net.ServerSocket;\nimport java.net.Socket;\n\npublic class Main {\npublic static void main(String[] args) {\nint port = 80;\nif(args.length>0) port = Integer.parseInt(args[0]);\nlong num = 0;\ntry {\nServerSocket serverSocket = new ServerSocket(port);\nwhile (true) {\ntry {\nSocket socket = serverSocket.accept();\nnum++;\nif (num % 2 == 0) {\nSystem.out.println(num/2 + \"\" + socket.getRemoteSocketAddress());\n}\nThread socketThread = new SocketThread(socket);\nsocketThread.start();\n} catch (Exception e) {\ne.printStackTrace();\n}\n}\n} catch (Exception e) {\ne.printStackTrace();\n}\n}\n}\nclass SocketThread extends Thread {\nfinal Socket socket;\n\npublic SocketThread(Socket socket) {\nthis.socket = socket;\n}\n\n@Override\npublic void run() {\ntry (InputStream inputStream = socket.getInputStream()) {\nbyte[] buffer = new byte[2048];\ninputStream.read(buffer);\nString data = \"IP:\"+socket.getRemoteSocketAddress()+\"<br>\"+new String(buffer).replace(\"\\\\n\", \"<br>\");\ntry (OutputStream output = socket.getOutputStream()) {\noutput.write(\"HTTP/1.1 200 OK\\\\r\\\\n\".getBytes());\noutput.write(\"Content-Type: text/html\\\\r\\\\n\".getBytes());\noutput.write((\"Content-Length: \" + data.length() + \"\\\\r\\\\n\").getBytes());\noutput.write(\"\\\\r\\\\n\".getBytes());\noutput.write(data.getBytes());\n}\n} catch (Exception e) {\ne.printStackTrace();\n} finally {\ntry {\nsocket.close();\n} catch (Exception e) {\ne.printStackTrace();\n}\n}\n}\n}">SimpleServer.java
# 配置开机自启服务simpleserver.service
# [Unit]
# After=network.target
# 
# [Service]
# ExecStart=/app/jdk/bin/java /app/SimpleServer.java
# 
# [Install]
# WantedBy=multi-user.target
echo -e "[Unit]\nAfter=network.target\n\n[Service]\nExecStart=/app/jdk/bin/java /app/SimpleServer.java 10000\n\n[Install]\nWantedBy=multi-user.target">simpleserver.service
mv simpleserver.service /etc/systemd/system/
systemctl enable simpleserver.service
systemctl start simpleserver.service

```

### clash(客户端)

```
# 下载解压初始化
wget https://github.com/Dreamacro/clash/releases/download/v1.8.0/clash-linux-amd64-v1.8.0.gz
gzip -d clash-linux-amd64-v1.8.0.gz
mkdir clash
mv clash-linux-amd64-v1.8.0 clash/clash
cd clash
chmod +x clash
# 下载订阅
mkdir -p ~/.config/clash/
wget -O ~/.config/clash/config.yaml https://sublink.online/api/v1/client/subscribe?token=77ef66812e2327240aff187ec57d6577\&flag=clash
wget -O ~/.config/clash/Country.mmdb https://cdn.jsdelivr.net/gh/Dreamacro/maxmind-geoip@release/Country.mmdb
# 配置开机自启
# [Unit]
# Description=clash daemon
# 
# [Service]
# User=root
# Type=simple
# ExecStart=/app/clash/clash
# Restart=on-failure
# 
# [Install]
# WantedBy=multi-user.target
echo -e "[Unit]\nDescription=clash daemon\n\n[Service]\nUser=root\nType=simple\nExecStart=/app/clash/clash\nRestart=on-failure\n\n[Install]\nWantedBy=multi-user.target">/etc/systemd/system/clash.service
systemctl enable clash.service
systemctl start clash.service
# 增加以下内容至.bashrc以控制流量通过clash
# export http_proxy=http://127.0.0.1:7890
# export https_proxy=http://127.0.0.1:7890
echo -e "\nexport http_proxy=http://127.0.0.1:7890\nexport https_proxy=http://127.0.0.1:7890">>~/.bashrc
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
# 测试curl google.com
# curl google.com
cd ..

```

如果需要访问web界面http://clash.razord.top,还需要进行以下设置

```
# 修改订阅内容config.yaml
# external-controller: '0.0.0.0:7892'
# secret: "Private.825814"
```

### frp

#### 服务端(Cent OS)

```
# 安装frp
wget https://github.com/fatedier/frp/releases/download/v0.36.2/frp_0.36.2_linux_amd64.tar.gz
tar -zxvf frp_0.36.2_linux_amd64.tar.gz
rm -f frp_0.36.2_linux_amd64.tar.gz
mv frp_0.36.2_linux_amd64/ frp/
cd frp
# 修改服务端配置文件frps.ini
# [common]
# bind_port = 3390
# # 明文秘钥请勿输入常用密码
# token = WYqn1Prq4A
cp frps.ini frps.ini.backup
echo -e "[common]\nbind_port = 3390\ntoken = WYqn1Prq4A">frps.ini
# 开放端口
firewall-cmd --add-port=3390/tcp --permanent
firewall-cmd --add-port=3391/tcp --permanent
firewall-cmd --reload
# 配置服务端自启文件frps.service
# [Unit]
# Description=Frp Server Service
# After=network.target
# 
# [Service]
# Type=simple
# User=nobody
# Restart=on-failure
# RestartSec=5s
# ExecStart=/app/frp/frps -c /app/frp/frps.ini
# 
# [Install]
# WantedBy=multi-user.target
echo -e "[Unit]\nDescription=Frp Server Service\nAfter=network.target\n\n[Service]\nType=simple\nUser=nobody\nRestart=on-failure\nRestartSec=5s\nExecStart=/app/frp/frps -c /app/frp/frps.ini\n\n[Install]\nWantedBy=multi-user.target">frps.service
mv frps.service /etc/systemd/system/frps.service
systemctl enable frps
systemctl start frps
cd ..

```

#### 客户端配置(Windows 10)

下载对应版本,解压修改`frpc.ini`

```
[common]
# 0.0.0.0 修改为自己的服务器公网IP
server_addr = 0.0.0.0
server_port = 3390
# 明文秘钥请勿输入常用密码
token = WYqn1Prq4A

[RD Client]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
# 连接时选择的端口
remote_port = 3391
```

在此路径处运行cmd

```
frpc -c frpc.ini
```

* 进行远程连接时请使用3391端口

### Nginx

```
# 安装nginx
# 开放端口
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --add-port=443/tcp --permanent
firewall-cmd --reload
# 安装编译所需依赖
dnf -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
# 获取源码
wget https://nginx.org/download/nginx-1.20.1.tar.gz
tar zxvf nginx-1.20.1.tar.gz
rm -f nginx-1.20.1.tar.gz
cd nginx-1.20.1/
# 配置参数并安装
./configure --prefix=/app/nginx --with-http_ssl_module
make
make install
cd ..
rm -rf nginx-1.20.1/
# 添加环境变量
echo -e "\nexport PATH=$PATH:/app/nginx/sbin\n">>/etc/profile
source /etc/profile
# 配置开机自启服务nginx.servive
# [Unit]
# After=syslog.target network-online.target remote-fs.target nss-lookup.target
# Wants=network-online.target
# 
# [Service]
# Type=forking
# ExecStart=/app/nginx/sbin/nginx
# 
# [Install]
# WantedBy=multi-user.target
echo -e "[Unit]\nAfter=syslog.target network-online.target remote-fs.target nss-lookup.target\nWants=network-online.target\n\n[Service]\nType=forking\nExecStart=/app/nginx/sbin/nginx\n\n[Install]\nWantedBy=multi-user.target">/etc/systemd/system/nginx.service
systemctl enable --now nginx

```

### NodeJS(npm&yarn)

```
# 下载解压
wget https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
tar xf node-v16.13.0-linux-x64.tar.xz
mv node-v16.13.0-linux-x64 node
rm -f node-v16.13.0-linux-x64.tar.xz
# 在/etc/profile修改环境变量
# export PATH=$PATH:/app/node/bin
echo -e "\nexport PATH=$PATH:/app/node/bin">>/etc/profile
source /etc/profile
# 安装全局yarn
npm install -g yarn
```



# 我的脚本

因为经常开新服务器,所以写了一些脚本来配置比较基本的环境
适合Debian X64

[本地存放位置](./assets/Linux.md/DebianBash)

## 写入函数

```bash
source <(curl https://raw.githubusercontent.com/lisnote/lisnote.github.io/main/articles/assets/Linux.md/DebianBash/main)
```

## 提供的函数

```bash
# 初始化函数-----------------------------------
# 运行所有初始化函数
Init
# 为 /use/local/etc/ 建立符号链接 /app ,
CreateAppDir
# 备份重要文件
BackupFile
# SSH防断连
SshConfig
# 设置时区
TimeZoneConfig

# 安装环境--------------------------------------
# 安装Java17
AddJava
# 安装Nginx
AddNginx
# 安装NodeJS16.13
AddNodeJS
```

## 打包

```bash
cat *.sh | tr -d "\r" | sed "/^$/d;/#.*/d">main
```

















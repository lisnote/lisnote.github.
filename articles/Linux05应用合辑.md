# 应用合辑

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











## amd64

### java16

```
# 安装java
wget https://github.com/adoptium/temurin16-binaries/releases/download/jdk-16.0.2%2B7/OpenJDK16U-jdk_x64_linux_hotspot_16.0.2_7.tar.gz
# 解压
tar zxvf OpenJDK16U-jdk_x64_linux_hotspot_16.0.2_7.tar.gz
# 删除压缩包
rm -f OpenJDK16U-jdk_x64_linux_hotspot_16.0.2_7.tar.gz
# 更名
mv jdk-16.0.2+7 jdk
# 增加以下内容至/etc/profile
# export JAVA_HOME=/app/jdk
# export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib/
# export PATH=$PATH:$JAVA_HOME/bin
cp /etc/profile /etc/profile.backup
echo -e "\n\n#PersonalSetting\nexport JAVA_HOME=/app/jdk\nexport CLASSPATH=\$CLASSPATH:\$JAVA_HOME/lib/\nexport PATH=\$PATH:\$JAVA_HOME/bin">>/etc/profile
# 重新加载profile
source /etc/profile

```

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

### V2Ray(服务端)

```
# 安装v2ray
mkdir v2ray
cd v2ray
# 下载并解压
wget https://github.com/v2fly/v2ray-core/releases/download/v4.31.0/v2ray-linux-64.zip
unzip v2ray-linux-64.zip
# 删除压缩包
rm -f v2ray-linux-64.zip
# 修改config.json为以下内容
# {
#   "inbounds": [{
#     "port": 23581,
#     "protocol": "vmess",
#     "settings": {
#       "clients": [
#         {
#           "id": "ceb793e6-49cf-25d8-e4de-ae542e62748e",
#           "level": 1,
#           "alterId": 64
#         }
#       ]
#     }
#   }],
#   "outbounds": [{
#     "protocol": "freedom",
#     "settings": {}
#   },{
#     "protocol": "blackhole",
#     "settings": {},
#     "tag": "blocked"
#   }],
#   "routing": {
#     "rules": [
#       {
#         "type": "field",
#         "ip": ["geoip:private"],
#         "outboundTag": "blocked"
#       }
#     ]
#   }
# }
cp config.json config.json.backup
echo -e "{\n  \"inbounds\": [{\n    \"port\": 23581,\n    \"protocol\": \"vmess\",\n    \"settings\": {\n      \"clients\": [\n        {\n          \"id\": \"ceb793e6-49cf-25d8-e4de-ae542e62748e\",\n          \"level\": 1,\n          \"alterId\": 64\n        }\n      ]\n    }\n  }],\n  \"outbounds\": [{\n    \"protocol\": \"freedom\",\n    \"settings\": {}\n  },{\n    \"protocol\": \"blackhole\",\n    \"settings\": {},\n    \"tag\": \"blocked\"\n  }],\n  \"routing\": {\n    \"rules\": [\n      {\n        \"type\": \"field\",\n        \"ip\": [\"geoip:private\"],\n        \"outboundTag\": \"blocked\"\n      }\n    ]\n  }\n}">config.json
# 开放端口
firewall-cmd --add-port=23581/tcp --permanent
firewall-cmd --reload
# 配置自启文件v2ray.service
# [Unit]
# Description=V2Ray Service
# Documentation=https://www.v2fly.org/
# After=network.target nss-lookup.target
# 
# [Service]
# User=nobody
# CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
# AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
# NoNewPrivileges=true
# ExecStart=/app/v2ray/v2ray -config /app/v2ray/config.json
# Restart=on-failure
# RestartPreventExitStatus=23
# 
# [Install]
# WantedBy=multi-user.target

echo -e "[Unit]\nDescription=V2Ray Service\nDocumentation=https://www.v2fly.org/\nAfter=network.target nss-lookup.target\n\n[Service]\nUser=nobody\nCapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE\nAmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE\nNoNewPrivileges=true\nExecStart=/app/v2ray/v2ray -config /app/v2ray/config.json\nRestart=on-failure\nRestartPreventExitStatus=23\n\n[Install]\nWantedBy=multi-user.target">v2ray.service
mv v2ray.service /etc/systemd/system/v2ray.service
systemctl enable v2ray
systemctl start v2ray
cd ..

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
echo -e "export PATH=$PATH:/app/nginx/sbin">>/etc/profile
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

### code-server(服务端2.0)

```
wget https://github.com/cdr/code-server/releases/download/2.1698/code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz
tar zxvf code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz
rm -f code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz
mv code-server2.1698-vsc1.41.1-linux-x86_64/ code-server
cd code-server/
# 编写内容
# #!/bin/bash
# 
# export PASSWORD=Private.826991
# /app/code-server/code-server --host 0.0.0.0 --port 10001 --auth password
# 
# exit 0
echo -e \#\!"/bin/bash\n\nexport PASSWORD=Private.826991\n/app/code-server/code-server --host 0.0.0.0 --port 10001 --auth password\n\nexit 0">code-server.sh
chmod +x code-server.sh
# 配置开机自启服务
# [Unit]
# After=network.target
# 
# [Service]
# User=root
# ExecStart=/app/code-server/code-server.sh
# 
# [Install]
# WantedBy=multi-user.target
echo -e "[Unit]\nAfter=network.target\n\n[Service]\nUser=root\nExecStart=/app/code-server/code-server.sh\n\n[Install]\nWantedBy=multi-user.target">/etc/systemd/system/code-server.service
systemctl start --now code-server.service
cd ..

```

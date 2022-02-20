# 新服务器指令流

## CentOS 8

为什么会有这种感觉很多余的东西呢?

因为vultr快照服务从2021.10.1开始收费(悲伤)

反复的折腾将会增加不必要的开销

所幸,v2ray网速极快,随用随停的便利还是让我没有放弃他


本指令流包含的任务有

1. 建立快捷链接 `/app`
2. SSH防断链
3. 安装java
4. 安装SimpleServer
5. 安装v2ray(服务端)
6. 安装frp(虽然基本没用)
7. 安装nginx

```
# ----------------------------------------------------------------
# 建立快捷链接
ln -s /usr/local/etc/ /app
echo -e "\n\n\ncd /app">>/root/.bashrc
cd /app
# SSH防自动断连
# ClientAliveInterval 60
# ClientAliveCountMax 10
echo -e "\nClientAliveInterval 60\\nClientAliveCountMax 10">>/etc/ssh/sshd_config


# ----------------------------------------------------------------
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



# ----------------------------------------------------------------
# 安装SimpleServer
# 开放端口
firewall-cmd --add-port=10000/tcp --permanent
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
# ExecStart=/app/jdk/bin/java /app/SimpleServer.java 10000
# 
# [Install]
# WantedBy=multi-user.target
echo -e "[Unit]\nAfter=network.target\n\n[Service]\nExecStart=/app/jdk/bin/java /app/SimpleServer.java 10000\n\n[Install]\nWantedBy=multi-user.target">simpleserver.service
mv simpleserver.service /etc/systemd/system/
systemctl enable simpleserver.service
systemctl start simpleserver.service



# ----------------------------------------------------------------
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



# ----------------------------------------------------------------
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



# -----------------------------------------------------------------
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
./configure --prefix=/app/nginx
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
systemctl enable --now nginx.service
# 注意配置nginx.conf


```



## Ubuntu

```
# 设定root密码并登录
sudo passwd root
su
# 允许root登录
echo -e "\n\nPermitRootLogin yes">>/etc/ssh/sshd_config
# 防断连
echo -e "\nClientAliveInterval 60\\nClientAliveCountMax 10">>/etc/ssh/sshd_config
systemctl restart ssh

```



```
# --------------------------------------------------------------
# 安装clash


# ----------------------------------------------------------------
# 建立快捷链接
ln -s /usr/local/etc/ /app
echo -e "\n\n\ncd /app">>/root/.bashrc
cd /app



# -----------------------------------------------------------------
# 安装nginx
# 安装依赖
sudo apt-get update
sudo apt-get install build-essential libtool
sudo apt-get update
sudo apt-get install libpcre3 libpcre3-dev zlib1g-dev openssl libssl-dev
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

```






























































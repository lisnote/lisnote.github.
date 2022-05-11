#!/bin/bash

AddNginx(){
# 安装编译支持库
apt-get update && sudo apt-get upgrade -y
apt-get install build-essential libpcre3 libpcre3-dev zlib1g-dev git -y
# 下载构建所需文件
mkdir nginx_build && cd nginx_build
wget -c https://nginx.org/download/nginx-1.20.2.tar.gz
tar zxf nginx-1.20.2.tar.gz && rm nginx-1.20.2.tar.gz
# 编译安装
cd nginx-1.20.2
./configure \
--prefix=/app/nginx \
--with-http_v2_module
--with-http_ssl_module
make
make install
# 清理构建文件
cd ../..
rm -rf nginx_build
# 配置服务及环境变量
echo -e "\nexport PATH=\$PATH:/app/nginx/sbin\n" >> /etc/profile
source /etc/profile
nginx -v
IsSuccess "nginx编译安装"
cat << EOF >> /etc/systemd/system/nginx.service
[Unit]
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
ExecStart=/app/nginx/sbin/nginx

[Install]
WantedBy=multi-user.target
EOF
systemctl enable nginx.service
IsSuccess "nginx自启配置"
}
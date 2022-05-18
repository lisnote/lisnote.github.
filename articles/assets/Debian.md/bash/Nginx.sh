#!/bin/bash

AddNginx(){
# 安装编译支持库
apt-get update && sudo apt-get upgrade -y
apt-get install build-essential libpcre3 libpcre3-dev zlib1g-dev git libssl-dev -y
# 下载构建所需文件
mkdir nginx_build && cd nginx_build
wget -c https://nginx.org/download/nginx-1.20.2.tar.gz
tar zxf nginx-1.20.2.tar.gz && rm nginx-1.20.2.tar.gz
# 编译安装
cd nginx-1.20.2
./configure \
--prefix=/app/nginx \
--with-http_v2_module \
--with-http_ssl_module
make
make install
# 清理构建文件
cd ../..
rm -rf nginx_build
# 配置服务及环境变量
ln -s /app/nginx/sbin/nginx /usr/local/sbin/nginx
source /etc/profile
nginx -v
IsSuccess "nginx编译安装"
cat << EOF > /etc/systemd/system/nginx.service
[Unit]
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
ExecStart=/app/nginx/sbin/nginx

[Install]
WantedBy=multi-user.target
EOF

systemctl enable --now nginx.service
IsSuccess "nginx自启配置"
# 替换配置
cat << EOF > /app/nginx/conf/nginx.conf
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
            rewrite ^(.*)$ https://\$host\$1;
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
            try_files \$uri \$uri/ /index.html;
            autoindex_localtime  on;
        }

        location /info {
            proxy_set_header x-forwarded-for \$proxy_add_x_forwarded_for;
            proxy_pass http://localhost:10001;
        }
    }
}
EOF
}

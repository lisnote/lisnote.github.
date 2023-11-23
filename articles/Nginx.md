---
date: 2022-06-26 00:50:40
---

**本应在linux.常用应用中的nginx,由于要记录的东西越来越多不得不另起一个markdown**

# Nginx

基本功能 : 

1. 反向代理
2. 负载均衡
3. 可用性探测
4. HTTP,SMTP,RTMP等服务(网页,邮件,直播)
5. 有着丰富的插件

# 入门

## 安装

1. 安装

   安装方式常有两种, 各有优缺点

   **方式1** : 快速安装

   优点 : 便捷,但是各个文件比较分散,且未必有自己所需要的模块(一般都有负载均衡和网页服务)

   ```bash
   apt install nginx -y
   ```

   **方式2** : 编译安装

   自定义程度很高,但小白很有可能遇到无法解决的问题

   以nginx1.20.2为例,编译安装一个具有网页服务功能的nginx

   ```bash
   # 安装编译支持库
   apt-get update && apt-get upgrade -y
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
   
   # 配置服务
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
   ```

2. 测试安装

   ```bash
   # 查看版本 验证环境变量(软链)
   nginx -v
   # 显示版本号即为正常
   
   # 启动服务及设置开机自启 验证服务配置
   systemctl enable --now nginx.service
   curl localhost
   # 显示nginx欢迎页即为正常
   ```

## 控制台指令

```bash
nginx # 启动nginx
nginx -h # 帮助
nginx -c <配置文件路径> # 启动并指定配置文件
nginx -s quit # 安全退出
nginx -s stop # 立即退出
nginx -s reload # 重载配置文件
```

## 配置指令

### 基本概念

指令 : nginx配置文件的配置项

指令上下文 : 指令之间有层级关系,指令的上层为他所属的上下文,上下文之间亦可嵌套

变量 : nginx及其模块有默认变量,并支持用户自定义变量

配置案例 (默认配置) : 

```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}


#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}
```



### 指令表

| **指令**                               | 语法                                                         | 默认配置                             | 上下文                                               |
| -------------------------------------- | ------------------------------------------------------------ | ------------------------------------ | ---------------------------------------------------- |
| **absolute_redirect**                  | absolute_redirect on \| off;                                 | absolute_redirect on;                | http, server, location                               |
| **accept_mutex**                       | accept_mutex on \| off;                                      | off                                  | Events                                               |
| **accept_mutex_delay**                 | accept_mutex_delay time;                                     | accept_mutex_delay 500ms;            | Events                                               |
| **access_log (ngx_http_log_module)**   | access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]]; access_log off; | access_log logs/access.log combined; | http, server, location, if in location, limit_except |
| **access_log (ngx_stream_log_module)** | access_log path format [buffer=size] [gzip[=level]] [flush=time] [if=condition]; access_log off; | access_log off;                      | stream, server                                       |
| **add_after_body**                     | add_before_body uri;                                         | -                                    | http, server, location                               |
| **add_before_body**                    | add_before_body uri;                                         | -                                    | http, server, location                               |
| **add_header**                         | add_header name value [always];                              | -                                    | http, server, location, if in location               |
| **add_trailer**                        | add_trailer name value [always];                             | -                                    | http, server, location, if in location               |
| **addition_types**                     | addition_types mime-type ...;                                | addition_types text/html;            | http, server, location                               |
| **aio**                                | aio on \| off \| threads[=pool];                             | aio off;                             | http, server, location                               |
| **aio_write**                          | aio_write on \| off;                                         | aio_write off;                       | http, server, location                               |
| **alias**                              | alias path;                                                  | -                                    | Location                                             |
| **allow (ngx_http_access_module)**     | allow address \| CIDR \| unix: \| all;                       | -                                    | http, server, location, limit_except                 |
| **allow (ngx_stream_access_module)**   | allow address \| CIDR \| unix: \| all;                       | -                                    | Stream, server                                       |
| **ancient_browser**                    | ancient_browser string ...;                                  | -                                    | http, server, location                               |
| **ancient_browser_value**              | ancient_browser_value string;                                | ancient_browser_value 1;             | http, server, location                               |
| **api**                                | api [write=on\|off];                                         | -                                    | location                                             |
| **auth_basic**                         | auth_basic string \| off;                                    | auth_basic off;                      | http, server, location, limit_except                 |
| **auth_basic_user_file**               | auth_basic_user_file file;                                   | -                                    | http, server, location, limit_except                 |
| **auth_http**                          | auth_http URL;                                               | -                                    | mail, server                                         |
| **auth_http_header**                   | auth_http_header header value;                               | -                                    | mail, server                                         |
| **auth_http_pass_client_cert**         | auth_http_pass_client_cert on \| off;                        | auth_http_pass_client_cert off;      | mail, server                                         |
| **auth_http_timeout**                  | auth_http_timeout time                                       | auth_http_timeout 60s;               | mail, server                                         |
| **auth_jwt**                           | auth_jwt string [token=$variable] \| off;                    | auth_jwt off;                        | http, server, location, limit_except                 |
| **auth_jwt_claim_set**                 | auth_jwt_claim_set $variable name ...;                       | -                                    | http                                                 |
| **auth_jwt_header_set**                | auth_jwt_header_set $variable name ...;                      | -                                    | http                                                 |
| **auth_jwt_key_file**                  | auth_jwt_key_file file;                                      | -                                    | ttp, server, location, limit_except                  |



### 变量表

| **变量**                                                  | 描述                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| **$ancient_browser**                                      | 如果浏览器被识别为古浏览器，则此变量用于等于由 ancient_browser_value 指令设置的值。 |
| **$arg_name**                                             | 请求行中参数的名称。                                         |
| **$args**                                                 | 请求行上的参数列表。                                         |
| **$binary_remote_addr (ngx_http_core_module)**            | 二进制形式的客户端地址。IP4 地址的值长度始终为 4 个字节，IPv6 地址的值长度始终为 16 个字节。 |
| **$binary_remote_addr (ngx_stream_core_module)**          | 二进制形式的客户端地址。IP4 地址的值长度始终为 4 个字节，IPv6 地址的值长度始终为 16 个字节。 |
| **$body_bytes_sent**                                      | 发送到客户端的字节数，不计算响应头。                         |
| **$bytes_received**                                       | 从客户端接收的字节数。                                       |
| **$bytes_sent (ngx_http_core_module)**                    | 发送到客户端的字节数。                                       |
| **$bytes_sent (ngx_http_log_module)**                     | 发送到客户端的字节数。                                       |
| **$bytes_sent (ngx_stream_core_module)**                  | 发送到客户端的字节数。                                       |
| **$connection (ngx_http_core_module)**                    | 连接序列号                                                   |
| **$connection (ngx_http_log_module)**                     | 连接序列号                                                   |
| **$connection (ngx_stream_core_module)**                  | 连接序列号                                                   |
| **$connection_requests (ngx_http_core_module)**           | 当前通过连接发出的请求数。                                   |
| **$connection_requests (ngx_http_log_module)**            | 当前通过连接发出的请求数。                                   |
| **$connections_active**                                   | 与**活动连接**值相同                                         |
| **$connections_reading**                                  | 与**读取**值相同                                             |
| **$connections_waiting**                                  | 与**等待**值相同                                             |
| **$connections_writing**                                  | 与写入值相同。                                               |
| **$content_length**                                       | “内容长度”请求头字段。                                       |
| **$content_type**                                         | “内容类型”请求头域                                           |
| **$cookie_name**                                          | 饼干的名字                                                   |
| **$date_gmt**                                             | GMT（格林威治标准时间）的当前时间。要设置格式，请使用带有*timefmt*参数的*config*命令。 |
| **$date_local**                                           | 本地时区的当前时间。要设置格式，请使用带有*timefmt*参数的*config*命令。 |
| **$document_root**                                        | 当前请求的 root 或 alias 指令的值。                          |
| **$document_uri**                                         | 它与 $uri 相同。                                             |
| **$fastcgi_path_info**                                    | 使用 fastcgi_split_path_info 指令时，$fastcgi_script_name 变量等于该指令设置的第一个捕获的值。以及由 fastcgi_split_path_info 指令设置的第二次捕获的值。此变量用于设置 PATH_INFO 参数。 |
| **$fastcgi_script_name**                                  | 请求 URI（统一资源标识符），或者，如果 URI 以斜杠结尾，则请求 URI 并附加由 fastcgi_index 指令配置的索引文件名。 |
| **$geoip_area_code (ngx_http_geoip_module)**              | 电话区号（仅限美国）。此变量可能包含一些过时的信息，因为相应的数据库字段已被弃用。 |
| **$geoip_area_code (ngx_stream_geoip_module)**            | 电话区号（仅限美国）。此变量可能包含过时的信息，因为不推荐使用相应的数据库字段。 |
| **$geoip_city (ngx_http_geoip_module)**                   | 城市名称，例如“华盛顿”、“莫斯科”。                           |
| **$geoip_city (ngx_stream_geoip_module)**                 | 城市名称，例如“华盛顿”、“莫斯科”。                           |
| **$geoip_city_continent_code (ngx_http_geoip_module)**    | 两个字母的大陆代码。例如，“NA”、“EU”。                       |
| **$geoip_city_continent_code (ngx_stream_geoip_module)**  | 两个字母的大陆代码。例如，“NA”、“EU”。                       |
| **$geoip_city_country_code (ngx_http_geoip_module)**      | 两个字母的大陆代码。例如，“NA”、“EU”。                       |
| **$geoip_city_country_code (ngx_http_geoip_module)**      | 两个字母的国家/地区代码。例如，“RU”、“美国”。                |
| **$geoip_city_country_code (ngx_stream_geoip_module)**    | 两个字母的国家/地区代码。例如，“RU”、“美国”。                |
| **$geoip_city_country_code3 (ngx_http_geoip_module)**     | 三个字母的国家/地区代码。例如，“俄罗斯”、“美国”。            |
| **$geoip_city_country_code3 (ngx_stream_geoip_module)**   | 三个字母的国家/地区代码。例如，“俄罗斯”、“美国”。            |
| **$geoip_city_country_name (ngx_http_geoip_module)**      | 国家名称。例如，“印度”、“美国”。                             |
| **$geoip_city_country_name (ngx_stream_geoip_module)**    | 国家名称。例如，“印度”、“美国”。                             |
| **$geoip_country_code (ngx_http_geoip_module)**           | 两个字母的国家/地区代码。例如，“RU”、“美国”。                |
| **$geoip_country_code (ngx_stream_geoip_module)**         | 两个字母的国家/地区代码。例如，“RU”、“美国”。                |
| **$geoip_country_code3 (ngx_http_geoip_module)**          | 三个字母的国家/地区代码。例如，“俄罗斯”、“美国”。            |
| **$geoip_country_code3 (ngx_stream_geoip_module)**        | 三个字母的国家/地区代码。例如，“俄罗斯”、“美国”。            |
| **$geoip_country_name (ngx_http_geoip_module)**           | 国家名称。例如，“印度”、“美国”。                             |
| **$geoip_country_name (ngx_stream_geoip_module)**         | 国家名称。例如，“印度”、“美国”。                             |
| **$geoip_dma_code (ngx_http_geoip_module)**               | 根据 Google AdWords API 中的地理定位，它是美国的 DMA（指定市场区域）代码或地铁代码。 |
| **$geoip_dma_code (ngx_stream_geoip_module)**             | 根据 Google AdWords API 中的地理定位，它是美国的 DMA（指定市场区域）代码或地铁代码。 |
| **$geoip_latitude (ngx_http_geoip_module)**               | 纬度。                                                       |
| **$geoip_latitude (ngx_stream_geoip_module)**             | 纬度。                                                       |
| **$geoip_longitude (ngx_http_geoip_module)**              | 经度                                                         |
| **$geoip_longitude (ngx_stream_geoip_module)**            | 经度                                                         |
| **$geoip_org (ngx_http_geoip_module)**                    | 组织名称。例如“加州大学”。                                   |
| **$geoip_org (ngx_stream_geoip_module)**                  | 组织名称。例如“加州大学”。                                   |
| **$geoip_postal_code (ngx_http_geoip_module)**            | 邮政编码。                                                   |
| **$geoip_postal_code (ngx_stream_geoip_module)**          | 邮政编码。                                                   |
| **$geoip_region (ngx_http_geoip_module)**                 | 地区名称（省、地区、州、联邦土地、领土），例如，莫斯科市，DC。 |
| **$geoip_region (ngx_stream_geoip_module)**               | 地区名称（省、地区、州、联邦土地、领土），例如，莫斯科市，DC。 |
| **$geoip_region_name (ngx_http_geoip_module)**            | 国家/地区名称（（省、地区、州、联邦土地、领土），例如“莫斯科市”、“哥伦比亚特区”。 |
| **$geoip_region_name (ngx_stream_geoip_module)**          | 国家/地区名称（（省、地区、州、联邦土地、领土），例如“莫斯科市”、“哥伦比亚特区”。 |
| **$gzip_ratio**                                           | 它是实现的压缩率，计算为原始响应大小和压缩响应大小之间的比率。 |
| **$host**                                                 | 来自请求行的主机名，来自主机请求头字段的主机名，或匹配请求的服务器名, 例如 "lisnote.com/" |
| **$hostname (ngx_http_core_module)**                      | 主机名。                                                     |
| **$hostname（ngx_stream_core_module）**                   | 主机名。                                                     |
| **$http2**                                                | 协商协议标识符：h2 表示基于 TLS 的 HTTP/2，h2c 表示基于明文 TCP 的 HTTP/2，否则为空字符串。 |
| **$http_name**                                            | 它是任意的请求头字段：变量名的最后一部分是字段名，它被转换为小写，破折号被下划线代替。 |
| **$https**                                                | 如果连接在 SSL 模式下运行，则它为“on”，否则为空字符串。      |
| **$invalid_referer**                                      | 如果认为“Referer”请求头字段值有效，则字符串为空，否则为 1。  |
| **$is_args**                                              | “？” 如果请求行有参数，否则为空字符串。                      |
| **$jwt_claim_name**                                       | 它返回指定 JWT（JSON Web 令牌）声明的值。                    |
| **$jwt_header_name**                                      | 返回指定 JOSE（JavaScript 对象签名和加密）标头的值。         |
| **$limit_rate**                                           | 设置此变量可启用响应率限制。                                 |
| **$memcached_key**                                        | 定义从 memcached 服务器获取响应的键。                        |
| **$modern_browser**                                       | 如果浏览器被识别为现代浏览器，则等于由 modern_browser_value 指令设置的值。 |
| **$msec（ngx_http_core_module）**                         | 当前时间（以秒为单位），分辨率为 ms（毫秒）。                |
| **$msec（ngx_http_log_module）**                          | 以秒为单位的时间，日志写入时的毫秒分辨率。                   |
| **$msec（ngx_stream_core_module）**                       | 当前时间（以秒为单位），分辨率为 ms（毫秒）。                |
| **$msie**                                                 | 如果浏览器被识别为任何版本的 MSIE (Microsoft Internet Explorer)，则等于 1。 |
| **$nginx_version (ngx_http_core_module)**                 | 显示nginx版本                                                |
| **$nginx_version (ngx_stream_core_module)**               | Nginx 版本。                                                 |
| **$pid (ngx_http_core_module)**                           | 工作进程的PID（进程ID）。                                    |
| **$pid (ngx_stream_core_module)**                         | 工作进程的PID（进程ID）。                                    |
| **$pipe (ngx_http_core_module)**                          | “p”如果请求是流水线的，“。” 否则。                           |
| **$pipe (ngx_http_log_module)**                           | “p”如果请求是流水线的，“。” 否则。                           |
| **$protocol**                                             | 用于与客户端通信的协议：UDP 或 TCP。                         |
| **$proxy_add_x_forwarded_for**                            | 附加了 $remote_addr 变量的“X-Forwarded-For”客户端请求标头字段，用逗号分隔。如果客户端请求标头中不存在“X-Forwarded-For”字段，则 $proxy_add_x_forwarded_for 变量等于 $remote_addr 变量。 |
| **$proxy_host**                                           | proxy_pass 指令中指定的代理服务器的名称和端口。              |
| **$proxy_port**                                           | proxy_pass 指令中指定的代理服务器的端口，或协议的默认端口。  |
| **$proxy_protocol_addr (ngx_http_core_module)**           | 来自 PROXY 协议标头的客户端地址，否则为空字符串。必须先启用 PROXY 协议。这可以通过在 listen 指令中设置代理协议参数来完成。 |
| **$proxy_protocol_addr (ngx_stream_core_module)**         | 来自 PROXY 协议标头的客户端地址，否则为空字符串。必须先启用 PROXY 协议。这可以通过在 listen 指令中设置代理协议参数来完成。 |
| **$proxy_protocol_port (ngx_http_core_module)**           | 来自 PROXY 协议标头的客户端地址，否则为空字符串。必须先启用 PROXY 协议。这可以通过在 listen 指令中设置代理协议参数来完成。 |
| **$proxy_protocol_port (ngx_stream_core_module)**         | 来自 PROXY 协议标头的客户端地址，否则为空字符串。必须先启用 PROXY 协议。这可以通过在 listen 指令中设置代理协议参数来完成。 |
| **$query_string**                                         | 与 $args 相同                                                |
| **$realip_remote_addr (ngx_http_realip_module)**          | 它用于保留原始客户端地址。                                   |
| **$realip_remote_addr (ngx_stream_realip_module)**        | 它用于保留原始客户端地址。                                   |
| **$realip_remote_port (ngx_http_realip_module)**          | 它用于保留原始客户端地址。                                   |
| **$realip_remote_port (ngx_stream_realip_module)**        | 它用于保留原始客户端地址。                                   |
| **$realpath_root**                                        | 与当前请求的别名或根指令值相对应的绝对路径名，所有符号链接都解析为实际路径。 |
| **$remote_addr (ngx_http_core_module)**                   | 客户地址                                                     |
| **$remote_addr (ngx_stream_core_module)**                 | 客户地址                                                     |
| **$remote_port (ngx_http_core_module)**                   | 客户端端口                                                   |
| **$remote_port (ngx_stream_core_module)**                 | 客户端端口                                                   |
| **$remote_user**                                          | 基本身份验证提供的用户名。                                   |
| **$request**                                              | 完整的原始请求行。                                           |
| **$request_body**                                         | 当请求正文被读取到 memory_buffer 时，该变量的值在由 proxy_pass 和 scgi_pass 指令处理的位置中可用。 |
| **$request_body_file**                                    | 带有请求正文的临时文件的名称。                               |
| **$request_completion**                                   | 如果请求已完成，则值为“OK”，否则为空字符串。                 |
| **$request_filename**                                     | 当前请求的文件路径，基于根或别名指令，以及请求 URI。         |
| **$request_id**                                           | 从 16 个随机字节生成的唯一请求标识符，以十六进制表示。       |
| **$request_length (ngx_http_core_module)**                | 请求长度（请求行、请求正文和标头）。                         |
| **$request_length (ngx_http_log_module)**                 | 请求长度（请求行、请求正文和标头）。                         |
| **$request_method**                                       | 请求方法。通常是“GET”或“POST”。                              |
| **$request_time (ngx_http_core_module)**                  | 以毫秒为单位的请求处理时间；从客户端读取第一个字节以来经过的时间。 |
| **$request_time (ngx_http_log_module)**                   | 以毫秒为单位的请求处理时间；从客户端读取第一个字节到最后一个字节发送到客户端后写入日志之间经过的时间。 |
| **$request_uri**                                          | 带有参数的完整原始请求 URI（统一资源标识符）。               |
| **$scheme**                                               | 请求方案可能是 http 或 https                                 |
| **$secure_link**                                          | 显示链接检查的状态，其值取决于所选的操作模式。               |
| **$secure_link_expires**                                  | 请求中传递的链接的生命周期；                                 |
| **$sent_http_name**                                       | 它是任意的响应头域；变量名的最后一部分是转换为小写的字段名称，破折号由下划线代替。 |
| **$sent_trailer_name**                                    | 响应结束时发送的任意字段；变量名的最后一部分是转换为小写的字段名称，破折号由下划线代替。 |
| **$server_addr (ngx_http_core_module)**                   | 接受请求的服务器地址。计算这个变量的值需要一个系统调用。     |
| **$server_addr (ngx_stream_core_module)**                 | 接受请求的服务器地址。计算这个变量的值需要一个系统调用。     |
| **$server_name**                                          | 接受请求的服务器名称。                                       |
| **$server_port (ngx_http_core_module)**                   | 接受请求的服务器端口。                                       |
| **$server_port (ngx_stream_core_module)**                 | 接受连接的服务器端口。                                       |
| **$server_protocol**                                      | 它是一个请求协议，通常是 HTTP/1.0、HTTP/1.1 或 HTTP/2.0。    |
| **$session_log_binary_id**                                | 二进制形式的当前会话 ID。                                    |
| **$session_log_id**                                       | 当前会话 ID。                                                |
| **$session_time**                                         | 以毫秒为单位的会话持续时间，精度为毫秒。                     |
| **$slice_range**                                          | HTTP 字节范围格式的当前切片范围。例如字节=0-1048575          |
| **$spdy**                                                 | SPDY（发音为快速）连接的 SPDY 协议版本，否则为空字符串。     |
| **$spdy_request_priority**                                | 请求 SPDY（发音为快速）连接的优先级，否则为空字符串。        |
| **$ssl_cipher (ngx_http_ssl_module)**                     | 返回用于已建立的 SSL（安全套接字层）连接的密码字符串。       |
| **$ssl_cipher (ngx_stream_ssl_module)**                   | 返回用于已建立的 SSL（安全套接字层）连接的密码字符串。       |
| **$ssl_ciphers (ngx_http_ssl_module)**                    | 它将返回客户端支持的密码列表。这里，已知密码按名称列出，未知密码以十六进制显示，例如，AES128-SHA:AES256-SHA:0x00ff |
| **$ssl_ciphers (ngx_stream_ssl_module)**                  | 它将返回客户端支持的密码列表。这里，已知密码按名称列出，未知密码以十六进制显示，例如，AES128-SHA:AES256-SHA:0x00ff |
| **$ssl_client_cert (ngx_http_ssl_module)**                | 它会返回在PEM（增强保密邮件）的客户端证书建立SSL连接，其中每行除了1日前面添加制表符。 |
| **$ssl_client_cert (ngx_stream_ssl_module)**              | 它会返回在PEM（增强保密邮件）的客户端证书建立SSL连接，其中每行除了1日前面添加制表符。 |
| **$ssl_client_escaped_cert**                              | 它将为已建立的 SSL 连接返回 PEM（隐私增强邮件）中的客户端证书 |
| **$ssl_client_fingerprint (ngx_http_ssl_module)**         | 它将为已建立的 SSL 连接返回客户端证书的 SHA1（安全哈希算法）指纹。 |
| **$ssl_client_fingerprint (ngx_stream_ssl_module)**       | 它将为已建立的 SSL 连接返回客户端证书的 SHA1（安全哈希算法）指纹。 |
| **$ssl_client_i_dn (ngx_http_ssl_module)**                | 根据 RFC 2253，为已建立的 SSL 连接返回客户端证书的“颁发者 DN”（其中 DN 是专有名称）字符串。 |
| **$ssl_client_i_dn (ngx_stream_ssl_module)**              | 根据 RFC 2253，为已建立的 SSL 连接返回客户端证书的“颁发者 DN”（其中 DN 是专有名称）字符串。 |
| **$ssl_client_i_dn_legacy**                               | 返回已建立 SSL 连接的客户端证书的“颁发者 DN”（其中 DN 是专有名称）字符串。 |
| **$ssl_client_raw_cert (ngx_http_ssl_module)**            | 它将为已建立的 SSL 连接返回 PEM（隐私增强邮件）格式的客户端证书。 |
| **$ssl_client_raw_cert (ngx_stream_ssl_module)**          | 它将为已建立的 SSL 连接返回 PEM（隐私增强邮件）格式的客户端证书。 |
| **$ssl_client_s_dn (ngx_http_ssl_module)**                | 根据 RFC2253，为已建立的 SSL 连接返回客户端证书的“主题 DN”（其中 DN 是专有名称）字符串。 |
| **$ssl_client_s_dn (ngx_stream_ssl_module)**              | 根据 RFC2253，为已建立的 SSL 连接返回客户端证书的“主题 DN”（其中 DN 是专有名称）字符串。 |
| **$ssl_client_s_dn_legacy**                               | 返回已建立 SSL 连接的客户端证书的“主题 DN”（其中 DN 是专有名称）字符串。 |
| **$ssl_client_serial (ngx_http_ssl_module)**              | 它将返回已建立 SSL 连接的客户端证书的序列号。                |
| **$ssl_client_serial (ngx_stream_ssl_module)**            | 它将返回已建立 SSL 连接的客户端证书的序列号。                |
| **$ssl_client_v_end (ngx_http_ssl_module)**               | 它将返回客户端证书的结束日期。                               |
| **$ssl_client_v_end (ngx_stream_ssl_module)**             | 它将返回客户端证书的结束日期。                               |
| **$ssl_client_v_remain (ngx_http_ssl_module)**            | 它将返回客户端证书到期前的天数。                             |
| **$ssl_client_v_remain (ngx_stream_ssl_module)**          | 它将返回客户端证书到期前的天数。                             |
| **$ssl_client_v_start (ngx_http_ssl_module)**             | 它将返回客户端证书的开始日期。                               |
| **$ssl_client_v_start (ngx_stream_ssl_module)**           | 它将返回客户端证书的开始日期。                               |
| **$ssl_client_verify (ngx_http_ssl_module)**              | 如果证书不存在，它将返回客户端证书验证的结果：“SUCCESS”、“FAILD:reason”和“NONE”。 |
| **$ssl_client_verify (ngx_stream_ssl_module)**            | 如果证书不存在，它将返回客户端证书验证的结果：“SUCCESS”、“FAILD:reason”和“NONE”。 |
| **$ssl_curves (ngx_http_ssl_module)**                     | 返回客户端支持的曲线列表。所有已知曲线均按名称列出，未知曲线以十六进制显示，例如：0x001d:prime256v1:secp521r1:secp384r1 |
| **$ssl_curves (ngx_stream_ssl_module)**                   | 返回客户端支持的曲线列表。所有已知曲线均按名称列出，未知曲线以十六进制显示，例如：0x001d:prime256v1:secp521r1:secp384r1 |
| **$ssl_early_data**                                       | 如果使用 TLS 1.3 早期数据并且握手未完成，它将返回 1，否则返回空。 |
| **$ssl_preread_alpn_protocols**                           | 它返回客户端通过 ALPN 发布的协议列表，值之间用逗号分隔。     |
| **$ssl_preread_protocol**                                 | 客户端支持的最高 SSL（安全套接字层）协议版本。               |
| **$ssl_preread_server_name**                              | 返回通过 SNI（服务器名称指示）请求的服务器的名称。           |
| **$ssl_protocol (ngx_http_ssl_module)**                   | 它将返回已建立的 SSL 连接的协议。                            |
| **$ssl_protocol (ngx_stream_ssl_module)**                 | 它将返回已建立的 SSL 连接的协议。                            |
| **$ssl_server_name (ngx_http_ssl_module)**                | 返回通过 SNI（服务器名称指示）请求的服务器的名称。           |
| **$ssl_server_name (ngx_stream_ssl_module)**              | 返回通过 SNI（服务器名称指示）请求的服务器的名称。           |
| **$ssl_session_id (ngx_http_ssl_module)**                 | 它将返回已建立的 SSL 连接的会话标识符。                      |
| **$ssl_session_id (ngx_stream_ssl_module)**               | 它将返回已建立的 SSL 连接的会话标识符。                      |
| **$ssl_session_reused (ngx_http_ssl_module)**             | 如果 SSL 会话被重用，则返回“r”或“。” 否则。                  |
| **$ssl_session_reused (ngx_stream_ssl_module)**           | 如果 SSL 会话被重用，则返回“r”或“。” 否则。                  |
| **$status (ngx_http_core_module)**                        | 响应状态。                                                   |
| **$status (ngx_http_log_module)**                         | 响应状态。                                                   |
| **$status (ngx_stream_core_module)**                      | 会话状态，可以是以下之一： 200：会话成功完成。400：无法解析客户端的数据。403：禁止访问。500内部服务器错误。502错误的网关。503服务不可用。 |
| **$tcpinfo_rtt**                                          | 显示有关客户端 TCP 连接的信息，在支持*TCP_INFO*套接字选项的系统上可用。 |
| **$tcpinfo_rttvar**                                       | 显示有关客户端 TCP 连接的信息，在支持*TCP_INFO*套接字选项的系统上可用。 |
| **$tcpinfo_snd_cwnd**                                     | 显示有关客户端 TCP 连接的信息，在支持*TCP_INFO*套接字选项的系统上可用。 |
| **$tcpinfo_rcv_space**                                    | 显示有关客户端 TCP 连接的信息，在支持*TCP_INFO*套接字选项的系统上可用。 |
| **$time_iso8601 (ngx_http_core_module)**                  | 以 ISO 8601 标准格式显示当地时间。                           |
| **$time_iso8601 (ngx_http_log_module)**                   | 以 ISO 8601 标准格式显示当地时间。                           |
| **$time_iso8601 (ngx_stream_core_module)**                | 以 ISO 8601 标准格式显示当地时间。                           |
| **$time_local (ngx_http_core_module)**                    | 以普通日志格式显示当地时间                                   |
| **$time_local (ngx_http_log_module)**                     | 以普通日志格式显示当地时间。                                 |
| **$time_local (ngx_stream_core_module)**                  | 以普通日志格式显示当地时间。                                 |
| **$uid_got**                                              | cookie 的名称和收到的客户端标识符。                          |
| **$uid_reset**                                            | 如果变量设置为 ?non-empty' 字符串意味着不是 ?0'，那么客户端标识符将被重置。特殊值**日志**还会导致将有关重置标识符的消息输出到 error_log。 |
| **$uid_set**                                              | cookie 的名称和发送的客户端标识符。                          |
| **$upstream_addr (ngx_http_upstream_module)**             | 它将保留 IP 地址和端口，或到上游服务器的 UNIX 域套接字的路径。如果在请求处理期间联系了多个服务器，则它们的地址用逗号分隔。 |
| **$upstream_addr (ngx_stream_upstream_module)**           | 它将保留 IP 地址和端口，或到上游服务器的 UNIX 域套接字的路径。如果在请求处理期间联系了多个服务器，则它们的地址用逗号分隔。 |
| **$upstream_bytes_received (ngx_http_upstream_module)**   | 从上游流服务器接收的字节数。来自多个连接的值由逗号 (,) 和冒号 (:) 分隔，就像 $upstream_addr 变量中的地址一样。 |
| **$upstream_bytes_received (ngx_stream_upstream_module)** | 从上游流服务器接收的字节数。来自多个连接的值由逗号 (,) 和冒号 (:) 分隔，就像*$upstream_addr*变量中的地址一样。 |
| **$upstream_bytes_sent (ngx_http_upstream_module)**       | 发送到上游流服务器的字节数。来自多个连接的值由逗号 (,) 和冒号 (:) 分隔，就像*$upstream_addr*变量中的地址一样。 |
| **$upstream_bytes_sent (ngx_stream_upstream_module)**     | 发送到上游流服务器的字节数。来自多个连接的值由逗号 (,) 和冒号 (:) 分隔，就像*$upstream_addr*变量中的地址一样。 |
| **$upstream_cache_status**                                | 它将保持访问响应缓存的状态。状态可以是“BYPASS”、“MISS”、“EXPIRED”、“STALE”、“REVALIDATED”、“UPDATING”或“HIT”。 |
| **$upstream_connect_time (ngx_http_upstream_module)**     | 用于保持与上游服务器（1.9.1）建立连接所花费的时间；时间以秒为单位，分辨率为毫秒。在 SSL 的情况下，增加了握手所花费的时间。多个连接的时间用逗号 (,) 和冒号 (:) 分隔，就像 $upstream_addr 变量中的地址一样。 |
| **$upstream_connect_time (ngx_stream_upstream_module)**   | 保持连接上游服务器的时间；时间以秒为单位，精度为毫秒。多个连接的时间用逗号 (,) 分隔，如 $upstream_addr 变量中的地址。 |
| **$upstream_cookie_name**                                 | 上游服务器在 Set-Cookie 响应头字段中发送的具有定义名称的 Cookie。仅保存来自最后一个服务器响应的 cookie。 |
| **$upstream_first_byte_time**                             | 接收第一个数据字节的时间。时间以秒为单位，分辨率为毫秒。多个连接的时间用逗号 (,) 分隔，如 $upstream_addr 变量中的地址。 |
| **$upstream_header_time**                                 | 它用于保持从上游服务器接收标头所花费的时间。多个连接的时间用逗号 (,) 和冒号 (:) 分隔，就像 $upstream_addr 变量中的地址一样。 |
| **$upstream_http_name**                                   | 保留服务器响应头字段。                                       |
| **$upstream_queue_time**                                  | 用于保持请求在上游队列中花费的时间；时间以秒为单位，精度为毫秒。多个连接的时间用逗号 (,) 和冒号 (:) 分隔，就像 $upstream_addr 变量中的地址一样。 |
| **$upstream_response_length**                             | 它用于保持从上游服务器获得的响应的长度。长度以字节为单位。多个响应的长度由逗号 (,) 和冒号 (:) 分隔，如 $upstream_addr 变量中的地址。 |
| **$upstream_response_time**                               | 它用于保持从上游服务器接收响应所花费的时间；时间以秒为单位，精度为毫秒。多个连接的时间用逗号 (,) 和冒号 (:) 分隔，就像 $upstream_addr 变量中的地址一样。 |
| **$upstream_session_time**                                | 以毫秒为单位的会话持续时间。多个连接的时间用逗号 (,) 分隔，如 $upstream_addr 变量中的地址。 |
| **$upstream_status**                                      | 它用于保存从上游服务器获得的响应的状态码。多个响应的状态代码由逗号 (,) 和冒号 (:) 分隔，类似于 $upstream_addr 变量中的地址。如果无法选择服务器，则该变量会保留 502（错误网关）状态代码。 |
| **$upstream_trailer_name**                                | 它用于保持字段远离从上游服务器获得的响应的末尾。             |
| **$uri**                                                  | 请求中的当前 URI，已标准化。我们可以在请求处理期间更改 $uri 的值，例如在进行内部重定向或使用索引文件时。 |



# 进阶

## 编译

### configure参数详解

[完整参数列表](http://nginx.org/en/docs/configure.html)

常见参数：

1. `--prefix`  指向安装目录
2. `--with-http_v2_module` 支持http请求
3. `--with-http_ssl_module` 支持https请求
4. `--with-file-aio` 启用异步I / O支持，强烈建议，仅与本地和映射模式相关
5. `--with-threads`（nginx 1.7.11+） - 使用线程池（也需要`vod_open_file_thread_pool`在nginx.conf中）启用异步文件，仅与本地和映射模式相关
6. `--with-cc-opt="-O3"`- 启用额外的编译器优化（与nginx默认值相比，mp4解析时间和帧处理时间减少了大约8％`-O`）
7. `--add-module=` 添加第三方模块

调试设置：

1. `--with-debug`- 启用调试消息（也需要传入nginx.conf `debug`中的`error_log`指令）。
2. `--with-cc-opt="-O0"` - 禁用编译器优化（用gdb进行调试）

实用第三方模块

1. rtmp模块(直播服务)

   [nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)

## 配置

### location优先级

第一优先级：等号类型（=）的优先级最高。一旦匹配成功，则不再查找其他匹配项。
第二优先级：^~类型表达式。一旦匹配成功，则不再查找其他匹配项。
第三优先级：正则表达式类型（~ ~*）的优先级次之。如果有多个location的正则能匹配的话，则使用正则表达式最长的那个。
第四优先级：常规字符串匹配类型。按前缀匹配。



# 功能实践

## 反代

目前使用cloudflare的worker做基本的api反代,不多说

## 负载均衡

目前在dns上做负载均衡,也不多说

## 跨域处理

加几个请求头即可,通常我只加`Access-Control-Allow-Origin`,此属性一般设为指定地址,但我设为了开放所有

```nginx
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
} 
```

## 直播服务

直播服务需要[nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)模块

1. 安装带rtmp模块的nginx

   * win

     在http://nginx-win.ecsds.eu/download/可以找到nginx Gryphon版本,带有rtmp模块

   * linux

     运行指令即可完成rtmp模块的单独安装(仅限使用包管理工具安装的nginx)

     ```bash
     apt install libnginx-mod-rtmp
     ```

   * 第三种选择,依旧是编译

     ```bash
   ./configure \
     --prefix=/app/nginx \
     --with-http_v2_module \
     --with-http_ssl_module \
     --add-module=path/to/nginx-rtmp-module
     ```
   
2. 配置

   ```nginx
   worker_processes  1;
   error_log  logs/error.log debug;
   
   events {
       worker_connections  1024;
   }
   
   rtmp {
       server {
       	listen 1935;
   
           application stream {
               live on;
               hls on;
               hls_path /app/nginx/rtmp/tmp/app/;
               hls_fragment 5s;
       	}
       }
   }
   
   http {
       include mime.types;
       server {
           listen 80;
   
           location /stream {
               types{
                  application/vnd.apple.mpegurl m3u8;
                  video/mp2t ts;
               }
               alias /app/nginx/rtmp/tmp/app/;
               expires -1;
           }
   
   	    location ~ /live/* {
               add_header Cache-Control 'no-store, no-cache';
               try_files $uri /live/index.html;
           }
   
   	      location / {
               root html;
               index index.html;
           }
       }
   }
   ```
   
   创建用于放置hls临时文件的路径
   
   ```bash
   mkdir -p /app/nginx/rtmp/tmp/app
   ```
   
   此时已经可以进行直播推流
   
   推流地址为`rtmp://服务器地址/stream/频道`, 例如`rtmp://lisnote.com/stream/mychannel`
   
   播放地址为`http://服务器地址/stream/频道.m3u8`,例如`http://lisnote.com/stream/mychannel.m3u8`
   
   以ffmpeg和ffplay为例(图形界面测试也可以使用OBS和potplayer)
   
   ```bash
   # 推流
   ffmpeg -re -i video.mp4 -vcodec libx264 -acodec aac -f flv rtmp://lisnote.com:1935/stream/mychannel
   # 播放
   ffplay http://lisnote.com/stream/mychannel.m3u8
   ```
   
3. 添加一个前端文件`html/live/index.html`

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Live</title>
       <script src="https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.js"></script>
     </head>
     <body>
       <div id="dplayer" class="dplayer-fulled"></div>
       <script>
         let channel = location.pathname.split("/")[2];
         channel = channel?channel:"lisnote";
         const dp = new DPlayer({
           container: document.getElementById('dplayer'),
           live: true,
           video: {
             url: `/stream/${channel}.m3u8`,
             type: 'customHls',
             customType: {
               customHls: function (video, player) {
                 const hls = new Hls();
                 hls.loadSource(video.src);
                 hls.attachMedia(video);
               },
             },
           },
         });
       </script>
     </body>
   </html>
   ```
   
   访问`http://服务器地址/live/频道`, 即可观看直播, 例如`http://lisnote.com/live/lisnote`



## 网页服务

nginx默认配置就包含网页服务

最简单的网页服务配置方式,就是将网页文件放到nginx默认的路径,一般为`/usr/share/nginx/html/`

若前端网页为Vue,还需在原有的基础上进行一些额外配置

```nginx
location / {
    ...
    add_header Cache-Control 'no-store, no-cache';
    try_files \$uri \$uri/ /index.html;
    autoindex_localtime  on;
}
```

## 平滑升级

* 此部分应由docker+k8s负责,除非只有一个服务器(一个服务器还不如发个暂停服务说明?)

# 个人配置

## 直播

```nginx
worker_processes  1;
error_log  logs/error.log debug;

events {
    worker_connections  1024;
}

rtmp {
    server {
        listen 1935;

        application live {
            live on;
            hls on;
            hls_path rtmp/tmp/app/;
            hls_fragment 5s;
        }
    }
}

http {
    include mime.types;

    server {
        listen 80;

        location ~ /live/.*?\.?(?<!m3u8|ts)$ {
            root html;
            index index.html
            add_header Cache-Control 'no-store, no-cache';
            try_files $uri $uri/ /live/index.html;
        }

        location /live/ {
            types{
               application/vnd.apple.mpegurl m3u8;
               video/mp2t ts;
            }
            alias rtmp/tmp/app/;
            expires -1;
        }
        
        location / {
            root html;
            index index.html;
        }
    }
}

```



## 网页

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
            rewrite ^(.*)$ https://\$host\$1;
        }
    }

    server {
        listen       443 ssl;

        ssl_certificate      "../ca/lisnote.com.pem";
        ssl_certificate_key  "../ca/lisnote.com.key";
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
```




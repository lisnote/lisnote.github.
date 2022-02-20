# 基础之基础

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

### Nginx配置

* nginx 配置文件有三个部分组成

  1. 全局块 : 从配置开始到event{}之间的内容

     ```
     # 可并发处理数量为1(受硬件限制)
     worker_processes 1;
     ```

  2. events 块

     ```
     events {
     	# 支持最大连接数1024
     	worker_connections 1024;
     }
     ```

  3. http 块

     ```
     http {
     
     }
     ```

     * 全局块

       ```
       
  ```
     
* server块
     
       ```
       server {
       	# 监听端口
       	listen	80;
       	# 主机名称
       	server_name localhost;
       	# 地址配置
       }
  ```
     
### server块详解
     
     


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


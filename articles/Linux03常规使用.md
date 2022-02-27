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

---
date: 2022-05-17 21:00:43
---

由于CentOS重心的转移,Debian在服务端的使用占比正逐渐提高

本文不介绍bash知识,旨在记录常用指令

# 新服务器

新的Debian服务器需要做的事情

1. 更换软件源为阿里云镜像
2. 设置工作目录
3. SSH防断连
4. 设置时区
5. 安装一些常用环境
   1. JAVA
   2. Nginx
   3. NodeJS
   4. Docker

写了一个脚本(适合Debian X64,但包含我个人的一些公开的环境变量,且不做兼容)

## 使用

1. 写入函数

```bash
source <(curl https://raw.githubusercontent.com/lisnote/lisnote.github.io/main/articles/assets/Debian.md/bash/main)
```

2. 根据需要运行函数

```bash
# 初始化函数-----------------------------------
# 运行所有初始化函数
Init
# 为 /use/local/lib/ 建立符号链接 /app ,并将之作为工作目录
CreateAppDir
# 备份重要文件
BackupFile
# 切换软件源为阿里镜像
SwitchAppResources
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
# 安装Docker社区版
AddDocker
```

## 打包

进入[目录](./assets/Debian.md/bash) ,运行指令进行打包

```bash
cat *.sh | tr -d "\r" | sed "/^$/d;/#.*/d">main
```



# 系统管理

## 信息管理

* 常用指令

```bash
cat # 查看文件
tee # 将输入同时输出到文件和屏幕
tail # 监听文件变化并输出
```

* 查看

```bash
# 查看linux发行版本
cat /etc/os-release
# 输出到文件和屏幕
echo message | tee output.txt
# 监听日志
tail 
```



## 用户管理

## 端口管理



## 服务管理



# 文件相关

## 基本操作

## 进阶应用



# 常用应用

## 编译应用

## 依赖库



# 指令一览

**应用指令**

```bash
bash
source
cp
mv
rm
mkdir
ufw
echo
cat
tail
sort
grep
sed
tr
```









# 我的脚本

因为经常开新服务器,所以写了一些脚本来配置比较基本的环境
适合Debian X64

## 使用

```bash
source <(curl https://raw.githubusercontent.com/lisnote/lisnote.github.io/main/articles/assets/Linux.md/DebianBash/main)
```

## 提供的指令

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

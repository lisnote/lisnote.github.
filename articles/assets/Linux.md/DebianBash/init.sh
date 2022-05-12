#!/bin/bash

CreateAppDir(){
ln -s /usr/local/etc/ /app
echo -e "\n\n\ncd /app">>/root/.bashrc
cd /app
IsSuccess "建立快捷链接"
}

BackupFile(){
cp /etc/profile /etc/profile.backup && \
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
IsSuccess "备份重要文件"
}

SshConfig(){
cat << EOF >> /etc/ssh/sshd_config
ClientAliveInterval 60
ClientAliveCountMax 10
EOF
IsSuccess "SSH 防断连"
}

TimeZoneConfig(){
timedatectl set-timezone Asia/Shanghai
}

Init(){
CreateAppDir 
BackupFile
SshConfig
TimeZoneConfig
}
#!/bin/bash

CreateAppDir(){
ln -s /usr/local/lib/ /app
echo -e "\n\n\ncd /app" >> ~/.bashrc
cd /app
IsSuccess "建立符号链接"
}

BackupFile(){
cp /etc/profile /etc/profile.backup && \
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
IsSuccess "备份文件"
}

RecoverFile(){
cp/etc/profile.backup /etc/profile  && \
cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config
IsSuccess "恢复文件"
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

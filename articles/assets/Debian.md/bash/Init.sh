#!/bin/bash

CreateAppDir(){
ln -s /usr/local/lib/ /app
echo -e "\n\n\ncd /app" >> ~/.bashrc
cd /app
IsSuccess "建立符号链接"
}

BackupFile(){
cp /etc/profile /etc/profile.backup && \
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup && \
cp /etc/apt/sources.list /etc/apt/sources.list.backup
IsSuccess "备份文件"
}

SwitchAppResources(){
cat << EOF > /etc/apt/sources.list
deb http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb http://mirrors.aliyun.com/debian-security buster/updates main
deb-src http://mirrors.aliyun.com/debian-security buster/updates main
deb http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
EOF
apt-get update
IsSuccess "更换软件源"
}

RecoverFile(){
cp/etc/profile.backup /etc/profile  && \
cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config && \
cp /etc/apt/sources.list.backup /etc/apt/sources.list
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

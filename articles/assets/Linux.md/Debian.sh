#!/bin/bash

# 写给新的Debian服务器

# 0 建立快捷链接--------------------------------
createAppDir(){
ln -s /usr/local/etc/ /app
echo -e "\n\n\ncd /app">>/root/.bashrc
cd /app
}

# 1 备份重要文件-------------------------------
backupFile(){
cp /etc/profile /etc/profile.backup
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
}
recoverFile(){
cp /etc/profile.backup /etc/profile
source /etc/profile
cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config
}

# 2 SSH防断连-----------------------------------
sshConfig(){
cat << EOF >> /etc/ssh/sshd_config
ClientAliveInterval 60
ClientAliveCountMax 10
EOF
}

# 4 java17--------------------------------
addJava(){
cat << EOF >> /etc/profile
export JAVA_HOME=/app/jdk
export CLASSPATH=\$CLASSPATH:\$JAVA_HOME/lib/
export PATH=\$PATH:\$JAVA_HOME/bin
EOF
wget https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.3%2B7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz
tar zxvf OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz
rm OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz
mv jdk-17.0.3+7/ jdk
java -version
}
removeJava(){
cp /etc/profile.backup /etc/profile
source /etc/profile
rm -rf jdk
}

# 4 nodejs16---------------------------------
addNode(){
wget https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
tar xf node-v16.13.0-linux-x64.tar.xz
mv node-v16.13.0-linux-x64 node
rm -f node-v16.13.0-linux-x64.tar.xz
export PATH=\$PATH:/app/node/bin
}














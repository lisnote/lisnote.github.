#!/bin/bash

AddJava(){
cat << EOF >> /etc/profile
export JAVA_HOME=/app/jdk
export CLASSPATH=\$CLASSPATH:\$JAVA_HOME/lib/
export PATH=\$PATH:\$JAVA_HOME/bin
EOF
wget https://mirrors.tuna.tsinghua.edu.cn/Adoptium/17/jdk/x64/linux/OpenJDK17U-jdk_x64_linux_hotspot_17.0.3_7.tar.gz -O jdk.tar.gz
tar zxvf jdk.tar.gz
rm jdk.tar.gz
mv jdk-17.0.3+7/ jdk
source /etc/profile
java -version
IsSuccess "Java17安装"
}

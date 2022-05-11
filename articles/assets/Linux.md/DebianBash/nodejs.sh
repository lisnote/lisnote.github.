#!/bin/bash

AddNodeJS(){
wget https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
tar xf node-v16.13.0-linux-x64.tar.xz
mv node-v16.13.0-linux-x64 node
rm -f node-v16.13.0-linux-x64.tar.xz
echo -e "\nexport PATH=\$PATH:/app/node/bin\n" >> /etc/profile
source /etc/profile
node -v
IsSuccess "NodeJs安装"
}
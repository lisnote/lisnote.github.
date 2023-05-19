#!/bin/bash

AddNodeJS(){
wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz
tar xf node-v18.16.0-linux-x64.tar.xz
mv node-v18.16.0-linux-x64 node
rm -f node-v18.16.0-linux-x64.tar.xz
echo -e "\nexport PATH=\$PATH:/app/node/bin\n" >> /etc/profile
source /etc/profile
node -v && npm -v
IsSuccess "npm安装"
}

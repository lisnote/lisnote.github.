#!/bin/bash

AddNodeJS(){
wget https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
tar xf node-v16.13.0-linux-x64.tar.xz
mv node-v16.13.0-linux-x64 node
rm -f node-v16.13.0-linux-x64.tar.xz
echo -e "\nexport PATH=\$PATH:/usr/local/lib/nodejs/bin/\n" >> /etc/profile
source /etc/profile
node -v && npm -v
IsSuccess "npm安装"
}

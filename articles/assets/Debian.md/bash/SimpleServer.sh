#!/bin/bash

AddSimpleServer(){
cat << EOF > SimpleServer.js
const http = require('http');
const os = require('os');

let networkInterfaces = os.networkInterfaces();
let remoteAddress;
let port = process.argv[2] || 80;

for (var devName in networkInterfaces) {
  var iface = networkInterfaces[devName];
  for (var i = 0; i < iface.length; i++) {
    var alias = iface[i];
    if (
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
    ) {
      remoteAddress = alias.address;
    }
  }
}

http
  .createServer((request, response) => {
    response.setHeader('Content-Type', 'text/json; charset=utf-8');
    let localAddress =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    let userAgent = request.headers['user-agent'];
    response.end(
      JSON.stringify({
        localAddress,
        remoteAddress,
        userAgent,
      }),
    );
  })
  .listen(port);
EOF
cat << EOF > /etc/systemd/system/SimpleServer.service
[Unit]
Description=SimpleServer

[Service]
ExecStart=/app/node/bin/node /app/SimpleServer.js 10001

[Install]
WantedBy=multi-user.target
EOF
systemctl enable --now SimpleServer.service
IsSuccess "nginx自启配置"
}

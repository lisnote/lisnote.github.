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

AddSimpleServer(){
cat << EOF >> SimpleServer.java
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {
    public static void main(String[] args) {
        int port = 80;
        if(args.length>0) port = Integer.parseInt(args[0]);
        long num = 0;
        try {
            ServerSocket serverSocket = new ServerSocket(port);
            while (true) {
                try {
                    Socket socket = serverSocket.accept();
                    num++;
                    if (num % 2 == 0) {
                        System.out.println(num/2 + "" + socket.getRemoteSocketAddress());
                    }
                    Thread socketThread = new SocketThread(socket);
                    socketThread.start();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
         }
    }
}
class SocketThread extends Thread {
    final Socket socket;

    public SocketThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try (InputStream inputStream = socket.getInputStream()) {
            byte[] buffer = new byte[2048];
            inputStream.read(buffer);
            String data = "IP:"+socket.getRemoteSocketAddress()+"<br>"+new String(buffer).replace("\n", "<br>");
            try (OutputStream output = socket.getOutputStream()) {
                output.write("HTTP/1.1 200 OK\r\n".getBytes());
                output.write("Content-Type: text/html\r\n".getBytes());
                output.write(("Content-Length: " + data.length() + "\r\n").getBytes());
                output.write("\r\n".getBytes());
                output.write(data.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
EOF
}
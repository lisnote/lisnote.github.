# 系统指令

## 用户管理

* 新建用户
* 设置密码
* 删除用户



## 防火墙 & 端口检查

* 开放端口

  ```
  firewall-cmd --add-port=3000/tcp --permanent
  ```

* 重新加载防火墙规则

  ```
  firewall-cmd --reload
  ```

* 关闭端口

  ```
  firewall-cmd --remove-port=3000/tcp --permanent
  ```

* 检查防火墙规则

  ```
  firewall-cmd --list-all
  ```

* 显示端口占用情况

  ```
  netstat -ntlp
  ```

* 显示指定端口占用情况

  ```
  lsof -i tcp:80
  ```

## 服务 & 进程

* 打开自启与关闭自启服务

  ```
  systemctl enable frps
  systemctl disable frps
  ```

* 启动,关闭,重启服务

  ```
  systemctl start frps
  systemctl stop frps
  systemctl restart frps
  ```

* 查看服务

  ```
  systemctl status frps
  ```

* 显示服务列表

  ```
  systemctl list-units --type=service
  ```

* 显示进程列表

  ```
  ps -A
  ```

* 创建服务

  于路径`/etc/systemd/system/`下创建`服务名.service`文件

  填写服务内容

  服务内容示例(frps):

  ```
  [Unit]
  Description=Frp Server Service
  After=network.target
  
  [Service]
  Type=simple
  User=nobody
  Restart=on-failure
  RestartSec=5s
  ExecStart=/usr/bin/frps -c /etc/frp/frps.ini
  
  [Install]
  WantedBy=multi-user.target
  ```
  
* 后台相关指令

  ```
  启动进程并在后台运行(仍然会有输出)
  java test &
  启动进程并忽略输出
  nohup java test
  启动进程并在后台运行(忽略输出)
  nohup java test &
  启动进程并同时输出到控制台和文件
  java test|tee -a nohup.out
  查看后台进程
  jobs -l
  进入后台进程
  fg
  暂停当前进程并挂在后台
  ctrl+z
  运行后台暂停的进程
  bg
  ```
  
  * screen后台管理
  
  ```
  # 使用yum安装screen
  yum install screen
  # 创建一个名为test的会话窗口
  screen -S test
  # 暂离窗口
  Ctrl+a d(即按住Ctrl，依次再按a,d)
  # 查看存在的会话窗口
  screen -ls
  # 进入窗口
  screen -r test
  screen -r 进程ID
  # 关闭窗口
  exit
  # 窗口切换
  Ctrl+a c ：在当前screen会话中创建窗口
  Ctrl+a w ：窗口列表
  Ctrl+a n ：下一个窗口
  Ctrl+a p ：上一个窗口
  Ctrl+a 0-9 ：在第0个窗口和第9个窗口之间切换
  ```
  
  
  
  

### RPM(Red Hat Package Manager)

* 安装rpm包

  ```
  rpm -ivh packageName.rpm
  ```

## 系统信息

* 查看时间

  ```
  date -R
  ```

* 查看内核/操作系统/CPU信息

  ```
  uname -a
  ```

* 查看处理器信息

  ```
  cat /proc/cpuinfo
  ```

* 查看内存使用量

  ```
  free -m
  ```

## 文件管理

* 创建文件夹

  ```
  mkdir DirName
  ```

* 创建文件

  * linux中有许多指令可以创建文件,包含但不限于`touch`,`echo`,`vim`,`vi`,`nano`

  ```
  touch FileName
  echo >>FileName
  ```

* 删除文件或文件夹

  ```
  rm -r FileName
  ```

* 复制文件或文件夹

  ```
  cp FileName NewFileName
  ```

* 移动和重命名文件或文件夹

  ```
  mv FieldName FileName
  ```

* 下载资源

  ```
  wget DownloadLink
  ```

* 解压文件

  ```
  压缩类型:
  .tar.gz
  .tgz
  解包:
  tar zxvf FileName.tar.gz
  打包:
  tar zcvf FileName.tar.gz DirName
  --------------------------------------
  压缩类型:
  .tar
  解包:
  tar xvf FileName.tar
  打包:
  tar cvf FileName.tar DirName
  ---------------------------------------
  压缩类型:
  .gz
  gzip -d FileName.gz
  ---------------------------------------
  压缩类型:
  .zip
  解包:
  
  ```

## 文件处理

* 文件权限

   赋予所有用户读写权限

  ```
  chmod a+rw sshd_config
  ```

  

### nano

### vi

* 使用vi进入文件后进入普通模式

  普通模式下输入

  ```
  i  切换到插入模式
  c  切换到修改模式
  o  另起一行
  : 命令模式
  ```

  按ecs重新切换会普通模式

* 在命令模式下输入

  ```
  q! 立即退出(不保存
  wq 保存后退出
  ```

  

### vim

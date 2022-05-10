---
date: 2020-08-24 00:00:00
---
# Git初步

## 安装Git

下载地址`https://git-scm.com/downloads`

安装完成后打开 Git Bash,设置账号和邮箱

```bash
git config --global user.name "lisnote"
git config --global user.email "1292580280@qq.com"
```

## 创建版本库

在当前路径创建文件夹

```bash
mkdir lisnote
```

进入文件夹 

```bash
cd lisnote
```

显示当前路径

```bash
pwd
```

为当前目录创建版本库

```bash
git init
```

添加文件到暂存区

```bash
git add <readme.txt>
```

添加所有文件到暂存区

```
git add .
```

提交修改到仓库

```bash
git commit -m <"wrote a readme file">
```

查看仓库修改状态

```bash
git status
```

查看仓库修改内容

```bash
git diff
```

重命名分支

```
get branch -m <new name>
```



# 版本管理

## 版本回退

查看版本

```bash
git log
```

查看每个版本的首行

```bash
git -log --pretty=oneline
```

回退到上一个版本

```bash
git reset --hard HEAD^ 
```

回退到指定版本

```
git reset --hard <commit id>
```

查看所有提交记录

```
git reflog
```



# 分支管理

## 创建与合并分支

创建`dev`分支

```bash
git branch dev
```

切换到分支

```bash
git checkout dev
```

创建并切换到`dev`分支

```bash
git checkout -b dev
```

查看本地分支

```
git branch
```

查看所有分支

```bash
git branch -a
```

合并`dev`分支

```
git merge dev
```

删除`dev`分支

```
git branch -d d
```

重命名本地分支

# 远程仓库

添加远程仓库

```bash
git remote add origin git@github.com:username/projectName.git
```

查看远程分支

```
git branch -r
```

删除远程分支

```bash
git push origin --delete branchName
```

远程仓库更名后

```
git branch -m preName latestName
git fetch origin
git branch -u origin/latestName latestName
git remote set-head origin -a
```

取消关联

```bash
git remote remove remoteName
```



# 标签管理



# 自定义Git















































# 旧的git学习记录

**创建文件夹**

```bash
mkdir 文件夹名
```

**进入文件夹或路径**

```bash
cd 文件夹名
cd 路径
```

**返回上一级文件夹**

```bash
cd ..
```

**显示当前目录**

```bash
pwd
```

**查看文件内容**

```bash
cat 文件名
```

**设置git仓库**

```bash
git init
```

**添加文件到git暂存区**

```bash
git add 文件名
git add 文件名1 文件名2 文件名3...
git add .
```

**取消暂存**

```bash
$ git reset head 文件名
```

**提交git暂存区文件到git仓库**

```bash
git commit -m "版本信息"
```

**显示当前仓库状态**

```bash
git status
```

**删除文件**

```bash
git rm 文件名
```

**查看版本前最近提交日志**

```bash
git log
```

**查看全部提交日志**

```bash
git reflog
```

**版本回退**

```bash
git reset --hard head^
```

**版本选择**

```bash
git reset --hard 版本id
```

**放弃工作区修改**

```bash
git checkout -- 文件名
```

**创建ssh key**

```bash
ssh-keygen -t rsa -C "邮箱地址"
```

**关联远程仓库**

```bash
git remote add 远程库名 仓库地址
```

**推送内容到远程库**

```bash
git push -u 远程库名 master
git push 远程库名 master
```

**克隆仓库**

```bash
git clone 仓库地址
```




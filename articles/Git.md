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
git branch -d dev
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

- build : 构建
- chore : 杂务
- ci :  持续集成
- docs : 文档相关
- feat : 功能
- fix : 修复/维护
- perf : 完善
- refactor : 重构
- revert : 回溯/恢复
- style : 代码风格
- test : 测试










































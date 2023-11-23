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
ssh-keygen -t rsa -C "1292580280@qq.com"
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

仅合并dev分支的最新commit

```bash
git merge --squash dev
```

删除`dev`分支

```
git branch -d d
```

重命名本地分支

# 远程仓库

远程仓库需要使用 ssh key

```bash
ssh-keygen -t rsa -C "1292580280@qq.com"
# 一直回车接受默认选项即可
```



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

浅克隆远程分支

```bash
git clone ssh://git@github.com/lisnote/notebook.git
```

浅克隆后补全克隆

```bash
git fetch --unshallow
```

# 标签管理



# 模块管理

在指定目录添加子模块

```bash
git submodule add submoduleRepositoryPath.git submodulePath/submoduleName
```



# 规范化

| Type     | Description                                                  |
| -------- | ------------------------------------------------------------ |
| feat     | A new feature                                                |
| fix      | A bug fix                                                    |
| docs     | Documentation only changes                                   |
| style    | Changes that do not affect the meaning of the code (white-space, formatting etc) |
| refactor | A code change that neither fixes a bug nor adds a feature    |
| perf     | A code change that improves performance                      |
| test     | Adding missing tests or correcting existing tests            |
| build    | Changes that affect the build system or external dependencies |
| ci       | Changes to our CI configuration files and scripts            |
| chore    | Other changes that don't modify src or test files            |
| revert   | Reverts a previous commit                                    |






































---
date: 2020-08-24 14:18:00
---

笔记不含基础linux知识

# Bash

众多shell之中最常见和方便的一种

linux一般自带,win可以用git执行

## 基本知识

bash脚本一般以`.sh`结尾

第一个bash脚本`test.sh`

```bash
#! /bin/bash
echo "Hello World!"
# Hello World!
```

`#`表示注释,会被解释器忽略

```bash
echo hhh # 这段文字不会输出
# hhh
```

`#!`是一个标记,告诉系统脚本需要用什么解释器执行

在linux中,还需要赋予脚本文件执行权限

```bash
chmod +x ./test.sh
./test.sh
```

## 变量

### 基本使用

```bash
# 赋值
name="lisnote"
# 输出
echo $name
# output : lisnote
```

```bash
for file in `ls ./`
do
	echo $file
done
```

只读变量(修改会报错)

```bash
name="lisnote"
readonly name
name="didongxiaoli"
# name: readonly variable
```

删除变量(不能删除只读变量)

```bash
name="lisnote"
echo $name
unset name
echo $name
# 占行,无其他输出
```

### 作用域

shell运行时会同时存在三种变量

局部变量 : 在函数中使用`local` 修饰的变量, 函数外部无法访问

全局变量 : 当前 shell 进程都有效, 默认在shell窗口定义的变量都是全局变量

```bash
name="lisnote"
echo $name
```

环境变量 : 所有的程序都可以访问到环境变量

```bash
echo $PATH
```

### 变量类型

* 字符串

  ```bash
  name='lisnote'
  # 单引号字符串里的任何字符都会原样输出,单引号字符串中的变量是无效的
  echo '$name :\"HHH\"'
  # $name :\"HHH\"
  
  # 双引号可以包含变量和转义字符
  echo "$name :\"HHH\""
  # lisnote :"HHH"
  
  # 拼接字符串
  # 一般可以直接连写
  # 但是字符串和字符串连接之间多于一个空格会被压为一个空格
  echo "hello"   $name
  # hello lisnote
  
  # 获取字符串长度
  echo ${#"lisnote"}
  # 7
  
  # 提取子串
  # 坐为下标,右为长度
  name="lisnote"
  echo ${name:3:4}
  # note
  
  # 查找子串(查找eton任意一个字符)
  echo `expr index "$name" eton`
  # 4
  ```

* 数组

  ```bash
  # shell中用括号表示数组,用空格或换行将元素分开
  arr=("didongxiaoli" "lisnote")
  echo ${arr[1]}
  arr=(
  "lisnote"
  "didiongxiaoli"
  )
  echo ${arr[1]}
  # lisnote
  # didiongxiaoli
  
  # 单个数值修改
  arr[1]="lisnote"
  echo ${arr[1]}
  # lisnote
  
  # 用@可以获取数组所有元素
  echo ${arr[@]}
  # lisnote lisnote
  
  # 获取数组长度
  echo ${#arr[@]}
  # 2
  ```

* number

  数字类型

* boolean

  `true`和`false`

## 输入输出

### read

```bash
read input
echo your input : $input
# your input : ***
```

### echo

```bash
name="lisnote"
echo ordinary output
# ordinary output

# 输出变量
echo $name
# lisnote

# 换行
echo -e "第一行\n第二行"
# 第一行
# 第二行

# 不换行
echo -e "第一行\c"
echo "还是第一行"
# 第一行还是第一行

# 输出系统指令执行结果
echo `date`
# 2022年05月10日 19:20:49
```

### printf

格式化输出, 和echo相比, printf 不会主动添加换行符,并且可以指定字符宽度及左右对齐等

```bash
printf "ordinary output\n"
# ordinary output

# 格式化输出
# % : 占位
# -15 位长
# s代表string, f代表float, 还有%d整数, %c单个字符
printf "%-15s %-5s %s\n" name age weight
printf "%-15s %-5s %.2f\n" lisnote 22 140.451
printf "%-15s %-5s %.2f\n" didongxiaoli 22 120.541
# name            age   weight
# lisnote         22    140.45
# didongxiaoli    22    120.54
```

常用转义符

| 写法 | 作用                       |
| ---- | -------------------------- |
| \n   | 换行                       |
| \r   | 回车                       |
| \c   | 不输出结构中的任何换行字符 |
| \t   | 水平制表符                 |
| \w   | 垂直制表符                 |
| \\\\ | 一条反斜杠                 |

### 重定向

| 命令 | 用例                           | 用例说明                           |
| ---- | ------------------------------ | ---------------------------------- |
| >    | echo "output test">output.txt  | echo输出重定向到output.txt文件     |
| >>   | echo "output test">>output.txt | echo输出重定向追加到output.txt文件 |
| <<   | cat << EOF<br>内容<br>EOF      | 将"内容"输入重定向给cat            |

### 管道

使用`|`连接多个指令, 可以将上一个指令的标准输出流作为下一个指令的标准输入流, bash 中大多数的指令都能处理管道流传入的信息.

```bash
# 将 echo 指令的输出作为 wc 指令的输入, 求echo输出字符串的长度
echo lisnote | wc -L
# 7
```

## 传递参数

### 传入参数

在执行脚本的时候 如果脚本后面有值,值会被作为参数传入脚本

```bash
# 执行指令 ./bash.sh lisnote didongxiaoli
echo "执行的文件名 $0"
echo "参数1 $1"
echo "参数2 $2"
# 执行的文件名为 ./test.sh
# 参数1 lisnote
# 参数2 didongxiaoli
```

一些特殊变量

| 变量名 | 含义                                      |
| ------ | ----------------------------------------- |
| #      | 传递参数个数                              |
| *      | 一个包含所有传入参数的字符串              |
| @      | 一个包含所有传入参数的数组                |
| $      | 脚本进程的ID号                            |
| !      | 最后一个进程的ID                          |
| ?      | 最后的退出状态,0表示正常退出              |
| -      | 显示Shell使用的当前选项,与set命令功能一致 |

### 传出参数

执行脚本之后, 往往还想带点参数出来, 比如处理的结果, 或是处理一部分的数据, 常见读取传出参数的方法有3种

1. 退出的状态码`$?`

   使用`$?`可以读取上一条指令的结束状态

   ```bash
   true
   echo $?
   false
   echo $?
   # 0 1
   ```

   一般而言, 正确执行的脚本会默认的退出状态都是0, 但是我们也可以去主动改变退出状态, 在脚本中使用 `exit` 指令, 终止脚本并返回退出状态

   ```bash
   # sub.sh
   exit 123456
   ```

   ```bash
   # main.sh
   bash sub.sh
   echo $?
   # 123456
   ```

2. 捕获输出流

   使用`$()`可以将括号内的输出流捕获

   ```bash
   fileList=$(ls /)
   echo $fileList
   # boot etc home mnt ...
   ```

3. 管道传递

   作用类似于捕获

   ```bash
   echo lisnote | wc -L
   # 7
   ```

## 运算符

shell支持以下运算符

* 算数运算符
* 关系运算符
* 布尔运算符
* 字符串运算符
* 文件测试运算符

原生bash不支持数学运算,但是可借助其他命令来实现,例如expr,完整的表达式要被`` ` ``包围

使用expr时要注意用空格隔开运算符

```bash
echo `expr 1 + 1`
# 2
```

### 算术运算符

| 算术运算符 | 用例                | 等于      |
| ---------- | ------------------- | --------- |
| =          | name="lisnote"      | "lisnote" |
| +          | `` `expr 1 + 1` ``  | 2         |
| -          | `` `expr 1 - 1` ``  | 0         |
| *          | `` `expr 3 \* 5` `` | 15        |
| /          | `` `expr 10 / 3` `` | 3         |
| %          | `` `expr 10 % 3` `` | 1         |
| ==         | [ 1 == 1 ]          | true      |
| !=         | [ 1 != 1 ]          | false     |

`*`号之前需要加反斜杠表示才能正常实现乘法运算

`==`和`!=`一般用于条件语句,直接在echo中输出不会返回false/true

MAC中的shell运算语法是`$((表达式))`且`*`不需要转义

```bash
if [ 1 == 1 ]
then
	echo True
else
	echo False
fi
# True
```

### 关系运算符

关系运算符只支持数字或值为数字的字符串

| 关系运算符 | 作用                  | 用例        | 结果  |
| ---------- | --------------------- | ----------- | ----- |
| -eq        | == , equal            | [ 1 -eq 1 ] | true  |
| -nq        | != , not equal        | [ 1 -nq 1 ] | false |
| -gt        | > , greater than      | [ 2 -gt 1 ] | true  |
| -lt        | < , less than         | [ 2 -lt 1 ] | false |
| -ge        | >= , greater or equal | [ 2 -ge 2 ] | true  |
| -le        | <= , less or equal    | [ 2 -le 2 ] | true  |

```bash
if [ 2 -le 2 ]
then
	echo True
else
	echo False
fi
```

### 字符串运算

| 运算符 | 用例         | 说明            |
| ------ | ------------ | --------------- |
| =      | [ $a = $b ]  | 字符串是否相等  |
| !=     | [ $a != $b ] | 字符串是否不等  |
| -z     | [ -z $a ]    | 字符串是否为0   |
| -n     | [ -n "$a" ]  | 字符串是否不为0 |
| $      | [ $a ]       | 字符串是否为空  |



### 布尔运算

| 运算符 | 描述   | 用例                     | 值    |
| ------ | ------ | ------------------------ | ----- |
| !      | 非     | [ ! false ]              | true  |
| -o     | 或     | [ false -o true ]        | true  |
| -a     | 与     | [ false -a true ]        | false |
| &&     | 短路与 | [[ 1 == 1 && 1 == 2 ]]   | false |
| \|\|   | 短路或 | [[ 1 == 1 \|\| 1 == 2 ]] | true  |

```bash
if ! false
then
	echo True
else
	echo False
fi
# True

if [ 1 == 1 -o 1 == 2 ]
then
	echo True
else
	echo False
fi
# True

if [[ 1 == 1 || 1 == 2 ]]
then
	echo True
else
	echo False
fi
# True
```

### 文件测试运算符

此表并不完整, 仅包含常用文件测试运算符

| 运算符 | 描述                    | 用例             | 结果  |
| ------ | ----------------------- | ---------------- | ----- |
| -e     | 检测文件/文件夹是否存在 | [ -e ./test.sh ] | true  |
| -d     | 检测文件是否为目录      | [ -d ./ ]        | true  |
| -s     | 检测文件是否为空        | [ -s ./test.sh ] | false |
| -r     | 检测文件是否可读        | [ -r ./test.sh ] | true  |
| -w     | 检测文件是否可写        | [ -r ./test.sh ] | true  |
| -x     | 检测文件是否可执行      | [ -X ./test.sh ] | true  |













## 流程控制

bash中,流程控制的控制体不可为空

### if

可以没有`elif`和`else`

```bash
if false ;
then 
	echo false
elif true ;
then
	echo false true
else
	echo false false
fi
# false true
```

### for

```bash
for var in a b c
do
    echo "${var}"
done
# a
# b
# c
```

### while

```bash
i=0
while(( $i <= 2 ))
do
    echo $i
    let "i++"
done
# 0
# 1
# 2
```

### case

```bash
case 1 in
	0)	echo test
	;;
	1)	echo 1
	;;
esac
# 1
```

### continue

跳过本次循环

```bash
i=0
while((i<3))
do
	let "i++"
	if(( i == 1 ))
	then
		continue
	fi
	echo $i
done
# 2
# 3
```

### break

跳出循环

```bash
i=0
while((i<3))
do
	let "i++"
	if(( i == 2 ))
	then
		break
	fi
	echo $i
done
# 1
```

## 函数

```bash
# 函数定义及调用
funTest(){
	echo function success
}
funTest
# function success

# 传入参数
funTest(){
	echo $1 $2
}
funTest didongxiaoli lisnote
# didongxiaoli lisnote
```

函数传入参数可使用变量可参考[传递参数](#传递参数)

## 常用Bash函数

### 指定node版本运行指令

```bash
dir=/d/_Work/nvm/
locate=$dir$(ls -l $dir | awk "/^d.*? v$1[0-9.]+$/ {print \$NF}")
export PATH=$locate:$PATH
args=($*)
unset args[0]
echo node version: $(node -v)
node ${args[@]}
```

使用方式

```bash
# 脚本文件 node版本 node参数
node.sh 18 -v
```

用于理解的脚本

```bash
# 设置当前目录
dir=/d/_Work/nvm/
cd $dir

# 输出当前目录所有文件和文件夹
echoAll() {
    echo $(ls $dir)
}

# 输出当前目录所有文件
echoFiles() {
    echo $(ls -l $dir | awk '/^-/ {print $NF}')
}

# 输出当前目录所有文件夹
echoDirs() {
    echo $(ls -l $dir | awk '/^d/ {print $NF}')
}

# 输出当前目录下所有匹配/^v[0-9.]+$/的文件夹
echoVersion() {
    echo $(ls -l $dir | awk '/^d.*? v[0-9.]+$/ {print $NF}')
}

# 输出选择node版本文件夹路径
echoLocate() {
    echo $dir$(ls -l $dir | awk "/^d.*? v$1[0-9.]+$/ {print \$NF}")
}

# 修改环境变量
selectVersion() {
    export PATH=$1:$PATH
}

locate=$(echoLocate $1)
echo 选择版本: $locate
selectVersion $locate
args=($*)
unset args[0]
node ${args[@]}
```





# BAT

没什么大用, 但是因为别人以及nodejs还是得简单了解一下

## 基本知识

### 常用指令

**基本的指令知识**



## 变量

**变量不分大小写**

格式：set 变量名=变量值
详细：被设定的变量以%变量名%引用

## 输入输出

## 传递参数

## 运算符

## 流程控制

## 函数
































































































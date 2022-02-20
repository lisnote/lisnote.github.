# Bootstrap

通用性强

## 导入

* 导入需要的CSS文件

  ```
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
  ```

* 导入JavaScript(最后导入)

  ```
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
  ```

* 测试

  ```
  <div class="fixed-bottom">HelloWorld</div>
  ```

  HelloWorld出现在页面底部即为成功
  
* 基本模板

  ```
  <!doctype html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
  
      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <title>Hello, world!</title>
    </head>
    <body>
  
      <!-- Option 1: Bootstrap Bundle with Popper -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </body>
  </html>
  ```

## 使用方式

* 打开Bootstrap的css文件,搜索所需属性即可了解使用方式

* 多个class对同一对象的相同css属性产生影响时,优先生效靠左边的class

* 关键尺寸

	```
	sm : @media (min-width:576px)
	md : @media (min-width:768px)
	lg : @media (min-width:992px)
	xl : @media (min-width:1200px)
	xxl : @media (min-width:1400px)
	```

* 如需绑定事件,例如侧边栏,弹出提示等到官网寻找并参考使用案例[Bootstrap5官方文档](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## 编译Bootstrap

[github上的bootstrap](https://github.com/twbs/bootstrap)

# ElementUI

基于Vue


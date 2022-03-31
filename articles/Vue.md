---
date: 2022-02-28 00:00:00
tag: ["Vue2"]
---

留有疑问和暂时忽略的部分搜索:补课

不理解搜索:有异议

文章所记默认为vue2

# 快速开始

## 介绍

1. 高效的响应式javascript框架
2. 渐进式框架
3. 核心库只关注视图层
4. 被设计为可以自底向上逐层应用
5. 组价化页面
6. 响应式数据驱动

## 安装

1. 在页面上以 [CDN 包](https://v3.cn.vuejs.org/guide/installation.html#cdn)的形式导入。(此处为开发包)

   ```html
   <script src="https://unpkg.com/vue@3.2.29/dist/vue.global.js"></script>
   ```

   此方式适用于初期学习使用,vue的很多功能实现都需要nodejs的支持方可实现,也就是方式4

2. 下载 JavaScript 文件并[自行托管](https://v3.cn.vuejs.org/guide/installation.html#下载并自托管)。

3. 使用 [npm](https://v3.cn.vuejs.org/guide/installation.html#npm) 

4. 使用官方的 [CLI](https://v3.cn.vuejs.org/guide/installation.html#命令行工具-cli) 来构建一个项目，它为现代前端工作流程提供了功能齐备的构建设置 (例如，热重载、保存时的提示等等)。

   ```bash
   npm install -g @vue/cli
   ```

## 第一个Vue项目

1. 安装vue(页面CDN方式)

```html
<script src="https://unpkg.com/vue@2.6.14/dist/vue.global.js"></script>
```

2. DOM

```html
<div id="app">
    {{ name }}
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            name: "lisnote"
        }
    })
</script>
```

* 其中的{{ name }}为vue定义在DOM中的变量,会根据常量Counter的data()返回的counter进行变换

## VueCLI基本使用

1. 安装

   ```bash
   npm i -g @vue/cli
   ```

2. 创建脚手架

   ```bash
   vue create vue-start
   ```

### 基本的项目结构

**不包含node基本结构**

```markdown
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

### VueCLI配置文件

* 查看配置文件

```bash
vue inspect > output.js
```

这是VueCLI的默认配置文件,仅供参考,不建议进行修改

* 覆盖VueCLI默认配置

在项目根目录创建vue.config.js,配置格式如同webpack.config.js,VueCLI会读取配置并覆盖在默认配置之上

[VueCLI配置参考](https://cli.vuejs.org/zh/config/)

使用@vue/cli-service提供的defineConfig助手函数,可以获得更好的类型提示

```javascript
// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 选项
})
```

* 关闭语法检查

```javascript
module.exports = {
    lintOnSave: false,
}
```

# API一览

## 指令

### v-text

作用 : 插入text

```html
<span v-text="msg"></span>
<!-- 等价于 -->
<span>{{msg}}</span>
```

### v-html

作用 : 插入html

```html
<div v-html="'<h1>Hello World</h1>'"></div>
```

### v-show

作用 : 根据表达式的真假切换元素的css display属性

```html
<div v-show="true">show</div>
```

### v-if

作用 : 根据表达式的真假决定是否渲染dom元素

```html
<div v-if="true">render</div>
```

### v-else

作用 : 为v-if或者v-else-if添加else快

限制 : 前一兄弟元素必须有v-if或v-else-if

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

### v-else-if

作用 : 为v-if或者v-else-if添加else if块

限制 : 前一兄弟元素必须有v-if或v-else-if

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

### v-for

作用 : 根据数据多次渲染元素或模板块

期望值 : Array|Object|number|string|Iterable

```html
<!-- 基础语法 -->
<div v-for="item in items">
  {{ item.text }}
</div>
<!-- 其他语法 -->
<!-- 获得数组元素,索引 -->
<div v-for="(item, index) in items"></div>
<!-- 获得对象值,键 -->
<div v-for="(value, key) in object"></div>
<!-- 获取对象值,键,索引 -->
<div v-for="(value, name, index) in object"></div>
<!-- 获取字符串字符,索引 -->
<div v-for="(char,index) of name"></div>
<!-- 获取[1,2,3],[0,1,2,3] -->
<div v-for="(value, name, index) in object"></div>
```

v-for默认行为是修改元素而非移动元素,如需强制重排序,需要使用特殊的attribute--key来提供排序提示

```html
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

**注意 : v-if 比 v-for 有更高的优先级,为避免错误请不要同时使用v-if和v-for**,详情请看[Vue风格指南](https://v3.cn.vuejs.org/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8%E5%BF%85%E8%A6%81)



### v-on

作用 : 事件监听

缩写 : @

预期值 : Function | Inline Statement | Object

**补课 : 传入Object是干什么?自动运行约定好的内置方法吗?**

修饰符：

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyAlias}` - 仅当事件是从特定键触发时才触发回调。
- `.once` - 只触发一次回调。
- `.left` - 只当点击鼠标左键时触发。
- `.right` - 只当点击鼠标右键时触发。
- `.middle` - 只当点击鼠标中键时触发。
- `.passive` - `{ passive: true }` 模式添加侦听器

```html
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>
<!-- 动态事件 -->
<button v-on:[event]="doThis"></button>
<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>
<!-- 缩写 -->
<button @click="doThis"></button>
<!-- 动态事件缩写 -->
<button @[event]="doThis"></button>
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>
<!-- 串联修饰符 -->
<button @click.stop.prevent="doThis"></button>
<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter" />
<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>
<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

#### v-on拓展

* Vue为一些常用件为定义了别名

常用键

| 键位          | 别名   |
| ------------- | ------ |
| 控制          | ctrl   |
| 变更          | alt    |
| 转换          | shift  |
| 功能(win/com) | meta   |
| 回车          | enter  |
| 删除          | delete |
| 退出          | esc    |
| 空格          | space  |
| 换行          | tab    |
| 上            | up     |
| 下            | down   |
| 左            | left   |
| 右            | right  |

* 事件对象

  v-on触发的方法会传入一个事件对象,当方法有传入参数时,会将事件对象覆盖掉,若仍需要传入事件对象,可使用`$event`作为传入参数

```html
<input @keyup.ctrl.q="hello(name,$event)">
```

### v-bind

作用 : 动态绑定attribute/properti

缩写 : `:`或`.`(当使用`.prop`修饰符时)

```html
<!-- 绑定 attribute -->
<img v-bind:src="imageSrc" />

<!-- 动态 attribute 名 -->
<button v-bind:[key]="value"></button>

<!-- 缩写 -->
<img :src="imageSrc" />

<!-- 动态 attribute 名缩写 -->
<button :[key]="value"></button>

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName" />

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定一个全是 attribute 的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 绑定。"prop" 必须在 my-component 声明 -->
<my-component :prop="someThing"></my-component>

<!-- 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

**使用`.prop`的简写形式可以覆写vue的`in`操作(不进行attr/prop检测)**

```html
<div .someProperty.prop="someObject"></div>
```

### v-model

作用 : 双向绑定表单数据

预期值 : 随表单控件类型而不同

```html
<form>
    <input type="text" v-model="text">
    <p>text : {{text}}</p>
    <hr>
    <textarea v-model="textarea"></textarea>
    <p style="white-space: pre-line;">textarea : {{"\n"+textarea}}</p>
    <hr>
    <p>单个复选框</p>
    <input type="checkbox" id="checkbox" v-model="checkbox">
    <hr>
    <p>多个复选框</p>
    <input type="checkbox" value="吃饭" v-model="checkboxes">吃饭
    <input type="checkbox" value="睡觉" v-model="checkboxes">睡觉
    <input type="checkbox" value="学习" v-model="checkboxes">学习
    <hr>
    <input type="radio" value="听歌" v-model="radio">听歌
    <input type="radio" value="游戏" v-model="radio">游戏
    <hr>
    <select v-model="select">
        <option value="">Select your hero</option>
        <option>lisnote</option>
        <option>didongxiaoli</option>
    </select>
</form>
```

* 修饰符

  | 修饰符  | 作用                                                         | 用例                                        |
  | ------- | ------------------------------------------------------------ | ------------------------------------------- |
  | .lazy   | 默认v-model在每次输入后立即同步,使用lazy可以在change事件后在进行同步 | \<input v-model.lazy="msg" />               |
  | .number | 将输入转换为number类型                                       | \<input v-model.number="age" type="text" /> |
  | .trim   | 自动去除首位空白字符                                         | \<input v-model.trim="msg" />               |

  

### v-slot

作用 : 

缩写 : 

### v-pre

作用 : 跳过该元素及其子元素的边缘(减少编译时间)

```
<span v-pre>{{ this will not be compiled }}</span>
```

### v-cloak

作用 : 这个指令保持在元素上直到关联组件实例结束编译,一般结合css使用,避免未经解释的模板显示到页面上

```css
[v-cloak] {
  display: none;
}
```

```html
<div v-cloak>
  {{ message }}
</div>
```

div不会显示知道编译结束

### v-once

作用 : 只渲染元素及其子元素和组件一次

```html
<span v-once>This will never change: {{msg}}</span>
```

### v-memo

作用 : 记住一个模板的子树,元素和组件都可以使用,如果数组中的每个值都和上次渲染的时候相同,则该子树更新会被跳过

```html
<div v-memo="[valueA, valueB]">
  ...
</div>
```



## 基本配置对象

```json
new Vue({
    // 挂载对象,寻找方式与document.querySelector相同
    el: "#app",
    // 数据
    data: {
        name: "lisnote"
    },
    // 方法
    methods: {
        setName(name, event) {
            console.log("hello," + name, event.target);
            this.name = name;
        }
    },
    // 计算属性
    computed: {
        // 完整写法
        hi: {
            get() {
                return "hi~" + this.name;
            },
            set(name) {
                this.name = name.replace("hi~", "");
            }
        },
        // 简写,只可get
        sayHi() { return "hi~" + this.name }
    },
    // 监视属性(也可以使用vm.$watch监视)
    watch: {
        // 完整写法
        name: {
            // 初始化时就调用
            immediate: true,
            // 深度监视
            deep: true,
            // 操控语句
            handler(newValue, oldValue) {
                console.log(newValue, oldValue);
            }
        }
        // // 简写,只可handler
        // name(newValue, oldValue) {
        //     console.log(newValue, oldValue);
        // }
    },
    template:"<h1>{{name}}</h1>",
    // 生命周期
    mounted: (){
    	console.log("组件被挂载");
	},
	// 组件定义时获取的properties,其中的元素可以作为变量使用
	// 完整写法
    props: {
        name: {
            type: String,	//类型是String
            required: true,	//值是必要的
        },
        age: {
            type: Number,
            default: 19,
        }
    },
	// 左边变量名,右边限制变量类型
    // props: {
    //     name: String,
    //     age: Number,
    // }
	// 简写,无类型限制
	// prop:["name", "age"],
	// 混合,复用相同配置
	mixins: [configObject],
})
```

### el

挂载对象,接收string类型,解析作为css选择器,如document.querySelector()的传入参数

### data

数据对象,存放数据,通过this.dataName可以获取data中的数据

### methods

方法集,供自身使用的方法

### computed

计算属性

### watch

监视属性,也可通过vm.$watch进行设置

```javascript
vm.$watch("name",{
    immediate:true,
    deep:true,
    handler(newValue,oldValue){
        console.log(newValuw,oldValue);
    }
})
// 简写
// vm.$watch("name", function (newValue, oldValue) {
//     console.log(newValuw, oldValue)
// })
```

### Lifecycle

生命周期挺多的,见名知义,先将就着记,用习惯就好

| 名字          | 生效阶段                                        |
| ------------- | ----------------------------------------------- |
| beforeCreate  | 在实例初始化之后                                |
| created       | 在实例创建完成后被立即同步调用                  |
| beforeMount   | 在挂载开始之前被调用                            |
| mounted       | 实例被挂载后调用                                |
| beforeUpdate  | 在数据发生改变后                                |
| updated       | 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后 |
| activated     | 被 keep-alive 缓存的组件激活时调用              |
| deactivated   | 被 keep-alive 缓存的组件失活时调用              |
| beforeDestroy | 实例销毁之前调用                                |
| destroyed     | 实例销毁后调用                                  |
| errorCaptured | 2.5+新增,在捕获一个来自后代组件的错误时被调用   |

### props

组件定义时获取的properties,其中的元素可以作为变量使用,优先级高于data

**props的元素是只读的**

### mixins

共用配置,提高代码复用率

当原对象和混合对象存在命名冲突,原对象的数据优先级更高

当原对象和混合对象的钩子函数存在重复,两个钩子函数并用



### 指令

定义全局指令 : Vue.directive(配置对象)

## 特殊的标签

### template

模板标签,表示标签包裹的html为模板

### transition

* 为包含的元素在进场离场时添加特定的样式

  * 默认进场动画的样式选择器 : 

    .v-enter

    .v-enter-active

    .v-enter-to

  * 默认离场动画的样式选择器 : 

    .v-leave

    .v-leave-active

    .v-leave-to

* 当transition标签存在name属性时

  默认的样式选择器会变为

  .ValueOfName-enter-active

  .ValueOfName-enter-active

   ...

* 为transition添加appear属性,为网页初次加载时也会有动画效果

  ```html
  <transition appear>
      ...
  </transition>
  ```

#### transition-grop

transition只允许标签内包含一个根元素

transition允许标签内包含多个根元素,且每个根元素都要求有key属性

#### transition特有属性

enter-active-class : 指定入场动画的类名

leave-active-class : 指定离场动画类名

#### animate.css

一个css动画库

在vue中的基本使用方法

1. 安装

   ```bash
   npm install animate.css
   ```

2. 导入

   ```javascript
   import "animate.css";
   ```

3. 编写html

   ```vue
   <template>
     <div>
       <button @click="isShow = !isShow">切换状态</button>
       <transition
         name="animate__animated animate__bounce"
         enter-active-class="animate__fadeIn"
         leave-active-class="animate__fadeOut"
       >
         <h1 v-show="isShow">test</h1>
       </transition>
     </div>
   </template>
   
   <script>
   import "animate.css";
   export default {
     name: "App",
     data() {
       return {
         isShow: true,
       };
     },
   };
   </script>
   ```

### slot

插槽,可以让父组件向子组件指定位置插入html结构

* 默认插槽

  父组件

  ```vue
  <child-component>
      <div>html结构1</div>
  </child-component>
  ```

  子组件

  ```vue
  <div>
      <!-- 定义插槽 -->
      <slot>插槽默认内容...</slot>
  </div>
  ```

* 具名插槽 : 根据名称进行内容插入

  父组件

  ```vue
  <child-component>
      <template slot="center">
  		<div>html结构1</div>
      </template>
      <template v-slot:footer>
  		<div>html结构2</div>
      </template>
  </child-component>
  ```

  子组件

  ```vue
  <div>
      <!-- 定义插槽 -->
      <slot name="center">插槽默认内容...</slot>
      <slot name="footer">插槽默认内容...</slot>
  </div>
  ```

* 作用域插槽

  **数据在组件中,但是使用插槽的组件可以在该组件标签内使用此数据**

  父组件

  ```vue
  <child-component>
    <div slot-scope="data">
      <div v-for="username in data.users" :key="username">
        {{ username }}
      </div>
    </div>
  </child-component>
  ```
  

子组件

  ```vue
  <template>
    <div>
      <slot :users="users"> </slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChildComponent",
    data() {
      return {
        users: ["lisnote", "didongxiaoli"],
      };
    },
  };
  </script>
  ```


## 特殊的属性

### key

key主要用于虚拟DOM算法,key值不同时元素可以作为最小比较单位

```html
<div v-for="item in items" :key="item.id">
    {{ item.text }}
</div>
```

### ref

* 一般用于获取元素

```html
<div id="app">
    <div ref="title">
        ref test
    </div>
</div>
<script>
    new Vue({
        el: "#app",
        mounted() {
            console.log(this.$refs.title)
        }
    })
</script>
// 控制台输出ref为title的对象
```

ref对一般标签使用,获得DOM

对组件标签使用,获得组件

## Vue实例持有的信息和方法

### $set

给对象添加新的属性

```javascript
data() {
  return {
    person: {
      name: 'lisnote',
    },
  };
},
mounted() {
  this.$set(this.person, 'age', 10);
},
```

### $delete

移除对象属性

```javascript
this.$delete(this.person, 'name');
```

### $attrs

父组件中传过来的属性,不包含通过props定义的,避免了多写props的麻烦

### $el

所挂载的DOM元素

### $parent

父组件

### $refs

包含所标记的元素与组件

### $on

添加组件监听事件

### $once

添加组件监听事件(触发一次自动解除事件)

### $emit

触发组件事件

### $off

解除组件监听事件

### $nextTick

在下一次DOM更新后再执行回调函数

解析 : vue中的dom更新一般是在配置对象的方法完成计算之后,因此一些需要先进行渲染在进行的函数就无法生效,例如focus()

### $slot

包含父组件传入的插槽

### $root

根组件

## 组件

### 组件基础

多文件组件

```html
<div id="components-demo">
    <button-counter></button-counter>
</div>
<script>
    Vue.component('button-counter', {
        data: function () {
            return {
                count: 0
            }
        },
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })
    new Vue({ el: '#components-demo' })
</script>
```

单文件组件格式

App.js

```vue
<template>
  <div>
    <modulename />
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
export default {
	// 配置对象
    components: { MyHeader },
    name: "App",
}
</script>

<style>

</style>
```

单文件组件没有el需要在入口处挂载App组件

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
	el:'#app',
	render: h => h(App)
})
```

### style

#### scoped

**需要VueCLI编译**

使样式局部生效,防止冲突

```vue
<style scoped>
    .className{
        color: red;
    }
<style>
```

#### styleLang

在vue文件中,style标签有lang属性,支持书写css预处理语言,例如scss

```vue
<style lang="less">
*{
  color: red;
}
</style>
```

提示webpack错误,无法解析less-loader...

安装sass-loader

```bash
npm i -D less-loader
```

其他css预处理语言类似

### 组件间通信

#### prop方法通信

优点 : 实现简单

* 父给子传递

  parent

  ```vue
  <template>
    <div>
      <child-component :name="name" />
    </div>
  </template>
  
  <script>
  import ChildComponent from "./components/ChildComponent.vue";
  export default {
    components: { ChildComponent },
    name: "App",
    data() {
      return {
        name: "lisnote",
      };
    },
  };
  </script>
  ```

  child

  ```vue
  <template>
    <div>
      {{ name }}
    </div>
  </template>
  
  <script>
  export default {
    name: "ChildComponent",
    mounted() {
      console.log(this.name);
    },
    props: ["name"],
  };
  </script>
  ```

* 子给父传递

  parent

  ```vue
  <template>
    <div>
      <child-component :receive="receive" />
      {{ name }}
    </div>
  </template>
  
  <script>
  import ChildComponent from "./components/ChildComponent.vue";
  export default {
    components: { ChildComponent },
    name: "App",
    data: function () {
      return {
        name: "lisnote",
      };
    },
    methods: {
      receive(name) {
        this.name = name;
      },
    },
  };
  </script>
  ```

  child

  ```vue
  <script>
  export default {
    name: "ChildComponent",
    mounted() {
      this.receive("didongxiaoli");
    },
    props: ["receive"],
  };
  </script>
  ```

#### 自定义事件

在组件元素上绑定事件默认会作为组件事件,绑定原生DOM事件需要使用`.native`修饰符

子组件仅触发事件而不需要接收参数或方法

* 父给子传递

  父组件

  ```vue
  <template>
    <div>
      <child-component @callEvent="callMe" />
    </div>
  </template>
  
  <script>
  import ChildComponent from "./components/ChildComponent.vue";
  export default {
    components: { ChildComponent },
    name: "ParentComponent",
    comments: [ChildComponent],
    data() {
      return {
        name: "lisnote",
      };
    },
    methods: {
      callMe() {
        console.log("Hi~", this.name);
      },
    },
  };
  </script>
  ```

  子组件

  ```vue
  <script>
  export default {
    name: "ChildComponent",
    mounted(){
        this.$emit("callEvent")
    }
  };
  </script>
  ```

* 子给父传递

  父组件

  ```vue
  <template>
    <div>
      <child-component @rename="rename" />
      {{ name }}
    </div>
  </template>
  
  <script>
  import ChildComponent from "./components/ChildComponent.vue";
  export default {
    name: "ParentComponent",
    components: { ChildComponent },
    data() {
      return {
        name: "lisnote",
      };
    },
    methods: {
      rename(name) {
        this.name = name;
      },
    },
  };
  </script>
  ```

  子组件

  ```vue
  <script>
  export default {
    name: "ChildComponent",
    mounted() {
      this.$emit("rename", "didongxiaoli");
    },
  };
  </script>
  ```

* 与$on相似的还有$once,他的作用是只触发一次

#### ref+自定义事件

灵活性强但是步骤多

parent

```vue
<template>
  <div>
    <child-component ref="child" />
  </div>
</template>

<script>
import ChildComponent from "./components/ChildComponent.vue";
export default {
  components: { ChildComponent },
  name: "ParentComponent",
  comments: [ChildComponent],
  data() {
    return {
      name: "lisnote",
    };
  },
  methods: {
    callMe() {
      console.log("Hi~", this.name);
    },
  },
  mounted() {
    this.$refs.child.$on("callEvent", this.callMe());
  },
};
</script>
```

child

```vue
<script>
export default {
  name: "ChildComponent",
  mounted() {
    this.$emit("callEvent");
  },
};
</script>
```

#### 解绑事件

```vue
// 解绑当个事件
this.$off("event");
// 解绑多个事件
this.$off(["event1", "event2"]);
// 解绑所有事件
this.$off();
```

### 销毁组件

销毁组件会自动销毁组件下的事件组件的子组件等

```vue
this.$destroy() //销毁当前组件实例
```

## 插件

* 一个基本的插件定义

```javascript
export default{
    install(Vue){
        // 执行的代码
    }
}
```

* 使用插件

```javascript
import plugin form "PluginName";
Vue.use(plugin);
```



# 技术体系

## 组件通信方式

### 全局事件总线

利用原型对象所有实例可访问,以及生命周期的控制和并方式,达到全局添加一个共同对象的效果,利用该对象传输数据,可以做到组件间传输信息只经过一个对象而不需要层层传输

1. 安装全局事件总线

   ```javascript
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this;
   	},
       ......
   }) 
   ```

2. 使用事件总线

   ```vue
   methods(){
     demo(data){......}
   }
   ......
   mounted() {
     this.$bus.$on('xxxx',this.demo)
   }
   ```

3. 提供数据

   ```vue
   this.$bus.$emit('xxxx',数据)
   ```

4. 当组件销毁时,$off解绑当前组件所用的事件

**有异议** : 为什么要安装全局事件总线呢?明明$root就可以任意组件直接访问

```javascript
this.$root.$on("test",this.test)
this.$root.$emit("test","test data")
```

* **用例**

  main.js

  ```javascript
  new Vue({
  	el: '#app',
  	render: h => h(App),
  	beforeCreate() {
  		Vue.prototype.$bus = this;
  	}
  })
  ```

  子组件1发送信息

  ```vue
  <template>
    <div>
      <button @click="send">点我传输信息</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChildSend",
    data() {
      return {
        name: "didongxiaoli",
      };
    },
    methods: {
      send() {
        this.$bus.$emit("send", this.name);
      },
    },
  };
  </script>
  ```

  

  子组件2接收信息

  ```vue
  <template>
    <div>
      {{ name }}
    </div>
  </template>
  
  <script>
  export default {
    name: "ChildSend",
    data() {
      return {
        name: "lisnote",
      };
    },
    methods: {
      receive(name) {
        this.name = name;
      },
    },
    mounted() {
      this.$bus.$on("send", this.receive);
    },
    beforeDestroy() {
      this.$bus.$off("send");
    },
  };
  </script>
  ```

  

### 订阅与发布

使用pubsub.js

* 安装

  ```bash
  npm i pubsub-js
  ```

* 发布

  ```vue
  <script>
  import pubsub from "pubsub-js";
  export default {
    name: "ChildSend",
    mounted() {
      pubsub.publish("eventName", "参数");
    },
  };
  </script>
  ```

* 订阅

  ```vue
  <script>
  import pubsub from "pubsub-js";
  export default {
    name: "ChildSend",
    mounted() {
      this.pubId = pubsub.subscribe("eventName", (eventName, param) => {
        console.log("eventName消息被发布,并带有参数", eventName, param);
      });
    },
    destroyed() {
      pubsub.unsubscribe(this.pubId);
    },
  };
  </script>
  ```

### Vuex

集中式状态管理插件

![vuex](assets/Vue.md/vuex.png)

#### Vuex基本设置

* 安装插件

  **Vue2使用vuex@3,Vue3使用Vue@4**

  ```bash
  npm i vuex
  ```

* 插件配置文件`./store/index.js`

  ```javascript
  import Vue from "vue";
  import Vuex from "vuex";
  Vue.use(Vuex);
  // 用于整合数据,输出业务
  const actions = {};
  // 用于操作数据
  const mutations = {};
  // 用于存储数据
  const state = {};
  
  // 创建store
  export default new Vuex.Store({
      actions,
      mutations,
      state,
  })
  ```

* 入口文件配置

  ```javascript
  import Vue from 'vue';
  import App from './App.vue';
  import store from './store';
  
  new Vue({
  	el: '#app',
  	store,
  	render: h => h(App),
  });
  // 通过 `Vue实例.$store` 即可使用Vuex
  ```

#### Vuex基本用例

* 配置文件

  ```javascript
  import Vue from "vue";
  import Vuex from "vuex";
  Vue.use(Vuex);
  
  const actions = {
      increment(context, value) {
          console.log("increment方法被调用,sum =", context.state.sum)
          context.commit("INCREMENT", value);
          console.log("increment方法已结束,sum =", context.state.sum)
      }
  };
  const mutations = {
      INCREMENT(state, value) {
          console.log("INCREMENT方法被调用,sum =", state.sum)
          state.sum += value;
          console.log("INCREMENT方法已结束,sum =", state.sum)
      }
  };
  const state = {
      sum: 0,
  };
  
  export default new Vuex.Store({
      actions,
      mutations,
      state,
  })
  ```

* 组件

  ```vue
  <template>
    <div>{{ $store.state.sum }}</div>
  </template>
  
  <script>
  export default {
    name: "App",
    mounted() {
      this.$store.dispatch("increment", 1);
      this.$store.commit("INCREMENT", 2);
    },
  };
  </script>
  ```

#### vuex getter配置项

vuex中的getters于state,相当于vue中computed于data

* vuex配置文件

  ```javascript
  const state = {
      sum: 3,
  };
  const getters = {
      binarySum(state) {
          return state.sum.toString("2");
      }
  }
  export default new Vuex.Store({
      state,
      getters,
  })
  ```

* 组件中使用

  ```vue
  <div>
      {{ $store.getters.binarySum }}
  </div>
  ```

#### Vuex中的映射器

Vuex提供了mapState,mapGetters,mapActions,mapMutations几个常用映射器,

当某个组件需要大量使用vuex中的字段和方法时,使用映射器可以减少代码量,提高可读性

以mapperState为例,当组件需要使用vuex.state中的name,age,gender字段时可以这样写

```vue
<template>
  <div>
    {{ name }}
    {{ age }}
    {{ gender }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["name", "age", "gender"]),
  },
};
</script>
```

根据需求的不同,还可以使用对象配置

```vue
<template>
  <div>
    {{ nickname }}
    {{ year }}
    {{ sex }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      nickname: "name",
      year: "age",
      sex: "gender",
    }),
  },
};
</script>
```

#### Vuex模块化

配置参考

```javascript
const totalizer = {
    namespaced:true,	// 默认为false,改为true后才可以使用vuex映射工具进行简写
    actions,
    mutations,
    state,
    getters,
}

export default new Vuex.Store({
    modules:{totalizer}
})
```

使用参考

```vue
<template>
  <div>
    <!-- 一般使用都与state相同,仅getters比较特殊 -->
    总和 : {{ $store.state.totalizer.sum }}<br />
    二进制总和 : {{ $store.getters["totalizer/binarySum"] }}<br />
    总和 : {{ sum }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    // 映射工具风格统一,仅以mapState为例
    ...mapState("totalizer", ["sum"]),
  },
};
</script>
```

### Pinia

**补课:**听闻是个与Vuex相似,且更推荐的工具,与Vuex相同团队的作品

## 网络请求工具

第三方通用方法,不再赘述

### axios

一个基于promise的http库,异步通信效果好,同步通信较为麻烦

```javascript
axios.get("https://api.github.com")
    .then(resp => console.log(resp.data))
```

### jquery

同步异步都可以,但是不能链式调用且体积较大,不建议使用除非框架内有其他依赖jquery的模块,例如bootstrap

```javascript
console.log(
    $.get({ url: "https://api.github.com", async: false })
        .responseJSON
);
```

### fetch

挺好的异步工具,浏览器原生支持,nodejs16.5添加实验性支持,nodejs使用需要`--experimental-fetch`,缺点是同步麻烦且最低需要二次调用才能获得响应数据

```javascript
fetch("https://api.github.com")
    .then(resp => resp.json())
    .then(json => console.log(json))
```



## 环境构建工具

构建工具体系庞大,单独成一文档,此处不再赘述

### VueCLI

Vue构建工具,基于webpack,默认当作配置完善的webpack环境即可

[用CLI创建Vue3项目](#VueCLI基本使用)

[点此查找webpack笔记](https://lisnote.com/?search=webpack)

### webpack

通用构建工具,不属于vue,[点此查找webpack笔记](https://lisnote.com/?search=webpack)

### Vite

通用构建工具,使用esbuild预购建,rollup打包,测试支持单独模块跟新,多方面效率更高

通用构建工具,不限于vue,[点此查找vite笔记](https://lisnote.com/?search=vite)

## 路由

根据不同的路径,渲染不同的模块

一般指vue-router插件

这里使用的是vue-router@3

### 路由基本使用

* 安装

  ```bash
  npm i vue-router@3
  ```

* 编写配置文件,建议配置主文件位于`./src/router/index.js`

  ```javascript
  import VueRouter from "vue-router";
  
  import HomePage from "../pages/HomePage";
  import ArticlePage from "../pages/ArticlePage";
  
  export default new VueRouter({
    routes: [
      {
        path: "/home",
        component: HomePage,
      },
      {
        path: "/article",
        component: ArticlePage,
      },
    ],
  });
  ```

* 引入VueRouter

  ```javascript
  import Vue from "vue";
  import App from "./App.vue";
  import VueRouter from "vue-router";
  import router from "./router";
  Vue.use(VueRouter);
  
  Vue.config.productionTip = false;
  
  new Vue({
    el: "#app",
    render: (h) => h(App),
    router: router,
  });
  ```

* vue模板文件变化

  ```vue
  <template>
    <div>
      <!-- 使用router-link进行页面跳转,渲染后为a标签,href变为to属性,当跳转的页面为活动页面时,active-class中的类会被渲染 -->
      <router-link to="/home" active-class="select">home</router-link><br />
      <router-link to="/article" active-class="select">article</router-link>
      <!-- router-view类似插槽,告诉vue-router渲染位置 -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
  };
  </script>
  
  <style scoped>
  .select {
    background-color: gray;
  }
  </style>
  ```

**注意点:**

1. 为便于路由管理,路由组件一般放在pages文件夹而非components

2. 通常路由隐藏的组件,默认被销毁

3. 使用router插件后所有组件都会有

   $route : 每个组件各自不同,记录自身路由信息

   $router : 指向同一个对象,包含路由常用方法字段

### 多级路由

* 修改配合为

  ```javascript
  import VueRouter from "vue-router";
  
  import ArticlePage from "../pages/ArticlePage";
  import ArticleJava from "../pages/ArticleJava";
  import ArticleLinux from "../pages/ArticleLinux";
  
  export default new VueRouter({
    routes: [
      {
        path: "/article",
        component: ArticlePage,
        children: [
          {
            path: "java",
            component: ArticleJava,
          },
          {
            path: "linux",
            component: ArticleLinux,
          },
        ],
      },
    ],
  });
  
  ```

* 一级路由模板

  ```vue
  <template>
    <div>
      <router-link to="/article/java">java</router-link><br>
      <router-link to="/article/linux">linux</router-link>
      <router-view></router-view>
    </div>
  </template>
  ```

### 命名路由

跳转时,不仅能使用字符串,还能用对象写法进行跳转

```vue
<router-link
  :to="{
    path: '/article/java',
  }"
  >article</router-link
>
```

使用name进行跳转需要

1. 对路由/article/java进行命名

   ```javascript
   {
     name: "Java",
     path: "java",
     component: ArticleJava,
   },
   ```

2. 跳转时

   ```vue
   <router-link
     :to="{
       // path: '/article/java',
       name: 'Java',
     }"
     >linux</router-link
   >
   ```

### 路由带参跳转

#### $route.query

* 传入参数时

  ```vue
  <router-link to="/article?q=java">article</router-link>
  ```

* 接收参数时

  ```javascript
  console.log(this.$route.query.q);
  // output: java
  ```

* 使用对象方式

  ```vue
  <router-link
    :to="{
      path: 'article',
      query: { q: article },
    }"
    >article</router-link
  >
  ```

#### $route.params

1. 配置路由

  ```javascript
{
  name: 'Article',
  path: '/article/:article',
  component: ArticlePage,
},
  ```

2. 传入参数时

  ```vue
<router-link to="/article/java">article</router-link>
  ```

3. 接受参数时

  ```javascript
console.log(this.$route.params.article);
// output: java
  ```

*  对象写法

  ```vue
  <router-link
    :to="{
      name: 'Article',
      params: {
        article: 'java',
      },
    }"
    >article</router-link
  >
  ```

  **注意:**params对象写法跳转时,只能用name进行跳转

#### props路由传参

* 方式1,只传params

1. 配置

   ```javascript
   {
     name: 'Article',
     path: '/article/:article',
     component: ArticlePage,
     props: true,
   },
   ```

2. 传入

   ```vue
   <router-link
     :to="{
       name: 'Article',
       params: {
         article: 'java',
       },
     }"
     >article</router-link
   >
   ```

3. 接收

   ```javascript
   export default {
     name: 'ArticlePage',
     props: ['article'],
     mounted() {
       console.log(this.article);
     },
   };
   ```

* 方式2 更加灵活

1. 配置

   ```javascript
   {
     ...
     props($router) {
       return {
         article: $router.params.article,
         page: $router.query.page,
       };
     },
   },
   ```

2. 传入

   ```vue
   <router-link
     :to="{
    name: 'Article',
       params: { article: 'java' },
       query: { page: 10 },
     }"
     >article</router-link
   >
   ```
   
3. 接收

   ```javascript
   export default {
     name: 'ArticlePage',
     props: ['article', 'page'],
     mounted() {
       console.log(this.article,this.page);
     },
   };
   ```

### 路由跳转模式

路由跳转有两种模式,push和replace,浏览器默认为push,push是追加,replace是替换当前记录

```vue
<router-link to="/home" replace>HomePage</router-link>
```

### 编程式路由导航

```javascript
$router.push({
  // 与在标签中使用对象写法一致
});
$router.replace({
  // 与在标签中使用对象写法一致
});
// 前进
$router.forward();
// 后退
$router.back();
// 可前进可后退,以后退3步为例
$router.go(-3);
```

### 缓存路由组件

当路由组件被隐藏时,默认会销毁组件,为保持路由组件被挂载,可以使用\<keep-alive\>

```vue
<keep-alive include="ComponentName"> 
    <router-view></router-view>
</keep-alive>
```

### 路由声明周期钩子

路由组件独有的声明周期钩子,用于不过路由的激活状态

activated : 激活时触发

deactivated : 失活时触发

### 路由组件自定义数据

传入的配置对象中还可以包含一个meta对象,用于包含自定义的数据

```javascript
{
  path: '/article',
  component: ArticlePage,
  meta: {
    isAuth: true,
  },
},
```

### 路由守卫

#### 全局路由守卫

* 在路由配置中,可以使用beforeEach方法对路由进行鉴权,

```javascript
let route = new VueRouter({
  // ...
})
route.beforeEach((to,from,next)=>{})
```

* beforeEach接收的回调函数中有三个参数,分别记录着前往的路径细腻,来自的路径信息,以及授权通过的next函数

* beforeEach被称为前置路由守卫,与之相对的还有后置路由守卫afterEach,但是afterEach的回调函数并没有传入next()函数,也就是并没有内置鉴权功能

```javascript
route.afterEach((to, from) => {
  console.log(to, from);
});
```

* 一般情况下beforeEach用于鉴权成功后的业务

#### 独享路由守卫

在组件的对应路由配置对象中,存在着beforeEnter项,只在该路由中生效

```javascript
{
  path: '/article',
  component: ArticlePage,
  beforeEnter(to, from, next) {
    console.log(to, from);
    next();
  },
},
```

**并没有独享后置路由守卫**

#### 组件内路由守卫

* 在路由组件配置对象内,存在着

  1. beforeRouteEnter : 组件内入口路由守卫,通过路由规则进入组件时被调用
  2. beforeRouteLeave : 组件内出口路由守卫,通过路由规则离开组件事被调用

  ```javascript
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to,from, next) {
    console.log(to,from);
    next();
  },
  ```

  **注意:**beforeRouteLeave和afterEach的逻辑并不相通,beforeRouteLeave是离开前被调用,并有鉴next参数,afterEach是在进入后被调用,且无鉴权功能

#### 路由守卫执行顺序

1. 全局前置路由守卫 beforeEach()

2. 独享路由守卫 beforeEnter()

3. 组件内入口路由守卫 beforeRouteEnter()

4. 全局后置路由守卫 afterEach()

### history和hash模式

hash模式举例 : ${location.host}/#/path

history模式举例 : ${location.host}/path

默认为hash模式,更改为history模式需要进行配置

```javascript
new VueRouter({
  mode: 'history',
  // ...
}
```

区别

| 模式     | history        | hash    |
| -------- | -------------- | ------- |
| 路径     | 无`/#/`        | 有`/#/` |
| 兼容性   | 略差           | 略好    |
| 静态页面 | 需后端主动支持 | 单页面  |

* history模式下的 404问题

  express后端使用中间件connect-history-api-fallback

  nginx后端配置
  
  ```nginx
  location / {
    add_header Cache-Control 'no-store, no-cache'; // 设置不缓存
    try_files $uri $uri/ /index.html;
  }
  ```

### 路由模块化

方法有很多,其中一个手段是拆分对象,属javascript部分,不再赘述

## UI组件

### Element UI

[官网](https://element.eleme.cn/)

#### Element UI基本使用

* 安装

  ```bash
  npm i element-ui
  ```

* 完整引入

  ```javascript
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(ElementUI);
  ```

* 案例-使用button

  ```vue
  <el-button type="primary">element button</el-button>
  ```



#### Element UI按需引入

1. 安装babel-plugin-component

   ```bash
   npm install babel-plugin-component -D
   ```

2. 修改babel配置文件(不同工具不同配置文件)

   ```json
   module.exports = {
     presets: [['@babel/preset-env', { modules: false }]],
     plugins: [
       [
         'component',
         {
           libraryName: 'element-ui',
           styleLibraryName: 'theme-chalk',
         },
       ],
     ],
   };
   
   ```

3. 以button为例,引入button组件

   ```javascript
   import { Button } from 'element-ui';
   Vue.use(Button);
   ```



## 静态化

### VuePress

静态化页面,根据route会生成每一个对应的页面,并默认集成了一些常用工具,在进行路由切换时仍然保持模块化更新的特性,也就是效率依旧





















































# 原理探索

## 数据驱动

* Object.defineProperty

```javascript
let data = {}
let initValue = 'hansker';
Object.defineProperty(data,'newKey', {
	get: function() {
		console.log('执行了get方法');
		return initValue
	},
	set: function(value) {
		console.log('执行了set方法');
		initValue = value
	}
})
data.newKey = "AAA"
console.log(data.newKey);
```








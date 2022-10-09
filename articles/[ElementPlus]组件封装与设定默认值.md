---
date: 2022-10-04 00:00:00
---

## 使用场景

最近需要给 ElInput 设定 maxlength, 一个一个设自然是不太现实的, 相当的麻烦.

而由于[官方的全局设置](https://element-plus.org/en-US/guide/quickstart.html#global-configuration)限制有点多, 且按需引入的话全局配置还得用 ElConfigProvider 组件包裹一层.

功能不足还容易让自己逻辑混乱, 为了满足按需引入并能够高度自定义Element组件的需求, 我决定这么做.

1. 使用函数式组件对 ElInput 进行一层封装
2. 全局注册封装后的组件

## 实现步骤

1. 写组件注册插件

```Typescript
// ElmentPlugin.ts
import { h, FunctionalComponent, App } from 'vue';
import { ElInput as Input } from 'element-plus';
import 'element-plus/dist/index.css';

const ElInput: FunctionalComponent = function (props: any, context) {
  return h(
    Input,
    {
      ...props,
      maxlength: props.maxlength
        ? props.maxlength
        : props.type == 'textarea'
        ? 250
        : props.type === 'text' || props.type === undefined
        ? 30
        : undefined,
    },
    { ...context.slots },
  );
};

const components = [ElInput];

export default function useElementPlus(app: App) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
```

2. 引入插件

```typescript
// main.ts
import { createApp } from 'vue';
import ElementPlugin from './ElementPlugin';
import App from './App.vue';
const app = createApp(App);

app.use(ElementPlugin)
app.mount('#app');
```

3. 使用 ElInput

```vue
<!-- App.vue -->
<script lang="ts" setup>
import { ref } from 'vue';
let data = ref('');
</script>
<template>
  <ElInput v-model="data" />
</template>
```

## 茶余饭后

国庆前做了远程开发环境, 然后回家发现公司开发服务器在国庆期间直接断电, 早知道我电脑都不带回家🤣

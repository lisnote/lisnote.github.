---
date: 2022-10-13 00:00:00
---

## v-model是什么

v-model是一个指令, 常用于双向数据绑定, 但是他实际上是一个语法糖, 会被编译成一个属性和一个事件, 以达到双向数据绑定的目的[<sup>1</sup>](#refer-1)

## v-model的工作方式

在原生html元素中, v-model会被编译成`value`和`input事件`, 以下两个元素是等价的

```vue
<input v-model="searchText" />
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

而在组件中, v-model会被编译成 `modelValue `和 `onUpdate:modelValue事件` , 以下两个元素是等价的

```vue
<CustomInput v-model="searchText"/>
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

## 如何创建支持v-model的组件

知道了以上两点, 那么我们就可以写出来一个支持 v-model 指令的组件

```vue
<!-- TestComponent.vue -->
<template>
  <button @click="emit('update:modelValue', props.modelValue + 1)">add</button>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});
</script>
```

使用

```vue
<!-- App.vue -->
<script lang="ts" setup>
import { ref } from 'vue';
import TestComponent from './TestComponent.vue';
let data = ref();
</script>
<template>
  <TestComponent v-model="data" />
  {{ data }}
</template>
```

## v-model参数

使用v-model时还可以添加参数来修改绑定的属性名和事件名

例如v-model:title会被编译为 `title` 属性和  `update:title` 事件

以下两个组件是等价的

```vue
<CustomInput v-model:title="searchText"/>
<CustomInput
  :title="searchText"
  @update:title="newValue => searchText = newValue"
/>
```

## 需要避免的问题

动态渲染组件是组件, 在动态渲染组件中使用v-model会被编译为 `modelValue `和 `onUpdate:modelValue事件` 

因此在动态渲染组件中绑定原生HTML元素将会导致v-model失效[<sup>2</sup>](#refer-2)

```vue
<script setup>
import { ref } from 'vue'

const tag = ref('input')
const username = ref('')
</script>

<template>
  <!-- 无法正常生效, 因为绑定的tab值为原生HTML元素 -->
  <component :is="tag" v-model="username" />
</template>
```



---

1. [usage with v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model)<span id="refer-1"></span>

2. [built in special elements](https://vuejs.org/api/built-in-special-elements.html#component)<span id="refer-2"></span>
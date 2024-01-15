---
Date: 2023-06-26 11:18:00
---

# ThreeJS

被广泛使用的开源库, 一个封装了WebGL的3D引擎

官方文档: [https://threejs.org/docs/index.html](https://threejs.org/docs/index.html)

完整案例: 

**前置环境说明**

node: 18.14

```json
{
  "dependencies": {
    "three": "^0.153.0"
  },
  "devDependencies": {
    "@types/three": "^0.152.1",
    "vite": "^4.3.9"
  },
  "scripts": {
    "dev": "vite"
  }
}
```

## 基础

### 安装

1. 目录结构

   /index.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title>My first three.js app</title>
       <style>
         body {
           margin: 0;
         }
       </style>
     </head>
     <body>
       <script type="module" src="./main.js"></script>
     </body>
   </html>
   ```

   /main.js

   ```
   // 导入所需模块
   import { Scene } from 'three';
   // 导入插件
   import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
   ```

2. 命令行安装依赖

   ```bash
   npm install --save three
   npm install --save-dev vite
   ```

3. 命令行启动vite

   ```bash
   npx vite
   ```

   以上步骤正常执行时, 命令行会输出一个类似 [http://localhost:5173](http://localhost:5173) 的网页链接, 使用浏览器打开为一个空白网页

**可选步骤**

安装类型声明(用于查看类型声明, 代码补全)

```bash
npm i -D @types/three
```

### 创建一个场景

**创建场景步骤**

1. 创建场景并展示到电脑屏幕我们需要下面三个工具, 简单解释其功能

   1. 场景: 布置环境
   2. 相机: 截成平面画
   3. 渲染器: 如何展示

2. 了解基本概念后开始创建场景

   ```javascript
   // 导入所需模块
   import {
     Scene,
     BoxGeometry,
     MeshBasicMaterial,
     Mesh,
     PerspectiveCamera,
     WebGLRenderer,
   } from 'three';
   
   // 场景 ----------------------------------------------------------------------------------------------------
   // 1 创建场景scene
   const scene = new Scene();
   // 1.1 创建一个几何图形geometry,宽度为1,高度为1,深度为1
   const boxGeometry = new BoxGeometry(1, 1, 1);
   // 1.2 设置该几何图形的y轴中心点到底部
   boxGeometry.translate(0, 0.5, 0);
   // 1.3 创建一种基础材料material,颜色为c1c1c1
   const boxMaterial = new MeshBasicMaterial({ color: 0xc1c1c1 });
   // 1.4 创建一个物体building,形状为boxGeometry, 材料为boxMaterial
   const building = new Mesh(boxGeometry, boxMaterial);
   // 1.5 将物体building添加到场景scene中
   scene.add(building);
   // 相机 ----------------------------------------------------------------------------------------------------
   // 2 创建相机camera, 视野角度75,宽高为网页的宽高, 近截面0.1, 远截面2000
   const camera = new PerspectiveCamera(
     75,
     window.innerWidth / window.innerHeight,
     0.1,
     2000,
   );
   // 2.1 设置相机坐标
   camera.position.set(0, 2, 1.5);
   // 2.2 设置相机方向
   camera.lookAt(0, 1, 0);
   // 渲染器 ----------------------------------------------------------------------------------------------------
   // 3 创建渲染器renderer
   const renderer = new WebGLRenderer();
   // 3.1 设置渲染器宽高为网页宽高
   renderer.setSize(window.innerWidth, window.innerHeight);
   // 3.2 添加渲染器到网页
   document.body.appendChild(renderer.domElement);
   // 3.3 开始渲染场景
   function updateRenderer() {
     // 设置浏览器下次重绘前重新执行函数
     requestAnimationFrame(updateRenderer);
     // 渲染场景
     renderer.render(scene, camera);
   }
   updateRenderer();
   
   ```

**常见几何体**

1. 长方体: BoxGeometry
2. 圆柱体: CylinderGeometry
3. 球体: SphereGeometry
4. 圆锥: ConeGeometry
5. 矩形平面: PlaneGeometry
6. 圆平面: CircleGeometry

**常见材质**

1. 网格基础材质: MeshBasicMaterial
2. 网格漫反射材质: MeshLambertMaterial
3. 网格高光材质: MeshPhongMaterial
4. 物理材质:
   1. 标准网格材质: MeshStandardMaterial
   2. 物理网格材质: MeshPhysicalMaterial
5. 点材质: PointsMaterial
6. 线基础材质: LineBasicMaterial
7. 精灵材质: SpriteMaterial

### 3D对象属性

我们常用的Mesh和PerspectiveCamera以及许多未开始教学的对象都继承了一个叫Object3D的对象, 这个对象有几个十分重要的属性和方法

1. scale: 缩放
2. position: 位置
3. rotation: 旋转角度

**关键代码**

```javascript
// 1 缩放对象宽度为原来的一半
building.scale.set(0.5, 1, 0.5);
// 2 随机旋转对象
building.rotation.set(0,Math.random()*Math.PI,0)
// 3 设置对象位置
camera.position.set(0, 2, 1.5);
// 4 设置对象指向
camera.lookAt(0, 1, 0);

```

除了自定义函数计算点位, 还可以使用官方所提供的数学工具去获取点集, 我们后续会再展开学习.

### WebGL兼容性检查

某些浏览器并不支持WebGL, 也就无法按照普通方法正常使用three, 因此需要进行WebGL兼容性检查

```javascript
import WebGL from 'three/examples/jsm/capabilities/WebGL';
if (WebGL.isWebGLAvailable()) {
  // ...
} else {
  alert('您的浏览器不支持WebGL');
}
```

由于本文使用的是模块化开发, 还可以增加一个模块化支持检查

```html
<!-- 1 判断是否支持javascript模块 -->
<!-- 1.1 不支持模块时执行脚本 -->
<script nomodule>
  // 1.2 不支持javascript魔铠则弹出警告
  alert('您的浏览器不支持javascript模块');
</script>
```

### 自适应窗口大小变化

窗口大小变化时更新camera和renderer即可, 以PerspectiveCamera和WebGLRenderer为例

```javascript
// 自适应窗口大小变化
// 1 添加窗口变化监听
window.addEventListener('resize', () => {
  // 2 更新相机截面宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 3 更新相机投影矩阵
  camera.updateProjectionMatrix();
  // 4 更新渲染画布尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

### 光源

此前为了方便, 我们使用 MeshBasicMaterial 进行教学, 但他其实是一种特殊的不受光照影响的材质

当使用类似 MeshPhongMaterial 这种在无光条件不可见的材质时, 我们需要添一些光照来使他变得可见

```javascript
// 1 添加直射光
const directionalLight = new DirectionalLight(0xffffff);
// 2 设置直射方向
directionalLight.position.set(-1, 1, -1);
// 3 添加环境光
const ambientLight = new AmbientLight(0xffffff, 0.1);
scene.add(directionalLight, ambientLight);
// 4 使用高光材质
const boxMaterial = new MeshPhongMaterial({ color: 0xc1c1c1 });
```

**常见光源**

1. 环境光: AmbientLight
2. 点光源: PointLight
3. 平行光: DirectionLight
4. 聚光灯: SpotLight

### 阴影

光和阴影并不会依照自然逻辑产生, threejs中生成阴影需要以下步骤

1. 光源

   设置光源投射阴影

   设置光源阴影投射范围

2. 模型

   设置产生阴影投影的模型

   设置接收阴影投影的模型

3. 渲染器

   设置渲染器开启阴影渲染

```javascript
// 1.1 设置光源投射阴影
directionalLight.castShadow = true;
// 1.2 设置光源阴影投射范围
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.near = -10;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.top = 10;
// 2.1 设置模型投射阴影
building.castShadow = true;
// 2.2 设置模型接收阴影投射
building.receiveShadow = true;
// 2.3 添加地面
const planeGeometry = new PlaneGeometry(10, 10);
planeGeometry.rotateX((270 * Math.PI) / 180);
const planeMaterial = new MeshPhongMaterial({ color: 0xffffff });
const floorMat = new Mesh(planeGeometry, planeMaterial);
// 2.4 设置地面接收阴影投射
floorMat.receiveShadow = true;
// 3.1 设置渲染器渲染阴影
renderer.shadowMap.enabled = true;
```

阴影的计算范围设置可能有点复杂, 特别说明一下

因为这里使用的是平行光, 所以可以将平行光看做一个平行相机, 设置了position之后, 平行光会照向0点, 

以该position为起点, 光照方向为前方, 设置光照影响范围

Tips:

1. 环境光源不计算阴影, 不同光源设置阴影计算范围的方式不同
2. 光源计算阴影范围越大, 对相同大小物体的计算精度越低

### 载入3D模型

Three支持的3D模型非常的多, 然而为了避免不必要的问题, 我们推荐使用glTF(gl传输格式), `.GLB`和`.GLTF`是这种格式的两种不同版本

公共领域的GLTF文件可以在网上找到, 或是使用Blender等软件将其他格式转换为GLTF

此处使用的是threejs官方案例所使用的soldier模型

[https://github.com/mrdoob/three.js/raw/master/examples/models/gltf/Soldier.glb](https://github.com/mrdoob/three.js/raw/master/examples/models/gltf/Soldier.glb)

```javascript
// 导入模型
// 1 创建模型加载器
const loader = new GLTFLoader();
// 2 加载模型
loader.load(
  // 2.1 模型路径
  '/assets/Soldier.glb',
  // 2.2 加载成功回调函数
  (gltf) => {
    // 2.2.1 获取模型
    const model = gltf.scene;
    const character = gltf.scene.getObjectByName('Cha
    scene.add(model);
    // 模型阴影
    // 2.2.2 遍历角色模型及后代
    character.traverse((obj) => {
      // 2.2.3 如果模型后代是网格对象则设置光影
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  },
  // 2.3 加载时回调函数, 常用于模型加载进度条
  (loding) => {
    console.log(
      '加载进度',
      ((loding.loaded / loding.total) * 100).toFixed(
    );
  },
  // 2.4 模型加载失败回调函数
  console.error,
);
```



### 动画系统

有了光与影, 有了模型, 那么如何让模型动起来呢?

方法有很多, 最推荐的是使用在模型预置的动画效果

```javascript
// 1 创建动画混合器
const mixer = new AnimationMixer(model);
// 2 获取动画片段
const clips = gltf.animations;
const [idleClip, runClip] = clips;
// 3 混合模型与动画片段
const idleAction = mixer.clipAction(idleClip),
  runAction = mixer.clipAction(runClip);
const actions = { idle: idleAction, run: runAction };
// 4 播放所有动画
Object.values(actions).forEach((action) => action.play());
// 5 设置动画权重(关闭奔跑动画)
runAction.setEffectiveWeight(0);
// 模型更新
function updateModel() {
  // 6 更新动画
  mixer.update(0.015);
  requestAnimationFrame(updateModel);
}
updateModel();
```



### 时钟

上节的动画已经成功让我们的士兵动起来了, 但是还有一个非常巨大的问题, 这个士兵的动画速度是与帧率挂钩的, 如何稳定动画速率呢? 使用Clock即可

```javascript
// 1 创建时钟
const clock = new Clock();
// 2 获取距离上次读取时钟的时间差
const deltaT = clock.getDelta();
// 3 使用时间差更新动画
mixer.update(deltaT);
```



### 动画切换

动画的切换实现方式也很多, 这里使用的是更换权重实现的动画切换

```javascript
// 动画切换
// 1 鼠标按键绑定动画状态
let isRunning = false;
window.addEventListener('mousedown', (event) => {
  if (event.button == 0) {
    isRunning = true;
  }
});
window.addEventListener('mouseup', (event) => {
  if (event.button == 0) {
    isRunning = false;
  }
});
const idleWeight = actions?.idle.weight;
const runWeight = actions?.run.weight;
// 2.1 切换空闲动画
if (idleWeight < 1 && !isRunning) {
  actions.run.setEffectiveWeight(runWeight - deltaT * 3);
  actions.idle.setEffectiveWeight(idleWeight + deltaT * 3);
}
// 2.2 切换奔跑动画
if (runWeight < 1 && isRunning) {
  actions.run.setEffectiveWeight(runWeight + deltaT * 2);
  actions.idle.setEffectiveWeight(idleWeight - deltaT * 2);
}
```

### 相机控件

相机控件封装了一些常见的相机操作函数, 例如

1. 镜头聚焦
2. 镜头移动
3. 镜头事件
4. ...

```javascript
// 1 创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 2 设置控制器目标
controls.target = new Vector3(0, 2, 0);
// 3 关闭右键拖拽
controls.enablePan = false;
function updateControls() {
  requestAnimationFrame(updateControls);
  // 4 更新控制器
  controls.update();
}
updateControls();
// 5 控制器事件绑定
controls.addEventListener('change', () => {
  // 6 获取控制器平面角度
  character.rotation.set(1.5 * Math.PI, 0, controls.getAzimuthalAngle());
});
```

**常见相机控件**

1. 默认不能动Y轴坐标, 适合地图展示的地图控制器: MapControls
2. 类似地图控制器但是允许移动Y轴坐标的轨道控制器: OrbitControls
3. 适合展示物品的弧球控制器: ArcballControls
4. 无限制的第一人称控制器: FirstPersonControls
5. 适合第一人称FPS的指针锁定控制器: PointerLockControls
6. 适合空战的反人类飞行控制器: FlyControls

### 鼠标选择对象

鼠标选择对象的核心是射线, 使用射线从摄像机位置指定方向射出, 与射线相交的物体即为鼠标点击选中的物体

/main.js

```javascript
// 1 创建光线投掷器
const raycaster = new Raycaster();
// 2 添加鼠标点击事件
window.addEventListener('mousedown', (event) => {
  if (event.button != 2) return;
  // 4 在相机中心投射光线
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  // 5 获取传入数组中被投射光线的对象
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0]) {
    // 6 更改首个被投射到光线的对象的材质颜色
    intersects[0].object.material.color.set(Math.random() * 0xffffff);
  }
});
```

为了更加直观的显示光线位置, 为投射点添加一个准心

/index.html

```html
<style>
  /* 2 准心样式 */
  .cross-hair {
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background-color: white;
    }
    &::before {
      height: 20px;
      width: 2px;
    }
    &::after {
      height: 2px;
      width: 20px;
    }
  }
</style>
<!-- 1 准心 -->
<span class="cross-hair"></span>
```

### 碰撞

以 Octree 和 Capsule 为例

```javascript
import { Octree } from 'three/examples/jsm/math/Octree';
import { Capsule } from 'three/examples/jsm/math/Capsule';
// 1. 构建八叉树
const worldOctree = new Octree();
worldOctree.fromGraphNode(floorMat);
// 2. 计算碰撞
const result = worldOctree.capsuleIntersect(
  new Capsule(
    { x: colliderX, y: colliderY + colliderRadius, z: colliderZ },
    { x: colliderX, y: colliderY - colliderRadius + 1.9, z: colliderZ },
    colliderRadius,
  ),
);
```




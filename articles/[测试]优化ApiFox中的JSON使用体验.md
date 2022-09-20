---
date: 2022-09-09 13:40:00
---

## 优化ApiFox中的JSON使用体验

近日ApiFox用的略感不便, 原因有二:

1. 有几次请求中输入了错误的JSON请求体.

   然后一个字一个字找哪里缺逗号哪里多了个大括号, 感觉自己很蠢也很浪费时间.

2. 每次apifox跑通的接口, 浏览器上却没跑通, 对比的时候字段顺序不一, 也比较痛苦. (chrome会根据key排序展示请求体)

遇得多了, 于是决定一次解决这两个问题



## 实现

环境: ApiFox版本2.1.31

思路: 

1. JSON.parse 解析报错 JSON 格式错误的位置
2. 自定义函数 jsonSort 排序 JSON 并替换为请求体
3. 调用 JSON.parse 和 jsonSort 函数

步骤:

1. 项目概览>前置操作>添加前置操作>自定义脚本

```JavaScript
jsonSort = function (obj) {
  if (Array.isArray(obj)) {
    return obj.map(jsonSort);
  } else if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj;
  }
  let sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((o) => (sorted[o] = jsonSort(obj[o])));
  return sorted;
};

let headers = pm.request.headers;
let body = pm.variables.replaceIn(pm.request.body.raw);
if (headers.get('Content-Type') === 'application/json') {
  let parsed;
  pm.test('JSON格式检查', () => (parsed = JSON.parse(body)));
  pm.test("JSON排序", () => pm.request.body.update(JSON.stringify(jsonSort(parsed), null, 2)))
}
```

**jsonSort方法这么写是方便一些人将他设置在公共脚本(ApiFox全局变量的定义要求)**



## 茶余饭后

其实我个人认为ApiFox目前需要增加的功能还挺多的, 其实我给一些官方提过意见, 但是说实话大多数处理的还没一般github issues回复快, 就在这里淡淡的吐槽下算了

1. 定时自动备份或是回溯, 特别重要, 虽然我这没人提过, 但是我自个担心谁哪天把部分接口不小心删了, 一个还好, 一堆重写就是灾难了, 我目前的解决办法是每周一手动克隆一次项目作为备份, 挺怪的但是是我目前懂得的最简单的备份方式, 如果有一劳永逸并且不算特别麻烦的好方法欢迎评论区补充
2. socket功能, 我并没有很深入ApiFox, 但是就表面上来看我没找到socket, 查了也没见过有人用他来测试socket, postman有websocket, 不过他要是还能像hoppscotch那样有socket.io和MQTT我大概会更加喜欢
3. 本文所解决的问题之一, json格式错误时检查相当麻烦, postman里边格式错误会有红色波浪线以供快速定位错误, 像我这样看error定位恐怕还是不太合适
4. JSON变量必须要在字符串内才有效, 如果我的变量是布尔或是数字之类的就只能通过前置脚本来手动替换, 相当麻烦
5. 还有...

列出来的都是我觉得挺重要的点, 还没吐槽完, 不过虽说有毛病, 但瑕不掩瑜吧算是, 至少现在团队用ApiFox就是我推荐的, 不用postman的原因主要是翻看文档和查看完整请求相对麻烦, 我是那种chrome标签开超五个都能难受的人, 标签太多难分主次, postman查看完整请求还直接分成两个窗口我只能说完美戳中我痛点

~~ApiFox快给我打钱~~


---
date: 2022-07-11 00:00:00
---

# 如何在浏览器上展现word文档

1. https://github.com/mwilliamson/mammoth.js

   BSD协议

   将doc解析成html, 有损, 注意要使用浏览器版本, 并自写声明

   ```typescript
   // App.vue
   import axios from 'axios';
   import mammoth from './utils/doc';
   import { ref } from 'vue';
   
   let url =
     'https://keenyoda-iot-bucket.oss-cn-shenzhen.aliyuncs.com/qiwuCrm/userHead/f941de650ee74a129591b63af7b697df.docx';
   let docx = ref('temp');
   axios(url, { responseType: 'arraybuffer' })
     .then(({ data }) => mammoth.convertToHtml({ arrayBuffer: data }))
     .then((result) => (docx.value = result.value));
   ```

   声明

   ```typescript
   // utils/doc/index.ts
   import './mammoth.browser.js';
   declare var mammoth: Mammoth;
   export default mammoth;
   ```

2. 内嵌

   我也不知道微软和谷歌会不会拿你的密码文档去做人工智能什么的, 至少微软有过拿github私有仓库训练的行为, 有泄密风险

   ```html
   <iframe src="https://docs.google.com/gview?url=https://keenyoda-iot-bucket.oss-cn-shenzhen.aliyuncs.com/qiwuCrm/userHead/f941de650ee74a129591b63af7b697df.docx&embedded=true"></iframe>
   <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=https://keenyoda-iot-bucket.oss-cn-shenzhen.aliyuncs.com/qiwuCrm/userHead/f941de650ee74a129591b63af7b697df.docx'>
   ```

3. 转换为pdf再渲染

   转换为pdf,前端可以,但效果不如现有的后端工具

   - awesome-unoconv
   - libreoffice-convert

   渲染 : https://github.com/mozilla/pdf.js/

   Apache-2.0 license


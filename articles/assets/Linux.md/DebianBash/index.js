const fs = require('fs');
const path = require('path');
const resolve = (dir = '') => path.resolve(__dirname, dir);

let dir = fs.readdirSync(resolve());
for (let name of dir) {
  if (name == 'replace' || name == "index.js") continue;
  console.log(name);
  let file = fs.readFileSync(name).toString();
  file = file.replace(/\r\n/g, '\n');
  fs.writeFile('./replace/' + name, file,()=>{});
}

// fs.writeFileSync(resolve("/test","name"),file)

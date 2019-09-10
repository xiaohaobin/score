//创建文件夹目录
var fs = require("fs");
//  /xhb/DEMO/node/text/ 目录必须存在(磁盘的根目录开始)
console.log("创建目录 /xhb/DEMO/node/text/create_1/");
fs.mkdir("/xhb/DEMO/node/text/create_1/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
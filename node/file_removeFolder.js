//删除指定目录，并读取指定目录下的文件名

var fs = require("fs");
// 执行前创建一个空的 /tmp/test 目录
console.log("准备删除目录 /xhb/DEMO/node/text/create_1");
fs.rmdir("/xhb/DEMO/node/text/create_1",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("读取 /xhb/DEMO/node/text/ 目录");
   fs.readdir("/xhb/DEMO/node/text/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
   
   fs.readdir("/xhb/DEMO/node/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
});
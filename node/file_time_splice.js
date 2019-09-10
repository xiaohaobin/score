//每隔一段时间截取一个字节，直至剩下一个

var fs = require("fs");
var buf = new Buffer.alloc(1024);

//打开文件
fs.open('text/test3.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error("打开失败：",err);
   }

	//读取文件
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log("读取失败：",err);
      }
      console.log(bytes + "  字节被读取");
      
      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
         bytes = bytes*1;
         
         sliceFileContent(fd,bytes,buf);
      }
   });
   
   
});

//截取文件
function sliceFileContent(fd,nSort,buf){
	// 截取文件
   fs.ftruncate(fd, nSort, function(err){
      if (err){
         console.log("截取文件失败：",err);
      } 
     
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
        if (err){
        	console.log("读取失败：",err);
        }

         // 仅输出读取的字节
        if(bytes > 0){
        	//每半秒递减截取字段
           console.log(buf.slice(0, bytes).toString());
           nSort--;
           if(nSort <= 0){return false;}
           setTimeout(function(){
           	sliceFileContent(fd,nSort,buf);
           },500);
        }

      });
   });
}

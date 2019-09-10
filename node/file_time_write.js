//每隔一段时间，随机写入一个字节（随机数字）
var fs = require("fs");
var timer = null;
var maxBytes = 100;//最大字节100
var sTxt = "";

//写入文件
function fileWriteFn(txt){
	fs.writeFile('text/write.txt', txt,  function(err) {
	   if (err) {
	       return console.error("写入失败：",err);
	   }
	  
	   fs.readFile('text/write.txt', function (err, data) {
	      if (err) {
	         return console.error("读取失败：",err);
	      }
	      console.log("异步读取文件数据: " + data.toString());
	      if(sTxt.length == maxBytes){return false;}
	      timer = setTimeout(randomTxt,200);
	   });
	});
}

//随机生成数字字符
function randomTxt(){
	sTxt += parseInt(Math.random(10)*10);
	fileWriteFn(sTxt)
}

randomTxt();
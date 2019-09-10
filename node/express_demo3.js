//请求开放目录的静态文件
var express = require('express');
var app = express();
 
 //开放该脚本同一级别下的/public目录，可以在浏览器上输入以下地址请求静态文件：
 /**
  *  http://127.0.0.1:8081/public/images/logo.png
  *  http://127.0.0.1:8081/public/js/main.js
  *  http://127.0.0.1:8081/public/css/reset.css
  * */
app.use('/public', express.static('public'));
//开放module_fn目录
app.use('/module_fn', express.static('module_fn'));
 
app.get('/', function (req, res) {
	//res.send('<h1>Hello World</h1>');
	
	var tem = "<h1>Hello World</h1>";
	tem += '开放该脚本同一级别下的/public目录，可以在浏览器上输入以下地址请求静态文件:' + '</br>';
	tem += 'http://127.0.0.1:8081/public/images/logo.png' + '</br>';
	tem += 'http://127.0.0.1:8081/public/js/main.js' + '</br>';
	tem += 'http://127.0.0.1:8081/public/css/reset.css' + '</br>';
    res.send(tem);
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
var express = require('express');
var app = express();
 
 //允许目录
app.use('/public', express.static('public'));
app.use('/pages', express.static('pages')); 
 
 
 //允许请求的页面同目录下的index.html
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
}) 
//允许请求的页面同目录下的ajax.html
app.get('/ajax.html', function (req, res) {
   res.sendFile( __dirname + "/" + "ajax.html" );
}) 
//允许请求的页面:同目录下的pages目录下的ajax.html
app.get('/pages/ajax.html', function (req, res) {
   res.sendFile( __dirname + "/" + "pages/ajax.html" );
}) 
 
 

 
 //允许请求的模块 /process_get
 app.get('/process_get', function (req, res) {
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   //响应头
   res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
   //响应结果
   res.end(JSON.stringify(response));
});

//允许请求的模块 /process_post
 app.post('/process_post', function (req, res) {

   //响应头
   res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});   
   var oRes = {
   		code:0,
   		data:{},
   		request:req,
   		response:res
   };
   //响应结果
   res.end(JSON.stringify(oRes));
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
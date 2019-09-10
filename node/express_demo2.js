//各种模块的请求和不同的请求方式

var express = require('express');
var app = express();
 
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET 请求方式，向根目录请求，get方式');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST，向根目录请求，post方式');
})
 
//  /del_user 页面响应
app.post('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面:' + "向模块del_user 请求，方式post");
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面:向模块 list_user 请求，方式get');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
   res.send('/n');
   res.send('向ab*cd模块请求，如absscd,ab123cd等等，abcd则无效；get请求方式');
})
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port) 
});

/**
 * 分别在浏览器输入：以下请求地址
 * http://127.0.0.1:8081
 * http://127.0.0.1:8081/list_user
 * http://127.0.0.1:8081/del_user
 * http://127.0.0.1:8081/abcdmmp
 * http://127.0.0.1:8081/abmmpcd
 * ..............
 * 可以看到请求之后的不同效果
 * */
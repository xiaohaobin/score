//文件上传
var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
var util = require('util');

//开放目录 
app.use('/public', express.static('public'));
app.use('/pages', express.static('pages'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
 //允许请求的页面（form表单提交）
app.get('/pages/file_upload.html', function (req, res) {
	//打印cookie
   console.log("Cookies: " + util.inspect(req.cookies));
   res.sendFile( __dirname + "/" + "pages/file_upload.html" );
})
 
 //允许请求的页面  ajax请求方式上传文件
 app.get('/pages/file_upload_ajax.html', function (req, res) {
 	//打印cookie
   console.log("Cookies: " + util.inspect(req.cookies));
   res.sendFile( __dirname + "/" + "pages/file_upload_ajax.html" );
})
 
 //允许请求的方法和请求类型
app.post('/file_upload', function (req, res) {
	//设置响应头
   res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    
    
    
   console.log(req.files[0],"上传的文件信息");  // 上传的文件信息
   
   //上传文件目录
   var des_file = __dirname + "/uploadFile/" + req.files[0].originalname;
   console.log("上传文件的名称：" + des_file);
   
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname               
              };
              
              console.log( response );
	          //响应前台数据
	          res.end( JSON.stringify( response ) );
          }
          
       });
   });
})
 
 //开启服务
var server = app.listen(8081, function () { 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
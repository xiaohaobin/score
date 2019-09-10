

var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.write("\n");
    res.write("获取GET请求内容：");
    res.write("\n");
    //获取GET请求内容
    res.end(util.inspect(url.parse(req.url, true)));
    
    console.log("get 请求地址参数",params)
 
}).listen(3000);

//在浏览器上输入地址：http://localhost:3000/username?name=%E5%A2%A8%E9%9A%8F%E9%A3%8E&url=wrnmmp
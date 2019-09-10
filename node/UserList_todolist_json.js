//用户列表 ToDo
var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');

//post请求配置
var bodyParser = require('body-parser');//post请求查询依赖模块
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//开放json目录
app.use('/json', express.static('json'));
app.use('/pages', express.static('pages'));

//开放客户端页面
app.get('/pages/UserList_todolist_json.html', function(req, res) {
	//打印cookie
	console.log("Cookies: " + util.inspect(req.cookies));
	res.sendFile(__dirname + "/" + "pages/UserList_todolist_json.html");
});

//响应数据头参数
var res_head = {
	'Content-Type': 'text/html; charset=utf8'
};

//源数据（json）
var mainDataUrl = __dirname + "/json/" + "userList.json";

//获取用户列表方法
app.get('/listUsers', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	console.log(req.query,"请求list参数")
	fs.readFile(mainDataUrl, 'utf8', function(err, data) {
		console.log(data);
		res.end(data);
	});
})



//新增用户列表(post方式)
app.post('/addUser', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	
	//req.body 客户端请求的数据，键值形式
	var req_data = req.body;
	
	var isSame = false;//是否同名
	// 读取已存在的数据
	fs.readFile(mainDataUrl, 'utf8', function(err, data) {
		data = JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(req_data.name == data[i].name){//name一样
				isSame = true;
			}
		}
		
		//是否一样name
		if(isSame){
			res.end(JSON.stringify({code:1,msg:"name值一样"}));
		}
		else{		
			data.push(req_data);
	
	//		//数据覆盖
			fs.writeFile(mainDataUrl, JSON.stringify(data), function(err) {
				if(err) {
					console.log(err);
				} else {
	
				}	
			});			
			res.end(JSON.stringify({code:0,msg:"succ",main:req.body}));
		}
	
	});	
});

//编辑用户列表(post方式)
app.post('/editUser', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	
	//req.body 客户端请求的数据，键值形式
	var req_data = req.body;
	
	// 读取已存在的数据
	fs.readFile(mainDataUrl, 'utf8', function(err, data) {
		data = JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(req_data.name == data[i].name){//name一样
				data.splice(i,1);
				data.push(req_data);
			}
		}
		
		//数据覆盖
		fs.writeFile(mainDataUrl, JSON.stringify(data), function(err) {
			if(err) {
				console.log(err);
			} else {

			}	
		});			
		res.end(JSON.stringify({code:0,msg:"succ",main:req.body}));
	
	});	
});

//删除用户列表(post方式)
app.post('/delUsers', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	
	//req.body 客户端请求的数据，键值形式
	var req_data = req.body;
	
	// 读取已存在的数据
	fs.readFile(mainDataUrl, 'utf8', function(err, data) {
		data = JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(req_data.name == data[i].name){//name一样
				data.splice(i,1);
				break;
			}
		}
		
		fs.writeFile(mainDataUrl, JSON.stringify(data), function(err) {
			if(err) {
				console.log(err);
			} else {

			}	
		});			
		res.end(JSON.stringify({code:0,msg:"succ",main:req.body}));
	
	});	
});

//开启服务
var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
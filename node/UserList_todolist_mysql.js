//用户列表 ToDo
var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');
var mysql = require('mysql');

var pageSize = 10;//分页个数
//响应数据头参数
var res_head = {
	'Content-Type': 'text/html; charset=utf8'
};
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
app.get('/pages/UserList_todolist_mysql.html', function(req, res) {
	//打印cookie
	//console.log("Cookies: " + util.inspect(req.cookies));
	res.sendFile(__dirname + "/" + "pages/UserList_todolist_mysql.html");
});

//连接本地数据库
var connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'000000',
  database:'my_datatables_1'//数据库名称
});

connection.connect();

//数据模型（按顺序）
var mainDataMode = ["name","age","phone","email","grade","_class","address"];

var sql = 'SELECT * FROM diy_user';//查看某张表的查询语句，如查看diy_user表
var page_sql = ' SELECT * FROM diy_user LIMIT ';

var addSql = 'INSERT INTO diy_user('+ mainDataMode.join() +') VALUES('+ intoVal() +')'; //针对表diy_user 的添加语句
var delSql = 'DELETE FROM diy_user where uid=';//删除语法
var updateSql = 'UPDATE diy_user SET '+ updateSet() +' WHERE uid = ?';//针对表diy_user 的更新语句
//var updateSql = 'UPDATE diy_user SET name = ?,age = ?,phone = ?,email = ?,grade = ?,_class = ?,address = ? WHERE uid = ?';
//var updateSql_data = ["xhb",25,13255845754,"a454@com",1,2,"深证罗斯禁区",8];


//mysql的添加语句返回值插入
function intoVal(){
	var a = [];
	for(var i=0;i<mainDataMode.length;i++){
		a.push('?');
	}
	return a.join();
}

//mysql的更新语句 返回主要字符
function updateSet(){
	var a = [];
	for(var i=0;i<mainDataMode.length;i++){
		a.push(mainDataMode[i] + " = ?"); 
	}
	return a.join();
}

/**
 * 对比数据
 * @param {Object} obj 前台请求的数据
 * @param {Array} 
 * */
function comparFn(obj){	
	var addSqlParams = [];
	for(var i=0;i<mainDataMode.length;i++){
		addSqlParams.push(obj[mainDataMode[i]])
	}
	if(obj.uid){//针对更新数据的添加id
		addSqlParams.push(obj.uid);
	}
	return addSqlParams;
}

//请求失败回调
function backErr(errInfo){
	var oErr = {
		code:1,
		data:errInfo
	};
	return oErr;
}

//请求成功的回调
function backSucc(){
	var oSucc = {
		code:0,
		data:"操作成功"
	};
	return oSucc;
}

/**
 * 查询数据库
 * @param {Function} callback 回调函数
 * @param {Number} pageNum 页码
 * */
function queryDatabase(pageNum,callback){
	var _page_sql = page_sql + (pageNum * 10 - 10) + "," + pageSize;
	console.log("分页查询语句：",_page_sql);
	connection.query(_page_sql,function (err, result) {
		if(callback){		 
	       // err ? callback(backErr(err.message)) : callback(result);	       
	       if(err){
	          callback(backErr(err.message));
	          return;
	        }
	 
	       //数据库的行格式，先转化为string类型
	       var list = [];
	       for(var i=0;i<result.length;i++){
		       	list.push(JSON.stringify(result[i]));
	       }
	     
	       callback(list);
		}	
        
	});
}

//删除数据库某一条
function delDatabase(uid,callback){
	connection.query(delSql+uid,function (err, result) {
      	if(callback){		 	
      		//console.log(result.affectedRows,"result.affectedRows");
      		if(err){
      			callback(backErr(err.message));
      		}
      		if(result.affectedRows == 1){
      			callback(backSucc());
      		}
	        
		} 
      
	});
}
/**
 * 添加数据
 * @param {String} addSql 新增数据的语句
 * @param {Array} addSqlParams 新增进来的数据数组
 * */
function optionDatabase(addSql,addSqlParams,callback){
	connection.query(addSql,addSqlParams,function (err, result) {
      	if(callback){		 	
      		//console.log(result.affectedRows,"result.affectedRows");
      		if(err){
      			callback(backErr(err.message));
      		}
      		if(result.affectedRows == 1){
      			callback(backSucc());
      		}
	        
		} 
	});
}



//获取用户列表方法
app.get('/listUsers', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	//console.log(req.query,"请求list参数");	
	var p = req.query;
	console.log("页码：",p.pageNum);
	queryDatabase(
		p.pageNum,
		function(mainData){
			for(var i=0;i<mainData.length;i++){
				mainData[i] = JSON.parse(mainData[i]);
			}		
			var oR = backSucc();
	        oR.data = mainData;
			res.end(JSON.stringify(oR));
		}
	);
	
});



//新增用户列表(post方式)
app.post('/addUser', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	
	//req.body 客户端请求的数据，键值形式
	var req_data = req.body;
	
	//新增
	optionDatabase(addSql,comparFn(req_data),function(mainData){
		res.end(JSON.stringify(mainData));
	});
	
	
});

//编辑用户列表(post方式)
app.post('/editUser', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	
	//req.body 客户端请求的数据，键值形式
	var req_data = req.body;
//	console.log(updateSql);
//	console.log(comparFn(req_data))
	//更新
	optionDatabase(updateSql,comparFn(req_data),function(mainData){
		res.end(JSON.stringify(mainData));
	});
	
});

//删除用户列表(post方式)
app.post('/delUsers', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	
	//req.body 客户端请求的数据，键值形式
	var req_data = req.body;
	
	//删除
	delDatabase(req_data.uid,function(mainData){
		res.end(JSON.stringify(mainData));
	});
	
	
});

//开启服务
var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
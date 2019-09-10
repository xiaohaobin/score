//连接mysql
var mysql = require('mysql');

//连接本地数据库
var connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'000000',
  database:'my_datatables_1'//数据库名称
});
 
connection.connect();
 
var  sql = 'SELECT * FROM diy_user';//查看某张表的查询语句，如查看diy_user表
var  addSql = 'INSERT INTO diy_user(name,age,phone,email,grade,_class,address) VALUES(?,?,?,?,?,?,?)';
var  addSqlParams = ['guanyunchang', 18,1328877,'4998@qq.com',9,15,'中国广东省落户'];

//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();
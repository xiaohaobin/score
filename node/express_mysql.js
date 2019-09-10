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
 
var  sql = 'SELECT * FROM diy_user';//查看某张表的查询语句，如查看diy_user
//连接查询
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();
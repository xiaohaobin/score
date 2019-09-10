var express = require('express');
var app = express();


app.param('user', function(req, res, next, id) {
//  User.find(id, function(error, user) {
//      if (err) {
//          next(err);
//      }
//      else if (user){
//          req.user = user;
//      } else {
//          next(new Error('failed to load user'));
//      }
//  });
	res.end("12121")
});

var server = app.listen(8081, function () { 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
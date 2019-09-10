//引入同个目录下的模块脚本
var m = require('./module_1');
m.logDate();

//引入不同目录下的模块脚本
var Hello = require('./module_fn/commom');
hello = new Hello(); 
hello.setName('贱人'); 
hello.sayHello(); 
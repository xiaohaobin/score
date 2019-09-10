/***
 * 事件触发器的属性函数应用 on  addListener,removeListener
 * 事件触发器的类函数应用 eventEmitter.listenerCount  ,listeners
 */

// 引入 events 模块
var events = require('events');

// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

//监听器（回调函数）
var lis_1 = function(a,b){
	console.log("监听器1触发");
}

//监听器（回调函数）
var lis_2 = function(a,b){
	console.log("监听器2触发");
}

//监听器（回调函数）
var lis_3 = function(a,b){
	console.log("监听器3触发");
}

//监听事件(自定义事件)
eventEmitter.on("mmp",lis_1);

eventEmitter.addListener("wrnmmp",lis_2);

eventEmitter.addListener("mmp",lis_3);

console.log("监听mmp事件的监听器个数:" + eventEmitter.listenerCount("mmp"));

eventEmitter.emit('mmp');//触发mmp事件

console.log("指定事件的监听器数组:" + eventEmitter.listeners("wrnmmp"));

//移除mmp事件的某一个监听器
eventEmitter.removeListener('mmp', lis_1);

console.log("监听mmp事件的监听器个数:" + eventEmitter.listenerCount("mmp"));

console.log("指定事件的监听器数组:" + eventEmitter.listeners("wrnmmp"));

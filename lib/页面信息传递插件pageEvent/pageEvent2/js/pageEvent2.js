(function(global, storage) {
	"use strict";
	//存放事件
	var listeners = {},
		//存放键
		keys = [],
		//当前页面名称
		thisName,
		//回调的字典
		callFuns = {},
		//清理存储的对象
		clearStorage = {};
	//检查信息是否存在于页面
	function checkMsg(i) {
		//执行方法
		var fun;
		//判断方法有没有被注册过
		if(fun = listeners[i]) {
			//取出内存信息
			var r = storage.get(i);
			//信息不能为null
			if(r == null) {
				storage.remove(i);
				return false;
			}
			if(r.forResult && fun.share) {
				return false;
			}
			//验证时间
			if(r.dateTime != null) {
				//发起时间大于记录时间时，证明没被调用过
				var t = r.dateTime;
				if(t <= fun.time) {
					return false;
				}
				fun.time = t;
			} else {
				return true;
			}
			var content = {
				forResult: r.forResult,
				dateTime: r.dateTime,
				action: r.action
			};
			if(r.forResult) {
				var res = fun.call.apply(content, r.data);
				//发送结果
				storage.remove(i);
				pageEvent.send(r.pageName, {
					name: r.callFun,
					value: res
				});
				return true;
			} else {
				fun.call.apply(content, r.data);
				//验证是否是订阅
				if(!fun.share) {
					storage.remove(i);
					return true;
				}
			}
		}
		return false;
	}
	//检查事件消息
	function msg(e) {
		//如果消息是由事件发起
		if(e != null && isNotEmpty(e.key)) {
			if(isNotEmpty(e.newValue)) {
				checkMsg(e.key);
			}
			return;
		}
		//检查监听器集合中，有没有这个监听对象
		for(var i = 0; i < keys.length; i++) {
			//如果事件被消费，就直接终止循环
			if(checkMsg(keys[i])) {
				return;
			}
		}
	}
	//动态计算检查事件
	function getCheTime() {
		if(storage.getIsmemory()) {
			return 10000;
		}
		if(storage.isie) {
			var t = 200 * keys.length;
			return(t > 800) ? 800 : ((t < 200) ? 200 : t);
		}
		return 5000;
	};
	//循环调用事件
	function trash() {
		msg();
		setTimeout(trash, getCheTime());
	}
	setTimeout(trash, 200);
	//对存储绑定改变事件
	storage.bind(msg);
	//验证绑定信息
	function validatebind(name, callback) {
		if(typeof name != "string") {
			throw "TypeError:name is not string";
			return false;
		}
		if(name.length > 36) {
			throw "The name is too long maxlength 36";
			return false;
		}
		if(typeof callback != "function") {
			throw "TypeError:callback is not function";
			return false;
		}
		return true;
	}
	global.pageEvent = {
		//触发全局搜索
		trigger: msg,
		//信息存储方式，默认为内存
		storagesource: "memory",
		//触发事件信息,name事假名称，值
		send: function(name) {
			if(isNotEmpty(name)) {
				//检查事件名不能大于36
				if(name.length > 36) {
					throw "The name is too long maxlength 36";
					return;
				}
				var value = [],
					callFun;
				for(var i = 1; i < arguments.length; i++) {
					if(typeof arguments[i] == "function") {
						callFun = arguments[i];
						break;
					} else {
						value.push(arguments[i]);
					}
				}
				var f = getLink(20);
				if(callFun != null) {
					callFuns[f] = callFun;
					setTimeout(function() {
						if(callFuns[f]) {
							delete callFuns[f];
						}
					}, 6000);
				}
				//发送存储信息
				storage.set(name, {
					callFun: f,
					dateTime: Date.now(),
					pageName: getThisName(),
					data: value,
					action: window.location.href,
					forResult: callFun != null
				});
				if(clearStorage[name] != null) {
					clearTimeout(clearStorage[name]);
				}
				clearStorage[name] = setTimeout(function() {
					storage.remove(name);
				}, 12000);
			}
		},
		//注册事件信息,name监听名称，回调方法
		on: function(name, callback, isflush) {
			if(validatebind(name, callback)) {
				//绑定一个单个读取信息
				listeners[name] = {
					call: callback,
					time: 0,
					share: false
				};
				//更新键
				keys = Object.getOwnPropertyNames(listeners);
				//判断是否需要刷新之前数据
				if(isflush === true) {
					storage.remove(name);
				} else {
					checkMsg(name);
				}
			}
		},
		//绑定一个订阅模型
		onshare: function(name, callback) {
			if(validatebind(name, callback)) {
				//订阅模型不支持读取之前的消息
				storage.remove(name);
				//绑定订阅信息
				listeners[name] = {
					call: callback,
					time: 0,
					share: true
				};
				keys = Object.getOwnPropertyNames(listeners);
			}
		}, //绑定一个订阅模型
		one: function(name, callback, isflush) {
			if(validatebind(name, callback)) {
				//绑定一个单个读取信息
				listeners[name] = {
					call: function(d) {
						pageEvent.remove(name);
						return callback.apply(this, arguments);
					},
					time: 0,
					share: false
				};
				//更新键
				keys = Object.getOwnPropertyNames(listeners);
				//判断是否需要刷新之前数据
				if(isflush === true) {
					storage.remove(name);
				} else {
					checkMsg(name);
				}
			}
		},
		//清除事件信息
		remove: function() {
			//动态参数删除事件监听器
			if(arguments.length > 0) {
				for(var i = 0; i < arguments.length; i++) {
					if(arguments[i] != null) {
						delete listeners[arguments[i]];
					}
				}
				//删除后重新生成键
				keys = Object.getOwnPropertyNames(listeners);
			}
		}
	};
	//获取当前页面的标识符
	function getThisName() {
		if(!isNotEmpty(thisName)) {
			//如果信息为null，就生成一个随机值
			thisName = "pageEvent:" + getLink(20);
			pageEvent.on(thisName, function(data) {
				if(data != null && callFuns[data.name]) {
					callFuns[data.name](data.value);
					delete callFuns[data.name];
				}
			});
		}
		return thisName;
	};
	/**
	 * 生成uuid
	 */
	function getLink(l) {
		l = l || 32;
		var uuid = [];
		var str = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY";
		for(var i = 0; i < l; i++) {
			uuid.push(str.charAt(Math.floor(Math.random() * str.length)));
		}
		return uuid.join("");
	};
	if(!Object.getOwnPropertyNames) {
		Object.getOwnPropertyNames = function(obj) {
			var r = [];
			for(var i in obj) {
				r.push(i);
			}
			return r;
		}
	}
	if(!Date.now) {
		Date.now = function() {
			return new Date().getTime();
		}
	}
	/**
	 * 判断字符串是否有内容
	 */
	function isNotEmpty(str) {
		return str != null && str != undefined && str.length != 0 && str != "null";
	}
	//清除之前的调用信息
	(function init() {
		if(window.localStorage) {
			var reg = reg = /^pageEvent:.*/;
			for(var i = 0; i < localStorage.length; i++) {
				if(reg.test(localStorage.key(i))) {
					storage.remove(localStorage.key(i));
				}
			}
		}
	})();
})(window, (function() {
	//存储代理
	var top = window,
		//是否是ie浏览器
		isie = (window.ActiveXObject || "ActiveXObject" in window),
		//数据大小限制
		size = 6144;
	//循环查找最顶层窗口
	while(top != top.parent) {
		top = top.parent;
	}
	//判断是否为内存存储
	function getIsmemory() {
		if(pageEvent.storagesource == "storage") {
			return false;
		}
		if(top.pageEvent && top.pageEvent.storagesource == "storage") {
			return false;
		}
		return true;
	};
	//当存储方式为内存的时候，获取共享内存池
	function getMemorystorage() {
		if(!top.pageEvent) {
			console.error("存储类型为memory时，top窗口必须引用pageEvent,js")
		}
		return(top.pageEvent.memorystorage = top.pageEvent.memorystorage || {});
	}
	//触发全局查询
	function trigger(w, obj) {
		try {
			if(w.pageEvent) {
				w.pageEvent.trigger(obj);
			}
		} catch(e) {}
		//递归方式，调用父窗口下的全部ifm
		var fs = w.frames;
		if(fs.length > 0) {
			for(var i = 0; i < fs.length; i++) {
				trigger(fs[i], obj);
			}
		}
	}
	return {
		isie: isie,
		getIsmemory: getIsmemory,
		get: function(key) {
			//寻找键值对
			if(getIsmemory()) {
				return getMemorystorage()[key];
			} else {
				var r = localStorage.getItem(key);
				return(r != null) ? JSON.parse(r) : r;
			}
		},
		remove: function(key) {
			//删除指定键的值
			if(getIsmemory()) {
				delete(getMemorystorage())[key];
			} else {
				localStorage.removeItem(key);
			}

		},
		set: function(name, value) {
			if(getIsmemory()) {
				//内存池的数据不需要转json，也没有大小限制
				(getMemorystorage())[name] = value;
				trigger(top, {
					key: name,
					newValue: 1
				});
			} else {
				//当数据需要使用本地存储保存时，直接把数据格式化成json
				var r = JSON.stringify(value);
				//此处内存限制为6K
				if(r.length > size) {
					throw "The data is too long maxlength " + size;
					return;
				}
				localStorage.setItem(name, r);
				pageEvent.trigger();
			}

		},
		bind: function(call) {
			//绑定存储信息改变事件
			if(window.addEventListener) {
				window.addEventListener('storage', function(e) {
					if(localStorage.getItem(e.key)) {
						call(e);
					} else {
						setTimeout(function() {
							call(e);
						}, 100);
					}
				});
			}
			//兼容ie那个废物
			if(isie) {
				if(document.attachEvent) {
					document.attachEvent('onstorage', function() {
						setTimeout(function() {
							call();
						}, 100);
					});
				}
			}
		}
	};
})());
/**
 * 自定义插件，功能类似 jquery.myPlugIn_v1.0.js
 * @depend  jquery.js(v1.10 -- v2.0)
 * @depend  mui.min.js
 * @depend  jsrsasign-all-min.js（加密插件）
 * @depend  crypto-js.min.js（解密插件）
 * @author xiaohaobin
 * @version 1.0
 **/

	
	//wap2
//	var webviewTop = "27px";//webview 距离顶部的top高度
//	var webviewBottem = "2em";//webview 距离底部的bottom高度
//	
	//app
	var webviewTop = "0px";//webview 距离顶部的top高度
	var webviewBottem = "0em";//webview 距离底部的bottom高度
	
	function url_join(mUrl) {
		//	return "http://10.10.10.21/"+mUrl;
			return "http://zhangnan.xicp.net:9505/"+mUrl;//统一服务器
//		return "http://10.10.10.201:8000/" + mUrl; //统一服务器
	}

	function url_join_school(mUrl) {
		//	return "http://10.10.10.21/"+mUrl;
		return "http://zhangnan.xicp.net:9505/"+mUrl;//统一服务器
//		return "http://10.10.10.201:8000/" + mUrl; //统一服务器
	}
	var waiting;//加载条变量
	/**
	 * 打开系统加载条
	 * @param {Object} w 系统加载条对象参数
	 **/	
	function nativeload(){
		if(window.plus){
			waiting = plus.nativeUI.showWaiting();
		}
		else{
			document.addEventListener("plusready", function(){
				waiting = plus.nativeUI.showWaiting();					
			}, false);
		}
	}
	/**
	 * 关闭系统加载条
	 * @param {Object} w 系统加载条对象参数
	 **/
	function nativeCloseLoad(){
		if(window.plus){
			waiting.close();
		}
		else{
			document.addEventListener("plusready", function(){
				waiting.close();
			}, false);
		}
	}
try {
	
	var fnAjax = {
		//普通ajax请求，不加密解密
		method_3: function(murl, mdata, method, successFn) {
			$.ajax({
				type: method,
				url: murl,
				dataType: "json",
				data: mdata,
				async: true,
				timeout: 10000,
				beforeSend:function(){
					nativeload();
				},
				error: function(data) {
					nativeCloseLoad();
					
					console.log(data);
					mui.alert("请求失败，请检查服务器端！");
				},	
				success: function(data) {
					nativeCloseLoad();
					console.log(data);
					if(data.code == 1) {
						mui.alert(data.message);
					} else if(data.code == 0) {
						successFn(data);
					}
				}
			});
		},
		//学校平台的请求
		method_4: function(murl, mdata, method, successFn) {
			if(mdata == "") mdata = {};
			mdata._school_id = localStorage.getItem("schoolId");
			mdata.school_id = localStorage.getItem("schoolId");
			var _token = $.enToken(localStorage.getItem("token"));
			var _sign = $.backEncryptParam();
			$.ajax({
				type: method,
				url: murl,
				//			dataType: "json",
				data: mdata,
				async: false,
				timeout: 10000,
				headers: {
					sign: _sign,
					token: _token
				},
				beforeSend:function(){
					nativeload();
				},
				error: function(data) {
					console.log(data);
					nativeCloseLoad();					
					mui.alert("请求失败，请检查服务器端！");
				},
				success: function(data) {
					
					console.log(data);
					nativeCloseLoad();
					var data = JSON.parse($.backDecryptParam(data));
					if(data.code == 1) {
						mui.alert(data.message);
					} else if(data.code == 0) {
						successFn(data);
					}
				}
			});
		},
		method_login: function(murl, mdata, method, successFn) {
			var _sign = $.backEncryptParam();
//			console.log(method);
			$.ajax({
				type: method,
				url: murl,
				//			dataType: "json",
				data: mdata,
				async: true,
				timeout: 10000,
				headers: {
					sign: _sign,
				},
				beforeSend:function(){
					nativeload();
				},
				error: function(data) {
					nativeCloseLoad();
					console.log(data);
					mui.alert("请求失败，请检查服务器端！");
				},
				success: function(data) {
					console.log(data);
					nativeCloseLoad();
					var data = JSON.parse($.backDecryptParam(data));
					if(data.code == 1) {
						mui.alert(data.message);
					} else if(data.code == 0) {
						successFn(data);
					}
				}
			});
		},

		//跨域保存后台的sessionID的ajax请求（表单文件上传），添加超时，掉线的提示
		method_6: function(murl, mdata, method, successFn) {
			$.ajax({
				type: method,
				url: murl,
				data: mdata,
				async: false,
				cache: false,
				contentType: false,
				processData: false,
				headers: {
					sign: $.backEncryptParam(),
					token: $.enToken(localStorage.getItem("token"))
				},
				beforeSend:function(){
					nativeload();
				},
				error: function(data) {
					console.log(data);
					nativeCloseLoad();
					mui.alert("请求失败，请检查服务器端！");
				},
				success: function(data) {
					console.log(data);
					nativeCloseLoad();
					var data = JSON.parse($.backDecryptParam(data));
					if(data.code == 1) {

						mui.alert(data.message);
					} else if(data.code == 0) {
						successFn(data);
					}
				}
			});
		}

	};

	//RAS和Crypto加密
	;
	(function($, window, document, undefined) {
		// modulus, 由后台告知
		var modulus = 'D6BC545500C205EB37A9B5872AD4578E015EC48197A2C97A7C09666082A218E49D48209B9993C3D9766DB3C90D5D6A04A571E3E17E515908B22469CD97CFEF42EA1BA97E3D250907A926204C0B2D7445A52E3CA1EEDE48DBA8E17097F2BBFFE5CCDAA365A2163C24476A5DACDBD98A2610A67795B7477D8EEECBFB9AAD8482A336414CA1AE8AC5EC3653DB49EA62CED37ECF2B42B186005C25059A5EB9284DD5EB546EE7480D0E1BB5A644032B665F3BAAAA177F4F090287C6DF457DE34B6F65B9F8B340E81E7D52F20CFFC7823D5569AF773A48C5E2C0C66EB9BE21D01C62B429F2F9A1A9DAC8954A3349009151F43B34BD66BF7EA1D028E7D79B2570C26DEB';
		// 固定值
		var exponent = "10001";

		try {
			var rsa = new RSAKey();
			rsa.setPublic(modulus, exponent);
			var key, iv;
			$.extend({
				backEncryptParam: function() { //加密发送后台
					// 计算nonceStr
					/**
					 * 根据modulus的长度, 随机获取到2个随机数, 用于截取modulus
					 * start 10 - 51
					 * end 1 - 103
					 */
					var start = Math.floor(Math.random() * modulus.length / 10 + 10);
					var end = Math.ceil(Math.random() * modulus.length / 5);
					// key值， 用来解密后台传输过来的数据
					key = modulus.substring(start, end);
					// 计算md5值作为iv(初始向量), 转为大写。 用来解密后台传输过来的数据
					iv = CryptoJS.MD5(key).toString().toUpperCase();
//					console.log($.getOnTime()+",key:"+key);
//					console.log($.getOnTime()+",iv:"+iv)
					/**
					 * 生成nonce
					 *
					 * hex(2位，表示key的长度)
					 * start(2位， 表示随机起始点的值)
					 * key(key值，长度由hex确定)
					 * iv(iv值， 长度为32位)
					 * end(1-2位， 表示随机终点的值)
					 */
					var hex = ((key.length).toString(16));
					// 长度不足2位，前补位0
					if(hex.length === 1) hex = '0' + hex;
					var nonce = hex + start + key + iv + end;
					// 需要加密的字符串
					var encryptStr = JSON.stringify({
						nonce: nonce, //上面计算出来的
						timestamp: new Date().getTime(), // 应该由服务器获取
						version: "1.0", // 版本号
				    	host:$.getHost()
						// 可能还会有其它字段
					});
					var res = rsa.encrypt(encryptStr);

					console.log(encrypt(res));
					// 使用AES对RSA进行再次加密，然后传输给服务器
					return encrypt(res);
				},
				backDecryptParam: function(data) { //解密后台数据
					return decrypt(data, generateKey(key), iv);
				},
				//加密token
				enToken: function(token) {
					return rsa.encrypt(token);
				},
			});

			/**
			 * 加密
			 */
			function encrypt(str) {
				var key = CryptoJS.enc.Utf8.parse('n*dA3T6!`d}x_)&SDxo1,Kzx[+>x=1Gx'); // 秘钥
				var iv = CryptoJS.enc.Utf8.parse('xQ3%1)7@^5spCra;'); //向量iv
				var encrypted = CryptoJS.AES.encrypt(str, key, {
					iv: iv,
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7
				});
				return encrypted.toString();
			}

			function decrypt(str, key, iv) {
				key = CryptoJS.enc.Utf8.parse(key); // 秘钥
				iv = CryptoJS.enc.Utf8.parse(iv); //向量iv
				var decrypted = CryptoJS.AES.decrypt(str, key, { /*mode: CryptoJS.mode.CBC,*/
					iv: iv,
					padding: CryptoJS.pad.Pkcs7
				});
				return decrypted.toString(CryptoJS.enc.Utf8);
			}

			function generateKey(skey) {
				if(skey.length > 32) {
					skey = skey.substring(0, 32);
				} else if(skey.length > 16) {
					skey = skey.substring(0, 16);
				} else {
					skey = new Array(16 - skey.length + 1).join('0').concat(skey);
				}

				return skey;
			}

		} catch(e) {
			//抛出错误
			console.log("错误描述：" + e.message);
		}
	})(jQuery, window, document);

	/*
 关于系统判断
 * */
	;
	(function($, window, document, undefined) {
		$.extend({
			//判断是否移动端，移动端执行函数1（参数1）；否则执行函数2（参数2）
			isMoblie: function(fnMobile, fnPc) {
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { //移动端
					fnMobile();
				} else {
					fnPc();
				}
			},
			//获取本机域名
			getHost:function(){
				return window.location.hostname;
			},
			//判断值是否为空，回调函数
			//tem为值
			isNull: function(tmp, NullFn, noNullFn) {
				if(!tmp && typeof(tmp) != "undefined" && tmp != 0) { //null
					//为null的回调
					NullFn();
				} else {
					//不为null的回调
					noNullFn();
				}
			},
			//返回浏览器的类型和版本
			//返回类型$.getExplorerInfo().type
			//返回版本$.getExplorerInfo().version
			getExplorerInfo: function() {
				var explorer = window.navigator.userAgent.toLowerCase();
				//ie 
				if(explorer.indexOf("msie") >= 0) {
					var ver = explorer.match(/msie ([\d.]+)/)[1];
					return {
						type: "IE",
						version: ver
					};
				}
				//firefox 
				else if(explorer.indexOf("firefox") >= 0) {
					var ver = explorer.match(/firefox\/([\d.]+)/)[1];
					return {
						type: "Firefox",
						version: ver
					};
				}
				//Chrome
				else if(explorer.indexOf("chrome") >= 0) {
					var ver = explorer.match(/chrome\/([\d.]+)/)[1];
					return {
						type: "Chrome",
						version: ver
					};
				}
				//Opera
				else if(explorer.indexOf("opera") >= 0) {
					var ver = explorer.match(/opera.([\d.]+)/)[1];
					return {
						type: "Opera",
						version: ver
					};
				}
				//Safari
				else if(explorer.indexOf("Safari") >= 0) {
					var ver = explorer.match(/version\/([\d.]+)/)[1];
					return {
						type: "Safari",
						version: ver
					};
				}

			},
			/**
			 * 获取两个GPS经纬度之间的距离
			 * @param lat1 第一点的纬度
			 * @param lng1 第一点的经度
			 * @param lat2 第二点的纬度
			 * @param lng2 第二点的经度
			 * @returns {Number}
			 */
			getDistance: function(lat1, lng1, lat2, lng2) {
				function toRad(d) {
					var PI = Math.PI;
					return d * PI / 180.0;
				}
				var dis = 0;
				var radLat1 = toRad(lat1);
				var radLat2 = toRad(lat2);
				var deltaLat = radLat1 - radLat2;
				var deltaLng = toRad(lng1) - toRad(lng2);
				var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));

				return Math.ceil(dis * 6378137);
			},

		});
	})(jQuery, window, document);

	//关于字符串操作
	;
	(function($, window, document, undefined) {

		$.extend({
			//含有规律的字符串数据转化为数组；（以字符串中的某个字段截取生成数组）
			//		参数：str指的是大字符串；chart指的是大字符串中的某个子字符串
			stringToArray: function(str, chart) {
				var arrPerssion = [];
				if(str.indexOf(chart) >= 0) {
					var tempArray = str.split(chart);
					var returnArr = new Array();
					var i, len = tempArray.length;
					for(i = 0; i < len; i++) {
						returnArr.push(tempArray[i]);
					}

					return returnArr;
				} else {
					arrPerssion.push(str);
					return arrPerssion;
				}
			},
			////判断某字符串是否含有某个子字符串，如有，打印其第一次或者最后一次的索引
			hasStr: function(stringText, littleStr, isFrist) {
				//stringText指的是整个字符串变量，littleStr指的是整个字符串变量中可能存在的字段,
				//isFirst是布尔值，true指的是第一次出现的索引，false指的是最后一次
				var str = stringText;
				var str2 = littleStr;
				var d = str.length - str.indexOf(str2);
				if(d > str.length) {
					return false;
				} else {

					if(isFrist)
						return str.indexOf(str2)
					else
						return str.lastIndexOf(str2);
				}

			},

			//序列化表单的字符串转化为对象
			serializeToObj: function(serializedParams) {
				var obj = {};

				function evalThem(str) {
					var strAry = new Array();
					strAry = str.split("=");
					//使用decodeURIComponent解析uri 组件编码
					for(var i = 0; i < strAry.length; i++) {
						strAry[i] = decodeURIComponent(strAry[i]);
					}
					var attributeName = strAry[0];
					var attributeValue = strAry[1].trim();
					//如果值中包含"="符号，需要合并值
					if(strAry.length > 2) {
						for(var i = 2; i < strAry.length; i++) {
							attributeValue += "=" + strAry[i].trim();
						}
					}
					if(!attributeValue) {
						return;
					}
					var attriNames = attributeName.split("."),
						curObj = obj;
					for(var i = 0; i < (attriNames.length - 1); i++) {
						curObj[attriNames[i]] ? "" : (curObj[attriNames[i]] = {});
						curObj = curObj[attriNames[i]];
					}
					//使用赋值方式obj[attributeName] = attributeValue.trim();替换
					//eval("obj."+attributeName+"=\""+attributeValue.trim()+"\";");
					//解决值attributeValue中包含单引号、双引号时无法处理的问题
					curObj[attriNames[i]] = attributeValue.trim();
				};
				var properties = serializedParams.split("&");
				for(var i = 0; i < properties.length; i++) {
					//处理每一个键值对
					evalThem(properties[i]);
				};
				return obj;
			}
		});
	})(jQuery, window, document)

	//关于数组操作
	;
	(function($, window, document, undefined) {
		$.extend({
			//数组排序
			arrSort: function(arr) {
				return arr.sort(function(a, b) { //排序
					return a < b ? -1 : 1;
				});
			},
			//数组去重
			delRepetition: function(arr) {
				Array.prototype.unique2 = function() {
					this.sort(); //先排序
					var res = [this[0]];
					for(var i = 1; i < this.length; i++) {
						if(this[i] !== res[res.length - 1]) {
							res.push(this[i]);
						}
					}
					return res;
				}
				return arr.unique2();
			},
			//数组扁平化（二维数组一维处理）
			flattening: function(arr) {
				var flattened = Array.prototype.concat.apply([], arr);
				return flattened;
			},
			// 统计数组中所有的值出现的次数,并以对象的形式返回
			countif: function(arr) {
				return arr.reduce(function(prev, next) {
					//				console.log(prev); //obj，其属性为数组的每一个值，属性值为对应属性在数组中出现的次数
					//				console.log(next); //数组的每一个值
					prev[next] = (prev[next] + 1) || 1;
					return prev;
				}, {});
			},
			//数组对象，将数组中具有相同值的对象 取出组成新的数组，返回新数组
			//arr，数组对象，str，数组对象中相同值的属性字符串
			getSameVal: function(arr, str) {
				var _arr = [],
					_t = [],
					// 临时的变量
					_tmp;

				// 按照特定的参数将数组排序将具有相同值得排在一起
				arr = arr.sort(function(a, b) {
					var s = a[str],
						t = b[str];

					return s < t ? -1 : 1;
				});

				if(arr.length) {
					_tmp = arr[0][str];
				}
				// console.log( arr );
				// 将相同类别的对象添加到统一个数组
				for(var i in arr) {
					if(arr[i][str] === _tmp) {
						_t.push(arr[i]);
					} else {
						_tmp = arr[i][str];
						_arr.push(_t);
						_t = [arr[i]];
					}
				}
				// 将最后的内容推出新数组
				_arr.push(_t);
				return _arr;
			}

		});
	})(jQuery, window, document)

	//关于函数操作
	;
	(function($, window, document, undefined) {
		//延迟加载器
		var keyupTimer = null;
		$.extend({
			debounce: function(fn, wait) { //fn指的是函数，wait指的是时间数值（秒）
				//设定默认的延迟时间
				wait = wait || 500;
				//清除定时器
				keyupTimer && clearTimeout(keyupTimer);
				//定时器执行
				keyupTimer = setTimeout(fn, wait);
			}
		});
	})(jQuery, window, document)

	//关于随机生成
	;
	(function($, window, document, undefined) {

		$.extend({
			//随机生成n个大写字母
			//参数：n指的是字母个数，值为数字；
			getCapital: function(n) {
				var result = [];
				for(var i = 0; i < n; i++) {
					var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
					//大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
					result.push(String.fromCharCode(65 + ranNum));
				}
				return result;

			},
			//随机生成范围数字：min最小数字，max最大数字（打印数字为最小到最大的范围）
			randNum: function(min, max) {
				var num = Math.floor(Math.random() * (max - min) + min);
				return num;
			}
		});
	})(jQuery, window, document);

	/*
	 * 关于获取本地系统信息
	 */
	;
	(function($, window, document, undefined) {
		$.extend({
			/*
			 获取当前静态所有时间
			 参数：
			 'y-m-d' ==> 年月日
			 'm-d' ==> 年月
			 'm-d' ==> 月日
			 'h-m-s' ==> 时分秒
			 'h-m' ==> 时分
			 'm-s' ==> 分秒
			 'w' ==>星期
			 '' ==>年月日 时分秒
			 * */
			getOnTime: function(oTime) {
				//获取当前具体时间
				var oDate = new Date();
				var nYear = oDate.getFullYear();
				var nMonth = oDate.getMonth() * 1 + 1;
				var nDate = oDate.getDate();

				var nHours = oDate.getHours();
				var nMinutes = oDate.getMinutes();
				var nSeconds = oDate.getSeconds();

				(nHours < 10) && (nHours = "0" + nHours);
				(nMinutes < 10) && (nMinutes = "0" + nMinutes);
				(nSeconds < 10) && (nSeconds = "0" + nSeconds);

				switch(true) {
					case(oTime === 'y-m-d'):
						return nYear + "-" + nMonth + "-" + nDate;
						break;
					case(oTime === 'y-m'):
						return nYear + "-" + nMonth;
						break;
					case(oTime === 'm-d'):
						return nMonth + "-" + nDate;
						break;
					case(oTime === 'h-m-s'):
						return nHours + ":" + nMinutes + ":" + nSeconds;
						break;
					case(oTime === 'm-s'):
						return nMinutes + ":" + nSeconds;
						break;
					case(oTime === 'h-m'):
						return nHours + ":" + nMinutes;
						break;
					case(oTime === 'w'):
						return "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
						break;
					case(oTime === 'ZW'):
						return nYear + "年" + nMonth + "月" + nDate + "日  " + nHours + ":" + nMinutes + ":" + nSeconds;
						break;
					default:
						return nYear + "-" + nMonth + "-" + nDate + "\0" + nHours + ":" + nMinutes + ":" + nSeconds;
				}
			}
		});
	})(jQuery, window, document);

	;
	(function($, window, document, undefined) {
		// 评级组件
		$.fn.rate = function(options) {
			var defaults = {
				star: 1, // 星级
				edit: false
			};
			var opts = $.extend({}, defaults, options);
			var obj = $(this);
			var rate = opts.star > 5 ? 5 : opts.star;
			var sStar = "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
			var aStar = sStar.split("");
			var tem = "";
			for(var i = 0; i < aStar.length; i++) {
				tem += '<b data="' + aStar[i].charCodeAt(0) + '">' + aStar[i] + '</b>'
			}
			obj.html(tem);
			if(opts.edit) {
				obj.css("cursor", "pointer");
				obj.children().on("click", function() {
					console.log($(this).attr("data"), $(this).index());
					if($(this).attr("data") == "9733") {
						$(this).attr("data", "9734").text(String.fromCharCode(9734));
						$(this).prevAll().attr("data", "9733").text(String.fromCharCode(9733));
						$(this).nextAll().attr("data", "9734").text(String.fromCharCode(9734));
						return false;
					}
					if($(this).attr("data") == "9734") {
						$(this).attr("data", "9733").text(String.fromCharCode(9733));
						$(this).prevAll().attr("data", "9733").text(String.fromCharCode(9733));

					}
				});
			}

		}
	})(jQuery, window, document);

	//关于验证
	;
	(function($, window, document, undefined) {
		// 验证禁用中文输入
		$.fn.checkChinese = function(options) {
			var defaults = {
				event: 'keyup', // 事件类型
				paste: false
			};
			var opts = $.extend({}, defaults, options);
			var obj = $(this);
			obj.on(opts.event, function() {
					var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");　　
					if(reg.test(obj.val())) {
						alert("不能输入汉字！");
						obj.val("");
						obj.focus();　　
					}
				})
				.on('paste', function() {
					return opts.paste;
				});
		}

		// 验证禁用特殊字符输入
		$.fn.checkVerify = function(options) {
			var defaults = {
				event: 'keyup', // 事件类型
				paste: false
			};
			var opts = $.extend({}, defaults, options);
			var obj = $(this);
			var r = /^[\u4E00-\u9FA5a-zA-Z0-9]{0,}$/;
			obj.on(opts.event, function() {
					if(r.test($(this).val()) == false) {
						alert("不能输入特殊字符");
						obj.val("");
						obj.focus();
					}
				})
				.on('paste', function() {
					return opts.paste;
				});

		}

		// 验证只能输入数字和小数
		$.fn.onlyNumAndFlo = function(options) {
			$(this).on("blur", function() {
				var e = this;
				var re = /^\d+(?=\.{0,1}\d+$|$)/;
				if(e.value != "") {
					if(!re.test(e.value)) {
						alert("请输入正确的数字");
						e.value = "";
						e.focus();
					}
				}
			});
			$(this).on("keyup", function() {
				var e = this;
				e.value = e.value.replace(/[^0-9.]/g, '');
			});
		}
		
		//非汉字，6到15位，特殊字符只能是：~!@#$%^&*的格式
		$.fn.onlyNumAndLetter = function(options){
			$(this).on("blur", function() {
				var e = this;
				var re = /^[0-9a-zA-Z~!@#$%^&*]{6,15}$/;
				if(e.value != "") {
					if(!re.test(e.value)) {
						alert("请输入正确的数字");
						e.value = "";
						e.focus();
					}
				}
			});
			
		}
		
	})(jQuery, window, document);

	/*
	 银行账号格式输入组件，jq需要先引入，提示框结合mui.js
	 调用，例子：
	 $("#account").bankInput({
		min: 16, // 最少输入字数 
		max: 25, // 最多输入字数 
		deimiter: ' ', // 账号分隔符 
		onlyNumber: true, // 只能输入数字 
		copy: false, // 允许复制
		paste: false, //不允许粘贴
		cut: false //不允许剪切
	});
	 * */
	;
	(function($, window, document, undefined) {
		// 输入框格式化 
		$.fn.bankInput = function(options) {
			var defaults = {
				min: 10, // 最少输入字数 
				max: 25, // 最多输入字数 
				deimiter: ' ', // 账号分隔符 
				onlyNumber: true, // 只能输入数字 
				copy: false, // 允许复制
				paste: false, //不允许粘贴
				cut: false //不允许剪切

			};
			var opts = $.extend({}, defaults, options);
			var obj = $(this);
			obj.css({
				imeMode: 'Disabled',
				borderWidth: '1px',
				color: '#000',
				fontFamly: 'Times New Roman'
			}).attr('maxlength', opts.max);
			if(obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
			obj.on('keyup', function(event) {
					if(opts.onlyNumber) {
						if(!(event.keyCode >= 48 && event.keyCode <= 57)) {
							this.value = this.value.replace(/\D/g, '');
						}
					}
					this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
				})
				.on('dragenter', function() {
					return false;
				})
				.on('paste', function() { //粘贴事件
					console.log("粘贴类型：" + opts.paste);
					return opts.paste;
				})
				.on("copy", function() { //复制事件
					console.log("复制类型：" + opts.copy);
					return opts.copy;
				})
				.on("cut", function() { //剪切事件
					console.log("剪切类型：" + opts.cut);
					return opts.cut;
				})
				.on('blur', function() {
					this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
					if(this.value.length < opts.min) {
						mui.alert('最少输入' + opts.min + '位账号信息！');
						obj.val("");
					}
				})

		}
		// 列表显示格式化 
		$.fn.bankList = function(options) {
			var defaults = {
				deimiter: ' ' // 分隔符 
			};
			var opts = $.extend({}, defaults, options);
			return this.each(function() {
				$(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
			})
		}
	})(jQuery, window, document);

	//关于时间日期转换
	;
	(function($, window, document, undefined) {

		$.extend({
			//yyyy-mm-dd hh:mm:ss转换为时间戳
			backDateNum: function(s) {
				if(s) {
					var date = new Date(s.replace(/-/g, '/'));
					return Date.parse(date) / 1000;
				}

			},
			//标准时间返回 y-m-d h:m:s格式
			formatDateTime: function(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			/*
			 时间戳转换格式
			 timestamp3:num类型,时间戳
			 sFormat格式字符串:
				'yyyy-MM-dd h:m:s'年月日时分秒
				'yyyy-MM-dd'
				'yyyy-MM'
			 	'h:m'
			 	'yyyy'
			 	.....
			 */
			timestampToTime: function(timestamp3, sFormat) {
				// 将当前时间换成时间格式字符串
				//	        var timestamp3 = 1550058811;
				var newDate = new Date();
				newDate.setTime(timestamp3 * 1000);
				Date.prototype.format = function(format) {
					var date = {
						"M+": this.getMonth() + 1,
						"d+": this.getDate(),
						"h+": this.getHours(),
						"m+": this.getMinutes(),
						"s+": this.getSeconds(),
						"q+": Math.floor((this.getMonth() + 3) / 3),
						"S+": this.getMilliseconds()
					};
					if(/(y+)/i.test(format)) {
						format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
					}
					for(var k in date) {
						if(new RegExp("(" + k + ")").test(format)) {
							format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
								date[k] : ("00" + date[k]).substr(("" + date[k]).length));
						}
					}
					return format;
				}
				return newDate.format(sFormat);
			}
		});
	})(jQuery, window, document);

	//关于系统
	;
	(function($, window, document, undefined) {
		$.extend({
			//返回url请求指定的键值
			getQueryString: function(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
				var r = window.location.search.substr(1).match(reg);
				if(r != null) {
					return unescape(r[2]);
				}
				return null;
			}
		});
	})(jQuery, window, document);

	//关于兼容性
	;
	(function($, window, document, undefined) {
		$.extend({
			//		检测浏览器是否支持svg
			isSupportSVG: function() {
				var SVG_NS = 'http://www.w3.org/2000/svg';
				return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
			},
			//		检测浏览器是否支持canvas
			isSupportCanvas: function() {
				if(document.createElement('canvas').getContext) {
					return true;
				} else {
					return false;
				}
			}
		});
	})(jQuery, window, document);
	/*
	 验证码倒计时
	 默认六十秒
	 必须是input和button的按钮
	 */
	;
	(function($, window, document, undefined) {
		$.fn.countDown = function(options) {
			var $this = $(this);
			var defaults = {
				second: 60 //秒
			};
			var opts = $.extend({}, defaults, options);
			var times = opts.second,
				timer = null;
			$this.on("click", function() {
				var _this = this;
				// 计时开始
				timer = setInterval(function() {
					times--;

					if(times <= 0) {
						if(_this.tagName == "INPUT") {
							$this.val('发送验证码');
						} else if(_this.tagName == "BUTTON") {
							$this.text('发送验证码');
						}
						clearInterval(timer);
						$this.attr('disabled', false);
						times = opts.second;
					} else {
						if(_this.tagName == "INPUT") {
							$this.val(times + '秒后重试');
						} else if(_this.tagName == "BUTTON") {
							$this.text(times + '秒后重试');
						}
						$this.attr('disabled', true);
					}
				}, 1000);
			});
		}
	})(jQuery, window, document);

	//限制文件上传大小类型和尺寸
	;
	(function($, window, document, undefined) {
		$.fn.fileVaild = function(options) {
			var _this = $(this);
			var defaults = {
				event: "change",
				size: 1, //限制几m
				onlyImage: true, //默认所有类型可上传
				width: 200, //默认像素宽度,onlyImage必须true
				height: 300 //默认像素高度,onlyImage必须true
			};
			var opts = $.extend({}, defaults, options);
			if(opts.onlyImage) {
				$(".Limit_that").remove();
				var sHtml = '<div class="Limit_that">' +
					'<span style="color: red;">温馨提示:图片上传的大小最大为' + opts.size + 'M，像素要求最小尺寸为' + opts.width + '*' + opts.height + ',且图片宽高比例为' + opts.width + ':' + opts.height + '</span>' +
					'</div>';
				_this.after($(sHtml));
			}
			_this.on(opts.event, function() {
				var file = this.files[0]; //上传的图片的所有信息
				if(opts.onlyImage) {
					//首先判断是否是图片			 
					if(!/image\/\w+/.test(file.type)) {
						mui.alert('上传的不是图片');
						$(this).val('');
						return false;
					}
				}

				//在此限制图片的大小
				var imgSize = file.size;
				//35160  计算机存储数据最为常用的单位是字节(B)
				if(imgSize > opts.size * 1024 * 1024) {
					mui.alert('上传的文件大于' + opts.size + 'M,请重新选择!');
					$(this).val('');
					return false;
				}

				//图片类型
				if(/image\/\w+/.test(file.type)) {
					//创建图片预览
					$("#previewImg").remove();
					var oPreview = $('<img id="previewImg" style="display: none;"/>');
					var oReader = new FileReader();
					oReader.onload = function(e) {
						oPreview.attr("src", e.target.result);
						$("body").append(oPreview);
						$("#previewImg").load(function() {
							if(this.naturalWidth * 1 < opts.width || this.naturalHeight * 1 < opts.height) {
								mui.alert("上传的图片像素最小必须是:" + opts.width + "*" + opts.height);
								_this.val("");
								return false;
							}
							if((opts.width / opts.height) != ((this.naturalWidth * 1) / (this.naturalHeight * 1))) {
								mui.alert("上传的图片像素宽高比例必须是:" + opts.width + ":" + opts.height);
								_this.val("");
							}
							//						console.log(this.naturalWidth + ' x ' + this.naturalHeight);
						});
					}
					oReader.readAsDataURL(file);
				}
			});

		}
	})(jQuery, window, document);

	//文本域字符限制输入
	;
	(function($, window, document, undefined) {
		$.fn.textareaVaild = function(options) {
			var _this = $(this);
			var defaults = {
				event: "keyup",
				maxLength: 300, //限制最大能输入多少字符
				width: 540, //文本域的宽度
				height: 170 //文本域 的高度
			};
			var opts = $.extend({}, defaults, options);
			var nTextarea = $('<div class="textarea-numberbar"><em class="textarea-length">0</em>/' + opts.maxLength + '</div>').css({
				"position": "absolute",
				"bottom": "1%",
				"padding": 0,
				"margin": 0
			});
			_this.after(nTextarea);
			_this.on(opts.event, function() {
					var v = $(this).val();
					var l = v.length;
					if(l > opts.maxLength) {
						v = v.substring(0, opts.maxLength);
						$(this).val(v);
					}
					$(this).parent().find(".textarea-length").text(v.length);
					$(".textarea-numberbar").css({
						"left": (opts.width - $(".textarea-numberbar").width()) + "px"
					});
				})
				.attr("dragonfly", true)
				.css({
					"width": opts.width + "px",
					"height": opts.height + "px"
				});
			_this.parent().css({
				"position": "relative"
			});
			$(".textarea-numberbar").css({
				"left": (opts.width - $(".textarea-numberbar").width()) + "px"
			});
		}
	})(jQuery, window, document);

} catch(e) {
	//抛出错误
	console.log("错误描述：" + e.message);
}
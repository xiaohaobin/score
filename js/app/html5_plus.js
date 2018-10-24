/**
 * @author 肖浩彬
 * @description html5 plus API，ios（4.3以上）和android（2.4以上）皆可使用
 * @depend 依赖IDE HBuilder 的app开发环境
 * */

/**
 * 对象拓展函数,如果为数组，数组为哈希数组才有效
 * @param {Boolean} deep 是否深拷贝
 * @param {Object||Array} target 目标对象或者数组
 * @param {Object||Array} options 要并集的对象或者数组
 * */
function _extend(deep, target, options) {
	for(name in options) {
		copy = options[name];
		if(deep && copy instanceof Array) {
			target[name] = $.extend(deep, [], copy);
		} else if(deep && copy instanceof Object) {
			target[name] = $.extend(deep, {}, copy);
		} else {
			target[name] = options[name];
		}
	}
	return target;
}

//只是在手机上才有效
try {
	var mobile_function = {
		/**
		 * 返回手机信息
		 * @param {String} param 手机设备的各个信息，
		 * param =》 "imei" 获取手机imei（设备的国际移动设备身份码）
		 * param =》 "imsi" 获取手机imsi（设备的国际移动用户识别码）
		 * param =》 "model" 获取设备型号
		 * param =》 "vendor" 获取设备的生产厂商
		 * param =》 "uuid" 获取设备的唯一标识
		 */
		getDeviceInfo: function(param) {
			switch(param) {
				case "imei": //获取手机imei（设备的国际移动设备身份码）
					return plus.device.imei;
					break;
				case "imsi": //获取手机imsi（设备的国际移动用户识别码）
					return plus.device.imsi;
					break;
				case "model": //获取设备型号
					return plus.device.model;
					break;
				case "vendor": //设备的生产厂商
					return plus.device.vendor;
					break;
				case "uuid": //设备的唯一标识
					return plus.device.uuid;
					break;
				default:
					break;
			}
		},
		/**
		 * 获取系统信息
		 * @param {String} param 系统各个信息
		 * param =》 "language" 获取系统语言信息
		 * param =》 "name" 获取系统名称信息
		 * param =》 "version" 获取系统版本信息
		 * param =》 "vendor" 获取系统的供应商信息
		 * */
		getOsInfo: function(param) {
			switch(param) {
				case "language":
					return plus.os.language;
					break;
				case "name":
					return plus.os.name;
					break;
				case "version":
					return plus.os.version;
					break;
				case "vendor":
					return plus.os.vendor;
					break;
				default:
					break;
			}
		},

		/**
		 * 获取当前网络类型
		 * @return {String}
		 * */
		getNetworkType: function() {
			var types = {};
			types[plus.networkinfo.CONNECTION_UNKNOW] = "未知的连接";
			types[plus.networkinfo.CONNECTION_NONE] = "没有连接";
			types[plus.networkinfo.CONNECTION_ETHERNET] = "以太网连接";
			types[plus.networkinfo.CONNECTION_WIFI] = "WiFi连接";
			types[plus.networkinfo.CONNECTION_CELL2G] = "2G网络";
			types[plus.networkinfo.CONNECTION_CELL3G] = "3G网络";
			types[plus.networkinfo.CONNECTION_CELL4G] = "4G网络";
			return types[plus.networkinfo.getCurrentType()];
		},
		//获取当前的加速度信息
		getCurrentAcceleration: function() {
			plus.accelerometer.getCurrentAcceleration(function(a) {
				alert('X轴：' + a.xAxis + '\nY轴：' + a.yAxis + '\nZ轴：' + a.zAxis);
			}, function(e) {
				alert('获取失败:' + e.message);
			});
			//			return _acc;
		},
		//扫描二维码
		scan: null,
		/**
		 * 开始扫描
		 * @param {String} id 要显示二维码控件的DOM节点的id值
		 * @param {Function} fn 扫描成功的回调函数，回调参数 type, result, file
		 * */
		startScan: function(id, fn) {
			mobile_function.scan = new plus.barcode.Barcode(id);
			mobile_function.scan.onmarked = function(type, result, file) {
				switch(type) {
					case plus.barcode.QR:
						type = 'QR';
						break;
					case plus.barcode.EAN13:
						type = 'EAN13';
						break;
					case plus.barcode.EAN8:
						type = 'EAN8';
						break;
					default:
						type = '其它' + type;
						break;
				}
				result = result.replace(/\n/g, '');
				fn(type, result, file);
				//				alert(type + "," + result + "," + file);
			};
			mobile_function.scan.start();
		},
		//开启闪光灯
		ScanFlashlight: function() {
			if(mobile_function.scan == null) {
				plus.nativeUI.alert("请先打开扫描二维码控件");
			} else {
				mobile_function.scan.setFlash(true);
			}
		},
		//取消扫描
		ScanCancel: function() {
			if(mobile_function.scan == null) {
				plus.nativeUI.alert("请先打开扫描二维码控件");
			} else {
				mobile_function.scan.cancel();
				mobile_function.scan = null;
				plus.nativeUI.toast("取消扫描了");
			}

		},
		//调用蜂蜜
		beep: function() {
			switch(plus.os.name) {
				case "iOS":
					if(plus.device.model.indexOf("iPhone") >= 0) {
						plus.device.beep();
						plus.nativeUI.toast("设备蜂鸣中...");
					} else {
						plus.nativeUI.toast("此设备不支持蜂鸣...");
					}
					break;
				default:
					plus.device.beep();
					plus.nativeUI.toast("设备蜂鸣中...");
					break;
			}
		},
		//调用手机震动
		vibrate: function() {
			switch(plus.os.name) {
				case "iOS":
					if(plus.device.model.indexOf("iPhone") >= 0) {
						plus.device.vibrate();
						plus.nativeUI.toast("设备振动中...");
					} else {
						plus.nativeUI.toast("此设备不支持振动");
					}
					break;
				default:
					plus.device.vibrate();
					plus.nativeUI.toast("设备振动中...");
					break;
			}
		},
		/**
		 * 打电话
		 * @param {Number} phoneNum 指定号码
		 * */
		dial: function(phoneNum) {
			plus.device.dial(phoneNum, false);
		},
		/**
		 * 创建通讯录联系人
		 * @param {String} sName 要创建的联系人的名字
		 * @param {String} sPhoneNum 要创建的联系人电话号码
		 * @param {String} sType 要创建的联系人号码类型 【mobile（手机）,home（住宅）,other（其他）,custom（定制）】
		 * */
		contact_create: function(sName, sPhoneNum, sType) {
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
				// 向通讯录中添加联系人
				var contact = addressbook.create();
				contact.name = {
					givenName: sName
				};
				contact.phoneNumbers = [{
					type: sType,
					value: sPhoneNum,
					preferred: true
				}];
				contact.save();
				plus.nativeUI.toast("联系人" + sName + "创建成功！");
			}, function(e) {
				plus.nativeUI.alert("获取通讯录管理失败: " + e.message);
			});
		},
		/**
		 * 根据电话号码删除联系人
		 * @param {String} phoneNum 电话号码
		 * */
		contact_remove: function(phoneNum) {
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
				// 可通过addressbook进行通讯录操作
				var contact = addressbook.find(
					null,
					function(contacts) {
						if(contacts.length > 0) {
							var dc = contacts[0];
							dc.remove(function() {
								plus.nativeUI.toast("删除 " + dc.displayName + " 成功!");
							});
						}
					},
					function(e) {
						plus.nativeUI.toast("查询联系人失败: " + e.message);
					}, {
						filter: [{
							logic: "or",
							field: "phoneNumbers",
							value: phoneNum
						}],
						multi: false
					}
				);
			});
		},
		/**
		 * 设置应用是否保持唤醒（屏幕常亮）状态
		 * @param {Boolean} bLock 是否保持唤醒（屏幕常亮）状态
		 * */
		setWakelock: function(bLock) {
			plus.device.setWakelock(bLock);
			if(plus.device.isWakelock()) {
				plus.nativeUI.toast("系统应用保持唤醒(常亮)状态了");
			} else {
				plus.nativeUI.toast("系统应用不再保持唤醒(常亮)状态了");
			}
		},
		//设置静音
		keepSlience: function() {
			plus.device.setVolume(0);
			if(plus.device.getVolume() == 0) plus.nativeUI.toast("设置静音了");
		},
		/**
		 * 应用程序设置屏幕亮度（只作用于程序）
		 * @param {Number} n 亮度值（0--1），最大1，最小0
		 * */
		getBrightness: function(n) {
			plus.screen.setBrightness(n);
		},
		/**
		 * 锁定屏幕方向
		 * @param {Number} n 值（0--5）或者不传
		 * 为0，竖屏正方向；为1，竖屏反方向，屏幕正方向按顺时针旋转180°；为2，横屏正方向，屏幕正方向按顺时针旋转90°，为3，横屏方向，屏幕正方向按顺时针旋转270°；为4，竖屏正方向或反方向，根据设备重力感应器自动调整，为5，横屏正方向或反方向，根据设备重力感应器自动调整；不传值，解除锁定屏幕方向后将恢复应用默认的屏幕显示方向（通常为应用打包发布时设置的方向）。 
		 * */
		lockOrientation: function(n) {
			switch(n) {
				case 0:
					plus.screen.lockOrientation("portrait-primary"); //竖屏正方向
					break;
				case 1:
					plus.screen.lockOrientation("portrait-secondary"); //竖屏反方向，屏幕正方向按顺时针旋转180°
					break;
				case 2:
					plus.screen.lockOrientation("landscape-primary"); //横屏正方向，屏幕正方向按顺时针旋转90°
					break;
				case 3:
					plus.screen.lockOrientation("landscape-secondary"); //横屏方向，屏幕正方向按顺时针旋转270°
					break;
				case 4:
					plus.screen.lockOrientation("portrait"); //竖屏正方向或反方向，根据设备重力感应器自动调整
					break;
				case 5:
					plus.screen.lockOrientation("landscape"); // 横屏正方向或反方向，根据设备重力感应器自动调整；
					break;
				default:
					plus.screen.unlockOrientation(); //解除锁定屏幕方向后将恢复应用默认的屏幕显示方向（通常为应用打包发布时设置的方向）。 
					break;
			}
		},
		/**
		 * 拍照并保存到系统相册
		 * @param {Function} fn 拍照成功的回调函数 返回参数为存储的路径
		 * */
		gallery_getImage: function(fn) {
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(path) {
				plus.gallery.save(path, function() {
					plus.nativeUI.toast('保存照片到系统相册：' + path);
					fn(path);
				}, function(e) {
					plus.nativeUI.alert('保存失败: ' + JSON.stringify(e));
				});
			}, function(e) {
				plus.nativeUI.toast('取消拍照');
			}, {
				filename: '_doc/gallery/',
				index: 1
			});
		},
		/**
		 * 设置参数，从相册选择图片，返回回调函数
		 * @param {Function} fn 单选相册图片成功后的回调函数，返回参数path，文件的路径(string类型)；多选则返回json格式，文件路径列表
		 * @param {Object} options 选择相册的主要参数 
		 * @prop {String} options.filter 可设置为仅选择图片文件（“image”）、视频文件（“video”）或所有文件（“none”），默认值为“image”。 
		 * @prop {Boolean} options.multiple 是否多选
		 * @prop {Number} options.maximum 最大可选的个数，仅在支持多选时有效，取值范围为1到Infinity，默认值为Infinity，即不限制选择的图片数。 如果设置的值非法则使用默认值Infinity。
		 * @prop {Boolean} options.system 是否使用系统相册文件选择界面
		 * */
		gallery_pick: function(options, fn) {
			plus.gallery.pick(
				function(path) {
					fn(path);
				},
				function(e) {
					alert('取消选择图片');
				}, {
					filter: options.filter,
					multiple: options.multiple,
					maximum: options.maximum,
					system: options.system,
					onmaxed: function() {
						plus.nativeUI.alert('最多只能选择' + options.maximum + '张图片');
					}
				}
			);
		},
		/**
		 * 录像并返回回调函数
		 * @param {Function} fn 录像成功的回调函数 返回参数为存储的路径
		 * */
		getVideo: function(fn) {
			plus.nativeUI.toast('开始录像...');
			var cmr = plus.camera.getCamera();
			cmr.startVideoCapture(function(p) {
				plus.nativeUI.toast('录像成功：' + p);
				fn(p);
			}, function(e) {
				plus.nativeUI.alert('失败：' + e.message);
			}, {
				filename: '_doc/camera/',
				index: 1
			});
		},
		/**
		 * 获取定位相关信息
		 * @param {Function} fn 回调函数 ，参数为定位的相关数据json数据格式，返回参数有坐标类型，详细地址，经纬度和时间戳等等
		 * @param {String} sProvider 供应商地图模板，值为amap（高德地图模板），baidu（百度地图模板），system（系统地图模板）
		 * */
		geolocation_getInfo: function(fn, sProvider) {
			plus.nativeUI.toast("获取定位位置信息...");
			plus.geolocation.getCurrentPosition(
				function(position) {
					fn(position);
				},
				function(e) {
					outSet("获取定位位置信息失败：" + e.message);
				}, {
					timeout: 10000,
					geocode: true,
					provider: sProvider, //amap>baidu>system
					//					coordsType:'gcj02',//wgs84,bd09,gcj02,bd09ll
				}
			);
		},
		/**
		 * 通过本地URL参数获取目录对象或文件对象(本地代码文件)
		 * @param {String} sUrl 本地路径，比如index.html
		 * @param {Function} fn 获取文件对象的回调函数，参数为文件对象，size为文件大小，name为文件名称，type为文件类型，lastModifiedDate为文件最后修改的时间，fullPath文件整体的路劲
		 * @param {Function} fn2 获取文件内容的回调函数，参数为文件的内容
		 * */
		io_getFileSystem: function(sUrl, fn, fn2) {
			plus.io.resolveLocalFileSystemURL("_www/" + sUrl, function(entry) {
				// 可通过entry对象操作test.html文件 
				entry.file(function(file) {
					var fileReader = new plus.io.FileReader();
					fn(file);
					fileReader.readAsText(file, 'utf-8');
					fileReader.onloadend = function(evt) {
						fn2(evt.target.result);
					}
				});
			}, function(e) {
				alert("解析文件URL失败: " + e.message);
			});
		},
		/**
		 * 将本地路径转化为平台路径
		 * @param {String} sUrl 本地url路径，如index.html
		 * @return {String}
		 * */
		io_getAppUrl: function(sUrl) {
			var path = plus.io.convertLocalFileSystemURL(sUrl);
			return path;
		},
		/**
		 * 发送短信
		 * @param {Array} aPhoneNum 接收短信的号码组
		 * @param {String} sContent 要发送的内容
		 * */
		messaging_sendSMS: function(aPhoneNum, sContent) {
			var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
			msg.to = aPhoneNum;
			msg.body = sContent;
			plus.messaging.sendMessage(msg);
		},
		/**
		 * 发送邮件
		 * @param {Object} option 配置参数
		 * @prop {Array} option.to 要发送的邮箱组
		 * @prop {Array} option.cc 要抄送的邮箱组
		 * @prop {Array} option.to 要密送的邮箱组
		 * @prop {String} option.title 邮件的标题(主题)
		 * @prop {String} option.content 邮件的内容 
		 * @prop {String} option.addAttachment 要发送邮件的附件本地URL，如_www/index.html 
		 * */
		messaging_sendEmail: function(option) {
			var msg = plus.messaging.createMessage(plus.messaging.TYPE_EMAIL);
			msg.to = option.to || []; //发送
			msg.cc = option.cc || []; //抄送copySend
			msg.bcc = option.bcc || []; //密送
			msg.subject = option.title || '无标题';
			msg.body = option.content || "";
			if(option.addAttachment) msg.addAttachment(option.addAttachment);

			plus.messaging.sendMessage(msg, function() {
				//				plus.nativeUI.toast("发送成功!");
			}, function() {
				alert("发送失败!");
			});
		},
		//下载对象
		dtask: null,
		/**
		 * 创建下载任务
		 * @param {String} url 下载地址		 
		 * @param {Object} options 下载任务参数		
		 * 
		 * @prop {String} options.method 网络请求类型,支持http协议的“GET”、“POST”，默认为“GET”请求。
		 * @prop {String} options.method POST请求时提交的数据 
		 * @prop {String} options.filename 下载文件保存的路径,保存文件路径仅支持以"_downloads/"、"_doc/"、"_documents/"开头的字符串。
		 * @prop {Number} options.priority 下载任务的优先级,数值类型，数值越大优先级越高，默认优先级值为0。 
		 * @prop {Number} options.timeout 下载任务超时时间,数值类型，单位为s(秒)，默认值为120s。
		 * @prop {Number} options.retry 下载任务重试次数,数值类型，默认为重试3次
		 * @prop {Number} options.retryInterval 下载任务重试间隔时间,数值类型，单位为s(秒)，默认值为30s。 
		 * 
		 * @return {Object} 下载任务的对象
		 * */
		downloader_create: function(url, options) {
			var opts = options || {};
			var dtask = plus.downloader.createDownload(url, opts, function(d, status) {
				// 下载完成
				if(status == 200) {
					console.log(d);
				} else {
					plus.nativeUI.alert("下载失败，失败状态码为: " + status);
					console.log("下载最终结果：" + JSON.stringify(d));
				}
			});
			plus.nativeUI.alert("创建下载任务成功！");
			return dtask;
		},
		/**
		 * 启动下载任务
		 * @param {Object} dtask 下载任务对象,系创建下载任务时候返回的参数
		 * @param {Object} obj 显示下载进度数据的DOM节点对象
		 * @param {Function} fn 下载成功的回调函数，参数为下载文件的对象
		 * */
		downloader_start: function(dtask, obj, fn) {
			if(!dtask) {
				plus.nativeUI.alert("请先创建下载任务!");
				return;
			}
			dtask.start();
			//监听下载对象的下载变更状态
			dtask.addEventListener("statechanged", function(task, status) {
				switch(task.state) {
					case 1: // 开始
						plus.nativeUI.toast("开始下载...");
						break;
					case 2: // 已连接到服务器
						plus.nativeUI.toast("链接到服务器...");
						break;
					case 3: // 已接收到数据						
						obj.innerHTML = "下载数据:" + task.downloadedSize + "/" + task.totalSize;
						break;
					case 4: // 下载完成
						if(task.totalSize > 0) {
							plus.nativeUI.toast(task.filename + "下载完成！");
							fn(task);
						}
						break;
				}
			});
		},
		/**
		 * 暂停下载任务
		 * @param {Object} dtask 下载任务对象,系创建下载任务时候返回的参数
		 * */
		downloader_pause: function(dtask) {
			dtask.pause();
			plus.nativeUI.toast("暂停下载！");
		},
		/**
		 * 恢复下载任务
		 * @param {Object} dtask 下载任务对象,系创建下载任务时候返回的参数
		 * */
		downloader_resume: function(dtask) {
			dtask.resume();
			plus.nativeUI.toast("恢复下载！");
		},
		/**
		 * 取消下载任务
		 * @param {Object} dtask 下载任务对象,系创建下载任务时候返回的参数
		 * @param {Object} obj 显示下载进度数据的DOM节点对象,与创建下载任务的节点是同一个
		 * */
		downloader_cancel: function(dtask, obj) {
			if(obj) {
				obj.innerHTML = "";
			}
			dtask.abort();
			plus.nativeUI.toast("取消下载任务了！");
		},

		/**
		 * 原生轮播控件
		 * @param {String} id 原生轮播控件view的id
		 * @param {Object} option 轮播控件的主要参数
		 * @param {String} option.top 轮播控件距离页面顶部的间距
		 * @param {String} option.left 轮播控件距离页面左侧的间距
		 * @param {String} option.width 轮播控件宽度
		 * @param {String} option.height 轮播控件高度
		 * @param {String} option.position 轮播控件定位类型
		 * @param {Boolean} option.autoplay 是否自动播放
		 * @param {Boolean} option.loop 是否循环播放
		 * @param {Number} option.interval 播放下一张的时间间隔
		 * @param {Array} aImg 图片数组，哈希数组，如：[{src:'1.png'},{src:'2.png'},{src:'3.png'}]
		 * */
		nativeObj_ImageSlider: function(id, option, aImg) {
			if(typeof id != "string" || !id) {
				id = "_test";
			}
			if(aImg && aImg.length > 0) {
				//默认参数
				var _default = {
					top: '100px',
					left: '0px',
					height: '200px',
					width: '100%',
					position: 'absolute',
					autoplay: true,
					loop: true,
					interval: 3000,
					images: aImg
				};
				var opts = _extend(true, _default, option);
				view = new plus.nativeObj.ImageSlider(
					id, opts
				);
				plus.webview.currentWebview().append(view);
			} else {
				plus.nativeUI.alert("没有设置图片参数");
			}

		},

		//bitmap对象
		nativeObj_bitmap: null,

		/**
		 * 截图返回保存的图片信息
		 * @param {String} sId 截图创建Bitmap对象id
		 * @param {String} sUrl 截图保存图片的本地路径，如：_doc/demo.jpg
		 * @param {Function} callback 截图成功保存的回调函数，参数为图片信息对象 
		 * */
		nativeObj_draw: function(sId, sUrl, callback) {
			wi = plus.webview.currentWebview();
			// 创建Bitmap对象
			nativeObj_bitmap = new plus.nativeObj.Bitmap(sId);
			// 将首页Webview窗口截图保存到Bitmap中
			wi.draw(nativeObj_bitmap, function() {
				plus.nativeUI.toast("截图成功");

				//保存
				nativeObj_bitmap.save(
					sUrl, {
						overwrite: true,
						//						format: "png",					
					},
					function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						var base64 = nativeObj_bitmap.toBase64Data(); //base64数据
						i.base64 = base64;
						callback(i);
					},
					function(e) {
						plus.nativeUI.alert('保存图片失败：' + JSON.stringify(e));
					}
				);

			}, function(e) {
				plus.nativeUI.alert("截图失败：" + JSON.stringify(e));
			});
		},

		/**
		 * 原生日期选择器,返回年月日
		 * @param {String} _sMinDate 最小年月日时间格式:2018-12-15
		 * @param {String} _sMinDate 最大年月日时间格式:2018-12-15
		 * @param {Function} callback 选择日期成功的回调函数，返回参数为日期时间对象，包含日期和星期
		 * */
		nativeUl_pickDate: function(_sMinDate, _sMaxDate, callback) {

			/**
			 * 返回年号
			 * @param {String} _date 年月日时间格式:2018-12-15
			 * @return {Object}
			 * */
			function backYear(_date) {
				if(!_date) {
					return null;
				} else {
					var _first_index = _date.indexOf("-"); //头索引
					var _last_indext = _date.lastIndexOf("-"); //尾部索引
					var nYear = _date.slice(0, _first_index) * 1; //年
					var nMonth = _date.slice((_first_index + 1), _last_indext) * 1 - 1; //月
					var nDate = _date.slice((_last_indext + 1)) * 1; //日
					console.log(nYear, nMonth, nDate);
					var _d = new Date();
					_d.setFullYear(nYear, nMonth, nDate);
					return _d;
				}
			}
			plus.nativeUI.pickDate(
				function(e) {
					var d = e.date;
					var _month = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : ("0" + (d.getMonth() + 1));
					var _day = d.getDate() > 9 ? d.getDate() : ("0" + d.getDate())
					var mainDate = {
						date: d.getFullYear() + "-" + _month + "-" + _day
					};
					var day = d.getDay();
					switch(true) {
						case(day === 0):
							mainDate.day = "星期日";
							break;
						case(day === 1):
							mainDate.day = "星期一";
							break;
						case(day === 2):
							mainDate.day = "星期二";
							break;
						case(day === 3):
							mainDate.day = "星期三";
							break;
						case(day === 4):
							mainDate.day = "星期四";
							break;
						case(day === 5):
							mainDate.day = "星期五";
							break;
						default:
							mainDate.day = "星期六";
					}

					callback(mainDate);
				},
				function(e) {
					plus.nativeUI.toast("未选择日期：" + e.message);
				}, {
					minDate: backYear(_sMinDate),
					maxDate: backYear(_sMaxDate)
				}
			);
		},
		
		/**
		 * 原生时间选择器，返回时分
		 * @param {Function} callback 选择时间成功的回调函数 ，参数是时分数据，如：01:12
		 * */
		nativeUI_pickTime:function(callback){
			plus.nativeUI.pickTime(function(e) {
				var d = e.date;
				console.log("选择的时间：" + d.getHours() + ":" + d.getMinutes());
				h_time = (d.getHours()*1 > 9) ? d.getHours() : ("0" + d.getHours());
				m_time = (d.getMinutes()*1 > 9) ? d.getMinutes() : ("0" + d.getMinutes());
				_time = h_time + ":" + m_time;
				callback(_time);
			}, function(e) {
				plus.nativeUI.toast("未选择时间：" + e.message);
			}, {
				time: new Date(),
				title:"请选择时间：",
				is24Hour:false
			});
		}
	}
} catch(e) {
	alert("功能方法只是在手机上有效");
}
//只是在手机上才有效
try {
	var mobile_function = {
		/**
		 * 返回手机信息
		 * @param {String} param 手机设备的各个信息，
		 * param =》 "imei" 获取手机imei（设备的国际移动设备身份码）
		 * .....
		 */
		getDeviceInfo: function(param) {
			switch(param) {
				case "imei": //获取手机imei（设备的国际移动设备身份码）
					return plus.device.imei;
					break;
				case "imsi": //获取手机imsi（设备的国际移动用户识别码）
					return plus.device.imsi;
					break;
				case "name": //返回手机操作系统版本
					return plus.os.name;
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
		getCurrentAcceleration:function(){
			plus.accelerometer.getCurrentAcceleration(function(a) {
				alert('X轴：' + a.xAxis + '\nY轴：' + a.yAxis + '\nZ轴：' + a.zAxis);
			}, function(e) {
				alert('获取失败:' + e.message);
			});
//			return _acc;
		},
		//扫描二维码
		scan:null,
		/**
		 * 开始扫描
		 * @param {String} id 要显示二维码控件的DOM节点的id值
		 * @param {Function} fn 扫描成功的回调函数，回调参数 type, result, file
		 * */
		startScan:function(id,fn){
			mobile_function.scan = new plus.barcode.Barcode(id);
			mobile_function.scan.onmarked = function(type, result, file){
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
		ScanFlashlight:function(){
			if(mobile_function.scan == null){
				plus.nativeUI.alert("请先打开扫描二维码控件");
			}else{
//				alert(123);
				mobile_function.scan.setFlash(true);
			}
		}
	}
} catch(e) {
	alert("功能方法只是在手机上有效");
}
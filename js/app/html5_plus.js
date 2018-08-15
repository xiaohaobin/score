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
	}
} catch(e) {
	alert("功能方法只是在手机上有效");
}
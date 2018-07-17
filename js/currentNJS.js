/*
 获取手机常用原生功能
 mac，wifi列表等等
 * */


//获取mac,使用安卓
function getMac() {
	var mac = "xxx-xxx-xxx-xxx";
	if(plus.os.name == "Android") {
		// 导入UIAlertView类
		//WifiManager
		var Context = plus.android.importClass("android.content.Context");

		var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");

		var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);

		var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");

		var wifiInfo = wifiManager.getConnectionInfo();

		return wifiInfo.getMacAddress();
	}

}


/**
 **获取wifi列表
 *@return [{object}] 
 *@prop SSID 网络名称
 *@prop BSSID 基本服务集标识
 *@prop level 
 *@prop capabilities 性能
 *@prop frequency 频率
 *@prop distance 距离
 *@prop timestamp 时间戳
 * */
function wifiList() {
	// 主窗体
	var MainActivity = plus.android.runtimeMainActivity()
	// 上下文
	var Context = plus.android.importClass('android.content.Context')
	// 导入WIFI管理 和 WIFI 信息 的class
	plus.android.importClass("android.net.wifi.WifiManager")
	plus.android.importClass("android.net.wifi.WifiInfo")
	plus.android.importClass("android.net.wifi.ScanResult")
	plus.android.importClass("java.util.ArrayList")
	// 获取 WIFI 管理实例
	var wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE)

	var resultList = wifiManager.getScanResults(),
		len = resultList.size(),
		aRes = [];

	for(var i = 0; i < len; i++) {
		aRes.push({
			"SSID": resultList.get(i).plusGetAttribute('SSID'),
			"BSSID": resultList.get(i).plusGetAttribute('BSSID'), //基本服务集标识
			"level": resultList.get(i).plusGetAttribute('level'),
			"capabilities": resultList.get(i).plusGetAttribute('capabilities'),
			"frequency": resultList.get(i).plusGetAttribute('frequency'),
			"timestamp": resultList.get(i).plusGetAttribute('timestamp'),
			"distance": resultList.get(i).plusGetAttribute('distance'),
			"distanceSd": resultList.get(i).plusGetAttribute('distanceSd')
		});
	}
	return aRes;
}

/**
 获取当前手机链接的wifi信息
 *@return {object} 
 *@prop ssid 网络名称
 *@prop bssid 基本服务集标识
 * */
function getCurWifi() {
	if(plus.os.name == "Android") {
		// 主窗体
		var MainActivity = plus.android.runtimeMainActivity();
		// 上下文
		var Context = plus.android.importClass('android.content.Context');
		// 获取 WIFI 管理实例
		var wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE);
		// 获取当前连接WIFI的信息
		var info = wifiManager.getConnectionInfo();
		return {
			"ssid": info.getSSID(),
			"bssid": info.getBSSID()
		};
	}
}
/**
 * 获取所有适配列表
 * @return {Object} 返回适配列表
 * @property {String} address 蓝牙地址
 * @property {String} name 蓝牙名称
 * */
//function bluetooth_list() {
//	var BAdapter;
//	var main = plus.android.runtimeMainActivity();
//	var Context = plus.android.importClass("android.content.Context");
//	var BManager = main.getSystemService(Context.BLUETOOTH_SERVICE);
//	plus.android.importClass(BManager); //引入相关的method函数
//	var BAdapter = BManager.getAdapter();
//	plus.android.importClass(BAdapter); //引入相关的method函数，这样之后才会有isEnabled函数支持	
//	var lists = BAdapter.getBondedDevices();
//	plus.android.importClass(lists);
//	var iterator = lists.iterator();
//	plus.android.importClass(iterator);
//	var d = iterator.next();
//	plus.android.importClass(d);
//	return {"address":d.getAddress(),"name":d.getName()};
//}

//蓝牙信息相关
window.Bluetooth = function() {
	this.init();
}
/**  * 初始化  */
Bluetooth.prototype.init = function() {		
	this.main = plus.android.runtimeMainActivity();	
	this.BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
	this.BAdapter = new this.BluetoothAdapter.getDefaultAdapter();
}
/**  
 * * 判断蓝牙状态，并且弹出提示打开
 * @return {String} 
 * */
Bluetooth.prototype.getAddress = function() {
	return this.BAdapter.getAddress();
}
/**  
 * * 获取蓝牙名称
 * @return {String} 
 * */
Bluetooth.prototype.getName = function() {
	return this.BAdapter.getName();
}
/**  
 * * 监听蓝牙是否打开的状态，并弹出弹框提示
 * @return {String} 
 * */
Bluetooth.prototype.eventState = function() {
//	var resultDiv = document.getElementById('output');
	var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
		onReceive: function(context, intent) { //实现onReceiver回调函数
			plus.android.importClass(intent);
			console.log(intent.getAction());
//			this.main.unregisterReceiver(receiver);
		}
	});
	var IntentFilter = plus.android.importClass('android.content.IntentFilter');
	var filter = new IntentFilter();
	filter.addAction(this.BAdapter.ACTION_STATE_CHANGED); //监听蓝牙开关
	this.main.registerReceiver(receiver, filter); //注册监听
	if(!this.BAdapter.isEnabled()) {
		this.BAdapter.enable(); //启动蓝牙
	} else {
		this.BAdapter.disable();
	}
}





//返回手机信息
function getDeviceInfo(param){
	switch (param){
		case "imei"://获取手机imei（设备的国际移动设备身份码）
			return plus.device.imei;
			break;
		case "imsi"://获取手机imsi（设备的国际移动用户识别码）
			return plus.device.imsi;
			break;
		case "name"://返回手机操作系统版本
			return plus.os.name;
			break;
		case "model"://获取设备型号
			return plus.device.model;
			break;
		case "vendor"://设备的生产厂商
			return plus.device.vendor;
			break;
		case "uuid"://设备的唯一标识
			return plus.device.uuid;
			break;
		default:
			break;
	}
}

/*获取手机CPU信息*/
function getCpuInfo() {
    var cpuInfo = '/proc/cpuinfo';
    var temp = '',
        cpuHardware;
    var fileReader = plus.android.importClass("java.io.FileReader");
    var bufferedReader = plus.android.importClass("java.io.BufferedReader");
    var FileReader = new fileReader(cpuInfo);
    var BufferedReader = new bufferedReader(FileReader, 8192);
    while ((temp = BufferedReader.readLine()) != null) {
        if (-1 != temp.indexOf('Hardware')) {
            cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1);
        }
    }
    return cpuHardware;
}
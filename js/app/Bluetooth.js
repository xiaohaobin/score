//蓝牙信息相关
window.Bluetooth = function() {
	this.init();
}
/**  * 初始化  */
Bluetooth.prototype.init = function() {		
	this.main = plus.android.runtimeMainActivity();	
	this.BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");//蓝牙适配器BluetoothAdapter对象
	this.BAdapter = new this.BluetoothAdapter.getDefaultAdapter();//蓝牙适配器BluetoothAdapter管理对象
	
	this.BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");//BluetoothDevice用于指代某个蓝牙设备，通常表示对方设备
	this.BDevice = new this.BluetoothDevice();
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

//打开蓝牙功能
Bluetooth.prototype.open = function(){
	this.BAdapter.enable();
}
//关闭蓝牙功能
Bluetooth.prototype.close = function(){
	this.BAdapter.disable();
}
//开始搜索周围的蓝牙设备； 
Bluetooth.prototype.startDiscovery = function(){
	this.BAdapter.startDiscovery();
	if(this.BAdapter.isDiscovering()){
		plus.nativeUI.toast("正在搜索周围的蓝牙设备...");
	}else{
		plus.nativeUI.alert("蓝牙搜索功能调用失败...");
	}
}
//取消搜索操作； 
Bluetooth.prototype.cancelDiscovery = function(){	
	this.BAdapter.cancelDiscovery();
	if(!this.BAdapter.isDiscovering()){
		plus.nativeUI.toast("取消搜索周围的蓝牙设备了");
	}else{
		plus.nativeUI.alert("取消搜索失败...");
	}
}
/**
 * 判断当前是否正在搜索设备
 * @return {Boolean}
 * */
Bluetooth.prototype.isDiscovering = function(){
	return this.BAdapter.isDiscovering();
}
/**
 * 获取已绑定的设备列表
 * @return {Array} 
 * */
Bluetooth.prototype.getBondedDevices = function(){
	var sList = this.BAdapter.getBondedDevices() + "";	
	if(sList.indexOf(",") == -1){		
		var arr = [];
		var oneList = sList.replace("[","").replace("]","");
		arr.push(oneList)
		return arr;
	}
	else{
		var moreList = sList.replace(" ","").replace("[","").replace("]","");
		console.log(moreList.length);
		var a = moreList.split(",");
		return a;
	}
}
/**
 * 设置本机蓝牙名称
 * @param {String} name 蓝牙名称
 * */
Bluetooth.prototype.setName = function(name){
	this.BAdapter.setName(name);
}

/**
 * 根据蓝牙地址获取远程的蓝牙设备
 * @param {String} address 蓝牙地址，如:e4:21:ad:12:cd:1a
 * @return {String}
 * */
Bluetooth.prototype.getRemoteDevice = function(address){
	return this.BAdapter.getRemoteDevice(address);
}

/**
 * 获取本地蓝牙适配器的状态； 
 * @return {Number}
 * */
Bluetooth.prototype.getState = function(){
	return this.BAdapter.getState();
}

Bluetooth.prototype.BDevice_getName = function(){
	return plus.android.invoke(this.BluetoothDevice,"show");
}
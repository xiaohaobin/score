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
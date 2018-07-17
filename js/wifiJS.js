/**  * 此文件仅支持android  */
mui.plusReady(function() {
	window.WIFI = function() {
		this.init();
	}

	/**  * 初始化  */
	WIFI.prototype.init = function() {
		var Context = plus.android.importClass("android.content.Context");
		plus.android.importClass("android.net.wifi.WifiManager");
		plus.android.importClass("java.util.List");
		plus.android.importClass("java.util.ArrayList");
		plus.android.importClass("android.net.wifi.ScanResult");
		plus.android.importClass("android.net.wifi.WifiInfo");
		plus.android.importClass("java.util.BitSet");

		this.WifiConfiguration = plus.android.importClass("android.net.wifi.WifiConfiguration");
		this.wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);

	}

	/**  
	 * * 获取wifi列表 
	 * @return {String} wifi列表
	 * */
	WIFI.prototype.getAllList = function() {
		return this.wifis = this.wifiManager.getScanResults();
	}

	/**  
	 * * 校验ssid 返回的是有此ssid的wifi个数 
	 * * @param {Object} ssid wifi名  */
	WIFI.prototype.checkSsid = function(ssid) {
		var list = this.wifiManager.getScanResults();
		var len = list.size();
		var num = 0;
		for(var i = 0; i < len; i++) {
			var tmp = list.get(i);

			if(tmp.plusGetAttribute('SSID') == ssid) {
				num++;
			}
		}
		return num;
	}

	/**  
	 * * 
	 * 移除已经存在的ssid  
	 * * @param {Object} ssid wifi名  
	 * */
	WIFI.prototype.removeExsits = function(ssid) {
		var list = this.wifiManager.getConfiguredNetworks();
		//获取到已经配置过的wifi列表
		var len = list.size();
		var wifiInfo = this.getNow();
		var tSsid = '"' + ssid + '"';
		for(var i = 0; i < len; i++) {
			var tmp = list.get(i);
			var tmpSsid = tmp.plusGetAttribute('SSID');
			if(tmpSsid == tSsid) {
				this.disConnect(wifiInfo.getNetworkId());
				this.wifiManager.removeNetwork(tmp.plusGetAttribute('networkId'));
			}
		}
	}

	/**  
	 * * 连接已有的wifi 会自动校验  * 
	 * @param {Object} netWorkId wifi的id  
	 * */
	WIFI.prototype.connectOld = function(netWorkId) {
		var now = this.getNow();
		if(now.getNetworkId() != netWorkId) { //当前连接的不是将要连接的 
			this.wifiManager.enableNetwork(netWorkId, true);
		}
	}

	/**  
	 * * 取消连接  
	 * * @param {Object} 
	 * netWorkId wifi的id 
	 * */
	WIFI.prototype.disConnect = function(netWorkId) {
		var now = this.getNow();
		if(now.getNetworkId() == netWorkId) {
			//当前连接的是需要取消的 则取消   
			this.wifiManager.disableNetwork(netWorkId);
			this.wifiManager.disconnect();
		}
	}

	/**  
	 * * 
	 * 获取当前连接的wifi 
	 * @return {Object} 返回数组对象
	 * @property {String} name wifi信息属性
	 * @property {String} value wifi信息属性值
	 * */
	WIFI.prototype.getNow = function() {
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement("div");
		div.innerHTML = this.wifiManager.getConnectionInfo();
		body.appendChild(div);
		var sHtml = div.innerHTML;
		body.removeChild(div);
		return strToObj(sHtml);
	}
	/**  
	 * 获取wifi链接的状态码*
	 * */
	WIFI.prototype.getWifiState = function() {
		return this.wifiManager.getWifiState();
	}

	/**  
	 * 获取wifi的mac地址*
	 * */
	WIFI.prototype.getWifiMAC = function() {
		return this.wifiManager.getConnectionInfo().getMacAddress();
	}
	/**  
	 * * 添加新的wifi并连接 
	 * * @param {Object} ssid wifi名  
	 * * @param {Object} pwd 密码  
	 * */
	WIFI.prototype.connectNew = function(ssid, pwd) {
		var WifiConfiguration = this.WifiConfiguration;
		var wcf = new WifiConfiguration();

		wcf.plusGetAttribute('allowedAuthAlgorithms').set(WifiConfiguration.AuthAlgorithm.OPEN);
		wcf.plusGetAttribute('allowedGroupCiphers').set(WifiConfiguration.GroupCipher.TKIP);
		wcf.plusGetAttribute('allowedKeyManagement').set(WifiConfiguration.KeyMgmt.WPA_PSK);
		wcf.plusGetAttribute('allowedPairwiseCiphers').set(WifiConfiguration.PairwiseCipher.TKIP);
		wcf.plusGetAttribute('allowedGroupCiphers').set(WifiConfiguration.GroupCipher.CCMP);
		wcf.plusGetAttribute('allowedPairwiseCiphers').set(WifiConfiguration.PairwiseCipher.CCMP);

		wcf.plusSetAttribute('status', WifiConfiguration.Status.ENABLED);
		wcf.plusSetAttribute('SSID', '"' + ssid + '"');
		wcf.plusSetAttribute('preSharedKey', '"' + pwd + '"');
		wcf.plusSetAttribute('hiddenSSID', true);

		var wcgID = this.wifiManager.addNetwork(wcf);
		var b = this.wifiManager.enableNetwork(wcgID, true);
	}

	/** 
	 * * 
	 * 改变连接的wifi  
	 * * @param {Object} index wifi列表的索引 
	 * */
	WIFI.prototype.change = function(index) {
		// 索引大于配置好的网络索引返回    
		if(index > this.wifis.size()) {
			return;
		}
		// 连接配置好的指定ID的网络    
		this.wifiManager.enableNetwork(
			this.wifis.get(index).plusGetAttribute('networkId'),
			true
		);
	}

	/**  * 获取wifi是否打开  */
	WIFI.prototype.isWifiEnabled = function() {
		return this.wifiManager.isWifiEnabled();
	}

	/**  * 打开wifi  */
	WIFI.prototype.open = function() {
		console.log('open函数已执行');
		this.wifiManager.setWifiEnabled(true);
	}

	/**  * 关闭wifi  */
	WIFI.prototype.close = function() {
		this.wifiManager.setWifiEnabled(false);
	}

	/**  * 兼容版的wifi设置 只提供跳转wifi设置界面  */
	window.C_WIFI = function() {
		this.main = plus.android.runtimeMainActivity();
		var Intent = plus.android.importClass("android.content.Intent");
		var Settings = plus.android.importClass('android.provider.Settings');
		this.wifiIntent = new Intent(Settings.ACTION_SETTINGS);
	}
	/**  * 跳转wifi界面  */
	C_WIFI.prototype.goWifi = function() {
		this.main.startActivity(this.wifiIntent);
	}

});
/**
 **处理wifi返回参数，返回数组对象
 * @param {String} 手机所连接的wifi信息数据
 * @return {Object} 返回数组对象
 * @property {String} name wifi信息属性
 * @property {String} value wifi信息属性值
 * */

function strToObj(str) {
	var totalLen = str.length;
	var arr = [{
			"name": "SSID"
		},
		{
			"name": "BSSID"
		},
		{
			"name": "MAC"
		},
		{
			"name": "Supplicant state"
		},
		{
			"name": "RSSI"
		},
		{
			"name": "Link speed"
		},
		{
			"name": "Frequency"
		},
		{
			"name": "Net ID"
		},
		{
			"name": "Metered hint"
		},
		{
			"name": "score"
		}
	];
	var aIndex = [];
	for(var i in arr) {
		arr[i].min = (str.indexOf(arr[i].name)) + (arr[i].name.length);
		aIndex.push(str.indexOf(arr[i].name));
	}
	aIndex.push(totalLen);
	aIndex.splice(0, 1);
	for(var key in arr) {
		arr[key].max = aIndex[key];
	}
	for(var k in arr) {
		arr[k].value = str.substring(arr[k].min + 1, arr[k].max);
	}
	var aRes = [];
	for(var j in arr) {
		aRes.push({
			"name": arr[j].name,
			"value": arr[j].value.replace(",", "")
		})
	}
	return aRes;
}
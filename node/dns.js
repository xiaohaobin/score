//域名解析为ip地址
var dns = require('dns');

lookupDo("charge.growatt.com");
function lookupDo(url){
	dns.lookup(url, function onLookup(err, address, family) {
	   console.log('ip 地址:', address);
	   dns.reverse(address, function (err, hostnames) {
		   if (err) {
		      console.log(err.stack);
		   }
		
		   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
		});  
	});
}

//模块函数对象
var oModule = {
	date:new Date(),
	getFullYear:function(){
		return this.date.getFullYear();
	},
	logDate:function(){
		console.log(this.date);
	}
};

//开放接口
module.exports = oModule;

/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/    
//layui.define(['layer', 'form'], function(exports){
//var layer = layui.layer
//,form = layui.form;
//
//layer.msg('wrnmmp');
//
//exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
//});    


layui.define(['layer'],function(exports){
  //do something
 	var layer = layui.layer;
 	 var obj = {
    fn1: function(str){
      layer.alert('Hello '+ (str||'wrnmmp自定义输出接口2'));
    },
    fn2:function(){
    	layer.msg(12323)
    }
  };
  exports('mmp', obj);
});
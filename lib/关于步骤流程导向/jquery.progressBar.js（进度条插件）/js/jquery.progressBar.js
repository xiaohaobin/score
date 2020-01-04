//声明一个函数并立即执行函数，用$(形参)代替jQuery实参  
$(function($) {
	
	//判断型传参数的对象控制类插件（传参类型：object）
	$.fn.progressBar = function(options) {
		//给定一个默认值。  
		var defaults = {
			mainHtml: '<div id="caseBlanche"><div id="rond"><div id="test"></div></div><div id="load"><p>loading</p></div></div>',
			backgroundColor:'rgba(2,7,1,0.5)'
		};
		//5各类型
		var sType1 = {
			mainHtml: '<div id="caseBlanche"><div id="rond"><div id="test"></div></div><div id="load"><p>loading</p></div></div>',
			backgroundColor:'rgba(2,7,1,0.5)'
		};
		var sType2 = {
			mainHtml: '<div id="caseViolette"><div id="cercle"><div id="cercleCache"></div></div><div id="load"><p>loading</p></div><div id="point"></div></div>',
			backgroundColor: 'rgba(89, 39, 0, 0.1)'
		};
		var sType3 = {
			mainHtml: '<div id="casePourpre"><div id="load"><p>loading</p></div><div id="vague"><div id="vague1"></div><div id="vague2"></div><div id="vague3"></div><div id="vague4"></div><div id="vague5"></div><div id="vague6"></div></div></div>',
			backgroundColor: 'rgba(89, 39, 0, 0.1)'
		};
		var sType4 = {
			mainHtml: '<div id="caseVerteClaire"><div id="transform"><div id="transform1"></div><div id="transform2"></div><div id="transform3"></div></div><div id="load"><p>loading</p></div></div>',
			backgroundColor: 'rgba(89, 39, 0, 0.1)'
		};
		var sType5 = {
			mainHtml: '<div id="caseGrise"><div id="progress"><div id="charge"></div></div><div id="load"><p>loading</p></div></div>',
			backgroundColor: 'rgba(89, 39, 0, 0.1)'
		};

		//将传递的值替换为默认值，可以避免传递的options为null和没有传递options的情况。  
		var options = $.extend(defaults, options);
		
		var sHtml;
		if(options.type == 1 && options.isShow == true){
			sHtml = sType1.mainHtml;
			this.css("backgroundColor",sType1.backgroundColor);
		}
		else if(options.type == 2 && options.isShow == true){
			sHtml = sType2.mainHtml;
			this.css("backgroundColor",sType2.backgroundColor);
		}
		else if(options.type == 3 && options.isShow == true){
			sHtml = sType3.mainHtml;
			this.css("backgroundColor",sType3.backgroundColor);
		}
		else if(options.type == 4 && options.isShow == true){
			sHtml = sType4.mainHtml;
			this.css("backgroundColor",sType4.backgroundColor);
		}
		else if(options.type == 5 && options.isShow == true){
			sHtml = sType5.mainHtml;
			this.css("backgroundColor",sType5.backgroundColor);
		}
		else{
			sHtml = defaults.mainHtml;
			this.css("backgroundColor",defaults.backgroundColor);
		}
		this.html(sHtml).css({
			"position": "fixed",
			"left": 0,
			"right": 0,
			"top": 0,
			"bottom": 0,							
			"zIndex":9999
		});

		this.children().css({
			"position":"absolute",
			"top":($(document).height())/2 - ((this.children().height())/2)+"px",
			"left":($(document).width())/2 - ((this.children().width())/2)+"px"
		});
		if(options.isShow == false){
			this.remove();
		}
	}

}(jQuery));
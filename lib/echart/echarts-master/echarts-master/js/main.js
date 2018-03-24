// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

//			console.log(data);
var clusterNumber = 6;
var result;

var option = {
	baseOption: {
		title: {
			text: '某学校人群密度实时监控图',
			subtext: '数据来源--深圳市独尊科技开发有限公司',
			sublink: '',
			left: 'center',
		},
		legend: {
			right: 100,
			data: ['年级学生', '年级老师', '学校保安', '陌生人', '常住民', '家长']
		},
		xAxis: [{
			show: true,
			type: 'value',
			axisLabel: {
				//				                formatter: '{value} °C'
			}
		}],
		yAxis: [{
			show: true,
			type: 'value',
			axisLabel: {
				//				                formatter: '{value} °C'
			}
		}],

		tooltip: {
			trigger: 'item',
			axisPointer: {
				type: 'cross',
			},
			//						formatter: function(params) {							
			//							return "角色："+params.data[2]+
			//									"<p>坐标："+params.data[0]+","+
			//									params.data[1]+"</p>";
			//						},
			//						
		},

		series: [{
				name: "年级学生",
				type: 'scatter',
				animation: true,
				data: [
					[8, 5, "阿凯"],
					[1, 15, "阿凯5"]
				],
				label: {
					emphasis: {
						show: true,
						formatter: function(param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: 'rgba(120, 36, 50, 0.5)',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
							offset: 0,
							color: '#000'
						}, {
							offset: 1,
							color: '#fff'
						}])
					}
				},
				markPoint: {
					symbolSize: 29,
					itemStyle: {
						normal: {
							borderColor: '#1e90ff',
							borderWidth: 1, // 标注边线线宽，单位px，默认为1  
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					effect: {
						show: true,
						shadowBlur: 0
					},
					data: [{
						//			                    coord: [15, 5]
					}]
				}
			},
			{
				name: "年级老师",
				type: 'scatter',
				animation: true,
				data: [
					[18, 15, "露娜"]
				],
				label: {
					emphasis: {
						show: true,
						formatter: function(param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: 'rgba(120, 36, 50, 0.5)',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
							offset: 0,
							color: 'blue'
						}, {
							offset: 1,
							color: '#fff'
						}])
					}
				},
				markPoint: {
					symbolSize: 29,
					itemStyle: {
						normal: {
							borderColor: '#1e90ff',
							borderWidth: 1, // 标注边线线宽，单位px，默认为1  
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					effect: {
						show: true,
						shadowBlur: 0
					},
					data: [{
						//			                    coord: [15, 5]
					}]
				}
			},
			{
				name: "学校保安",
				type: 'scatter',
				animation: true,
				data: [
					[118, 15, "露娜"]
				],
				label: {
					emphasis: {
						show: true,
						formatter: function(param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: 'rgba(120, 36, 50, 0.5)',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
							offset: 0,
							color: 'green'
						}, {
							offset: 1,
							color: '#fff'
						}])
					}
				},
				markPoint: {
					symbolSize: 29,
					itemStyle: {
						normal: {
							borderColor: '#1e90ff',
							borderWidth: 1, // 标注边线线宽，单位px，默认为1  
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					effect: {
						show: true,
						shadowBlur: 0
					},
					data: [{}]
				}
			},
			{
				name: "陌生人",
				type: 'scatter',
				animation: true,
				data: [
					[10, 15, "露娜"]
				],
				label: {
					emphasis: {
						show: true,
						formatter: function(param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: 'rgba(120, 36, 50, 0.5)',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
							offset: 0,
							color: '#000'
						}, {
							offset: 1,
							color: 'red'
						}])
					}
				},
				markPoint: {
					symbolSize: 29,
					itemStyle: {
						normal: {
							borderColor: '#1e90ff',
							borderWidth: 1, // 标注边线线宽，单位px，默认为1  
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					effect: {
						show: true,
						shadowBlur: 0
					},
					data: [{}]
				}
			},
			{
				name: "常住民",
				type: 'scatter',
				animation: true,
				data: [
					[10, 105, "露娜"]
				],
				label: {
					emphasis: {
						show: true,
						formatter: function(param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: '#fff',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
							offset: 0,
							color: '#a338d2'
						}, {
							offset: 1,
							color: '#a338d2'
						}])
					}
				},
				markPoint: {
					symbolSize: 29,
					itemStyle: {
						normal: {
							borderColor: '#1e90ff',
							borderWidth: 1, // 标注边线线宽，单位px，默认为1  
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					effect: {
						show: true,
						shadowBlur: 0
					},
					data: [{}]
				}
			},
			{
				name: "家长",
				type: 'scatter',
				animation: true,
				data: [
					[10, 215, "露娜"]
				],
				label: {
					emphasis: {
						show: true,
						formatter: function(param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 10,
						shadowColor: '#fff',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
							offset: 0,
							color: 'orange'
						}, {
							offset: 1,
							color: 'orange'
						}])
					}
				},
				markPoint: {
					symbolSize: 29,
					itemStyle: {
						normal: {
							borderColor: '#1e90ff',
							borderWidth: 1, // 标注边线线宽，单位px，默认为1  
							label: {
								show: false
							}
						},
						emphasis: {
							borderColor: '#1e90ff',
							borderWidth: 5,
							label: {
								show: false
							}
						}
					},
					effect: {
						show: true,
						shadowBlur: 0
					},
					data: [{}]
				}
			},
		]
	},
	options: []
};
// 使用刚指定的配置项和数据显示图表。
//			myChart.setOption(option);

//搜索名字寻找坐标
$("body").delegate(".searchBtnTd", "click", function() {
	var vStr = $(this).parents("tr").children(".uidTd").text();
	$.each(option.baseOption.series, function(i, v) {
		$.each(v.data, function(k, e) {
			if(e[2] == vStr) {
				v.markPoint.data[0].coord = [e[0], e[1]];
				setTimeout(function() {
					myChart.setOption(option);
				}, 100);
			}
		});
	});
	$("#allModel .close").trigger("click");
});

//点击图表
myChart.on('click', function(params) {
	console.log(params.data[2]);
	//调用历史数据，查询轨迹
	$.ajax({
		type: "post",
		url: "http://119.10.54.43:9999/data.php?do=info",
		async: true,
		data: {
			"id": params.data[2]
		},
		dataType: "json",
		success: function(data) {
			if(data.location.length > 0){
				$(".current label,#2013").text($("#dateInput").val());
				if(data.info.name == "" && data.info.role == "4") {
					$("#pathModel h4").text("某常驻民的历史轨迹");
				}
				if(data.info.name == "" && data.info.role == "5") {
					$("#pathModel h4").text("某家长的历史轨迹");
				}
				if(data.info.name == "" && data.info.role == "6") {
					$("#pathModel h4").text("某陌生人的历史轨迹");
				}
				if(data.info.role == "1" || data.info.role == "2" || data.info.role == "3") {
					$("#pathModel h4").text(data.info.duty + "" + data.info.name + "的历史轨迹");
				}
	
				$(".event_list_box").children("li").remove();
				$.each(data.location, function(i, v) {
					var aLi = $('<li><span>' + v.createtime + '</span><p><span>' + judgeC(parseInt(v.x), parseInt(v.y)) + '(' + v.x + ',' + v.y + ')</span></p></li>');
					$(".event_list_box").append(aLi);
				});
				$("#pathModel").modal("show");
			}
			else{
				layer.alert("后台没有数据",{icon:0});
			}
			
		},
		error: function(data) {
			layer.alert("服务器报错！",{icon:0});
		}
	});
});

var roleData1, roleData2, roleData3, roleData4, roleData5, roleData6;

//根据日期时间ajax请求
$(".searchData").click(function() {
	if($("#dateInput").val() == "" || $("#timeInput").val() == "") {
		layer.alert("时间日期不能为空",{icon:0});
	} else {
		console.log($("#dateInput").val() + " " + $("#timeInput").val());
		forAjax($("#dateInput").val() + " " + $("#timeInput").val());
	}
});

//页面加载获取默认数据
forAjax("2017-11-08 07:30");

//封装ajax请求函数
function forAjax(obj) {

	$.ajax({
		type: "post",
		url: "http://119.10.54.43:9999/data.php?do=list",
		async: true,
		data: {
			"date": obj
		},
		dataType: "json",
		success: function(data) {
			if(data.length > 0){
				roleData1 = [];
				roleData2 = [];
				roleData3 = [];
				roleData4 = [];
				roleData5 = [];
				roleData6 = [];
	
				var a1 = []; 
				var a2 = []; 
				var a3 = []; 
				var a4 = []; 
				var a5 = []; 
				var a6 = []; 
				$.each(data, function(i, v) {
	
					setTimeout(function() {
						$(".roleTd").each(function(i) {
							if($(this).text() == "1") {
								$(this).text("学生");
							}
							if($(this).text() == "2") {
								$(this).text("老师");
							}
							if($(this).text() == "3") {
								$(this).text("保安");
							}
							if($(this).text() == "6") {
								$(this).text("陌生人");
							}
							if($(this).text() == "4") {
								$(this).text("常驻民");
							}
							if($(this).text() == "5") {
								$(this).text("家长");
							}
						});
					}, 100);
					if(v.role == "1") { //学生
						roleData1.push([v.x, v.y, v.id, v.name]);
						a1.push(v);
					}
					if(v.role == "2") { //老师
						roleData2.push([v.x, v.y, v.id, v.name]);
						a2.push(v);
					}
					if(v.role == "3") { //保安
						roleData3.push([v.x, v.y, v.id, v.name]);
						a3.push(v);
					}
					if(v.role == "6") { //陌生人
						roleData6.push([v.x, v.y, v.id, v.name]);
						a6.push(v);
					}
					if(v.role == "4") { //常住民
						roleData4.push([v.x, v.y, v.id, v.name]);
						a4.push(v);
					}
					if(v.role == "5") { //家长
						roleData5.push([v.x, v.y, v.id, v.name]);
						a5.push(v);
					}
	
				});
	
				setTimeout(function() {
					layPageToWrite(a1,"biuuu_student",".table-student");//学生表格
					layPageToWrite(a2,"biuuu_teacher",".table-teacher");//老师表格
					layPageToWrite(a3,"biuuu_doorkeeper",".table-doorkeeper");//保安表格
					layPageToWrite(a4,"biuuu_localPensonal",".table-localPensonal");//常驻民表格
					layPageToWrite(a5,"biuuu_patriarch",".table-patriarch");//家长表格
					layPageToWrite(a6,"biuuu_stranger",".table-stranger");//陌生人表格
					
					console.log(roleData3);
					option.baseOption.series[0].data = roleData1;
					option.baseOption.series[1].data = roleData2;
					option.baseOption.series[2].data = roleData3;
					option.baseOption.series[3].data = roleData6;
					option.baseOption.series[4].data = roleData4;
					option.baseOption.series[5].data = roleData5;
					option.baseOption.title.subtext = $("#dateInput").val() + " " + $("#timeInput").val() + "的数据";
					myChart.setOption(option);
				}, 100);
			}
			else{
				layer.alert("后台没有数据",{icon:0});
			}
			

		},
		error: function(data) {
			layer.alert("服务器报错！",{icon:0});
		}
	});

}
	function layPageToWrite(data,layOption,ele){//data,数据，layOption分页容器，ele表格类名
		var nums = 5; //每页出现的数量
		var pages = Math.ceil(data.length / nums); //得到总页数
		console.log(pages);
		var thisDate = function(curr) {
			//此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
			var str = '',
				last = curr * nums - 1;
			last = last >= data.length ? (data.length - 1) : last;
			//							console.log(last);
			for(var i = (curr * nums - nums); i <= last; i++) {
				str += '<tr><td class="uidTd">' + data[i].id + '</td><td>' + data[i].name + '</td><td class="roleTd">' + data[i].role + '</td><td>' + data[i].x + ',' + data[i].y + '</td><td>' + data[i].tagid + '</td><td>' + data[i].duty + '</td><td>' + data[i].phone + '</td><td>' + data[i].createtime + '</td><td><button type="button" class="searchBtnTd btn btn-success">查询</button></td></tr>';
			}
			//							console.log(str);//当前显示的数据
			return str;
		};

		//调用分页
		laypage({
			cont: layOption, //控制分页容器，biuuu_city3
			pages: pages, //总页数
			jump: function(obj) {
				console.log(thisDate(obj.curr));
				$(ele).children("tbody").html(thisDate(obj.curr));
			}
		});
	}


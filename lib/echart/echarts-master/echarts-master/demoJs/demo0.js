var myChart = echarts.init(document.getElementById('main'));
var geoCoordMap = {
	'p1': [118.103420,32.064653],
	'p2': [118.802421,32.164653],
	'p3': [118.802402,32.064603],
	'p4': [118.802422,32.064653],
	'p5': [118.795379,32.055911],
	'p6': [118.795370,32.055910],
	'p7': [118.874591,32.060613],
	'p8': [118.874551,32.060613],
	'p9': [118.873765,32.061501],
	'p10': [118.873705,32.061101],
	'p11': [118.863981,32.032586],
	'p12': [118.862981,32.035586],
	'p13': [118.861981,32.034586],
	'p14': [118.822422,32.026653],
	'p15': [118.781509,32.039662],
	'p16': [118.741309,32.039661],
	'p17': [118.781409,32.034660],
	'p18': [118.802022,32.064656],
	'p19': [118.766248,32.061485],
	'p20': [118.766148,32.062485],
	'p21': [118.766048,32.063485],
	'p22': [118.802422,32.003650],
	'p23': [118.702432,32.064653],
	'p24': [118.802452,32.064653],
	'p25': [118.727507,32.10226],
	'p26': [118.727507,32.10126],
	'p27': [118.727507,32.10026],
	'p28': [118.302422,32.944653],
	'p29': [118.727422,32.134653],
	'p30': [118.830456,32.150369],
	'p31': [118.831456,32.130369],
	'p32': [118.832456,32.110369],
	'p33': [118.892422,32.864653],
	'p34': [118.872422,32.764653],
	'p35': [118.802422,32.664653],
	'p36': [118.842422,32.564653],
	'p37': [118.822422,32.464653],
	'p38': [118.892422,32.364653],
	'p39': [118.832422,32.264653],
	'p40': [118.902422,32.164653]
};
var value = [{
		name: 'p1',
		value: 100
	},
	{
		name: 'p2',
		value: 120
	},
	{
		name: 'p3',
		value: 130
	},
	{
		name: 'p4',
		value: 122
	},
	{
		name: 'p5',
		value: 144
	},
	{
		name: 'p6',
		value: 100
	},
	{
		name: 'p7',
		value: 156
	},
	{
		name: 'p8',
		value: 199
	},
	{
		name: 'p9',
		value: 122
	},
	{
		name: 'p10',
		value: 100
	},
	{
		name: 'p11',
		value: 140
	},
	{
		name: 'p12',
		value: 140
	},
	{
		name: 'p13',
		value: 143
	},
	{
		name: 'p14',
		value: 199
	},
	{
		name: 'p15',
		value: 111
	},
	{
		name: 'p16',
		value: 133
	},
	{
		name: 'p17',
		value: 155
	},
	{
		name: 'p18',
		value: 135
	},
	{
		name: 'p19',
		value: 210
	},
	{
		name: 'p20',
		value: 229
	},
	{
		name: 'p21',
		value: 100
	},
	{
		name: 'p22',
		value: 120
	},
	{
		name: 'p23',
		value: 130
	},
	{
		name: 'p24',
		value: 122
	},
	{
		name: 'p25',
		value: 144
	},
	{
		name: 'p26',
		value: 100
	},
	{
		name: 'p27',
		value: 156
	},
	{
		name: 'p28',
		value: 199
	},
	{
		name: 'p29',
		value: 122
	},
	{
		name: 'p30',
		value: 100
	},
	{
		name: 'p31',
		value: 100
	},
	{
		name: 'p32',
		value: 120
	},
	{
		name: 'p33',
		value: 130
	},
	{
		name: 'p34',
		value: 122
	},
	{
		name: 'p35',
		value: 144
	},
	{
		name: 'p36',
		value: 100
	},
	{
		name: 'p37',
		value: 156
	},
	{
		name: 'p38',
		value: 199
	},
	{
		name: 'p39',
		value: 122
	},
	{
		name: 'p40',
		value: 100
	}
];

var convertData = function(data, n) {
	var res = [];
	for(var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if(geoCoord) {
			res.push(geoCoord.concat(data[i].value + (Math.random() - 0.5) * n));
		}
	}
	return res;
};

var option = {
	baseOption: {
		title: {
			text: "南京市人群密度实时监控",
			left: 'center',
			top: 20,
			textStyle: {
				color: 'red',
				fontSize: 40
			},
			
		},
		timeline: {
			autoPlay: true,
			data: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
			axisType: 'category',
			padding: [5, 5, 5, 5],
			playInterval: 1500,
			lineStyle: {
				color: 'white'
			},
			label: {
				normal: {
					textStyle: {
						color: 'white',
						fontSize: 13
					}
				}
			}
		},
		bmap: {
//			center: [113.331788, 23.124235],//广州花都为中心
			center: [118.802422,32.064653], //深圳南山科技园为中心113.953812,22.549255
			zoom: 16,
			roam: true,
			mapStyle: {
				styleJson: [{
						'featureType': 'land', //调整土地颜色
						'elementType': 'geometry',
						'stylers': {
							'color': '#081734'
						}
					},
					{
						'featureType': 'building', //调整建筑物颜色
						'elementType': 'geometry',
						'stylers': {
							'color': '#04406F'
						}
					},
					{
						'featureType': 'building', //调整建筑物标签是否可视
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'highway', //调整高速道路颜色
						'elementType': 'geometry',
						'stylers': {
							'color': '#015B99'
						}
					},
					{
						'featureType': 'highway', //调整高速名字是否可视
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'arterial', //调整一些干道颜色
						'elementType': 'geometry',
						'stylers': {
							'color': '#003051'
						}
					},
					{
						'featureType': 'arterial',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'green',
						'elementType': 'geometry',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'water',
						'elementType': 'geometry',
						'stylers': {
							'color': '#044161'
						}
					},
					{
						'featureType': 'subway', //调整地铁颜色
						'elementType': 'geometry.stroke',
						'stylers': {
							'color': '#003051'
						}
					},
					{
						'featureType': 'subway',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'railway',
						'elementType': 'geometry',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'railway',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'all', //调整所有的标签的边缘颜色
						'elementType': 'labels.text.stroke',
						'stylers': {
							'color': '#313131'
						}
					},
					{
						'featureType': 'all', //调整所有标签的填充颜色
						'elementType': 'labels.text.fill',
						'stylers': {
							'color': '#FFFFFF'
						}
					},
					{
						'featureType': 'manmade',
						'elementType': 'geometry',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'manmade',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'local',
						'elementType': 'geometry',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'local',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					},
					{
						'featureType': 'subway',
						'elementType': 'geometry',
						'stylers': {
							'lightness': -65
						}
					},
					{
						'featureType': 'railway',
						'elementType': 'all',
						'stylers': {
							'lightness': -40
						}
					},
					{
						'featureType': 'boundary',
						'elementType': 'geometry',
						'stylers': {
							'color': '#8b8787',
							'weight': '1',
							'lightness': -29
						}
					}
				]
			}
		},
		visualMap: {
			min: 0,
			max: 200,
			splitNumber: 5,
			inRange: {
				color: ['blue', 'green', 'yellow', 'red']
			},
			textStyle: {
				color: '#fff'
			},
			bottom: 40
		},
//		visualMap: {//另外一中类型
//			type: 'continuous',
//	        min: 0,
//	        max: 500,
//	        text:['High','Low'],
//	        realtime: false,
//	        calculable : true,
//	        color: ['orangered','yellow','lightskyblue'],
//			textStyle: {
//				color: '#fff'
//			},
//			bottom: 40
//		},
		series: [{
			type: 'heatmap',
			mapType: 'china',
			coordinateSystem: 'bmap',
			blurSize: 50
		}]
	},
	options: [{
			series: [{
				data: convertData(value, 100)
			}]
		},
		{
			series: [{
				data: convertData(value, 200)
			}]
		},
		{
			series: [{
				data: convertData(value, 300)
			}]
		},
		{
			series: [{
				data: convertData(value, 400)
			}]
		},
		{
			series: [{
				data: convertData(value, 500)
			}]
		},
		{
			series: [{
				data: convertData(value, 600)
			}]
		},
		{
			series: [{
				data: convertData(value, 900)
			}]
		},
		{
			series: [{
				data: convertData(value, 700)
			}]
		},
		{
			series: [{
				data: convertData(value, 600)
			}]
		},
		{
			series: [{
				data: convertData(value, 500)
			}]
		},
		{
			series: [{
				data: convertData(value, 300)
			}]
		}
	]
};
console.log(convertData(value, 150));
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


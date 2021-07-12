var form_tmp = [{
	"id": 1,
	"time": "2019-12-19",
	"title": "客户名称",
	"description": "",
	"checkbox": "",
	"required": 1,
	"type": 1
}, {
	"id": 2,
	"time": "2019-12-19",
	"title": "联系人",
	"description": "",
	"checkbox": "",
	"required": 1,
	"type": 1
}, {
	"id": 3,
	"time": "2019-12-19",
	"title": "联系电话",
	"description": "",
	"checkbox": "",
	"required": 1,
	"type": 1
}, {
	"id": 4,
	"time": "2019-12-19",
	"title": "客户地址",
	"description": "请您填写详细地址，我们将以此作为礼品邮寄地址。",
	"checkbox": "",
	"required": 1,
	"type": 2
}, {
	"id": 5,
	"time": "2019-12-19",
	"title": "客户类型",
	"description": "",
	"checkbox": [{
		"name": "批发商",
		"type": 1
	}, {
		"name": "分销商",
		"type": 2
	}, {
		"name": "安装商",
		"type": 3
	}, {
		"name": "终端用户",
		"type": 4
	}],
	"required": 1,
	"type": 3
}, {
	"id": 6,
	"time": "2019-12-19",
	"title": "您通过哪些渠道了解到古瑞瓦特？（   ）",
	"description": "",
	"checkbox": [{
		"name": "展会推广",
		"type": 1
	}, {
		"name": "网络平台",
		"type": 2
	}, {
		"name": "好友推荐",
		"type": 3
	}, {
		"name": "广告宣传",
		"type": 4
	}],
	"required": 1,
	"type": 3
}, {
	"id": 7,
	"time": "2019-12-19",
	"title": "双方合作时间",
	"description": "",
	"checkbox": [{
		"name": "1年以内",
		"type": 1
	}, {
		"name": "1-2年",
		"type": 2
	}, {
		"name": "2-3年",
		"type": 3
	}, {
		"name": "3年以上",
		"type": 4
	}],
	"required": 1,
	"type": 4
}, {
	"id": 8,
	"time": "2019-12-19",
	"title": "所使用产品型号",
	"description": "",
	"checkbox": [{
		"name": "户用逆变器：1000~3000-S、2500~6000MTL-S、2000~5000HF、MIN3000~6000TL-X、8000~15000TL3-S、MID17~25KTL3-X",
		"type": 1
	}, {
		"name": "商用逆变器 ：30000~50000TL3-（N）S（E）、50000~60000TL3-HE、MAC 50~70KTL3-X LV/MV、MAX 60~80KTL3 LV/MV",
		"type": 2
	}, {
		"name": "并网储能：并离网一体SPH系列",
		"type": 3
	}, {
		"name": "离网储能：SPF3000-5000TL HVM、SPF 3000TL LVM、SPF 3000-5000TL HVM-WPV、SPF 4000-6000T DVM、SPF 4000-12000T HVM）",
		"type": 4
	}],
	"required": 1,
	"type": 3
}, {
	"id": 9,
	"time": "2019-12-19",
	"title": "产品满意度",
	"description": "",
	"checkbox": [{
		"name": "产品质量",
		"type": 1
	}, {
		"name": "产品价格",
		"type": 2
	}, {
		"name": "订单交货期",
		"type": 3
	}, {
		"name": "产品使用方便性",
		"type": 4
	}],
	"required": 1,
	"type": 5
}, {
	"id": 10,
	"time": "2019-12-19",
	"title": "您一般通过哪种方式联系古瑞瓦特售后服务人员？",
	"description": "",
	"checkbox": [{
		"name": "400服务热线（400-931-3122）",
		"type": 1
	}, {
		"name": "网络平台（官网、微信公众号、OSS系统）",
		"type": 2
	}, {
		"name": "联系各区域驻点工程师",
		"type": 3
	}, {
		"name": "联系销售人员",
		"type": 4
	}],
	"required": 1,
	"type": 3
},
{
	"id": 10.5,
	"time": "2019-12-19",
	"title": "您使用OSS一般用来解决什么问题？",
	"description": "",
	"checkbox": [{
		"name": "大屏展示",
		"type": 1
	}, {
		"name": "导出数据",
		"type": 2
	}, {
		"name": "发电量分析",
		"type": 3
	}, 
	{
		"name": "实时监测",
		"type": 4
	},
	{
		"name": "其它（售后运维等）",
		"type": 5
	}
	],
	"required": 1,
	"type": 3
},
{
	"id": 11,
	"time": "2019-12-19",
	"title": "现场服务支持",
	"description": "",
	"checkbox": [{
		"name": "现场处理问题的响应速度",
		"type": 1
	}, {
		"name": "现场服务人员的专业技术水平",
		"type": 2
	}, {
		"name": "现场服务人员的有形度：着装、谈吐、操作规范等",
		"type": 3
	}],
	"required": 1,
	"type": 5
}, {
	"id": 12,
	"time": "2019-12-19",
	"title": "远程技术服务支持",
	"description": "",
	"checkbox": [{
		"name": "远程服务响应速度",
		"type": 1
	}, {
		"name": "远程服务专业水平",
		"type": 2
	}],
	"required": 1,
	"type": 5
}, {
	"id": 13,
	"time": "2019-12-19",
	"title": "备品备件（含整机）服务支持",
	"description": "",
	"checkbox": [{
		"name": "备件供应及时性",
		"type": 1
	}, {
		"name": "备件收发货服务的响应速度",
		"type": 2
	}],
	"required": 1,
	"type": 5
}, {
	"id": 14,
	"time": "2019-12-19",
	"title": "营销服务满意度",
	"description": "",
	"checkbox": [{
		"name": "销售人员拜访频次",
		"type": 1
	}, {
		"name": "客情维护",
		"type": 2
	}],
	"required": 1,
	"type": 5
}, 
{
	"id": 14.5,
	"time": "2019-12-19",
	"title": "OSS监控运维平台满意度",
	"description": "",
	"checkbox": [{
		"name": "操作方便性",
		"type": 1
	}, {
		"name": "功能实用性",
		"type": 2
	}],
	"required": 1,
	"type": 5
},
{
	"id": 15,
	"time": "2019-12-19",
	"title": "售后服务面，针对远程服务、现场服务和备品备件支持方面，如有不满意或者需要改进的地方，请您详细告知，我们将不断改进",
	"description": "",
	"checkbox": "",
	"required": 0,
	"type": 1
}, {
	"id": 16,
	"time": "2019-12-19",
	"title": "针对产品和营销服务方面，如有不满意或者需要改进的地方，请您详细告知，我们将不断改进（产品质量/订单交期/物料/票据等方面）",
	"description": "",
	"checkbox": "",
	"required": 0,
	"type": 1
}, {
	"id": 17,
	"time": "2019-12-19",
	"title": "针对Growatt和同行的比较，您觉得有哪些优势和劣势？ 能否提出改善建议呢？为了让我们的服务更贴心，您希望从古瑞瓦特能提供哪些支持呢?",
	"description": "",
	"checkbox": "",
	"required": 0,
	"type": 6
},
{
	"id": 18,
	"time": "2019-12-19",
	"title": "您希望OSS运维平台新增哪些功能？如您对该平台功能有不满意的地方，或者需要优化的建议，请您详细告知",
	"description": "",
	"checkbox": "",
	"required": 0,
	"type": 6
}
];

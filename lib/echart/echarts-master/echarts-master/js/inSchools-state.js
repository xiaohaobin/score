//判断坐标位置
function judgeC(x,y){
	if((x >= 82 && x <= 500) && (y >= 0 && y <= 20)){
		return "沿河路";
	}
	if((x >= 0 && x <= 81) && (y >= 0 && y <= 461)){
		return "居民楼";
	}
	if((x >= 277 && x <= 500) && (y >= 462 && y <= 500)){
		return "东商业区";
	}
	if((x >= 0 && x <= 243) && (y >= 462 && y <= 500)){
		return "西商业区";
	}
	if((x >= 244 && x <= 276) && (y >= 462 && y <= 500)){
		return "凤凰街道";
	}
	if((x >= 82 && x <= 500) && (y >= 20 && y <= 66)){
		return "凤凰街道";
	}
	if((x >= 82 && x <= 110) && (y >= 20 && y <= 461)){
		return "凤凰街道";
	}
	if((x >= 82 && x <= 500) && (y >= 417 && y <= 461)){
		return "凤凰街道";
	}
	if((x >= 110 && x <= 500) && (y >= 67 && y <= 416)){
		if((x >= 123 && x <= 233) && (y >= 327 && y <= 383)){
			return "学校篮球场a";
		}
		else if((x >= 280 && x <= 318) && (y >= 243 && y <= 375)){
			return "学校篮球场b";
		}
		else if((x >= 110 && x <= 196) && (y >= 200 && y <= 326)){
			return "学校家属院";
		}
		else if((x >= 342 && x <= 378) && (y >= 216 && y <= 373)){
			return "学校足球场";
		}
		else if((x >= 193 && x <= 238) && (y >= 393 && y <= 418)){
			return "学校门卫室";
		}
		else if((x >= 274 && x <= 308) && (y >= 393 && y <= 418)){
			return "学校警卫室";
		}
		else if((x >= 401 && x <= 472) && (y >= 260 && y <= 417)){
			return "北教学楼";
		}
		else if((x >= 401 && x <= 472) && (y >= 70 && y <= 243)){
			return "南教学楼";
		}
		else if((x >= 134 && x <= 377) && (y >= 107 && y <= 168)){
			return "综合楼";
		}
		else if((x >= 122 && x <= 192) && (y >= 383 && y <= 418)){
			return "绿化带a";
		}
		else if((x >= 196 && x <= 233) && (y >= 237 && y <= 325)){
			return "绿化带b";
		}
		else if((x >= 111 && x <= 400) && (y >= 67 && y <= 88)){
			return "绿化带c";
		}
		else{
			return "学校某区域";
		}
	}
}

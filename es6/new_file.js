class School {
	constructor() {
		this.classNum = 3;
		this.grade = 12;
	}
	getTeacherNum(nTea) {
		return nTea * this.classNum * this.grade;
	}
}

var schoolFn = new School();
console.log("老师数量：", schoolFn.getTeacherNum(3));
document.write("老师数量：" + schoolFn.getTeacherNum(3))

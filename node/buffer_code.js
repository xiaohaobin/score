//各种类型编码互相转换

var txt = "你好，世界";

const buf = Buffer.from(txt, 'utf8');

console.log(buf);
console.log(Buffer.from(txt, 'hex'),"从元数据转化为hex格式")
console.log(buf.toString('hex'),"从元数据转化为utf8格式，再转化为hex格式")


var txt2 = "Hello World!";
const buf2 = Buffer.from(txt2, 'ascii');

console.log(Buffer.from(txt2, 'hex'),"从原数据转化为hex格式");
console.log(buf2.toString('hex'),"从元数据转化为ascii格式，再转化为hex格式");

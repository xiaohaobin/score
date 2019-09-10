var fs = require("fs");

fs.readFile('text/test2.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");
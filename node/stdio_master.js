//多线程输入输出流

//主要线程js
const fs = require('fs');
const child_process = require('child_process');
 
 //循环执行子线程
for(var i=0; i<10; i++) {
    var workerProcess = child_process.exec('node stdio_support.js '+i, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
 	//监听工作线程退出
    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });
}
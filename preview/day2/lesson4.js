// try 尝试
// catch 抓取/捕获
// finally 最终

// 作用: 用来处理异常
// 除了 try 之外, catch / finally 都是可以省略掉的
// 但是,一般情况下, try需要配合 以上两个来使用!

// js中如果代码出现了错误(异常),那么后续代码也不回再执行了!
// adfladslkfj;
// console.log("1231231231");


// // 语法:
// try {
// 	var dv = document.getElementById("dv");
// 	dv.style.left = "1000px";
//     // 可能出现错误的代码
//     // adfladslkfj;

// } catch ( error ) {
// 	// error 表示的 错误的信息!
//     // 出现错误会执行这里的代码
//     // console.log("代码出现了错误,请查看!");
//     console.log(error);
// } finally { // 可选
//     // 无论是否出现异常, 最后执行
//     // 不管有没有出现错误, 这里面的代码都会执行!
    
//     // 手动将变量占用的内存释放掉!
//     // dv = null;
// }

// console.log(123456);

// function fn() {
// 	try {
// 		// 即使在 try 中使用了 return ,那么 finally 中的代码还是会执行!
// 		return;
// 	} catch (e) {

// 	} finally {
// 		console.log("这样代码也会执行!");
// 	}
// }
// fn();


// 手动抛出异常
// throw new Error("别瞎搞");
// throw "这都行？？？";

try {
	// throw new Error("手动抛出的异常!");

	// throw "这都行？？？";
	throw ["1", "a"];
} catch(e) {
	console.log(e);
}
    
    
    

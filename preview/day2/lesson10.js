// 混入式继承是通过 for-in 循环将一个对象中的属性
// 添加到了另外一个对象中去

// 目的： 让对象obj继承自 o1
var obj = {};
var o1 = {
	eat: function() {
		console.log("米饭");
	},
	sleep: function() {
		console.log("12点睡");
	}
};

// 给对象obj添加了一个方法 extend，这个
// 方法的作用： 用来给当前这个对象扩展属性（为了实现混入式继承）
obj.extend = function(o) {
	for(var k in o) {
		// 谁调用这个方法，this就是谁！
		this[k] = o[k];
	}
};

// 调用：让obj继承自o1
obj.extend(o1);
console.log(obj);



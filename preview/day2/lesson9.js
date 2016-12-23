// 混入式继承：
// 	一个对象（obj）是可以继承自多个其他对象的，对象o1, 对象o2 。。。，相当于
// 	把其他对象的属性放到了 对象obj 中

var obj = {};
var o1 = {
	name: "xiaozhi",
	age: 19
};
var o2 = {
	coding: function() {
		console.log("hello world!")
	},
	runing: function () {
		console.log("快跑！");
	}
};

// 目的：让 obj 继承自：o1 和 o2
/*for(var k in o1) {
	obj[k] = o1[k];
}
for(var k in o2) {
	obj[k] = o2[k];
}*/
// console.log(obj);

// extend 扩展
// obj.extend = function(o) {
// 	for(var k in o) {
// 		// obj[k] = o[k];
// 		// 谁调用的该方法this就指向了谁！
// 		this[k] = o[k];
// 	}
// };

// // 调用
// obj.extend(o1);
// obj.extend(o2);
// obj.extend({
// 	shopping: function() {
// 		console.log("双11 真的便宜吗？？")
// 	}
// });
// // console.log(obj);
// obj.shopping();

// 这个函数的作用：就是实现 混入式继承
var extend = function(o) {
	for(var k in o) {
		// obj[k] = o[k];
		// 谁调用的该方法this就指向了谁！
		this[k] = o[k];
	}
};

// 给对象 obj 添加了一个方法
// obj.extend 是对象的一个方法
// 等号右边的 extend 是一个函数的名字
// obj.extend = extend;
// obj.extend(o1);
// obj.extend(o2);
obj.ext = extend;
obj.ext(o1);
obj.ext(o2);
console.log(obj);

var obj2 = {};
// 给对象obj2添加一个方法，用来实现继承
obj2.ext = extend;

obj2.ext(o1);
obj2.ext(o2);
console.log(obj2);
    
    
    

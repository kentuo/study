// 原型继承
var Person = function() {};

// 1 利用对象的动态特性给原型添加成员：
// 对象的动态性： 一个对象在任何时候，都可以添加属性和方法，这个特性就叫做动态性
/*Person.prototype.say = function() {
	console.log("sa wa di ka");
};
Person.prototype.run = function() {
	console.log("阿甘！快跑！");
};
Person.prototype.eat = function() {
	console.log("辣条！");
};
Person.prototype.coding = function() {
	console.log("Hello world!");
};*/


// 2 利用覆盖原型对象的方式添加成员
// Person.prototype = {
// 	// 这个constructor属性，可以省略！
// 	// 如果我们要用到这个属性，此时，需要手动添加！
// 	constructor: Person,

// 	say: function() {},
// 	run: function() {},
// 	coding: function() {
// 		console.log("Hello world!");
// 	}
// };
// 
// var obj = {};
// var obj1 = new Object();
// var p = new Person();
// p.coding();
// // console.log(p.constructor === Object);
// console.log(p.constructor === Person);


// 3 利用混入式继承来给原型对象添加成员
Person.prototype.extend = function(o) {
	for(var k in o) {
		this[k] = o[k];
	}
};

// 给 原型对象 中添加属性或者方法
// var p = new Person();
var o = {
	coding: function() {
		console.log("html + css + js");
	},
	eat: function() {
		console.log("米饭");
	}
};
Person.prototype.extend(o);

var p = new Person();
p.coding();
p.eat();

var p1 = new Person();
p1.eat();
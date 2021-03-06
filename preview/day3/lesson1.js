// 构造函数：
// 
// 构造函数的作用 ： 初始化由new创建出来的对象
// new 的作用： 创建对象（空对象）
// function Person() {
// 	// 这里面的代码不管什么都会去执行
// 	this.name = "asdjlf";
// 	console.log("这段代码会执行吗");
// }
// new 后面跟的是函数调用
// 使用new来调用函数，跟普通的直接调用函数主要的不同：
// 就是 this 的指向不同了
// 再就是 会自动的返回新创建的对象
// Person(); // 这种方式调用函数内部的this指向了 window
// 		如果一个函数没有return 那么当前函数的返回值是默认的：undefined
// var p = new Person();


// 什么是原型？
// 一个对象的原型就是它的构造函数的prototype属性的值。
// Person.prototype，prototype是Person的一个属性，这个属性的值是：对象类型的
// 原型或者原型对象就是：这个属性的值
// 
// 原型的作用？就是为了实现继承！
// 
// 讨论原型（继承），指的值： 对象和原型对象 之间的关系

// prototype是哪来的？
// 所有的函数都有一个prototype属性
// 当函数被创建的时候，prototype属性会自动创建和初始化
// （JS的引擎帮我们创建好的）
// 
// 构造函数的prototype属性的默认值是一个对象，这个对象
// 只带有一个属性，constructor。
// 
// Person.prototype.constructor === Person 
// 结果为：true
// 
// 默认情况下的原型对象有一个属性，这个属性是：constructor
// constructor指向了：当前的构造函数


// 什么是原型链？
// 对象有原型对象，原型对象也是对象，所以，
// 原型对象也有原型对象，这样一环扣一环，就形成了一条链式结构
// 叫做：原型链

// 对象p的原型链中包含了那些成员：
// p -> Person.prototype -> Object.prototype -> null
// var p = new Person();

// JavaScript继承
// 拿来主义：自己没有，别人有，拿过来让其成为自己的或者能被自己使用
// 对象可以使用原型对象中的属性或方法， 因为：对象继承自原型对象
// 
// 1 原型继承
// 对象 继承自 原型对象，是对象和原型对象之间的关系
// 1.1 利用对象的动态性
// Person.prototype.say = function() {};
// // 1.2 利用覆盖原型对象
// Person.prototype = {
// 	constructor: Person,
// 	say: function() {}
// };
// // 1.3 利用混入继承
// Person.prototype.extend = function(o) {
// 	for(var k in o) {
// 		this[k] = o[k];
// 	}
// };
// Person.prototype.extend({});
// var obj = {
// 	sayHi: function() {},
// 	coding: function() {}
// };
// 调用extend方法之后，Person.prototype 中就有了 sayHi 和coding 两个方法！
// Person.prototype.extend(obj);


// 2 混入式继承：将其他的对象的属性或者是方法拿过来，让其成为自己的
// var o = {};
// var o1 = {
// 	sayHi: function() {
// 		console.log("萨瓦迪卡");
// 	},
// 	coding: function() {
// 		console.log("hello world");
// 	}
// };
// 3 经典继承： Object.create

// 原型链逻辑图为什么要画 Object ？
// 因为任何一个对象都直接或间接的继承自：Object.prototype

// 一些结论：
  // 1 只有   函数 才有 prototype 属性（★★★★★）
  // 2 只要是 对象 就有 __proto__ 属性（★★★★★）
  // 3 构造函数的 prototype 的类型是："object"（大部分情况下）
  // function fn() {}
  // var f = new fn();
  // console.log(typeof fn.prototype);
  // console.log(typeof Function.prototype); // function


// 记住：对象在被创建的时候，原型就定下来了，
// 那么其原型链也就确定下来了
function Person() {}
/*// p -> Person.prototype -> Object.prototype -> null
var p = new Person();

// 此处是，创建了一个新的对象，然后，赋值给了 Person.prototype
// 当前的 Person.prototype 已经指向了一个新的对象！
Person.prototype = {
	sayHi: function() {
		alert(123);
	}
};
// 此处，调用不到 sayHi 方法
// 原因： 对象是在修改原型链之前就已经被创建好了，其原型链就已经定下来了！
// 后面即使再改变了 Person.prototype 也不会影响到 被创建好的实例的原型链
p.sayHi();*/

Person.prototype = {
	sayHi: function() {
		alert(123);
	}
};

var p = new Person();
p.sayHi();
    
    
    

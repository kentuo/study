// 内容：
// 1 复习（前一天重点知识、填空题、未讲到的点）
// 2 构造函数
// 3 原型和原型链

// 原型是什么
// 原型就是: 构造函数的prototype属性的值
var p = {
	name: "Tom",
	age: 9,
	score: {
		math: 99,
		english: 99,
		chinese: 99
	},
	sayHi: function() {}
};

// 访问 score 中的属性
// p是一个对象
// score是对象p的一个属性，这个属性的类型是：对象类型的
// 只有对象才可以使用 点运算符或者[] 来访问对象的属性
// console.log(p.score.math);


// p 是一个对象
// 对象p里面有一个属性是：score
// console.log(typeof p.score);
// 这个属性score的类型是：object（对象类型）
// 所以，可以使用 . 语法，访问对象的属性，即：
// p.score.math 是获取 对象p 的 score属性 的 math属性
// console.log(p.score.math);

// 构造函数
function Person() {}
// 创建对象
var p = new Person();
// 给原型对象添加了一个legs的属性 属性的值为：2
Person.prototype.legs = 2;

// 这两种方式都能够访问到给原型添加的属性
// 
// 一般情况下，要访问原型中的属性，就是通过 实例对象p 来直接访问，
// 也可以 通过 Person.prototype.legs 这种方式来访问，但是，很少这么做！
// 
// console.log(Person.prototype.legs); 

// 创建出来的对象，就会自动链接到其原型对象上，也就是：对象直接就可以访问到
// 原型中的属性
console.log(p.legs);

// Person是一个构造函数，同时也是对象（可以使用 . 语法访问对象的属性或方法）
// 构造函数有一个属性是：prototype
// 这个prototype属性是再函数创建的时候,就有了(js的引擎创建的)
// 
// 这个属性prototype的类型是：object
// Person.prototype.legs 是获取 Person的 prototype属性 的 legs属性
// console.log(Person.prototype.legs);

// 结论
// 1 只有函数才有prototype属性
// 2 由构造函数创建出来的对象会默认链接到其构造函数的prototype属性上
// 3 上述中“链接”的意思是：对象可以使用其构造函数的prototype属性中的成员
// 4 函数的prototype属性的类型是：object
// 5 原型的作用：数据共享（实际是为了实现：继承）
// 6 由构造函数创建出来的对象是一个实例对象，它是对象，而不是一个函数！！！


// function aaa() {}
// console.log(aaa.prototype)

// var obj = {};
// console.log(obj.prototype);

// 补充几个概念：
// 函数、构造函数、对象、实例
// 
// 函数：复用（代码的重复利用）
// 构造函数：复用（模板，复用产生对象的代码）
// 实例：由构造函数创建出来的对象
// 对象：泛指JavaScript中的复杂数据类型
// function Person() {}
// Person();
// var p = new Person();
// 
// 称 p 是构造函数Person的实例
// 
// var obj = {};

// JavaScript是一门弱类型的语言
// 
// 数据是有类型的，但没有类型约束

// 不推荐这么做！！！
var num = 123;
num = {};

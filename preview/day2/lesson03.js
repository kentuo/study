// 创建了一个构造函数
var Person = function() {
	this.name = "xiaozhi";
	this.age = 19;

	// this.legs = 3;
	// this.say = function() {};
};

// 给原型添加属性
Person.prototype.legs = 2;
Person.prototype.sayHi = function() {
	alert("你好，我是：" + this.name );
};

// 创建一个Person的实例
var p1 = new Person();
var p2 = new Person();
var p3 = new Person();

// 访问 legs 这个属性：
// console.log(p1.legs);
// p1.sayHi();
console.log(p1.name);
// p2.sayHi();
console.log(p2.name);
// p3.sayHi();
console.log(p3.name);

// 说明 p1.legs 访问到属性的过程：
// 1 首先会在对象p1中查找属性legs，因为当前对象中没有legs属性，所以在当前
// 		对象中没有找到legs属性
// 2 去原型对象中查找有没有legs属性，因为我们给原型添加了一个 legs 属性
// 		所以，就找到了legs属性，就直接返回了！


// 一般情况下，只有公共的属性或者是方法才会放到原型中！


// 属性的搜索原则：
// 1 首先会在当前对象中查找属性，如果有，就直接返回, 并且不会再继续查找了！
// 2 如果没有，就会去当前对象的原型对象中查找属性，如果有，就直接返回
// 。。。

// 以下两种知道有，一般不要使用这种形式！
// 这两种形式都是直接访问原型中的属性的！
console.log(Person.prototype.legs);
console.log(p1.__proto__.legs);
    
    

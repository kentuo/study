// constructor 构造器/构造函数
// 在函数表达式中, 函数的名字 p 是可以省略的,但是也可以存在
// 如果存在了, 注意只能在函数体内部使用!
var Person = function P() {
	this.name = "小明";
};
var p1 = new Person();

// 访问实例对象p1的属性 constructor
// constructor 的作用: 就是用来获取对象的构造函数
console.log(p1.constructor);
// console.log(typeof p1.constructor);
console.log(p1.constructor === Person); // true

// 默认情况下,对象的原型对象中只有一个属性,这属性就是: constructor
console.log(Person.prototype);



// 原型是什么？
// 		构造函数的prototype属性的值就是原型
// 
// 默认情况下，prototype会有一个默认属性，constructor 属性
// 		p.constructor === Person
// 			constructor 是谁 prototype 提供的一个属性
// 			为什么通过实例对象p就能访问到 contructor这个属性？
// 			
// 			属性搜索原则：
// 				1 实例对象本身查找属性，如果找到了，就直接返回
// 				2 如果没找到，会去原型对象中查找属性
// 			
// 		Person.prtototype.contructor === Person
// 
// 继承： 实例对象 与 原型对象 之间的关系

var Person = function() {
};
var p = new Person();

// __proto__ 和 prototype 
// 区别： 站在不同的角度去访问到原型对象
// 		__proto__ 是站在实例对象的角度，访问原型对象
// 			p.__proto__ 是实例对象的原型对象
// 		prototype 是站在构造函数的角度，访问原型对象
// 			Person.prototype 是构造函数的原型属性
// 			
// 相同点： 这两个都指向了同一个原型对象
console.log(p.__proto__ === Person.prototype); // true

// 构造函数（了解）
// 一般情况下没有返回值，如果有返回值：
// 1 返回值是基本类型，此时，这个返回值会被忽略掉，还是返回新创建的对象
// 2 返回值是复杂类型，此时，新创建的对象就会被忽略掉，而返回的是手动return的对象

/*var Person = function() {

	// return "123123";
	return {
		name: "abc"
	};
};
Person.prototype.say = function() {
	alert("你好");
};
var p = new Person();
// p.say();
console.log(p.name);*/




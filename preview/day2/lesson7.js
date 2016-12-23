var Person = function() {};
Person.prototype.say = function() {
	console.log("hello");
};

// 继承:就是指 对象与原型对象 之间的关系!
// 实例对象 p 继承自 Person.prototype 原型对象
var p = new Person();
p.say();


// 什么是JavaScript中的继承?
// 简单的说就是: 拿来主义!
// js中的继承其实就是: 自己没有,但是别人有, 将别人的拿过来借用一下或者占为己有
// 
// 例如: 实例p中没有say方法, 但是原型对象中有say方法, 因为对象p继承自原型对象
// 所以, 实例p就可以直接拿到原型对象中的方法 来借用!

// JavaScript中实现继承的方式:
// 1 原型继承
// 2 混入式继承
// 3 经典继承
    
    
    

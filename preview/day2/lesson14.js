function Person() {}
var p = new Person();

// 对象类型
console.log(typeof Person.prototype);
// 既然是一个对象，那就会有原型对象
console.log(Person.prototype.__proto__ === Object.prototype);
// Object.prototype
console.log(Object.prototype.__proto__);

// 第二部：将构造函数Object 创建对象 obj 添加到图中
var obj = new Object();

// console.log(Object.prototype);
console.log(Object.prototype.constructor === Object);
console.log(obj.__proto__ === Object.prototype);



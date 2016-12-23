function Person() {}
var p = new Person();

// 绘制的是：实例对象 、构造函数、原型对象三者之间的关系！

// 结论：
// 1 只要是函数就有 prototype 属性
// 2 prototype属性的值是：object
// 3 原型中有一个属性：constructor
// 4 constructor这个属性指向了：当前的构造函数
// 5 构造函数可以创建实例对象
// 6 创建的实例对象与 原型对象之间有关系（__proto__）



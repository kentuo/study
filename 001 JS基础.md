# JS 第1天

基础

---

##Number
###进制问题
八进制: 0开头的(如果超出的,自动转换成十进制)
十六进制: 0x开头

num = 5e+4;
打印出来是 50000

使用小数进行计算的时候会出现精度丢失的问题
尽量不用小数进行计算、比较
console.log（0.1+0.2 == 0.3） ，← false

Number.MAX_VALUE(js能表示的最大值)
Number.MIN_VALUE(js能表示的最小值,正值)

大于最大值时,变成 [infinity]

"abc"/10 = NaN
NaN == NaN  → 返回的是false

用isNaN()来判断是不是一个非数字,返回true(即不是一个数字),返回false(即是一个数字)

##Sting

转义字符
\"    \'    \n

字符串的不可变性
指的是, 在内存里, 存了一个字符串之后, 不会再改变,如果再赋值,则在内存中新开辟空间存储后再指向.所以**不要大量的拼接字符串**(会造成内存泄漏)

## Boolean

true 和 false

## undefined

定义了变量没有赋值的就是undefined

**谷歌浏览器里, 数值显示为蓝色, 布尔类型是蓝色, undefined是灰色, 字符串是黑色**
检查类型: typeof();

##3种转换字符串的方式
1. String(num);
2. num.toString();
3. num+""

##转换number方法
1. Number();
2. parseInt();
3. parseFloat();
4. str-0 ; (减0,除以1,乘以1)

##转换布尔类型
1.Boolean();
可以转换成false的: 0, undefined, null, "", NaN, false
2. !!str;

##运算符
任何正数除以0 : infinity;
任何正数%0 : NaN;

++a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;和&nbsp;&nbsp;&nbsp;&nbsp;   a++
自增返回和返回后自增

##逻辑运算符
&& ||
"abc" && "bcd"; 
"abc" || "bcd";
短路运算:谁能决定结果,就返回谁



Tags： black_horse

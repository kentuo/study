# 第26天 Ajax 第2天

动态页面 异步 HTTP协议 Ajax编程

---


## php动态渲染
- 如果在前台页面(html页面)里创建后台代码(php), 会被当成注释, 因为php代码需要特定的php解析引擎, 前台不包含这个引擎, 但是有容错机制, 所以无法解析的php代码解析为注释

所以要在php文件中进行php代码书写(前台无法渲染, 可以在后台渲染吗?)

---
php页面的动态渲染: 
1. 可以在php文件中直接输出html结构代码
2. 也可以在php文件中输出变量, 做到动态的渲染结果
```
<?php 
$arr = array(
	array(
		'src'=>'../images/nav0.png',
		'text'=>'商品分类1'
		),
	array(
		'src'=>'../images/nav1.png',
		'text'=>'商品分类2'
		),
	array(
		'src'=>'../images/nav2.png',
		'text'=>'商品分类3'
		)
	);

$html = '<ul>';
foreach ($arr as $key => $value) {
	$html.='<li>';
	$html.='<img src="'.$value[src].'" alt="">';
	$html.='<p>'.$value[text].'</p>';
	$html.='</li>';
}
$html.='</ul>';
echo $html;
 ?>
```
以上代码是在php页面中执行的, php文件的注释会以文本的形式显示在php页面中

当然, 我们正常的思考方式来说, 一般后台是处理数据的, 而前台是负责页面显示, 所以以上这种后台渲染的方式比较少用到

下面先讲讲网络传输协议, 顺便引入前台处理数据的方式


## 网络传输协议
指服务器和客户端间进行通信时的约束和规范，客户端与服务端的数据交互并不是杂乱无章的，需要遵照（基于）一定的规范进行

- HTTP协议
超文本传输协议，网站是基于HTTP协议的，例如网站的图片、CSS、JS等都是基于HTTP协议进行传输的。HTTP协议是由从客户机到服务器的请求(Request)和从服务器到客户机的响应(Response)进行了约束和规范

常用的请求方法: `POST/GET/PUT/DELETE`

从电脑到服务器的过程是请求, 服务器返回则是响应
```
     电脑               请求              服务器
    ┌───────┐ ─────────────────────────→ ┌───────┐
    │       │ ←───────────────────────── │ █████ │
    └───────┘           响应             │        │
      ━━╩━━                              └───────┘
```
- 请求报文
1. 请求报文行: 由请求方式, 请求url, 协议版本构成(默认协议http)
1.1 如果是get请求, 需要拼接参数
1.2 如果是post请求, 不需要拼接

2. 请求报文头: 
2.1 如果是get请求, 则可以全部使用默认设置(即不用设置)
2.2 如果是post请求, 则需要设置Content-Type: application/x-www-form-urlencoded, 如果没有传递参数, 这个设置没必要, 如果传递参数, 服务器不需要获取, 这个设置也没有必要

3. 请求报文体: (即传递给服务器的数据)
3.1 get的方式传null, 内容已经在报文行(url里)拼接好了
3.2 post的方式需要进行拼接

- 响应报文
1. 响应状态码:  服务器的状态码: 200表示成功 404未找到 500错误

2. 响应头: Content-Type: 服务器返回的数据的类型,客户端要根据这个类型进行解析

3. 响应体: 响应的主体- 就是服务器返回到客户的内容 - 文本字符串.
响应报文中的Content-length值就是响应内容的长度,
这个长度以字节为单位, 如果编码是utf-8/utf-16, 中文占3个字节, 英文1个字节, 如果是GBK, 都是2个字节


## Ajax编程
Asynchronous Javascript And XML，AJAX 不是一门的新的语言，而是对现有持术的综合利用。本质是在HTTP协议的基础上以异步的方式与服务器进行通信

1. 什么是异步: 指某段程序执行时不会阻塞其它程序执行，其表现形式为程序的执行顺序不依赖程序本身的书写顺序，相反则为同步。其优势在于不阻塞程序的执行，从而提升整体执行效率。XMLHttpRequest可以以异步方式的处理程序

2. 异步对象: XMLHttpRequest
浏览器内建对象, 用于在后台与服务器通信(交换数据) ，由此我们便可实现对网页的部分更新，而不是刷新整个页面

3. 请求过程:
以post为例, 先创建对象`var xhr = new XMLHttpRequest();`
```
// 1. 请求行
xhr.open('post', 'data.php');
// 2. 请求头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 3. 请求体
xhr.send('name=ken&age=18');

// get和post请求的区别:
// get不需要设置请求头
// get数据通过url传递, post在send方法中传递
```
4.响应
HTTP响应是由服务端发出的，作为客户端更应关心的是响应的结果。由于服务器做出响应需要时间（比如网速慢等原因），所以我们需要监听服务器响应的状态，然后才能进行处理
1. `onreadystatechange`是Javascript的事件的一种，其意义在于监听XMLHttpRequest的状态
2. `readyState`：响应状态，返回XMLHTTP请求的当前状态(0~4)
```
0 初始化 open()的初始化
1 载入 调用open()方法
2 载入完成 服务器接收到数据
3 交互 正在解析数据
4 完成 解析完毕
```
3. `status`: 响应码-服务器常用响应码:200 404不存在 503服务不可用

```
//调用onreadystatechange方法
xhr.onreadystatechange = function() {
    //2个都准备就绪
	if(xhr.status==200&&xhr.readyState==4) {
	//获得解析类型
	var type = xhr.getAllResponseHeaders('Content-Type');
	var result = null;
	//检查是不是xml类型
	if(type.indexOf('xml')!=-1) {
	    //解析xml中的内容, 拼接成字符串
		var temps = xhr.responseXML.querySelectorAll('items');
		var html ='';
		for (var i = 0; i < temps.length; i++) {
		    var num = temps[i].querySelector('number').innerHTML;
		    var src = temps[i].querySelector('source').innerHTML;
		    html+='<li>';
		    html+='<p>'+num+'</p>';
		    html+='<img src='+src+'>';
		    html+='</li>';
		}
		//显示内容
		document.querySelector('ul').innerHTML = html;
    	}
	}
}

```


---

Tags： black_horse





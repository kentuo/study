# 第27天 Ajax 第3天

XML和JSON 封装Ajax jQuery的Ajax

---


## XML 和 JSON
### XML
```
<?xml version="1.0" encoding="UTF-8"?>
<!-- 第一行必须是上面的文档描述 -->
<!-- 必须有root标签 -->
<root>
	<!-- 内容都描述在root标签里 -->
	<!-- 标签不能以数字开头, 不包含特殊符号, 不包含空格 -->
	<array>
		<item>
			<name>商品1</name>
			<source>../images/1.jpg</source>
		</item>
		<item>
			<name>商品2</name>
			<source>../images/2.jpg</source>
		</item>
		<item>
			<name>商品3</name>
			<source>../images/3.jpg</source>
		</item>
	</array>
</root>
```
php文件中获取XML文件
```
<?php 
    //一定要设定Content-Type为XML来读取XML文件
	header('Content-Type:application/xml;charset:utf-8');
    //使用file_get_contents方法获取
	$data = file_get_contents('goods.xml');
	echo $data;
 ?>
```
html文件中, 通过返回的Content-Type来确定是否是XML文件,并解析
```
xhr.onreadystatechange = function() {
	if(xhr.status==200&&xhr.readyState==4){
	//获得Content-Type
	var return_type = xhr.getResponseHeader('Content-Type');
	var result = null;
	//判断是否XML
	if(return_type.indexOf('xml')!=-1){
		result = xhr.responseXML;
		var items = result.querySelectorAll('items');
		var html = '';
		//拼接XML数据
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var name = item.querySelector('name').innerHTML;
			var src = item.querySelector('source').innerHTML;
			html+='<li>';
			html+='<img src='+src+'>';
			html+='<p>'+name+'</p>';
			html+='</li>';
			}
			document.querySelector('ul').innerHTML=html;
		}else {
			result = xhr.responseText;
		}
	}
}
```

### JSON
`JavaScript Object Notation`
另一种轻量级的文本数据交换格式，独立于语言

1. 语法
- 数据在键值对中
- 数据间逗号隔开,最后一个不用
- 大括号保存对象, 方括号保存数组
- 键值对里键和值都要用双引号

2. JSON解析
在不同语言中传输, 类型是字符串, 各语言有各自的解析方法

- JavaScript解析方法
```
JSON.parse() //从字符串解析出json对象
JSON.stringify() //从json对象解析出字符串
JSON兼容处理json2.js
```

- PHP解析
```
json_encode() //对变量进行JSON编码, 返回value值的JSON形式
json_decode() //对json格式的字符串进行编码,转换为php变量
```

JSON体积小, 解析方便且高效, 现在的实际开发是首选

json文件
```
[
  {
    "name":"商品分类1",
    "src":"../images/1.png"
  },
  {
    "name":"商品分类2",
    "src":"../images/2.png"
  },
  {
    "name":"商品分类3",
    "src":"../images/3.png"
  }
]
```
php文件
```
<?php 
	header('Content-Type:application/json;charset=utf-8');
	$json = file_get_contents('goods.json');
	echo $json;
 ?>
```
html文件
```
<div class="container">
    <ul id="nav">
    </ul>
</div>
<script>
window.onload=function(){
    var xhr=new XMLHttpRequest();
    xhr.open('post','check.php');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if(xhr.status==200 && xhr.readyState==4){
            /*xhr.responseText是string字符串，所以需要将其转换为json对象*/
            var jsonObj=JSON.parse(xhr.responseText);
            /*当前获取到的json对象是一个数组*/
            var resultHTML='';
            for(var i=0;i<jsonObj.length;i++){
                var obj=jsonObj[i];
                resultHTML+='<li>';
                resultHTML+='<img src="'+obj.src+'"/>';
                resultHTML+='<p>'+obj.name+'</p>';
                resultHTML+='</li>';
            }
        document.getElementById("nav").innerHTML=resultHTML;
        }
    }
}
</script>
```


## 封装Ajax
XMLHttpRequest在ie5,6中的兼容
```
var request;
if(XMLHttpRequest){
    request=new XMLHttpRequest();
}
else{ // 使用ActiveXObject("Microsoft.XMLHTTP")
    request=new ActiveXObject("Microsoft.XMLHTTP");
}
```

### 封装Ajax
封装ajax.js
```
var $={
	//拼接get的参数
	getData:function(data){
		var result = '';
		for(var key in data){
			result=result+key+'='+data[key]+'&';
		}
		return result.slice(0,-1);
	},
	ajax:function(obj){
		//1.判断有木有传递参数,或者是否是个对象
		if (obj==null||typeof obj !='object') {
			return;
		}
		//2.接收参数
		var type=obj.type || 'get';
		//url, location.pathname:当前的请求发起页面
		var url =obj.url||location.pathname;
		//参数
		var data = obj.data||{};
		//get需要拼接参数
		var finalData = this.getData(data);
		//回调函数
		var success = obj.success || function(){};

		//3.创建异步对象
		var xhr = new XMLHttpRequest();
		//4.设置请求行
		if (type=='get') {
			url=url+'?'+finalData;
			finalData=null;
		}
		xhr.open(type,url);
		//5.设置请求头
		if (type=='post') {
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		}
		//6.设置请求体
		xhr.send(finalData);

		//监听
		xhr.onreadystatechange = function(){
			if (xhr.status==200&&xhr.readyState==4) {
				var result = null;
				var xhrType = xhr.getResponseHeader('Content-Type');
				//根据Content-Type获取数据
				if (xhrType.indexOf('xml')!=-1) {
					result=xhr.responseXML;
				}
				else if (xhrType.indexOf('json')!=-1) {
					result=JSON.parse(xhr.responseText);
				}
				else {
					result=xhr.responseText;
				}
				//调用回调, 进行渲染
				success(result);
			}
		}
	}
};
```
html中引用和调用
```
<script type="text/javascript" src="ajax-packet.js"></script>
<script type="text/javascript">
document.querySelector('button').onclick = function(){
	$.ajax({
		type:'get',
		url:'check.php',
		data:{},
		success:function(result){
			var html='';
			for (var i = 0; i < result.length; i++) {
				html+='<li>';
				html+='<img src="'+result[i].src+'">';
				html+='<p>'+result[i].name+'</p>';
				html+='</li>';
			}
			document.querySelector('ul').innerHTML=html;
		}
	})
}
</script>
```


## jQuery中的ajax
jQuery为我们提供了更强大的Ajax封装

- $.ajax({}) 配置参数来发起Ajax请求
- $.get() 以GET方式发起Ajax请求
- $.post() 以POST方式发起Ajax请求
- `$('form').serialize()` 序列化表单(即格式化key=val&key=val)
- 其他参数说明
1. url: 接口地址
2. type: 请求方式(get/post)
3. timeout: 设置超时时间(毫秒)
4. dataType: 服务器返回格式
5. data: 发送请求数据
6. beforeSend: Function类型参数, 发送请求前的修改
XMLHttpRequest对象的函数，例如添加自定义HTTP头。在beforeSend中如果返回false可以取消本次ajax请求
7. success: 成功响应后调用
8. error: 错误响应时调用
9. complete: 响应完成时调用(包括成功和失败)

案例, 用户注册界面
cks.php
```
<?php 
	header('Content-Type:text/html;charset:utf-8');
	//用flag控制将要返回哪一个
	if(array_key_exists('flag', $_GET)){
		$flag=$_GET['flag'];
		if($flag==1){
			$arr=array('ken','june','jack','aaa','bbb','ccc');
			$name=$_GET['name'];
			if(in_array($name,$arr)){
				echo '用户名已经注册';
			}
		}
		else if ($flag==2) {
			$arr=array('123','456','789','222','333');
			//随机生成索引
			$index=array_rand($arr);
			echo $arr[$index];
			// sleep(2);
		}
	}
	else {
		echo '注册提交';
	}
 ?>
```
html
```
<script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
<script type="text/javascript">
$(function(){
	$(".name").on('blur',function(){
	var name = $(this).val();
	if ($(".tips>p").hasClass('loading')) {
	//此处插入节流阀, 防止一直弹出提示
	return false;
	}
	$.ajax({
	url: 'cks.php',
	type: 'get',
	data: {'name': name,'flag':1},
	//在发送请求之前, 本地验证用户名输入是否合法
	beforeSend:function(){
	var reg = /\W/
	if (name=='' || reg.test(name)) {
	//返回false就不会发送了
	$(".tips>p").text('请输入正确的用户名')
	.stop().fadeIn(1000).delay(2000).fadeOut(1000);
	return false;
	}
	//如果合法, 也要阻止多余的请求, 用class的方法加标记,配合节流阀
	$(".tips>p").addClass('loading');
	},
	success: function(result){
		$(".tips>p").text(result).fadeIn(1000)
		.delay(1000).fadeOut(1000);
		$(".tips>p").removeClass('loading');
	}
});
});
    //获取验证码
	$('.verify').on('click',function(){
	var phone = $(".mobile").val();
	if ($(".tips>p").hasClass('loading')) {
		return;
	}
	$.ajax({
		url: 'cks.php',
		type: 'get',
		data: {'phone':phone,'flag':2},
		beforeSend:function(){
		var reg=/^1(3|4|5|7|8)\d{9}$/;
		if (phone==''|| !reg.test(phone)) {
		$('.tips>p').text('请输入正确的手机号')
		.stop().fadeIn(1000).delay(1000).fadeOut(1000);
		return false;
		}
		$('.tip>p').addClass('loading');
	},
	success:function(result){
	$('.tips>p').removeClass('loading');
		console.log(result);
	}
})
})
})
</script>
```


---

Tags： black_horse



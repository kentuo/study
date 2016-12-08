# 第25天 Ajax 第1天

概念 搭建服务器 php基础

---


### 请求处理响应流程简单介绍
1. 本地电脑浏览器输入地址
2. 浏览器发送请求: 告诉服务器你想请求什么样的资源 -- >【请求报文头header】
3. -->【服务器】(服务器封装)
4. --> 服务器响应: 返回给客户端
5. 服务器返回到客户端, 返回的都是些字符串, 有个属性Content-Type, 告诉客户端如何进行解析
6. 客户端处理时只看2个问题: 有没有给我返回值? 我如何解析这些值?

客户端做的事情: 
1. 收集用户数据, 生成请求发送给服务器
2. 响应: 接收服务器返回的字符串, 根据Content-Type进行解析, 生成图形化界面

服务器做的事情:
1. 请求: 调用对象方法(传入必需的参数)
2. 处理: 封装
3. 响应: 返回值  模板引擎的渲染

---
## 名词解释
### 服务器
通俗的讲，能够提供某种服务的机器（计算机）称为服务器
#### 1. 服务器类型: 

- 按服务类型可分为：文件服务器、数据库服务器、邮件服务器、Web服务器等
- 按操作系统可分为：Linux服务器、Windows服务器等
- 按应用软件可分为 Apache服务器、Nginx 服务器、IIS服务器、Tomcat服务器、weblogic服务器、WebSphere服务器、boss服务器、 Node服务器等

#### 2. 服务器软件:
使计算机具备提供某种服务能力的应用软件，称为服务器软件，通过安装相应的服务软件，然后进行配置后就可以使计算具备了提供某种服务的能力
- 文件服务器：Server-U、FileZilla、VsFTP等
- 数据库服务器：oracle、mysql、SQL server、DB2、ACCESS等
- 邮件服务器：Postfix、Sendmail等
- HTTP 服务器：Apache、Nginx、IIS、Tomcat、NodeJS等

#### 3. HTTP服务器: 
- 概念：即网站服务器，主要提供文档(文本、图片、视频、音频)浏览服务，一般安装Apache、Nginx服务器软件
- HTTP服务器可以结合某一编程语言处理业务逻辑，由此进行的开发，通常称之为服务端开发
- 常见的运行在服务端的编程语言包括 PHP、Jsp、Asp、Python、Ruby、Perl等

### 客户端
客户端（Client）或称为用户端，是指与服务器相对应，为客户提供本地服务的程序. 除了个别本地运行的程序外, 现在基本上软件都是需要联网的, 联网就会涉及到服务器, 这样客户端和服务器就需要建立特定的通信连接, 来保证应用程序的正常运行

### 网络基础
1. IP地址: 
- 所谓IP地址就是给每个连接在互联网上的主机分配的一个32位地址, IP地址的数字范围是0~255之间(0和255被占用啦~)
- 查看本机IP: 运行cmd, `ping/ipconfig/ifconfig`
2. 域名: 
- 由于IP地址基于数字，不方便记忆，于是便用域名来代替IP地址，域名是一个IP地址的“面具”
- 查看域名对应的IP地址 ping
3. NDS服务
- DNS（Domain Name System）因特网上作为域名和IP地址相互映射的一个分布式数据库，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。简单的说就是记录IP地址和域名之间对应关系的服务
- 查看命令：ipconfig /flushdns
4. 端口
- 端口号是计算机与外界通讯交流的出口，每个端口对应不同的服务。例如：现实生活中，银行不同的窗口办理不同的业务
- 查看端口占用情况 netstat –an

### C/S 和 B/S 架构
1. C/S构架
- Client/Server 客户端 服务器
- C/S构架的不足: 在C/S结构的情况下，不同的服务需要安装不同的客户端软件，比如QQ、迅雷、Foxmail这种情况下安装的软件会越来越多，同时也有许多弊端，比如A出差，需要在B电脑上查收邮件，但是B电脑并未安装Foxmail等类似的客户端软件，这样不得不先去下载Foxmail，非常不方便
2. B/S构架
- B/S（即Broswer、Server）解决了C/S所带来的不便，将所有的服务都可以通过浏览器来完成（因为基本所有电脑都安装了浏览器）
- 弱点: 比如操作稳定性、流畅度等方面相对较弱

### 搭建HTTP服务
1. wamp: Windows + Apache + Mysql + PHP，首字母组合
2. 安装WampServer
3. 管理HTTP服务
- 任务图标绿色为正常启动的状态, 其他的没起成功
- 可以在控制台启动/重启/停止服务
- 某些问题可能导致服务启动异常
```
1. 防火墙要关闭
2. 默认端口是80, 看看有没有被别的程序占用(一般是iis,关闭其端口)
3. 访问权限httpd.conf里, Deny from all 改为Allow from all
4. 配置文件里, "#" 表示注释
5. 小心修改配置文件, 不需要修改的地方不要操作
```

#### 修改根目录
- 控制台中找到Apache里的httpd.conf
- 查找`DocumentRoot`, 修改默认路径内容`c:/wamp/www`, 可以修改为我们自己在其他地方创建的文件夹
- 修改完保存后, 需要重启服务才可以生效

#### 网站部署
修改本地hosts文件, `C:\Windows\System32\drivers\etc\hosts` , 在里面添加 127.0.0.1  localhost

把制作好的网页放到根目录下, 打开浏览器, 输入localhost即可

#### 配置虚拟主机
在一台Web服务器上，我们可以通过配置虚拟主机，然后分别设定根目录，实现对多个网站的管理

1. 开启虚拟主机辅助配置: 修改httpd.conf, 找到Virtual hosts, 去掉Include conf/extra/httpd-vhosts.conf前面的"#"
2. 配置虚拟主机, 安装目录里conf/extra/httpd-vhosts.conf, 打开后, 把<VirtualHost>标签里的内容复制一份
3. 复制后修改3个地方, ①DocumentRoot根目录路径, ②ServerName网址, ③ServerAlias带www的网址, 如www.myproject.com
4. 保存后, 修改本地hosts文件, 添加127.0.0.1 和刚刚2个网址
5. 保存后, 重启Apache
6. 打开浏览器, 输入刚刚的网址www.----.com


## PHP基础
1. 新建文件 *.php
```
<?php
    //设置服务器返回值解析方式及编码
    header("Content-Type:text/html;charset=utf-8");
    //输出
    echo '我是一串文字';
?>
```
2. 注意事项
- 文件名不能使用中文，否则在浏览器中查看的时候会有编译错误
- 单引号和双引号都能描述字符串
- 一条语句后必须添加分号，否则编译错误
3. 变量
- 变量以$开头 字母/数字/下划线 不能以数字开头
- 变量区分大小写
```
//定义变量, 前面必须加$
$name = "张三";
$age = 20;
//输出
echo $name;
echo'<br>';
echo $age;
```
4. 数据类型
- 字符型/整型/浮点型/布尔型/数组/对象/null
```
//字符串 整型 浮点型 输出一样

//定义布尔类型, false, 输出不会打印, true, 结果是1
$sex = true;
echo $sex;

//定义对象  定义类 要用public
class Person{
    public $name = "June";
    public $age = 18;
};
//创建对象
$per = new Person;
//输出对象某个属性, **echo只能输出字符串
echo $per->name;
//输出整个对象的复杂属性值, **var_dump输出复杂类型
var_dump($per);
//给对象赋值, 此处属性前面不能加$, 否则是加新属性
$per->name='ken';
//输出文字和变量, 用 . 连接
echo '我的名字是'.$per->name;
```

三种数组 - 索引数组 / 关联数组 / 深度数组 
- 索引数组
```
$arr1 = array('jack','rose','kkkk');
//用echo输出的是Array(类型), 用var_dump输出
var_dump($arr1);
//输出某个值
echo $arr1[1];
```
- 关联数组
```
// 偏向对象的方式定义, 可以通过[键]获取 值
$arr2 = array(
    'name'=>'jack',
    'age'=>20
);
var_dump($arr2);
echo $arr2['age'];
```
- 深度数组
```
//数组中的每一个成员又同时是一个关联数组, 外索引 内键值
$arr3 = array( //索引数组
    array( //关联数组
    'name'=>'jack',
    'age'=>20
    ),
    array(
    'name'=>'rose',
    'age'=>18
    )
);
//输出
var_dump(arr3);
echo $arr3[1][name];
```
- null
表示一种特殊的数据类型, 表示空值, 表示未赋值, null和NULL一样

- 单引号 双引号
单引号里如果包含变量名, 会转换成字符串处理, 而双印号中包含变量名会进行解析.

通常能用单引号就不用双引号, 字符串拼接用" . "连接

- php的函数
```
//1. 普通函数
function sayHello() {
    echo '向你致敬';
}
//调用
sayHello();
//2. 带参数的函数, 可以添加默认值
function sayHi($name='ken'){
    echo $name.'向你问好';
}
//调用
sayHi();
sayHi('june');
//注意, 此处如果带了参数但不添加默认值时, 调用的时候是一定要传入参数, 否则报错
```

- if/else for循环 foreach循环
```
//if else switch 和js里用法一样

$arry = array('aaa','bb','cccc');
//for循环  **count计算数组长度
$cnt = count($arry);
for($i=0;$i<$cnt;$i++){
    echo $arry[$i];
};
//foreach 本质是通过键值对的方式进行遍历(js的for in)
foreach($arry as $key=>$value){
    echo $key.'  '.value;
}

```

#### 表单处理
1. 表单name属性的是用来提供给服务端接收所传递数据而设置的，如果没有设置name属性则无法提交数据
2. 表单action属性设置数据接收的处理程序(即提交的目的地, 要把数据交给谁处理)
3. 表单method属性设置发送数据的方式
4. 如果上传文件, 需要设置enctype = "multipart/form-data", 并且只能用post的方式传递
5. $_GET 接收get的传值
6. $_POST 接收post的传值
7. $_FILES 接收文件上传

```
<div class="container">
<!-- action method enctype -->
    <form action="check.php" id="form" method="post" enctype="multipart/form-data">
<!-- 必须带name属性 -->    
        用户名: <input type="text" name="username" id="username"><br>
        密&nbsp;&nbsp; 码: <input type="password" id="password" name="password"><br>
        选择相片: <input type="file" name="photo">
        <input type="submit" id="btn" value="提交">
    </form>
</div>
```
```
<?php   //上传图片的处理过程

	//获取图片对象的某个属性
	var_dump($_FILES['photo']['name']);
	//将上传的图片移动到当前目录images里
	move_uploaded_file($_FILES['photo']['tmp_name'], '../images/self.jpg');
 ?>
```

- 常用的几个函数
1. in_array() : 是否在数组中
2. count() : 计算数组长度
3. array_key_exists() : 检测数组中是否存在key 

---

Tags： black_horse



# 24 html5 - 2

地理定位 Web存储 拖拽

---


## 地理定位

### 网络状态
- 事件绑定给window
- online是从无网到有网时被调用
- offline是从有网到网络断开时被调用
```
window.addEventListener('online',function(argument) {
    alert('有网了');
}
// 返回的是布尔值
// 并不是真正意义上的有网和无网, 监听的是网络连接状态, 比如连上无网的wifi也是
//  事件是无网到有网的时候触发的, 所以以上代码运行后不会执行alert, 只有连上网线后才触发
```

### 地理定位
在HTML规范中，增加了获取用户地理信息的API，这样使得我们可以基于用户位置开发互联网应用，即基于位置服务 LBS (Location Base Service)

#### 获取地理信息的方式
1. ip地址
2. 三位坐标: GPS WIFI 手机信号
3. 用户自定义数据

信息获取方式对比
1. ip地址: 任何地方可以用 但不精确(一般市级精确度)
2. GPS: 很精确 但定位时间长, 耗电大, 室内效果差
3. WIFI: 

#### 隐私
HTML5 Geolocation 规范提供了一套保护用户隐私的机制。必须先得到用户明确许可，才能获取用户的位置信息

#### API 详解
```
if(window.navigator.geolocation){
    window.navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    alert('经度: '+lat+'| 纬度: '+long);
    },function(error) {
        if(error.code == 1) {
            alert('没有权限');
        }else if (error.code == 2) {
            alert('内部错误');
        }else if (error.code == 3) {
            alert('超时');
        }
    },{})
    }else{
    alert('设备不支持获取地理位置');
}
```
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options) 获取当前地理信息

navigator.geolocation.watchPosition(successCallback, errorCallback, options) 持续获取当前地理信息

1. 当成功获取地理位置信息后, 会调用succssCallback，并返回一个包含位置信息的对象position。
- position.coords.latitude纬度
- position.coords.longitude经度
2. 当获取地理信息失败后，会调用errorCallback，并返回错误信息error
3. 可选参数 options 对象可以调整位置信息数据收集方式

#### 百度地图的用法
官网：http://lbsyun.baidu.com/

1. 进入官网 直接找到javascript API
2. 找到示例DEMO, 复制源代码
3. 获取ak秘钥(需要申请认证)
4. 创建应用(浏览器端)
5. 秘钥替换script标签里的"你的秘钥"


## Web 存储 *
本地存储大量的数据，传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，每一次发送请求都会携带上cookie，会造成带宽的浪费，给开发带来诸多不便，HTML5规范则提出解决方案

web存储的含义是将数据存储到用户的电脑上，这样可以缓解服务器的压力，并且提高体验

### 特性
1. 设置/读取方便
2. 容量较大, sessionStorage约5M, localStorage约20M
3. 只能存储字符串, 可以将对象JSON.stringify()编码后存储

### window.sessionStorage
1. 生命周期为关闭浏览器窗口(刷新不会销毁)
2. 不能多窗口数据共享, 通过跳转可以(如地址栏不变, 改锚点#, 比如a链接跳转)
3. 一些单页面的运用中, 可以进行页面传值

### window.localStorage
1. 永久生效, 除非手动删除(关闭浏览器, 断电都还在)
2. 可以**多窗口共享**
3. 一些不涉及到安全的数据都可以存储到本地(不要太大)

### 方法详解
- `setItem(key,value)` 设置存储内容
- `getItem(key)` 读取存储内容
- `removeItem(key)` 删除键值key的存储内容
- `clear()` 清空所有
- `key(n)` 以索引值获取存储内容
```
// 存数据
window.localStorage.setItem('aa','bbb');
window.sessionStorage.setItem('bb','ccc');
// 读取数据
alert(window.localStorage.getItem('aa'));
alert(window.sessionStorage.getItem('bb'));
// 删除某数据
window.localStorage.removeItem('aa');
// 读取长度
console.log(window.localStorage.length);
// 通过下标获得数据
console.log(window.localStorage.key(0));
// 清空全部
window.localStorage.clear();
```

### 区别
cookie数据始终在同源(同地址,端口)http请求中携带(即使不需要), 即cookie会在浏览器和服务器之间来回传递. 
cookie数据还有路径的概念, 限制它只属于某个路径下. 存储大小不能超过4k, 常见储存为会话标识.

sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存. 存储大小达到5M或更大.
两者的数据有效期不同, 一个是当前浏览器, 一个是永久保存.
两者的作用域不同, 前者在不同浏览器窗口里不共享, 后者在所有同源窗口里共享, cookie也在同源窗口里共享

相同点: 都是存储数据，存储在web端，并且都是同源

不同点: 
1. cookie 只有4K 小 并且每一次请求都会带上cookie 体验不好，浪费带宽
2. session和local直接存储在本地，请求不会携带，并且容量比cookie要大的多
3. session 是临时会话，当窗口被关闭的时候就清除掉 ，而 local永久存在，cookie有过期时间
4. cookie 和local都可以支持多窗口共享，而session不支持多窗口共享 但是都支持a链接跳转的新窗口

### 关于存储对象
```
var obj = {
    'username':'kentuo',
    'age':18,
}
//window.localStorage.setItem(ken,obj);
//window.localStorage.getItem(ken);

//对象是不能直接存入本地存储的, 需要将其转换
obj = JSON.stringify(obj);
//转换过后再存储
window.localStorage.setItem('ken',obj);
//获得的时候也是需要再转换回来
var data = JSON.parse(window.localStorage.getItem('ken'));
console.log(data);
```


## 全屏
HTML5规范允许用户自定义网页上任一元素全屏显示
- `requestFullScreen()` 开启全屏显示
- `cancelFullScreen()` 关闭全屏显示


## 文件读取
通过FileReader对象我们可以读取本地存储的文件，可以使用 File 对象来指定所要读取的文件或数据。其中File对象可以是来自用户在一个 `<input>` 元素上选择文件后返回的FileList 对象，也可以来自由拖放操作生成的  DataTransfer

### FileList对象
由于HTML5中我们可以通过为表单元素添加multiple属性，因此我们通过`<input>`上传文件后得到的是一个FileList对象（伪数组形式）

### FileReader对象
HTML5新增内建对象，可以读取本地文件内容

var reader = new FileReader; 可以实例化一个对象
```
//实例方法
readAsDataURL() 以DataURL形式读取文件
//事件监听
onload 当文读取完成时调用
//属性
result 文件读取结果
```
参考资料: 
https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc

```
<input type="file">
<button>点击预览</button>
<script>
var file = document.querySelector('input[type="file"]');
var btn = document.querySelector('button');
btn.addEventListener('click', function () {
      //var data = file.value;
      //↑这个读取出来是字符串, 是文件的路径和名称
      //现在html5里用以下这种方式获得文件
    var data = file.files[0];
      //创建读取文件对象
    var fr = new FileReader();
      //读取文件
    fr.readAsDataURL(data);
      //读取文件比较消耗时间, 所以读取文件是一个异步操作
      //当读取成功之后以事件的形式通知
    fr.addEventListener('load', function () {
          //文件读取成功之后, 结果存到fr对象的result属性里
        var myData = fr.result;
          //创建一个img标签, 把myData放到src里就可以了
        var img = document.createElement('img');
        img.src = myData;
        document.body.appendChild(img);
    })
})
</script>
```


## 拖拽
在HTML5的规范中，我们可以通过为元素增加`draggable="true"`来设置此元素是否可以进行拖拽操作，其中图片`<img>`、链接`<a>`默认是开启的

### 拖拽元素
页面中设置了draggable="true"属性的元素就可以被拖拽了,但是拖拽的是一个影子

### 目标元素
页面中任何一个元素都可以成为目标元素

### 事件监听
根据元素类型不同，需要设置不同的事件监听
1. 拖拽元素
- `ondrag` 整个拖拽过程都会调用 (mousemove)
- `ondragstart` 当拖拽开始时调用 (mousedown)
- `ondragleave` 当鼠标离开拖拽元素时调用 (mouseleave)
- `ondragend`	当拖拽结束时调用 (mouseup)
2. 目标元素
- `ondragenter`	当拖拽元素进入时调用 (mouseenter)
- `ondragover`	当停留在目标元素上时调用 (mouseover)
- `ondrop`		当在目标元素上松开鼠标时调用 (mouseup)
- `ondragleave`	当鼠标离开目标元素时调用 (mouseleave)

```
██  拖拽元素
 |        ┌───────────────────────────┐
 |        | target                    |
 |        |               dragover    |
 └────────*─────────*─────--------────*───────→   
      dragenter   drop             dragleave
          └───────────────────────────┘
```


## 多媒体
- 方法：`load()、play()、pause()`
- 属性：`currentSrc、currentTime、duration`
- 事件：
参考文档
http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp


## 应用
自定义视频播放器





Tags： black_horse





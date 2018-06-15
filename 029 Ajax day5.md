# 29 Ajax - 5

瀑布流(下) 同源和跨域

---


## 案例 瀑布流(下)

- 优化1 封装的js优化
```
<script>
//前面设置图片位置的for循环也用setTimeout包起来
//图片加载出来才有高度, 需要计算高度, 所以设定一个延迟
//设置 <p>点击加载更多</p> 的高度
    setTimeout(function () {
        var maxHeight = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if(maxHeight<arr[i]){
                maxHeight = arr[i];
            }
        }
        $(".tips").css("top",maxHeight+pad*2);
    },200);
</script>
```

- 优化2 php处理json的优化
```
<?php
    header("Content-Type:application/json;charset=utf-8");
    /*
     * 因为没有数据表, 所以不能用数据库语法处理(select*)
     * 在php中, 我们把数据先转换成数组, 再从数组截取指定长度的元素
     */ 

    //1. 读取文件, 获取json字符串
    $jsonStr=file_get_contents('all.json');
    //2. 将json转换成php对象 -- 数组
    $data = json_decode($jsonStr);
    //3. 接收页面传递参数 -- 页码
    $currentPage = $_GET["page"];
    //4. 计算起始位置
    $start = ($currentPage-1)*10;
    //5. 截取数组中从起始位置开始指定数量的数组元素 -- 数组
    $finalData = array_slice($data,$start,10);
    //6. 将数组转换为json字符串
    $finalJson = json_encode($finalData);
    //7. 返回值
    echo $finalJson;
?>
```
php需要页面传入页码(我们定为10张图为1页)

- html代码优化

```
//封装代码, 传入页码page参数
    //定义flag, 看数据是否全部传完
    $.ajax.flag = true;
    function getData (page){
    $.ajax({
    url:"getsome.php",
    type:"get",
    data:{page:page},
    beforeSend:function(){
    //设置节流阀, 防止过度请求
    $(".tips").addClass("loading");
    //如果数据传完了就不再请求了
    return($.ajax.flag);
    },
    success:function (result) {
    var finalHTML = template("addData",{"items":result});
        //获取的内容在后面添加
        $(".items").append(finalHTML);
        $(".items").waterFall();
        //加个标记, 记录当前页数
        $('.tips').attr('cpage',page);
        $(".tips").removeClass("loading");
        //数据传完了, 到达底部了
        if(result[0]==undefined){
        $(".tips").text("已经到达底部");
        $.ajax.flag=false;
        //获取当前页面滚去的高度, 用来做返回顶部功能
        $.ajax.bottomTop=$(window).scrollTop();
    }
}
})
}
    //执行一次, 获取第一页数据
    getData(1);
// 点击加载的功能
$('.tips').on('click',function () {
    //节流阀控制
    if($(".tips").hasClass("loading")){
        return;
    }
    //点击后页数增加, 并加载数据
    var page = $(this).attr('cpage');
    page++;
    getData(page);
})
// 浏览器缩放后重新布局
$(window).on("resize",function () {
 $(".items").waterFall();
})
// 滚动时加载数据
$(window).on('scroll',function () {
    //返回顶部功能的显示
    if($.ajax.bottomTop&&$(window).scrollTop()>$.ajax.bottomTop){
        $('.toTop').fadeIn();
    }
    //还是节流阀
    if($(".tips").hasClass("loading")){
        return;
    }
    //设定滚动到<p>加载更多</p>时, 加载新数据
    var cpos = $('.tips').offset().top;
    var winPos = $(window).height()+$(window).scrollTop();
    if((cpos-winPos)<0){
        var page = $('.tips').attr('cpage');
        page++;
        getData(page);
    }
})
// 返回顶部功能
$('.toTop').on('click',function () {
    $(window).scrollTop(0);
    $(this).fadeOut();
})
```


## 同源和跨域
### 同源
同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口 完全相同

### 跨域
不同源则跨域
```
例如http://www.example.com:80/
http://api.example.com/detail.html	不同源	域名不同
https://www.example.com/detail.html	不同源	协议不同
http://www.example.com:8080/detail.html	不同源	端口不同
http://api.example.com:8080/detail.html	不同源	域名、端口不同
https://api.example.com/detail.html	不同源	协议、域名不同
https://www.example.com:8080/detail.html	不同源	端口、协议不同
http://www.example.com/detail/index.html	同源	只是目录不同
```

### 天生跨域
src和href属性具有天生跨域的特性

比如图片标签里, 可以访问的其他网址的图片

### 跨域jsonp
原理: 利用了`<script src=""></script>`标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成, 只能以get方式请求

jQuery里`$.ajax()`集成了jsonp的实现, 设置属性`dataTyp='jsonp'`, 即可开启跨域访问

案例: 查询天气
- 参考: http://developer.baidu.com/map/carapi-7.htm
```
//伪代码
$.ajax({
    type:'get',
    url:'http://api.map.baidu.com/telematics/v3/weather',
    data:{ak:'DarF2LCCGzn6T16zgy8ZPkvYYE5CT6fu',location:'广州',output:'json'},
    dataType:'jsonp',
    success:function(data){
        var wd=data.results[0].weather_data;
        console.log(wd);
        var html=template("weather",{result:wd});
        $('table').html(html);
    },
    error:function(data){
            console.log(data);
         }
});
<!-- 模板代码 -->
<script type="text/template" id="weather">
  <%for(var i=0;i< result.length;i++){%>
  <tr>
    <td><%= result[i].date%></td>
    <td><img src="<%= result[i].dayPictureUrl%>" alt=""></td>
    <td><img src="<%= result[i].nightPictureUrl%>" alt=""></td>
    <td><%= result[i].temperature%></td>
    <td><%= result[i].weather%></td>
    <td><%= result[i].wind%></td>
  </tr>
  <%}%>
</script>
```


## 其他
timeout请求超时
```
var xhr=new XMLHttpRequest();
xhr.open('get','01-xhr-timeout.php');
xhr.timeout=4000;
xhr.send(null);

xhr.ontimeout=function(e){
    console.log('请求超时啊');
}
```

formData
```
var formData=new FormData(form);
var xhr=new XMLHttpRequest();
xhr.open('post','03-formData.php');
//给formData里插入额外的数据
formData.append('flag',1);
xhr.send(formData);
```

formData - file 把文件转成二进制进行传递
```
//伪代码
//获取文件
var file = document.querySelector('[type=file]');
var formData = new FormData();
//转换为二进制
formData.append('upload', file.files[0]);

//php处理接收
$file = $_FILES['upload']['tmp_name'];
    echo $file;
    move_uploaded_file($file, './demo.avi');
```

xhr.upload.onprogress 监听上传进度
```
var xhr = new XMLHttpRequest;
xhr.open('post', '05-file-upload.php');
// 监听上传进度
xhr.upload.onprogress = function (ev) {
    var percent = (ev.loaded / ev.total) * 100 + '%';
    progress.style.width = percent;
}
xhr.send(formData);
```

ie6的一个兼容问题: 同一个请求, 如果再次发送请求, 则强制返回第一次请求(即使第2次的请求是修改过), 此时我们在get的url里插入getDate(), 这样每次的请求地址都不一样, 就解决了这个问题



---

Tags： black_horse



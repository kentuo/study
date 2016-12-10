# 第28天 Ajax 第4天

模板引擎 瀑布流(上)
---


### 上一节补充

方法: form.serialize();

功能: fom数据自动拼接
```
var data = form.serialize();

//$.ajax中, data数据直接用
$.ajax({
    data:data,
    ……
})

```


## 模板引擎
**原理**: 利用正则表达式的exec()方法, 匹配并返回符合正则的内容, 再替换这些对应的标签里的内容
```
//test()方法: 只验证是否匹配, 返回布尔值
//exec()方法: 验证成功之后提取字符串, 返回对象
var email = 'abc@163.com';
//如果在符合正则表达式里提取内容, 需要对应的部分用()包起来
var reg = /(\w+)[@](\w+)[.](\w+)/;
var match = reg.exec(email);
console.log(match);
//输出["abc@163.com", "abc", "163", "com", index: 0, input: "abc@163.com"]
//match[1]为第一个括号里的匹配内容, 被提取出来了
```
根据上面的方法, 我们就可以获取到标签内容里需要替换的部分, 并利用replace()方法进行替换(while循环替换多个)
```
<script type=text/template id="nav">
    <ul>
        <li><img src="<%=src%>"></li>
        <p><%=aaa%></p>
    </ul>
</script>
<script>
    var obj = {"aaa":"bb","src":"1.jpg"};
    //获取标签所有内容
    var tempHTML = document.getElementById("nav").innerHTML;
    //正则表达式, 额外返回括号里匹配的值
    var reg = /<%=(\w+)%>/;
    var match = null;
    //循环, 一次替换一个, 直到返回null
    while(match=reg.exec(tempHTML)){
        //把<%=src%>整个替换成obj[src](即obj[match[1]])
        tempHTML=tempHTML.replace(match[0],obj[match[1]]);
    }
    //加入dom进行渲染
    doucment.querySelector('div').innerHTML=tempHTML;
</script>
```

- 常用模板引擎
1. BaiduTemplate：http://tangram.baidu.com/BaiduTemplate/
2. ArtTemplate：https://github.com/aui/artTemplate  - 主要介绍
3. velocity.js：https://github.com/shepherdwind/velocity.js/
4. Handlebars：http://handlebarsjs.com/

### ArtTemplate引擎
- 使用方法
1. 引入 template.js
2. <%与%>包裹起来的是模板的逻辑表达式
3. `<%=content%>`为需要替换的内容
4. 利用`template("id",{data})`方法来替换内容
```
<body>
<div>
</div>
//type要写成浏览器不认识的即可, 必须添加id(后面要获取)
<script type=text/template id="nav">
    <ul>
        //逻辑表达式用<% %>包起来, 每一行都要包
        <% for (var i = 0; i < items.length; i++) {%>
            <li>
                <img src="<%=items[i].src%>" alt="">
                <p><%=items[i].text%></p>
            </li>
        <%}%>
    </ul>
</script>
<!-- 引入js -->
<script src="js/jquery-1.12.4.min.js"></script>
<script src="js/template-native.js"></script>
<script>
    $(function () {
        $.ajax({
            //check.php里获取数据json, 返回result
            url:'check.php',
            type:'get',
            success:function (result) {
                //template方法, *注意*返回格式
                var finalHTML=template("nav",{items:result});
                $("div").html(finalHTML);
            }
        })
    })
</script>
</body>
```


## 案例 瀑布流(上)

我们先从服务器上获得数据, 解析数据后, 把数据对应的内容部分显示出来, 再调整每一张图片的位置, 行程瀑布流

用到的库:
1. jquery库
2. template库
3. 自己封装的jquery库

封装自己的jquery库时, 因为要属于jquery的方法, 而jquery所有的方法是在$.fn里, 所以封装jquery库这样命名: 
```
$.fn.waterFall = function(){};
```
html代码:
```
<!-- 结构代码 -->
<div class="box">
    <div class="items">
    </div>
    <p class="tips">点击加载更多数据</p>
</div>

<!-- 模板代码 -->
<script type=text/template id="addData">
<% for (var i = 0; i < items.length; i++) {%>
        <div class="item">
            <img src="<%=items[i].icon%>" alt="">
            <p><%=items[i].price%></p>
        </div>
    <%}%>
</script>
<!-- 引入代码 -->
<script src="js/jquery-1.12.4.min.js"></script>
<script src="js/template-native.js"></script>
<script src="waterfall.js"></script>
<!-- Ajax代码, 获取数据并利用模板进行渲染 -->
<script>
$(function () {
    $.ajax({
        url:"getall.php",
        type:"get",
        data:{},
        success:function (result) {
            var finalHTML = template("addData",{"items":result});
            $(".items").html(finalHTML);
            //调用自己封装的jquery函数
            $(".items").waterFall();
            //改变浏览器宽度时重新设置
            $(window).on("resize",function () {
                $(".items").waterFall();
            })
        }
    })
})
</script>
```
js代码
```
$.fn.waterFall = function (option) {
    //设置默认参数
    var defaultVal = {
        col: 5,
        padding: 20
    }
    /*extend方法: 覆盖用户参数 a.如果没有传递参数, 则使用默认值
    b.如果传递的对应名称的参数, 那么就覆盖默认值 
    c.如果参数名称不对应, 则添加新的参数*/
    defaultVal = $.extend(defaultVal, option);
    var col = defaultVal.col;
    var pad = defaultVal.padding;
    var that = $(this);
    //获取浏览器显示宽度
    var totalWidth = this.width();
    //计算单张图片宽度
    var width = (totalWidth - (col + 1) * pad) / col;
    var allItems = that.children();
    //设置所有图片的宽度
    allItems.width(width);
    
    //建个空数组, 用于存放当前列的图片高度
    var arr = [];
    //设置第一行图片
    for (var i = 0; i < col; i++) {
        $(allItems[i]).css({"top": 0, "left": pad + (width + pad) * i});
        var h = $(allItems[i]).height();
        arr.push(h);
    }
    //设置剩余图片位置
    for (var j = col; j < allItems.length; j++) {
        var minHeight = arr[0];
        var minIndex = 0;
        //获取当前最小高度和序号
        for (var i = 0; i < arr.length; i++) {
            if (minHeight > arr[i]) {
                minHeight = arr[i];
                minIndex = i;
            }
        }
        //图片放在最小高度的下面
        $(allItems[j]).css({"top": minHeight, "left": pad + (width + pad) * minIndex});
        //放置后最小高度增加当前图片高度
        arr[minIndex]+=$(allItems[j]).height();
    }
}
```
以上部分, 获取数据并完成瀑布流显示完成

优化: 每次加载10张图片, 当滑动到底部, 或者点击加载更多的时候, 再次加载10张图片, 一直到数据完全获取

优化部分请看下一节


---

Tags： black_horse


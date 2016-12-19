# 第34天 移动web 第5天

案例 微金所

---

## 案例 微金所
响应式的网页一般结构比较简单, 整体规划非常方便

- 准备:
1. 引入bootstrap的css和js文件, 引入公共css样式
2. 使用到了ajax异步, 引入jquery, 同时引入template模板
3. 另外, 开发环境可以引入less, 注意引入的顺序: 先引入less文件, 再引入js文件


- 整体结构: 
```
<!--顶部通栏-->
<header class="wjs_header"></header>
<!--导航-->
<nav class="wjs_nav"></nav>
<!--banner轮播图-->
<div class="wjs_banner"></div>
<!--信息-->
<div class="wjs_info"></div>
<!--预约-->
<div class="wjs_reserve"></div>
<!--产品-->
<div class="wjs_product"></div>
<!--新闻-->
<div class="wjs_news"></div>
<!—合作伙伴-->
<footer class="wjs_partner"></footer>
```

备注: 微金所的网站已经改版, 现在已经不是响应式了. 此笔记仅对各响应式模块做个说明


### 顶部栏
header里嵌套个类为container, container自带的两侧会有padding, 如果需要通栏效果, 使用的是`container-fluid`.

顶部有手机连接及登录功能, 占据一整行, 所以此时在container里, 我们加入一行div.row, row里根据比例, 加入col-sm-n的类, 分别占据对应比例的空间, 再填充内容基本就已经完成

我们针对xs分辨率(小于768px屏幕宽度), 需要把顶部栏给隐藏, 所以给header类后面添加 hidden-xs, 在小屏幕的时候隐藏

登录按钮可以引入bootstrap里的预定义按钮样式

### 导航栏

导航栏里, 先直接引入bootstrap里的组件的导航条, 引入之后, 根据实际需要, 将dropdown和searchbar给删除掉

再将对应的内容填充之后, 下面修改样式

**重点**: 我们可以在bootstrap.css的样式里找到对应的模块里的样式, 此时的做法不是修改bootstrap.css里的对应的样式, 而是先将对应的样式部分复制一份出来到另外的一个css样式中, 引入这个新的css样式, 先在复制出来的这个css中修改,**复制出来是为了避免把固定的原始样式给修改掉, 影响到其他布局**

另外, 由于复制出来的内容较多, 需要通过运行页面时审查元素来查看对应的结构, 通过这个结构来修改样式, 如果一一去尝试, 非常浪费时间

当熟悉大致的结构之后, 我们可以不用复制出来, 而是直接在引入的less文件中进行操作, 修改对应需要调整的样式

**注意**: 响应式需要我们去在运行的时候改变浏览器的宽度来查看响应式的效果, 不能单单当前页面布局OK就行, 比如移动端(小屏)时, 调整一些UI到正确的位置

### banner轮播图

轮播图banner处引入的是bootstrap的js插件Carousel, 引入相关内容后, 修改图片的路径, 基本效果就可以完成

1. 图片有2套, 一套对应的是pc端, 一套是移动端
2. PC端的是宽屏大图(2000px的宽图), 此时需要特殊处理
3. 移动端的是小图(640px), 在小屏时需要两端铺满, 也需要特殊处理

---
大图的处理方式: 

固定高度为图片高度, 宽度为100%, 将图片作为a标签的背景引入, 背景定位为center, `background-size: cover;`背景覆盖

---
小图的处理方式

用a标签包裹img标签, 让a标签的宽度为屏幕宽度,即100%, 让img的宽度也为100%, 高度为auto即可

---
显示

设定大图a标签为hidden-xs, 设定小图a标签为`hidden-sm hidden-md hidden-lg`, 这样不同分辨率有不同的显示了

#### 动态轮播图
刚刚设定大小图的方法为静态轮播图, 操作虽然简单, 但很明显, 当我们进入页面的时候, 不仅要加载小图, 还需要加载大图, 会造成多余的请求, 增加服务器压力

下面用ajax的方法获取数据来进行动态创建轮播图

1. 准备数据, 准备大图和小图的链接地址, 写入到同一个json文件中
2. 利用jquery的`$.ajax` 来获取json数据
3. 创建模板`<script type="text/template" id="---">---</script>`
4. 调用模板引擎进行渲染(根据屏幕宽度来进行渲染, 界限768px)


json数据: 
```
[
    {
        "mobile":"images/slide_01_640x340.jpg",
        "pc":"images/slide_01_2000x410.jpg"
    },
    {
        "mobile":"images/slide_02_640x340.jpg",
        "pc":"images/slide_02_2000x410.jpg"
    },
    {
        "mobile":"images/slide_03_640x340.jpg",
        "pc":"images/slide_03_2000x410.jpg"
    },
    {
        "mobile":"images/slide_04_640x340.jpg",
        "pc":"images/slide_04_2000x410.jpg"
    }
]
```

模板: **重点**: 加入了if判断和三元表达式
```
<script type="text/template" id="banner-dot">
    <%for (var i = 0; i < items.length; i++) {%>            
        <li data-target="#carousel-example-generic" data-slide-to="<%=i%>" class="<%=i==0?'active':''%>"></li>
    <%}%>
</script>

<script type="text/template" id="banner-img">
    <%for (var i = 0; i < items.length; i++) {%>            
        <div class="item <%=i==0?'active':''%>">
            <%if(isMobile){%>
                <a href="#" class="m-img hidden-sm hidden-md hidden-lg"><img src="<%=items[i].mobile%>" ></a>
            <%} else {%>
                <a href="#" class="pc-img hidden-xs" style="background-image: url('<%=items[i].pc%>')"></a>
            <%}%>
        </div>
    <%}%>
</script>
```



js文件: **重点**: 利用回调函数获取返回值
```
$(function(){
    var data = null;
    //因为外部不能直接获取内部通过ajax获得的result, 除非定义全局变量
    //全局变量不是最好的方法, 这里使用回调函数的方式进行传参 
    var getData = function(callback){
        $.ajax({
            url:'../wjs-img.json',
            type:'get',
            data:{},
            success:function(result){
                callback(result);
            }
        })
    }
    var isMobile = false;
    function render () {
        //根据当前屏幕宽度来确定是否是移动端
        var width = $(window).width();
        if(width>=768){
            isMobile = false;
        }else{
            isMobile = true;
        }
        //利用template模板, 回调函数传入result
        getData(function(result){
            var indicator = template("banner-dot",{"items":result});
            $(".carousel-indicators").html(indicator);
            //可以传入多个值, 此处传入isMobile来判断是否是移动端
            var img = template("banner-img",{"items":result,"isMobile":isMobile});
            $(".carousel-inner").html(img);
        })
    }
    //初始化
    render();
    
    $(window).on('resize',function(){
        var width = $(window).width();
        //onresize是个持续触发的, 设定判断来减少不必要的ajax请求
        if((isMobile==true&&width>=768) || (isMobile==false&&width<768)) {
            render();
        }
    });
});
```


---

Tags： black_horse


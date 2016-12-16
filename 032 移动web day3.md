# 第32天 移动web 第3天

Zepto.js tap事件

---

## Zepto.js
Zepto是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api。 如果你会用jquery，那么你也会用zepto

使用起来是和jquery一样, 但也有区别

1. 没有针对低端浏览器的兼容方法(主要针对移动端)
2. 封装为多个模块, 引入的zepto.min.js是基本库, 当需要使用对应的功能, 则需要引入额外的库, 比如需要使用复杂的选择器, 引入selector.js, 动画的是fx.js

| module	| default	| description |
| :------	| :-----	| :---------- |
|zepto|	✔|	核心模块；包含许多方法|
|event|	✔|	通过on()& off()处理事件|
|ajax|	✔|	XMLHttpRequest 和 JSONP 实用功能|
|form|	✔|	序列化 & 提交web表单|
|ie|	✔|	增加支持桌面的IE10+和Windows Phone8|
|detect|	|提供 `$.os`和 `$.browser`消息|
|fx|	|The animate()方法|
|fx_methods|	|以动画形式的 show, hide, toggle, 和fade*()方法| 
|assets|  |实验性支持从DOM中移除image元素后清理iOS的内存|
|data|	|一个全面的 data()方法, 能够在内存中存储任意对象|
|deferred|		|提供 `$.Deferredpromises API`.依赖`"callbacks"`模块. 当包含这个模块时候, `$.ajax()` 支持promise接口链式的回调|
|callbacks|	|为"deferred"模块提供 `$.Callbacks`|
|selector| |实验性的支持 jQuery CSS 表达式 实用功能，比如 `$('div:first')`和 `el.is(':visible')`|
|touch|	|在触摸设备上触发tap– 和 swipe– 相关事件。这适用于所有的`touch`(iOS, Android)和`pointer`事件(Windows Phone)|
|gesture| |	在触摸设备上触发 pinch 手势事件|
|stack| |提供 andSelf& end()链式调用方法|
|ios3| |String.prototype.trim 和 Array.prototype.reduce 方法 (如果他们不存在) ，以兼容 iOS 3.x.|


- 特别说明(animate库, 引入fx.js)
```
$(dom).animate({//css3动画样式列表},
    during, //执行时长
    ease, //曲线
    function(){ //对调函数 })
```

- 特别说明(touch库, 引入touch.js)
```
//注册左右滑动事件
$(dom).on('swipeLeft',function(){ });
$(dom).on('swipeRight',function(){ });
```


## m.jd 继续

分页: 商品列表栏
```
顶部栏由返回键, 搜索栏, 菜单栏构成
┌────────────────────────────┐
|[back][  search bar  ][menu]|
├───────┬────────────────────┤
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
└───────┴────────────────────┘
左侧是商品列表, 右侧是商品详情
```

- 布局
在手机端, 这样的布局需要设定大盒子宽高为100%, 内部的ul宽高可以大于100%, 这样的做法就是为了取消滚动条, 但内容可以通过滑动来查看
```
┌────────────────────────────┐
|[back][  search bar  ][menu]|
├───────┬────────────────────┤
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
├───────┤                    |
└───────┴────────────────────┘
//下方的高度设为100%, padding-top留出顶部栏的高度
.jd_content{
    width: 100%;
    height: 100%;
    padding-top: 50px;
}
//左侧浮动
.jd_left{
    width: 100px;
    height: 100%;
    float: left;
}
//右侧overflow: hidden;
.jd_right{
    height: 100%;
    overflow: hidden;
}
//此时, 不设置右侧的宽度, 利用overflow的特性自动挤出来位置
```
精灵图的特殊用法
```
/*当我们使用到精灵图的地方, 显示的区域如果大于我们要定位的某一个sprite, 而附近的sprite又离的很近, 直接使用会把其他附近的sprite也显示出来, 那么就需要进行处理了*/

/*例如顶部栏的【返回】键, 由于手机端操作一般需要把按钮的响应范围做大一些来提升按钮的响应, 这样的做法降低用户的操作难度, 提升了用户体验 */

/*So, 做法就是利用background-origin: content-box;来操作*/

.jd_back {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    background-image: url("../images/sprites.png");
    background-repeat: no-repeat;
    /*原始图片尺寸400*400 先缩小size */
    background-size: 200px 200px;
    
    /*添加padding样式*/
    padding:15px;
    /*设置背景填充的原点:从内容区域开始填充*/
    background-origin: content-box;
    /*裁切不需要展示的内容区域：设置的是裁切，控制的是显示*/
    background-clip: content-box;
    //精灵图里偏移的位置(注意:原始尺寸偏移44px的, 这里只偏移22)
    background-position: -22px 0px;
    left: 0;
}
```

- 左侧菜单栏的滑动
左侧菜单栏可以上下滑动, 当滑动到两头时, 我们允许用户继续滑动一小段距离, 当此时手指离开屏幕, 菜单栏会回弹到顶部或者底部.
```
function leftSwipe() {
    var left = document.querySelector('.jd_left');
    var ulBox = left.querySelector('ul');
    //获取容器高度和ul整个的高度
    var height = left.offsetHeight;
    var ulHeight = ulBox.offsetHeight;
    //获得ul两端的位置
    var maxPos = 0;
    var minPos = height - ulHeight;
    //设置允许的回弹距离(两端位置各外扩100)
    var maxTopPos = maxPos + 100;
    var minBottomPos = minPos - 100;
    //封装开启/关闭过渡, 封装平移函数
    var openTransition = function () {
        ulBox.style.transition = 'all .3s';
        ulBox.style.webkitTransition = 'all .3s';
    }
    var closeTransition = function () {
        ulBox.style.transition = 'none';
        ulBox.style.webkitTransition = 'none';
    }
    var setTransform = function (distance) {
        ulBox.style.transform = 'translateY(' + distance + 'px)';
        ulBox.style.webkitTransform = 'translateY(' + distance + 'px)';
    }
    //初始化数值(全局变量)
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currentY = 0;
    //记录点击时的位置
    ulBox.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    //获得移动的位置
    ulBox.addEventListener('touchmove', function (e) {
        moveY = e.touches[0].clientY;
        //差值为移动的距离
        distanceY = moveY - startY;
        //移动的距离超出范围则不能拖动
        if(distanceY+currentY > maxTopPos || distanceY+currentY < minBottomPos){
            return;
        }
        //拖动的时候关闭过渡
        closeTransition();
        //ul移动的距离为当前位置+滑动的距离
        setTransform(currentY+distanceY);
    });
    ulBox.addEventListener('touchend',function(e){
        //如果在回弹范围, 则开启过渡, 回弹到ul两端
        if(currentY+distanceY < minPos){
            currentY = minPos;
            openTransition();
            setTransform(minPos);
        }
        else if(currentY + distanceY > maxPos){
            currentY = maxPos;
            openTransition();
            setTransform(maxPos);
        }
        //没在两端则记录下当前位置
        else{
            currentY+=distanceY;
        }
    });
    
    var lis = ulBox.querySelectorAll('li');
    //获取菜单单个元素的高度
    var liHeight = lis[0].offsetHeight;
    //给li元素添加索引值
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
    }
    //点击事件, 调用封装的对象方法(详细看下一节)
    myjs.tap(ulBox,function(e){
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
        //e.target为当前点击的目标, 此处目标为a标签, 所以获得父级li, 利用排他方法来设置样式
        e.target.parentNode.classList.add('active');
        //获得当前li的索引值
        var id = e.target.parentNode.index;
        //此处做个优化, 点击到的目标, 会自动移到容器顶部, 需要判断底部距离是否还足够移动, 不够移动时则不移动
        if(-id*liHeight < minPos){
            currentY = minPos;
            openTransition();
            setTransform(minPos);
        }else {
            currentY = -id*liHeight;
            openTransition();
            setTransform(currentY);
        }
    });
}
```


## tap 事件

在移动端, 是没有点击事件的, 另外, click事件在移动端其实有大约400ms的延迟, 所以不能使用

移动端的事件只有touch, 所以tap事件其实是touch事件的组合

移动端touch事件的响应会优先于click事件, 所以反应很灵敏

我们一般定义touchstart到touchend之间的时间小于150ms, 并且没有发生过touchmove, 为一次tap点击事件

```
//封装到myjs里面
myjs.tap = function (dom,callback) {
    if(dom && typeof dom =='object') {
        //初始化
        var isMove = false;
        var st = 0;
        dom.addEventListener('touchstart',function(e){
            //获得点击时的时间
            st = Date.now();
        });
        dom.addEventListener('touchmove',function(e){
            //如果发生移动则变为true
            isMove = true;
        });
        dom.addEventListener('touchend',function(e){
            //如果没有移动并且两个时间差小于150ms
           if(isMove == false && Date.now()-st <150) {
                //执行回调
               callback && callback(e);
           } 
           //别忘了重置move状态
            isMove = false;
        });
    }
}
```

#### css3动画的响应
原理: 把设计好的动画, 添加到class类里, 这样只需要给需要响应的dom添加class即可实现动画的响应
```
/*动画*/
@keyframes bounceInDown {
    0%{
        opacity: 0;
        -webkit-transform: translateY(-3000px);
        transform: translateY(-3000px);
    }
    60%{
        opacity: 1;
        -webkit-transform: translateY(25px);
        transform: translateY(25px);
    }
    80%{
        opacity: 1;
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }
    100%{
        opacity: 1;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }
}
/*兼容*/
@-webkit-keyframes bounceInDown {
    0%{
        opacity: 0;
        -webkit-transform: translateY(-3000px);
        transform: translateY(-3000px);
    }
    60%{
        opacity: 1;
        -webkit-transform: translateY(25px);
        transform: translateY(25px);
    }
    80%{
        opacity: 1;
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }
    100%{
        opacity: 1;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }
}
/*绑定class类*/
.box.bounce{
    -webkit-animation: bounceInDown 1s;
    animation: bounceInDown 1s;
}
```
```
box.onclick = function(){
    box.classList.add("bounce");
}
```



---

Tags： black_horse


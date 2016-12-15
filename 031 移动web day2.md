# 第31天 移动web 第2天

移动端touch事件

---

## 接上节 banner轮播图
我们的轮播图需要左右都可以滑动, 那么做法就是在第一张前面加入最后一张, 最后一张的后面加入第一张, 两侧图片切换的时候, 就直接进行切换, 形成轮播效果
另外, 初始默认显示是第1张图, 每次移动的宽度为banner的宽度
```
/* css设置 (8张原始图片+2张复制) */
.jd_banner > ul:nth-of-type(1) {
    width: 1000%;
    /* 初始在第一张的位置 */
    transform: translateX(-10%);
    -webkit-transform: translateX(-10%);
}
.jd_banner > ul:nth-of-type(1) > li {
    float: left;
    width: 10%;
}
```

自动轮播
```
function bannerAnimation(speed){
    var banner = document.querySelector(".jd_banner");
    var bannerWidth = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-of-type");
    //初始在第一张
    var index = 1;
    //自动轮播
    setInterval(function () {
        index++;
        //添加过渡
        imgBox.style.transition = "all "+speed+"ms";
        imgBox.style.webkitTransition = "all "+speed+"ms";
        //设置偏移
        imgBox.style.transform = "translateX("+(-index*bannerWidth)+"px)";
        imgBox.style.webkitTransform = "translateX("+(-index*bannerWidth)+"px)";
        //判断是否最后一张
        //直接判断会导致最后一张图片的动画没播放完, 就开始过渡了
        setTimeout(function () {
            if(index == 9) {
                index = 1;
                imgBox.style.transition = "none";
                imgBox.style.webkitTransition = "none";

                imgBox.style.transform = "translateX("+(-index*bannerWidth)+"px)";
                imgBox.style.webkitTransform = "translateX("+(-index*bannerWidth)+"px)";
            }
        },speed);
    },1500)
}
```

## 移动端touch事件
类比click事件来理解, touch事件只有移动端能响应, pc端无法响应
- touchstart 手指触摸时触发
- touchmove 在屏幕上滑动时连续触发
- touchend 手指离开屏幕时触发
- touchcancel 触摸中断, 系统停止跟踪触摸时触发, 不常用

- 事件绑定方法
```
dom.addEventLitener('touchmove',function(e){});
```

- 事件的返回对象e包含信息
1. clientX,clientY : 视口中的X Y 坐标
2. pageX,pageY : 页面中的X Y 坐标
3. screenX,screenY : 屏幕中的X Y 坐标

- 拖动案例
```
<div width=100 height=100></div>
<script>
    //初始化
    var stX,stY = 0;
    var moveX,moveY = 0;
    var toX,toY = 0;
    var box = document.querySelector("div");
    box.addEventListener('touchstart',function(e){
        //起始位置
        stX = e.touches[0].clentX;
        stY = e.touches[0].clentY;
    });
    box.addEventListener('touchmove',function(e){
        //移动的位置
        moveX = e.touches[0].clentX;
        moveY = e.touches[0].clentY;
        //移动的距离
        toX = moveX - stX;
        toY = moveY - stY;
        //用translate来设置移动
        box.style.transform = "translate("+toX+"px,"+toY+"px)";
    })
    
</script>

```

- 过渡和动画结束事件
- `webkitTransitionEnd/transitionEnd`: 过渡结束后触发
- `webkitAnimationEnd/animationEnd`: 动画结束后触发


## banner轮播图继续 滑动

```
//只在x轴移动, 初始化几个参数
var startX = 0;
var moveX = 0;
var distanceX = 0;
//获得触摸时的X坐标, 清除自动播放的定时器
imgBox.addEventListener('touchstart', function (e) {
    clearInterval(timer);
    startX = e.touches[0].clientX;
    });
//触摸移动时, ul跟着手指移动的距离发生偏移
imgBox.addEventListener('touchmove', function (e) {
    moveX = e.touches[0].clientX;
    distanceX = moveX - startX;
    //先关闭过渡
    imgBox.style.transition = "none";
    imgBox.style.webkitTransition = "none";
    //再设置偏移
    imgBox.style.transform = "translateX(" + (-index * bannerWidth + distanceX) + "px)";
    imgBox.style.webkitTransform = "translateX(" + (-index * bannerWidth + distanceX) + "px)";
});

//此时, 由于关闭过渡/开启过渡/设置偏移使用次数较多, 所以封装起来
//开启过渡
var openTransition = function () {
    imgBox.style.transition = "all " + speed + "ms";
    imgBox.style.webkitTransition = "all " + speed + "ms";
}
//关闭过渡
var closeTransition = function () {
    imgBox.style.transition = "none";
    imgBox.style.webkitTransition = "none";
}
//设置偏移
var setTransform = function (distance) {
    imgBox.style.transform = "translateX(" + (distance) + "px)";
    imgBox.style.webkitTransform = "translateX(" + (distance) + "px)";
}
//定时器也有复用, 也封装一个
var timer = null;
var openInterval = function () {
    timer = setInterval(function () {
        index++;
        openTransition();
        setTransform(-index*bannerWidth);
        //防止后台运行的时候index一直自加, 程序报错
        if(index == 10){
            index = 2;
            closeTransition();
            setTransform(-index*bannerWidth);
        }
    }, 1500);
}

//手指离开时触发, 需要整张图片移动, 所以要特殊处理
imgBox.addEventListener('touchend', function () {
    //判断当前滑动的距离, 超过1/4的宽度就翻页
    if (Math.abs(distanceX) > bannerWidth / 4) {
        if (distanceX > 0) {
            index--;
        } else {
            index++;
        }
        openTransition();
        setTransform(-index*bannerWidth);
    } else if (Math.abs(distanceX) > 0) {
        openTransition();
        setTransform(-index*bannerWidth);
    }
    //离开后再次开启自动播放
    openInterval();
});

//封装底部小点li的显示, 使用时需要传入当前的index
var setIndicator = function(index) {
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("current");
    }
    indicators[index-1].classList.add("current");
}


//封装监听过渡结束(transitionEnd)使用到的函数
//两侧切换的特殊情况处理
var transEnd = function () {
    if (index == 9) {
        index = 1;
        closeTransition();
        setTransform(-index*bannerWidth);
    }
    else if (index == 0) {
        index = 8;
        closeTransition();
        setTransform(-index*bannerWidth);
    }
    //切换完再改变底部li的圆点
    setIndicator(index);
}
```
```
//此时, 我们想把transitionEnd也封装起来, 因为需要兼容, 所以会有2个函数封装在一起, 我们的做法是再新建一个common.js(公共的js文件), 把这两个封装起来
//创建一个对象, 这样可以调用方法更多更方便
var myjs = {};
myjs.addTransitionEnd = function (dom,callback) {
    //dom存在, 并且是个对象
    if( dom && typeof dom == 'object'){
        dom.addEventListener('transitionEnd', function () {
            //如果有回调函数就执行函数
            callback && callback();
        });
        dom.addEventListener('webkitTransitionEnd', function () {
            callback && callback();
        });
    }
}
```
```
//封装的transitionEnd调用
myjs.addTransitionEnd(imgBox,transEnd);
```
限时秒杀的时钟倒计时显示
```
function timeback() {
    var total = 3*60*60; //3个小时的倒计时
    var spans = document.querySelector('.jd_sk_time').querySelectorAll('span');
    var timer = setInterval(function () {
        total--;
        if(total ==0) {
            clearInterval(timer);
        }
        var hour = Math.floor(total/3600);
        var minute = Math.floor(total%3600/60);
        var second = total%60;
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = hour;
        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = minute%10;
        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = second%10;
    },1000);
}
```
bug说明
```
1. 快速滑动会出现空白
解决办法: touchmove时加入transEnd()的逻辑, 防止刷太快出问题
2. 浏览器本地测试时, 如果最小化, 此时定时器会一直加, 而transitionEnd监听器不会处理index, 也会出现空白, 此时做法是在定时器里对index进行限制
```

效果预览地址:
1251004462.cdn.myqcloud.com/1251004462/xgame/tw/test/web/

---

Tags： black_horse


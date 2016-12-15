# 第30天 移动web 第1天

移动端viewport布局 m.京东

---


## 移动端布局
问题: 同一个页面, 由于PC端和移动端显示的比例不一致, 所以pc端正常显示的内容可能在移动端会有异常

这时候引入了viewport的概念, 把移动端的内容先放入视口(viewport)里, 再显示在移动端浏览器里

```
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<title>Title</title>
</head>
```
1. 不要写到样式以下, 一般写到 <meta charset="UTF-8"> 下面
2. name="viewport" 说明它是一个移动端页面, 这个属性只有移动端页面才会有
3. `content` 设置移动端页面的属性, 
    `width=device-width` 在移动端, 浏览器的宽度就是当前设备屏幕的宽度, 
    `initial-scale=1` 初始的缩放比例, 
    `user-scalable=0` 1/0 yes/no 用户是否可以进行缩放, 
    `maximum-scale`: 最大放大比例, 
    `minimum-scale`: 最大缩小比例, 
    快捷操作 `meta:vp`+Tab键


## 案例 m.jd.com 京东商城

#### 1. 定义meta
```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
<!-- user-scalable 设置为no后 max和min scale就不设置了 -->
```
#### 2. 布局
```
//访问m.jd.com 可以看到由头部 广告轮播图 导航 和产品组成
<div class="jd_header">
//header由logo 搜索框 登录 组成
<div class="jd_banner">
//广告栏是由轮播图组成
<div class="jd_nav">
//导航由图标/分类 组成
<div class="jd_product">
//产品基本上由不同的块组合成, 可以复用
```

#### 3. 细节说明
```
1. header布局中, logo和登录的宽度保持不变, 当屏幕宽度发生变化时, 改变的只有中间搜索框的宽度

<form class="jd_search"><input type="search" placeholder="VR手机 限时免费包邮"></form>
//css设置, 通过先设置100%宽度, 再padding两侧logo和登录的位置
.jd_search {
    width: 100%;
    height: 100%;
    padding: 0 55px 0 75px;
}

2. 导航栏中, 确定字按钮的个数, 使用float: left来布局, 每个图标占的位置为100% / 总数 / 排数, 例如8个icon排2排, 每个占25%宽度
.jd_nav > ul {
    width: 100%;
}
.jd_nav > ul > li {
    width: 25%;
    float: left;
    text-align: center;
    margin-bottom: 10px;
}

3. 产品列表里, 第一个是[秒杀]列表, 其他是普通列表
做法是先统一处理普通列表, 因为秒杀里部分布局和普通布局一致, 所以做好的普通布局, 再复制一份给到秒杀

<div class="jd_pducBox jd_sk clearfix">
说明: 普通布局的类为jd_pducBox, 我们要在普通布局上特殊处理秒杀的布局, 那么我给他单独加一个jd_sk的类, 对于不一致的地方, 单独处理(这样的做法节省了全部都布局的时间)

4. 对于一些细节上的复用, 可以做成公共样式, 直接添加class, 非常方便
// fl=float:left
<div class="jd_pducBox">
    <div class="jd_pdTips"><h4>京东有点热</h4></div>
    <div class="jd_pdContent clearfix">
        <a href="javascript:;" class="a_50 fl">
            <img src="images/cp1.jpg">
        </a>
        <a href="javascript:;" class="a_50 fr b_l b_btm">
            <img src="images/cp2.jpg">
        </a>
        <a href="javascript:;" class="a_50 fr b_l">
            <img src="images/cp3.jpg">
        </a>
    </div>
</div>
// css样式 border-X 根据需要直接添加class来复用
.a_50 {
    width: 50%;
    display: block;
}
.a_50 img {
    width: 100%;
    display: block;
}
.b_l {
    border-left: 1px solid #ccc;
}
.b_r {
    border-right: 1px solid #ccc;
}
.b_btm {
    border-bottom: 1px solid #ccc;
}
```

#### 4. 点击高亮效果
在移动端浏览器会遇见点击出现高亮的效果，在某些项目是不需要这个默认的效果的。那么我们通常会把这个点击的颜色设置成透明
```
-webkit-tap-highlight-color:transparent;/*清除点击高亮效果*/
```

#### 5. 所有盒子以边框开始计算
在移动端通常使用的是百分比布局，那么这样的布局如果使用border或者padding或使容器的宽度超出屏幕的宽度产生滚动条。那么我们的解决方案是什么试用css3属性 box-sizing设置所有的盒子重边框开始计算宽度
```
-webkit-box-sizing: border-box;
box-sizing: border-box;
```


### 顶部栏header效果
顶部栏在滚动时, 底色发生渐进, 当滑过banner栏后, 变成不透明
```
//主页引入js
window.onload = function () {
    headerOpacity();
}
function headerOpacity() {
    var header = document.querySelector(".jd_header");
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var opacity = 0;
    window.onscroll = function () {
        var offsetHeight = document.body.scrollTop;
        if(offsetHeight<bannerHeight){
            //获得百分比值
            opacity = offsetHeight/bannerHeight;
        }else {
            opacity = 1;
        }
        header.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
    }
}

```

#### 未完, 下一节继续


---

Tags： black_horse


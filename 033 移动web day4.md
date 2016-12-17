# 第33天 移动web 第4天

响应式 bootstrap框架 less.js

---

## 响应式开发
可以响应不同的布局, 可以兼容多个终端的显示

### 媒体查询
1. 查询当前屏幕的宽度, 根据不同屏幕宽度来设置不同的样式来适应不同的屏幕. 当你重新设置浏览器大小的时候, 也会根据这个宽度来重新渲染.
2. 实现方式: 查询screen的宽度来设定布局

|屏幕|设备宽度|数值范围|
|:--|:--|:--|
|超小屏幕|(移动设备)| <768px |
|小屏设备|768px-992px|768 <= w <992 |
|中等屏幕|992px-1200px|992 =< w <1200|
|宽屏设备|1200px以上| \>=1200|


- 两种写法
```
// 必须写移动端视口
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
<style>
    body {
        background-color: yellowgreen;
    }
    /*如果是判断最小值, 那么从小到大写*/
    /*如果是判断最大值, 那么从大到小写*/
    
    /*如果是判断最小值, 向上兼容, 向下覆盖*/
    /*使用媒体查询, 就是判断当前设备的宽度, 根据设备的宽度来设置不同的样式*/
    /*使用媒体查询, 判断screen, 当它最小宽度是768px的时候(宽度>=768)的样式*/
        
    @media screen and (min-width: 768px) {
        body {
            background-color: skyblue;
        }
    }
    @media screen and (min-width: 992px) {
        body {
            background-color: aquamarine;
        }
    }
    @media screen and (min-width: 1200px) {
        body {
            background-color: deeppink;
        }
    }
</style>

/*第2种写法 , 区别是max-width*/
<style>
    body {
        background-color: skyblue;
    }
    @media screen and (max-width: 1200px) {
        body {
            background-color: greenyellow;
        }
    }
    @media screen and (max-width: 992px) {
        body {
            background-color: hotpink;
        }
    }
    @media screen and (max-width: 768px) {
        body {
            background-color: orangered;
        }
    }
</style>

```

- 媒体类型

|值|描述|
|:--|:--|
|all|用于所有设备|
|print|用于打印机和打印预览|
|screen|用于电脑屏幕，平板电脑，智能手机等。|
|speech|应用于屏幕阅读器等发声设备|


- 媒体功能 device:设备

|值|描述|
|:--|:--|
|device-height|	定义输出设备的屏幕可见高度。|
|device-width| 定义输出设备的屏幕可见宽度。|
|max-device-height|	定义输出设备的屏幕可见的最大高度。|
|max-device-width| 定义输出设备的屏幕最大可见宽度。|
|min-device-width| 定义输出设备的屏幕最小可见宽度。|
|min-device-height|	定义输出设备的屏幕的最小可见高度。|
|max-height|定义输出设备中的页面最大可见区域高度。|
|max-width| 定义输出设备中的页面最大可见区域宽度。|
|min-height| 定义输出设备中的页面最小可见区域高度。|
|min-width| 定义输出设备中的页面最小可见区域宽度。|


- 其他写法
```
/*768到992的范围里*/
@media screen and (min-width: 768px) and (max-width: 992px) {   body { background: #ccc;  }    }

/*768到992的范围里 以外 */
@media not screen and (min-width: 768px) and (max-width: 992px) {   body { background: #cffcff;  }    }
```

- link里的写法
```
<link rel="stylesheet" media="screen and (min-width:1200px)" href="abc.css">
```

- 案例: div宽度适应
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>aaa</title>
    <style>
        div {
            width: 100%;
            height: 100px;
            background-color: orangered;
            float: left;
            box-sizing: border-box;
            border: 1px solid green;
        }
        @media screen and (min-width: 768px){
            div {
                width: 50%;
                background-color: skyblue;
            }
        }
        @media screen and (min-width: 992px){
            div {
                width: 33.33%;
                background-color: greenyellow;
            }
        }
        @media screen and (min-width: 1200px){
            div {
                width: 20%;
                background-color: hotpink;
            }
        }
    </style>
</head>
<body>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</body>
</html>
```


## bootstrap

Bootstrap中文站: http://v3.bootcss.com/

### 使用模板

- 基础模板: 说明: 必须修改对应的css/js文件路径
```
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- ie8及以下支持html5标签的兼容处理 -->
    <!-- 不能用file路径去查看文件, 要用http的方式 -->
    <!--[if lt IE 9]>
    <script src="lib/html5shiv/html5shiv.min.js"></script>
    <script src="lib/respond.js/respond.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery-->
    <script src="lib/jquery/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
  </body>
</html>
```

- 组件: 在基础模板上, 插入需要使用的组件的代码

```
<!-- 在body里添加要使用的组件 -->
  <body>
  
    <!-- 例如加入一个导航栏的组件 -->
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
         <!-- 此处省略大部分内容 -->
        </div>
    </nav>
    <!-- 插入完成就直接可以查看效果了 -->
    
    <!-- jQuery-->
    <script src="lib/jquery/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
  </body>

```

### 栅格系统

在容器container中, 一行(row)均分为12列(column)(默认列数)

| -  |小于768px) | [768-992) | [992-1200) | [大于1200|
|:--|:--|:--|:--|:--|
|类前缀 | .col-xs- | .col-sm- | .col-md- | .col-lg- |

```
<div class="container-fluid">
    <div class="row">
        <!-- xs为小于768px宽度下均分, md为[992-1200) -->
        <!-- 一行12列, 大于12列的排到下一行 -->
        <div class="col-xs-6 col-md-2">11</div>
        <div class="col-xs-6 col-md-4">22</div>
        <div class="col-xs-6 col-md-6">22</div>
        
        <!-- offset为margin-left效果, 距离左边多少份 -->
        <div class="col-xs-6 col-md-offset-3">22</div>
        
        <!-- pull/push为定位效果, 分别向左/右平移多少份 -->
        <div class="col-xs-6 col-md-pull-3">22</div>
        <div class="col-xs-6 col-md-push-3">22</div>
    </div>
</div>
```
嵌套使用
```
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <!-- 嵌套里使用的份数总数也是12 -->
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```


## less.js

less.js是对css的预处理, 让css允许用一些编程的方式来设置css样式. 当然最终的结果还是会生成css文件

### less的安装
需要先安装nodejs, 再根据开发软件的说明, 进行安装

例如webstorm, 在创建一个*.less文件后, 会提示检测到less, 是否要监视, 此时确定后进行设置, 路径一般是
`C:\Users\Administrator\AppData\Roaming\npm`里的lessc.cmd.
复制对应的文件到这个目录下, 重新运行webstorm即可(具体可以百度安装方法)

#### Brackets
推荐个用JavaScript写的编辑器, 轻量级但插件丰富, 非常实用

和sublime一样, 很多功能都需要挂载插件, 此时搜索less相关的插件就可以使用了

成功安装less.js之后, 还需要引入less.js来使用.特别需要说明的是引入的顺序

```
<!-- 此时需要先引入 *.less 文件, 再引入 less.js -->
<link rel="stylesheet" href="css/wjs-index.less" type="text/less">
<script src="js/less.min.js"></script>
```

less文件
```
/*定义公共变量*/
@baseColor:#e92322;
@r:2px;

/*类似于定义函数的方法*/
/*如果有参数，且参数没有默认值，则必须传入参数*/
/*如果有默认值，则可以不传入参数，直接使用默认值*/
.addRadius(@r){
  border-radius: @r;
  /*兼容*/
  -moz-border-radius: @r;
  -webkit-border-radius: @r;
}
.wjs_header {
  color: @baseColor;
  /* 类似调用函数 */
  .addRadius(@r);
  height: 50px;
  border-bottom: 1px solid red;
  line-height: 50px;
    /* 嵌套的方式写样式 */
  .wjs_code{
    width: 100%;
    height: 50px;
    > span:first-of-type{
      font-size: 13px;
    }
    /* 此处需要加&取消转换成css时产生的空格 */
    &:hover{
      text-decoration: underline;
    }
    &.active{
      color:@baseColor;
    }
    &::before{
      content:"";
      position: absolute;
      left: 0;
      top:0;
    }
  }
}
```
转换成css的文件
```
/* 自动的处理了结构和传参 */
.wjs_header {
  color: #e92322;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  height: 50px;
  border-bottom: 1px solid red;
  line-height: 50px;
}
.wjs_header .wjs_code {
  width: 100%;
  height: 50px;
}
.wjs_header .wjs_code > span:first-of-type {
  font-size: 13px;
}
.wjs_header .wjs_code:hover {
  text-decoration: underline;
}
.wjs_header .wjs_code.active {
  color: #e92322;
}
.wjs_header .wjs_code::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
}
```


---

Tags： black_horse


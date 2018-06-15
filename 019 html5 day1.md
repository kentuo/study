# 19 HTML5 - 1

新标签 智能表单 新操作

---

## Html5 概念相关
HTML5并不仅仅只是做为HTML标记语言的一个最新版本，更重要的是它制定了Web应用开发的一系列标准，成为第一个将Web做为应用开发平台的HTML语言

我们日常讨论的H5其实指的是一个泛称，它是由HTML5 + CSS3 + Javascript等技术组合而成的一个应用开发平台

- 兼容性问题
修改的内容没有兼容问题, 新增的部分绝大多数都有兼容性问题

html5更多运用在移动端方面，因为移动端搭载的浏览器就比较高级(基本上都是谷歌的内核)

## 新标签
1. header
2. nav
3. section
4. aside
5. article
6. footer
作用：跟div一模一样 ，就是增加了语义性 更加利于seo优化

- createElement()创建的html5标签, 需要同时设置css里成为块元素, 比较麻烦

- 兼容性借助于第三方js框架`html5shiv.min.js`配合IE的实现最佳兼容
```
//这个东西只有低版本ie能识别
//不能写错, 错了会以文本显示出来
<!--[if lt IE 9]> 
<script src="js/html5shiv.min.js"></script>
<![endif]-->
```

## 新增智能表单

- Input表单的type新属性值 	
```
//email需要配合提交来验证
// required 验证当前表单是否为空
// pattern 用来接收正则去自定义验证规则
type="email" 	限制用户输入必须为Email类型 
type="url"   	限制用户输入必须为URL类型 
//以下的会调用系统带的相关功能样式
type="date" 	自动生成一个日期控件
type="time" 	同上 
type="month" 	同上
type="week" 	同上
type="number" 	限制用户输入必须为数字类型 
type="range" 	产生一个滑动条的表单 
type="search" 	产生一个搜索意义的表单 
type="color" 	生成一个颜色选择表单 
```
```
//自定义验证失败提示文字
element.addEventListener("invalid", function() {
    this.setCustomValidity("格式错误哟!");
});
//工作中常用的是定义个span做样式的提示
```

- 表单新属性
1. placeholder 占位文本
2. autofocus 自动获取焦点 `dom.focus()`
3. autocompleted 提交一次后下次自动补全 注意必须提交一次之后, 并且必须有name属性
4. multiple 配合file控件实现多选(本身单选文件)
5. form 配合form表单的id实现关联

### 智能感应

利用表单的 list=“datalist的id值”与datalist这个标签取得联系实现的
```
<!--通过id值产生关联-->
<input type="text" list="mydata">
<datalist id="mydata">
    <option value="ppt">幻灯片</option>
    <option value="ps">图形处理软件</option>
    <option value="php">后台编程语言</option>
    <option value="宝马">BMW</option>
</datalist>
```

### html5 调用视频(*)
之前依靠第三方网站来播放视频, 并且需要借助flash技术, 现在html5中, 我们只需要借助video标签来实现视频的播放

- 标签属性
1. autoplay 视频默认加载完后播放
2. controls 播放的控件
3. loop 控制循环
4. poster 在视频没有播放的时候预览图片

- 视频格式
1. mp4
2. ogg
3. webm

- 视频的API
1. play(); 控制播放
2. pause(); 视频暂停
3. load(); 重载

- 兼容问题
```
//video里加source标签, 效果类似swith选择
<video>
    <source src="1.mp4">
    <source src="1.ogg">
    对不起, 你的浏览器太low了
</video>
```

#### audio
audio的用法与视频一模一样

## JS新操作

### js获取元素新方式
获取的方式和jQuery的方式一样了: 

1. `document.querySelector("");`只会选择符合条件的第一个元素
2. `document.querySelectorAll("");`获取所有符合条件的元素, 并以类数组的形式返回, 即使只有一个也是数组的形式(使用时加[ ])
3. 可以用`element.querySelector`来获取元素内部符合条件的元素

### JS类名操作
移动端常用, 兼容IE10及以上
1. Node.classList.add('class') 添加class
2. ---.remove('class') 添加class
3. ---.toggle('class') 切换class
4. ---.contains('class') 检测是否存在class

### 自定义属性
自定义属性就是给DOM添加data-*的自定义属性,用`dataset[ ]`来获取到定义的属性值, dataset是以对象的形式存在
```
<div class="box"></div><div class="info"></div>
<button data-path="img/ldh.jpg" data-info="不老男神">刘德华</button>
<button data-path="img/zjl.jpg" data-info="不错哟">周杰伦</button>

<script>
var btn = document.querySelectorAll("button");
var box = document.querySelector(".box");
var info = document.querySelector(".info");
for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            console.log(this.dataset);
            var _path = this.dataset['path'];
            var _info = this.dataset['info'];
            box.style.background = 'url('+_path+')';
            info.innerHTML = _info;
        })
    };
</script>
```
jQuery中, 也有获取data的封装` $().data('path');`

**注意**js如果设置如下, 要用驼峰命名来获取

`data-my-name="itcast"，获取Node.dataset['myName']`

### 自定义进度条
1. progress
2. meter [low] [height]
value, min, max
用的少, 然并卵 , 实际开发多用div模拟

#### h5新事件 input
```
range.addEventListener('input',function(){});
```
有兼容问题, 在移动端使用



Tags： black_horse

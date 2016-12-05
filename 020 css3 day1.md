# 第20天 CSS3第一天

选择器 阴影 背景 iconfont

---

## CSS3 简述
- 浏览器支持差, 要加私有前缀
- 移动端支持优于pc端
- 坚持渐进增强原则

## 选择器
1. 关系选择器
- 后代选择器 空格
- 子代选择器 >
- 紧邻选择器 .box+li  ` + ` 后面第一个li
- 兄弟选择器 .box~li  ` ~ ` 后面所有的li

2. 属性选择器
- E[属性名]
- E[属性名=值]
- `E[属性名~=值]` 包含
- `E[属性名^=值]` 第一个值
- `E[属性名$=值]` 最后一个值
- `E[属性名*=值]` 任意位置值 **注意**: 要作为整体去使用, 否则比如单字母a可能会匹配出现多个

3. 伪类选择器
- `E:first-child` 第一个子元素E
- `E:last-child` 最后一个子元素E
- `E:nth-child(n)` 第n个子元素E
- even控制偶数 odd控制奇数
- `nth-child(5n+1)` n为n++, 表示的是1 6 11 16……
- `nth-of-type()` 类似`nth-child()`

4. 其他选择器
- `input: focus`     选择获取焦点的表单元素
- `input: enabled`   选择可操控的表单元素
- `input: disabled`  选择不可操控的表单
- `E: target`   选择通过锚点跳转的E元素
- `E: empty`    选择没有子节点的E元素包括文本节点
- `input: checked`  选择被选中的checkbox表单

## 伪元素 before after
作用：渲染一个虚拟的标签插入到当前元素的内部的前面或者后面
```
<div>我是</div>

div::before {
    content:"啦啦啦";
}
div::after {
    content:"卖报的小行家";
}
//低版本ie有兼容问题
```
- 伪元素默认是行内元素，我们可以进行转化，在实际工作中，多用来模拟一些小的标签去装饰
- 因为伪元素是不存在的，所以不能直接用JS去获取（可以利用类去覆盖之前的样式, 比如current::after, 用类名替换）
- 清除浮动的底层原理：就是让一个伪元素（因为伪元素不占dom内存）去清除浮动，从而节约了dom内存
- 当伪元素需要hover的效果的时候不能直接hover 需要借助于父级 写法：`父级：hover：伪元素`
- content一定不能省略，即使里面没有内容

## 字体 web字体 icon-font字体
网址：
http://www.iconfont.cn/  阿里
http://www.youziku.com/  有字库
1. 进入网站 点击webfont
2. 选择字体, 然后添加
3. 引用, 线上地址要加http
- 具体方法在网站里有说明

## 圆角
- `border-radius: 值`
1. 一个值设置的是盒子的四个角
2. 4个值的顺序是左上/右上/右下/左下
3. 可以是长度, 也可以是百分比
4. `10px/50px` 对应 `水平半径/垂直半径`


## 阴影
- `box-shadow：值`
1. ①Npx 水平方向偏移N个像素 正数往右 负数往左
2. ②Npx 垂直方向偏移N个像素 正数往下 负数往上
3. ③羽化大小 （模糊的大小）
4. ④阴影尺寸
5. ⑤颜色 默认值是黑色
6. ⑥内外阴影 默认是外阴影 内阴影是inset
7. 阴影可以写多个，中间用逗号隔开
8. 阴影可以简写，但是需要注意有一些值需要补0

box-shadow: 10px 10px 10px 10px red inset;

- `text-shadow：水平偏移 垂直偏移 羽化大小 颜色`
可以制作文字凹凸效果
```
background: #ccc;   /* 背景颜色和文字颜色一样 */
text-shadow: 1px 1px #fff,-1px -1px #000;
font-weight: bold;
color: #ccc;
```

## 边框图片
- `border-image：值`
九宫格切图
1. `border-image-source:url('aa.png');` 图片路径
2. `border-image-slice:26;`图片切割, 不带单位, 九宫格
3. `border-image-repeat:round`或者stretch或者repeat; round没有瑕疵, stretch默认拉伸, repeat 平铺（可能有瑕疵）
4. 简写: `border-image:url('border.png') 26 round;`
```
    ┌---┼----------┼---┐ ↙ 26指的就是这里的宽高啦
----┼---┼----------┼---┼-----
----┼---┼----------┼---┼-----
    └---┼----------┼---┘
```

## 背景相关
- 背景图片基准点
- `background-origin：值`
1. border-box  ：忽略边框 直接从边框的起始 0 ，0点平铺
2. padding-box： 默认值，忽略padding 直接从padding的起始 0 ，0点平铺
3. content-box ：从内容部分开始平铺 跟padding有关系

- 多重背景
背景图片之间用**逗号**隔开，可以写多组，最先渲染的图片有可能会遮住后面渲染的图片

- 控制背景图片的大小
`background-size：值`
1. 当只有一个值的情况下，宽度实现拉伸，并且高度会保持等比例，可以支持px，也可以支持百分比，百分比参照的是这个盒子本身的宽度
2. 当有两个值的情况下，宽度和高度会分别拉伸到对应的值，可能会变形，可以px，也可以百分比
3. contain 当图片的宽度或者是高度在缩放的时候有一个“碰到”了盒子的边缘，则停止变化
4. 在contain的基础上保证不留白，这就是cover的效果

## 盒子内减 **

之前我们的盒子的宽度是 宽度=width+padding+border，而内减属性会自动帮我们减去padding和border的值 ，所以 **用了内减的盒子实际宽度就等于width**，至于padding和border的值会自动被width内减掉
- 内减: `border-sizing: border-box;`
- 默认的是不内减: `border-sizing: content-box;`
//兼容ie9及以上, pc端使用要考虑兼容问题

在实际工作中，内减配合百分比布局是实现移动端布局的方式之一

## 渐变
- 线性渐变
`background:-webkit-linear-gradient`(起始位置,颜色一 位置,颜色二 位置 ,颜色三 位置);
1. 私有前缀
2. 起始位置可以用方位, 也可以用角度, 默认是水平朝右, 正值逆时针, 负值顺时针
3. 起始位置推荐用方位名词来控制(to right)

- 径向渐变
`background:-webkit-radial-gradient`(起始位置,颜色一 位置,颜色二 位置 ,颜色三 位置);
1. 不支持角度, 支持像素和方位

- 私有前缀
1. 谷歌 苹果：-webkit-
2. 火狐：-moz-
3. IE：-ms-
4. o：-o-
5. 手机端一般只需要写一个-webkit-
6. 大部分都是直接添加在最前面, css2有的属性可以添加在后面: `(background：-webkit-linear-gradient())`






Tags： black_horse

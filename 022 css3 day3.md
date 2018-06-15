# 22 CSS3 - 3

3D 动画

---

## 3D转换

### rotateX
围绕X轴进行旋转
```
        ↑ y轴
        |
--------┼--------→ x轴
        |
        |
```
### rotateY
围绕Y轴进行旋转, 正数是逆时针, 负数是顺时针

rotateZ 其实就是rotate

### 定义元素背对是否可见

`backface-visibility: visible|hidden;``

visible | hidden; 可见/不可见

### translateZ
就是在Z轴上来回移动，但是如果没有透视的情况下，完全看不出效果.

小经验：translateZ和rotate结合会产生不一样的3D效果，不同的顺序的效果截然不同，如果先rotate 在translateZ 元素是在空间里面发生旋转 而如果是translateZ在rotate 元素是在直线上发生旋转

### 透视 (景深)
`perspective：值 //一般500-900 px`

透视值越小，透视效果越强，值越大，透视效果越弱，透视添加在父级身上

### 灭点 (透视点, 消失点)
`perspective-origin：值 `

值可以是像素，百分比，方位名词，默认值是50%,50% 中心点

### transform-style
子元素是否跟随父元素的3D转换效果

`tranform-style：值 // flat |  preserve-3d;`

flat是默认值，让子元素不保留其3D位置， preserve-3d  让子元素保留其3D位置 ，加在父亲身上

透视 灭点 transform-style都是添加在父级身上


## CSS3动画
`animation: 值1 值2 值3 值4 值5 值6 值7 值8;`
1. 自定义动画名
2. 动画持续时间
3. 动画运行曲线 (默认ease) && steps
4. 动画延迟时间(delay, 默认0)
5. 执行的次数 (一直执行: infinite)
6. 是否逆序播放 (默认normal 逆序: alternate)
7. 控制动画的播放和暂停 (默认播放: running, 暂停:paused)
8. 动画最后停留的位置 (forwards: 让动画停留在最后一帧, 默认值none, 回到第一帧)

- 浏览器兼容写法
```
//写在@和keyframes中间 -ms- -moz- -o-
@-webkit-keyframes name {
    0% { // css语句 }
    50% { // css语句 }
    100% { // css语句 }
}
```
**注意** 多组动画的时候, 属性尽量要写全, 否则可能有异常( 类似预解析的效果, 属性提前解析, 动画效果就进行了拆分)


## 帧动画
steps(帧数): 动画分成多少步骤去执行, 帧数是总画面数减1 ( 因为默认显示了第一张) , 精灵图每个画面宽度保持一致, 建议一行摆放, steps()写在运动曲线的位置

一般steps帧动画和其他动画组合起来使用, 比如帧动画是飞, 另外一个动画则是向前移动, 不能做到又是飞又移动


## animate.css 库的使用
官网: https://daneden.github.io/animate.css/

作用：将一切常见的动画直接封装，开发者不需要考虑实现过程，只需要添加对应的类就能实现动画效果

使用步骤：
1. 将下载下来的animate.css 引入到你的项目中
2. 去官网获取想要的效果 给对应的元素添加上animated 类 （必填）和你想要的效果的类




Tags： black_horse


# JS 第2天

for循环和数组

---

##循环

    for(var i = 0; i< arr.length;i++){
    console.log(i);
    }

###代码调试
F12 → Source → 找到文件 → 打断点(点击行号前面) → 刷新页面

F8 : 跳到下一个断点,无新断点直接结束
F10: 一步一步执行

###break; continue
break 跳出循环
continue 跳出本次循环

###while 和 do while
while是符合条件就开始循环
do while 是先执行一次,再判断条件,符合才开始循环

##数组

var arr1 = []; 
var arr4 = new Array(); // 创建一个空数组
var arr5 = new Array(1,2,3); // 创建一个包含3个数值的数组

**不要在数组内存不同类型的**
同理在数组中跳着赋值会出现一个一个的坑(稀疏数组)

for ( var i = 0 ; i <100;i++){
arr[arr.length] = i ;
}

##冒泡
冒泡满分玩法:(假设成立法,定义flag假设为true)

    <script>
        var arr = [12, 34, 22, 45, 11, 6, 87, 97, 55, 32, 25, 17, 4, 65];
        var flag = true;
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                    flag=false;
                }
            }
            if(flag) {
                break;
            }
        }
        console.log(arr);
    </script>


Tags： black_horse

# doc
## 一.js数组基本方法
1.toString() 把数组转换为数组值（逗号分隔）的字符串。 
2.join() 方法也可将所有数组元素结合为一个字符串。它的行为类似 toString()，但是您还可以规定分隔符“:”
3.pop、push,弹出最后一个元素，或者在最后推入元素
4.shift() 方法会删除首个数组元素，并把所有其他元素“位移”到更低的索引。
5.unshift() 方法（在开头）向数组添加新元素，并“反向位移”旧元素：
6.splice() 方法可用于向数组添加新项：arra.splice(1,2),通过聪明的参数设定，您能够使用 splice() 在数组中不留“空洞”的情况下移除元素：
常用于数组去重
7.concat() 方法通过合并（连接）现有数组来创建一个新数组：concat() 方法不会更改现有数组。它总是返回一个新数组。concat() 方法可以使用任意数量的数组参数：
8.slice() 方法用数组的某个片段切出新数组。
本例从数组元素 1 （"Orange"）开始切出一段数组：
实例
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1); 
8.sort() 方法以字母顺序对数组进行排序：可包含比较函数：
var arr = [23, 9, 4, 78, 3];
var compare = function (x, y) {//比较函数
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
}
console.log(arr.sort(compare)); 
9.reverse() 方法反转数组中的元素。您可以使用它以降序对数组进行排序。

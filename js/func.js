//手写实现call
/*

思路：

context容错处理
Symbol实现唯一key值
context对象新增唯一key属性，赋值：myCall的调用者
此时this已指向context对象
执行context对象里面的调用者函数

删除添加的唯一key值属性


 */
 */
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
      args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args +')');
  delete context.fn

  return result;
}
function test(y,z){
 return y+z
}
console.log(test.call2(this,1,2));


window.name = 'global_name_ts'

const object = {
    name: 'Jake'
}

Function.prototype.myCall = function (context, ...args) {
    /*
          错误做法：直接 context = context || window
          context值为null和undefined的，this会自动指向全局对象
          值为数字0、空字符串、布尔值false的this也会指向该原始值的实例对象
      */
    context = [null, undefined].includes(context) ? window : Object(context)

    // 给context对象新增一个独一无二的属性以免覆盖原有同名属性，并赋值为：调用者fun函数
    console.log('新增属性前：', context);
    const key = Symbol('call中独一无二的属性')
    context[key] = this
    console.log('新增属性后：', context);

    // 执行context对象里面的fun函数，此时fun函数里面的this指向调用者context
    const res = context[key](...args)

    delete context[key]
    return res
}

console.log('-------------------------myCall------------------------------');
fnA() // 直接指向window
fnA.myCall(object, 1, 2)
//手写实现 apply

// (window)全局默认name值
window.name = 'global_name_ts'
​
const object = {
    name: 'Jake'
}
​
Function.prototype.myApply = function (context, args) {
    context = [null, undefined].includes(context) ? window : Object(context)
​
    const key = Symbol('apply中独一无二的属性')
    context[key] = this
​
    const res = context[key](...args)
​
    delete context[key]
    return res
}
​
function fnA (...args) {
    console.log('结果👉', this.name, ...args)
}
​
console.log('-------------------------myApply------------------------------');
fnA() // 直接指向window
fnA.myApply(object, [1, 2])

//手写实现bind
/*
思路：

拷贝调用源:通过变量储存源函数

编写返回函数：
源函数再调用call或者apply函数进行this改向
new判断：通过instanceof判断函数是否通过new调用，来决定绑定的context
绑定this并且传递参数(参数 = myBind调用传参 + 内部返回函数调用传参)
复制源函数的prototype给bindFn

返回内部函数

 */
// (window)全局默认name值
window.name = 'global_name_ts'
​
const object = {
    name: 'Jake'
}
​
Function.prototype.myBind = function (context) {
    context = [null, undefined].includes(context) ? window : Object(context)
​
    const that = this;
    // 指向类数组arguments对象，使用数组的slice方法得到新数组
    let args1 = [...arguments].slice(1)
    // let args1 = Array.prototype.slice.call(arguments, 1);
​
    let bindFn = function () {
        let args2 = [...arguments]
        // let args2 = Array.prototype.slice.call(arguments);
    ​
        /*
              判断this instanceof bindFn是因为原生bind是可以new那个bind后返回的函数的
              不是new的情况下this指向才会是context;
            */
        return that.call(this instanceof bindFn ? this : context, ...args1.concat(args2));
        // return that.apply(this instanceof bindFn ? this : context, args1.concat(args2));
    }
​
    // 复制源函数的prototype给bindFn，因为一些情况下函数没有prototype，比如箭头函数
    let Fn = function () { };
    Fn.prototype = that.prototype;
    bindFn.prototype = new Fn();
​
    // 或者
    // bindFn.prototype = that.prototype // 但是有修改会被同时改动
    // bindFn.prototype = Object.create(that.prototype || Function.prototype)
​return bindFn;
}
​function fnB (...args) {
    console.log('结果👉', this.name, ...args);
}
​console.log('-------------------------myBind------------------------------');
fnB() // 直接指向window
fnB.myBind(object, 10, 20, 30)(40, 50) // bind函数返回的是一个函数，还需要手动执行
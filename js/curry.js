//版本1
 let arr = []
 function addCurry() {
     let arg = Array.prototype.slice.call(arguments); // 递归获取后续参数
     arr = arr.concat(arg);
      if (arg.length === 0) { // 如果参数为空，则判断递归结束
          return arr.reduce((a,b)=>{return a+b}) // 求和
      } else {
          return addCurry;
      }
  }

//升级
function addCurry(f,...args) {
  let arr = [...arguments]
  let fn = function () {
      if(arguments.length === 0) {
    return arr.reduce((a, b) => a + b)
      } else {
          arr.push(...arguments)
          return fn
      }
  }
  return fn
}
// 进一步升级
function addCurry(f) {
  let arr = [...arguments]
  // 利用闭包的特性收集所有参数值
  var fn = function() {
      arr.push(...arguments);
      return fn;
  };
  // 利用 toString 隐式转换
  fn.toString = function () {
      return arr.reduce(function (a, b) {
          return a + b;
      });
  }
  return fn;
}

//公共柯里化函数
/**
 * @description: 将函数柯里化的工具函数
 * @param {Function} fn 待柯里化的函数
 * @param {array} args 已经接收的参数列表
 * @return {Function}
 */



// 定义一个createCurry的函数
function createCurry(fn){
    var slice = Array.prototype.slice,
        stored_args = slice.call(arguments,1);
    return function () {
        let new_args = slice.call(arguments),
            args = stored_args.concat(new_args);
        return fn.apply(null,args);
    }
}
console.log(addCurry(1)(2,6)(3).toString());


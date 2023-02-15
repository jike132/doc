Array.prototype.forEach2 = function(callback, thisArg) {
  console.log(callback);
  if (this == null) {
      throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)  // this 就是当前的数组
  console.log(O);
  const len = O.length >>> 0  // 后面有解释
  let k = 0
  while (k < len) {
      if (k in O) {
        console.log(thisArg, O[k], k);
          callback.call(thisArg, O[k], k, O);
      }
      k++;
  }
}
let t=[1,2,3,4]
t.forEach2(item=>{
  console.log(item);
})
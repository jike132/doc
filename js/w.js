Array.prototype.map1 = function (fn) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    res.push(fn(this[i], i, this));
  }
  return res;
};
let a = [1, 2, 3];
console.log(a.map1((item) => item * 2));
Array.prototype.reduce1 = function (fn, initValue) {
  let res = initValue ? initValue : this[0];
  for (let i = initValue ? 0 : 1; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    res = fn(res, this[i], i, this);
  }
  return res;
};
let a1 = [1, 2, 3];
console.log(a1.reduce1((a, b) => a * b, 2));

function flatting(res = [], arr) {
  if (!Array.isArray(arr)) return;
  let queue = [...arr];
  while (queue.length > 0) {
    let k = queue.shift();
    Array.isArray(k) ? flatting(res, k) : res.push(k);
  }
  return res;
}
console.log(flatting([], [1, [4, [2, 3], 5], [9, [[2, [8]]]]]));

function debounce(func, wait, immediate = false) {
  let timeout = null;

  return () => {
    console.log(12);
    var args = arguments;

    if (immediate) {
      func.apply(this, args);
      immediate = false;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        console.log(args);
        func.apply(this, args);
      }, wait);
    }
  };
}
let add = function (a, b) {
  console.log(a + b);
};
function throttle(fn, wait) {
  let context, args;
  let flag = false;
  return () => {

    context = this;
    args = arguments;
    if (!flag) {
      fn.apply(context, args);
     flag=true;
     setTimeout(()=>flag=false,wait)
    }
  };
}


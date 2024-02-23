const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
// 因为需要对 4 个地方同时进行 try...catch
// 重复代码，就可以抽离为工具函数了
function executeFnWithCatchError(fn, param, resolve, reject) {
  try {
    const result = fn(param);
    console.log(result);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}
class _Promise {
  constructor(executor = () => {}) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 因为可以执行多次 then，因此需要将所有的任务放在一个队列中
    this.resolveQueue = [];
    this.rejectQueue = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        if (this.resolveQueue.length) {
          this.resolveQueue.forEach((item) => item(this.value));
        }
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        if (this.rejectQueue.length) {
          this.rejectQueue.forEach((item) => item(this.reason));
        }
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {

    // 针对这一情况，可以给两个参数写一个默认值
    onFulfilled = onFulfilled
      ? onFulfilled
      : (value) => {
          return value;
        };
    onRejected = onRejected
      ? onRejected
      : (reason) => {
          throw new Error(reason);
        };
        console.log(this.status);
    return new _Promise((resolve, reject) => {
      // 判断就可以删除掉了，因为传入的两个参数是必定有值的
      if (this.status === FULFILLED) {
        console.log(1);
        executeFnWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === REJECTED) {
        console.log(2);
        executeFnWithCatchError(onRejected, this.reason, resolve, reject);
      }
      if (this.status === PENDING) {
        console.log(3);
        this.resolveQueue.push((param) => {
          executeFnWithCatchError(onFulfilled, param, resolve, reject);
        });
        this.resolveQueue.push((param) => {
          executeFnWithCatchError(onRejected, param, resolve, reject);
        });
      }
    });
  }
  catch(onRejected) {
    this.then(undefined, onRejected);
  }
  finally(onFinally) {
    this.then(
      () => onFinally(),
      () => onFinally()
    );
  }
  // 新增类方法
  static resolve(data) {
    return new _Promise((resolve) => resolve(data));
  }
  static reject(data) {
    return new _Promise((resolve, reject) => reject(data));
  }
  static all(promiseQueue) {
    return new _Promise((resolve, reject) => {
      const result = [];
      // 对队列进行遍历
      promiseQueue.forEach((promise) => {
        promise
          .then((res) => {
            result.push(res);
          })
          .catch((err) => {
            // 任何一个 reject 那么就直接 reject
            reject(err);
          });
      });
      // 所有的 resolve，才 resolve
      resolve(result);
    });
  }
  static allSettled(promiseQueue) {
    return new _Promise((resolve) => {
      const result = [];
      // 对队列进行遍历
      promiseQueue.forEach((promise) => {
        promise
          .then((res) => {
            result.push({ value: res, status: FULFILLED });
          })
          .catch((err) => {
            // 任何一个 reject 那么就直接 reject
            result.push({ reason: err, status: REJECTED });
          });
      });
      // 所有的 resolve，才 resolve
      resolve(result);
    });
  }
}
 function test(){
let b = new _Promise((resolve, reject) => {
  resolve(1);
});
let c = new _Promise((resolve, reject) => {
  resolve(2);
});
let d = new _Promise((resolve, reject) => {
  reject(23);
});
let a = _Promise.allSettled([d,b,c]);
console.log(a);
}
test()
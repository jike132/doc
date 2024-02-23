const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

function executeFnWithCatchError(fn, param, resolve, reject) {
  try {
    const result = fn(param)
    resolve(result)
  } catch (error) {
    reject(error)
  }
}

 class _Promise {
  constructor(executor = () => {}) {
    this.status = STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveQueue = []
    this.rejectQueue = []
    const resolve = value => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_FULFILLED
        this.value = value
        if (this.resolveQueue.length)
          this.resolveQueue.forEach(item => item(this.value))
      }
    }
    const reject = reason => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_REJECTED
        this.reason = reason
        if (this.rejectQueue.length)
          this.rejectQueue.forEach(item => item(this.reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = onFulfilled
      ? onFulfilled
      : value => {
          return value
        }
    onRejected = onRejected
      ? onRejected
      : reason => {
          throw new Error(reason)
        }
    return new Promise((resolve, reject) => {
      if (this.status === STATUS_FULFILLED) {
        executeFnWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === STATUS_REJECTED) {
        executeFnWithCatchError(onRejected, this.reason, resolve, reject)
      }
      if (this.status === STATUS_PENDING) {
        this.resolveQueue.push(param => {
          executeFnWithCatchError(onFulfilled, param, resolve, reject)
        })
        this.resolveQueue.push(param => {
          executeFnWithCatchError(onRejected, param, resolve, reject)
        })
      }
    })
  }
  catch(onRejected) {
    this.then(undefined, onRejected)
  }
  finally(onFinally) {
    this.then(
      () => {
        onFinally()
      },
      () => {
        onFinally()
      }
    )
  }
  static resolve(data) {
    return new _Promise(resolve => resolve(data))
  }
  static reject(data) {
    return new _Promise((resolve, reject) => reject(data))
  }
  static all(promiseQueue) {
    return new _Promise((resolve, reject) => {
      const result = []
      promiseQueue.forEach(promise => {
        promise
          .then(res => {
            result.push(res)
          })
          .catch(err => {
            reject(err)
          })
      })
      resolve(result)
    })
  }
  static allSettled(promiseQueue) {
    return new _Promise(resolve => {
      const result = []
      promiseQueue.forEach(promise => {
        promise
          .then(res => {
            result.push({
              status: STATUS_FULFILLED,
              value: res,
            })
          })
          .catch(err => {
            result.push({
              status: STATUS_REJECTED,
              reason: err,
            })
          })
      })
      resolve(result)
    })
  }
  static race(promiseQueue) {
    return new _Promise((resolve, reject) => {
      promiseQueue.forEach(promise => {
        promise
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    })
  }
  static any(promiseQueue) {
    return new _Promise((resolve, reject) => {
      const reasons = []
      promiseQueue.forEach(promise => {
        promise
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reasons.push(err)
          })
      })
      if (reasons.length === promiseQueue.length) {
        throw new AggregateError()
      }
    })
  }
}
let b = new _Promise((resolve, reject) => {
    reject(1);
  });
  let c = new _Promise((resolve, reject) => {
    reject(2);
  });
  let d = new _Promise((resolve, reject) => {
    reject(23);
  });
  let a = _Promise.allSettled([d,b,c]);
  console.log(a);
// module.exports._Promise=_Promise
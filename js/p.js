Promise.prototype.any1 = function (arr) {
  return new Promise((resolve, reject) => {
    let res = [];
    arr.forEach((pro) => {
      pro
        .then((re) => {
         resolve(re);
        })
        .catch((err) => {
          res.push(err);
        });
    });
    reject(res);
  });
};

let b = new Promise((resolve, reject) => {
    reject(1);
  });
  let c = new Promise((resolve, reject) => {
    resolve(2);
  });
  let d = new Promise((resolve, reject) => {
    reject(23);
  });
  async function  test() {
    let a =await Promise.any1([d,b,c]);
    console.log(a);
  }
 test()
// function curring(fn) {
//   l = fn.length;
//   return (crr = (...args) => {
//     if (args.length < l) {
//       return (...args1) => {
//         return crr(...args.concat(args1));
//       };
      
//     }
//     return fn.apply(this, args);
//   });
// }
// function add(a,b,c,d){
//     return a+b+c+d
// }
// let t=curring(add)
// console.log(t(1,2,3,8));

function nextTick(fn){
  let p =Promise.resolve()
  console.log(p.then(fn.bind(this)));
 return p.then(fn.bind(this))
}
console.log(1);
function add(a){
  console.log(a);
}
console.log(5);
nextTick(()=>{
  console.log("i-"+23);
})
nextTick(()=>{
  console.log("i-"+2);
}).then(()=>{
  console.log("end");
}).then(console.log("end1"))
console.log(nextTick(()=>{
}));
for (let index = 0; index < 12; index++) {
  console.log(23)
}
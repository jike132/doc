// function curry(){
//   let arr=[...arguments]
//   fn=function(){
//       arr.push(...arguments)
//       return fn
    
//   }
//   fn.toString=function(){
//       return arr.reduce((a,b)=>{return a+b})
//   }
//   return fn
// }
function createCurry(fn){
  console.log(fn.length);
  let arr=[]
  var slice = Array.prototype.slice,
      stored_args = slice.call(arguments,1);
 const f= function () {
      let new_args = slice.call(arguments),
          args = stored_args.concat(new_args);
      return fn.apply(null,args);
  }
  return f;
}
const add=(a,b,c)=>{return a+b+c}
console.log(createCurry(add,1,2)(12));
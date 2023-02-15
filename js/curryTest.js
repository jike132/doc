function curry(){
  let arr=[...arguments]
  fn=function(){
      arr.push(...arguments)
      return fn
    
  }
  fn.toString=function(){
      return arr.reduce((a,b)=>{return a+b})
  }
  return fn
}
console.log(curry(1)(2)(3).toString());
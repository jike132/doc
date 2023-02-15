//初级防抖
function debounce(func, wait) {
  return function(){
    let context=this;
    let args=arguments;
  clearTimeout(timeout) 
    timeout=setTimeout(()=>{
      func.apply(context,args)
    },wait)
  }
}
function test(n,k){
  console.log(n,k);
}
debounce(test("ces"),10000)
debounce(test("ces1","iii"),1000)


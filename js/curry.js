function createCurry(fn){
    let arr=[];
   const f= (...args)=> {
        arr=[...arr,...args];
        if(arr.length<fn.length){
          return f;
        }else{
          return fn.apply(fn,arr);
        }
        
    }
    return f;
  }
  const add=(a,b,c)=>{return a+b+c}
  console.log(createCurry(add)(12,3,2));
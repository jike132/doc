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

//map
Array.prototype.map=function(fn){
  const result=[]
  for(let i=0;i<this.length;i++){
    if (!this.hasOwnProperty(i)) {
      continue;
    }
    console.log(this[i],i,this)
    result.push(fn(this[i],i,this))
  }
  return result
}
//filter
Array.prototype.filter=function(fn){
  const result=[]
  for(let i=0;i<this.length;i++){
    if (!this.hasOwnProperty(i)) {
      continue;
    }
    // console.log(fn(3,1,this));
    fn(this[i],i,this)&&result.push(this[i])
  }
  return result
}
let a=[1,,,3]
console.log(a.filter((item,index,arr)=>{console.log(index,arr); return item>2}))
//reduce
Array.prototype.reduce=function(fn,value){
  let result=value?value:this[0]
  for(let i=value?0:1;i<this.length;i++){
    if (!this.hasOwnProperty(i)) {
      continue;
    }
    // console.log(fn(3,1,this));
   result= fn(result,this[i],i,this)
  }
  return result
}
let a1=[1,2,3]
console.log(a1.reduce((a,b)=>a*b))
//every
Array.prototype.every=function(fn){
  let result=true
  for(let i=0;i<this.length;i++){
    if (!this.hasOwnProperty(i)) {
      continue;
    }
   if(!fn(result,this[i],i,this)){
    result=false
    break
   }
  }
  return result
}
let a3=[1,2,3]
console.log(a3.every(item=>item>0))
//数组扁平化
function flatArr(arr,num=1){
  if(Array.isArray(arr))return;
  return arr.flat(1)
}
//实现new关键字
const myNew=(...args)=>{
const [fn,...other]=args;
console.log(fn,other)
const target=Object.create(fn.prototype)
const res=fn.apply(target,other)
if(res&&((typeof res=="object")||typeof res=="function")){
return res
}
return target
}
function Add(){
  this.add=function(a,b,c){
    return (a+b+c)*3
  }
  this.max=function(a,b){
    return Math.max(a,b)
  }
  
}
let ad=myNew(Add);
console.log(ad.add(2,3,5)); 
console.log(ad.max(3,5)); 

/**
 * 数据类型判断
 * @param {*} o 
 * @returns 
 */
const type=function(o){
    let t=Object.prototype.toString.call(o)
    let reg=/(\[object)\s|\]/g
    return t.replace(reg,(k)=>{
       // console.log(k);
        return ""
    }).toLowerCase()
}
console.log(type('1')); 
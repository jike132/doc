//1.原型链继承
/*  
问题1：原型中包含的引用类型属性将被所有实例共享；
问题2：子类在实例化的时候不能给父类构造函数传参；
*/
function Animal() {
  this.colors = ['black', 'white']
}
Animal.prototype.getColor = function() {
  return this.colors
}
function Dog() {}
Dog.prototype =  new Animal()

let dog1 = new Dog()
dog1.colors.push('brown')
let dog2 = new Dog()
console.log(dog2.colors)  // ['black', 'white', 'brown']
//借用构造函数实现继承
/*
借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。
但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。
*/
function Animal(name) {
  this.name = name
  this.getName = function() {
      return this.name
  }
}
function Dog(name) {
  Animal.call(this, name)
}
Dog.prototype =  new Animal()
tet=new Dog("test")
console.log(tet.getName())

//组合继承
function Animal(name) {
  this.name = name
  this.colors = ['black', 'white']
}
Animal.prototype.getName = function() {
  return this.name
}
function Dog(name, age) {
  Animal.call(this, name)
  this.age = age
}
Dog.prototype =  new Animal()
Dog.prototype.constructor = Dog

let dog1 = new Dog('奶昔', 2)
dog1.colors.push('brown')
console.log(dog1) 
let dog2 = new Dog('哈赤', 1)
console.log(dog2) 
// { name: "哈赤", colors: ["black", "white"], age: 1 }
//寄生式组合
function Animal(name) {
  this.name = name
  this.colors = ['black', 'white']
}
Animal.prototype.getName = function() {
  return this.name
}
function Dog(name, age) {
  Animal.call(this, name)
  this.age = age
}

function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inheritPrototype(child, parent) {
  let prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}
inheritPrototype(Dog, Animal)

//class实现继承
class Animal {
  constructor(name) {
      this.name = name
  } 
  getName() {
      return this.name
  }
}
class Dog extends Animal {
  constructor(name, age) {
      super(name)
      this.age = age
  }
}

const arr = [1,4,7,2,3,4,5];
t=[]
arr.push("")
const sum = arr.reduce(function(prev,cur,index,arr){
    console.log(prev,cur,index);
   // t.push(prev)
     t.indexOf(prev)>0?"":t.push(prev) ;
     return cur
});
console.log(t);

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
      console.log(arr);
  }
 
  return arr;
}

flatten([1,[2,[4,[[6]]]]]); 


//URL解析
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
      if (/=/.test(param)) { // 处理有 value 的参数
          let [key, val] = param.split('='); // 分割 key 和 value
          val = decodeURIComponent(val); // 解码
          val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
  
          if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
              paramsObj[key] = [].concat(paramsObj[key], val);
          } else { // 如果对象没有这个 key，创建 key 并设置值
              paramsObj[key] = val;
          }
      } else { // 处理没有 value 的参数
          paramsObj[param] = true;
      }
  })
  
  return paramsObj;
}
let c=parseParam("www.com?er=0&u=9&er=9&tr")
console.log(c);


//字符串模板
function render(template, data) {
  const reg = /\{\{([\w|\d]+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
      const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
      template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
      return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}
let template = '我是{{name}}，年龄{{1}}，性别{{sex}}';
let person = {
    name: '布兰',
    1: 12
}
console.log(render(template, person)); // 我是布兰，年龄12，性别undefined

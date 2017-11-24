/**
 * Created by mengqian on 13/11/2016.
 * http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html
 */

/**
 * Animal
 * @constructor
 */
function Animal(){

}

Animal.prototype.species = "动物";
Animal.prototype.age = 20;


/**
 * 中介对象
 * @constructor
 */


var F = function(){};
F.prototype = Animal.prototype;

/**
 * Cat
 * @param name
 * @param color
 * @constructor
 */
function Cat(name, color){
  this.name = name;
  this.color = color;
}

// 这两步一般一起出现
extend(Cat, Animal);

Cat.prototype.type = "猫科动物";
Cat.prototype.eat = function(){
  console.log("吃老鼠");
}



var cat1 = new Cat("大黄","黄色");
var cat2 = new Cat("小黑","黑色");

console.log(Cat.prototype.constructor);
console.log(cat1.constructor === Cat);

console.log(cat1.color, cat1.age, cat1.species);
// cat1.eat();

console.log(Cat.prototype.isPrototypeOf(cat1));

console.log(Object.getPrototypeOf(cat1));
console.log(cat1.hasOwnProperty("type"));



function extend(Child, Parent){
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
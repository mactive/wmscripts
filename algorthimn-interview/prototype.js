//定义类
class Point {

    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  
  }

  Point.prototype.eat = function() {
      console.log('eat')
  }

  Point.prototype.size = "XL"

  
  var point = new Point(2, 3);
  
  console.log(point.toString()); // (2, 3)
  
  console.log(point.hasOwnProperty('x')); // true
  console.log(point.hasOwnProperty('y')); // true
  console.log(point.hasOwnProperty('toString')); // false
  console.log(Object.getOwnPropertyNames(point));// false
  console.log(Object.getOwnPropertyNames(Point)); // ["length", "prototype", "name"]
  console.log(Object.getOwnPropertyNames(point.__proto__)); // ["constructor", "toString"]
  console.log(point.__proto__.hasOwnProperty('toString')); // true
  console.log(Point === Point.prototype.constructor) // true 原型对象的构造函数就是我

/**
 * 枚举成员会被赋值为从 0 开始递增的数字
 * 如果设定了初始值, 后面会默认加一
 * 
 * @enum {number}
 */
enum Days {Sun = 1, Mon, Tue, Wed, Thu, Fri, Sat};


console.log(Days["Sun"] === 1); // true
console.log(Days["Mon"] === 2); // true
console.log(Days["Tue"] === 3); // true
console.log(Days["Sat"] === 7); // true

/**
 * 有值的枚举变成这样
 *  var Direction;
 *  (function (Direction) {
 *    Direction["column"] = "col";
 *    Direction["row"] = "row";
 *  })(Direction || (Direction = {}));
 * 
 * @enum {number}
 */
enum Direction {
  column = 'col',
  row = 'row',
}
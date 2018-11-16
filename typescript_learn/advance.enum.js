/**
 * 枚举成员会被赋值为从 0 开始递增的数字
 * 如果设定了初始值, 后面会默认加一
 *
 * @enum {number}
 */
var Days;
(function (Days) {
    Days[Days["Sun"] = 1] = "Sun";
    Days[Days["Mon"] = 2] = "Mon";
    Days[Days["Tue"] = 3] = "Tue";
    Days[Days["Wed"] = 4] = "Wed";
    Days[Days["Thu"] = 5] = "Thu";
    Days[Days["Fri"] = 6] = "Fri";
    Days[Days["Sat"] = 7] = "Sat";
})(Days || (Days = {}));
;
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
var Direction;
(function (Direction) {
    Direction["column"] = "col";
    Direction["row"] = "row";
})(Direction || (Direction = {}));

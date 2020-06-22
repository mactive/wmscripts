
var a = {n:1};   // 第一行
a.x = a = {n:2};  // 第二行
console.log(a.x);
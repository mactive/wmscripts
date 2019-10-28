
/**
 * 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。
 */

var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();

/**
 * 还有这种立即执行函数
 */
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();


// 为什么会全部输出6？如何改进，让它输出1，2，3，4，5？(方法越多越好)

for(var i = 1; i <= 5; i ++){
    setTimeout(function timer(){
      console.log(i)
    }, 0)
  }

  // method1
  // 闭包 固化当时的参数和作用域
  for(var i = 1;i <= 5;i++){
    (function(j){
      setTimeout(function timer(){
        console.log(j)
      }, 0)
    })(i)
  }

  // method 2
  // setttimeout 的 第三个参数
  for(var i=1;i<=5;i++){
    setTimeout(function timer(j){
      console.log(j)
    }, 0, i)
  }

  // 使用let
  // let使JS发生革命性的变化，让JS有函数作用域变为了块级作用域，用let后作用域链不复存在。代码的作用域以块级为单位
  // 相当于变成了 6个代码块
  for(let i = 1; i <= 5; i++){
    setTimeout(function timer(){
      console.log(i)
    },0)
  }

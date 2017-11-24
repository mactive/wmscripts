
// "use strict";

var plusOne = function(num) {
  console.log(arguments.callee)
  console.log(plusOne.caller)
  var args = Array.prototype.slice.call(arguments);
  console.log(args)
  return num +=1 ;
}

var start = function() {
  console.log('start')
  plusOne(10);
}

start()


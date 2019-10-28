// Switching words in a string

var re = /(\w+)\s(\w+)/

var str = 'John Smith'

var newStr = str.replace(re, "$2-$1")
console.log(newStr);

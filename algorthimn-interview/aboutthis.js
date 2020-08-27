function A(name) {
    this.name = name
    this.sayName = function() {
        console.log(this.name)
    }
    this.sayHi = () => {
        console.log(this.name)
    }
}

this.name = "tt"
var a = new A("mac")
a.sayName()
a.sayName()

/**
 * 
apply、call、bind用法
apply:
fn.apply(thisObj,数组参数）
定义：应用某一个对象的一个方法，用另一个对象替换当前对象
说明：如果参数不是数组类型的，则会报一个TypeError错误。

call:
fn.call(thisObj, arg1, arg2, argN)
apply与call的唯一区别就是接收参数的格式不同。

bind:
fn.bind(thisObj, arg1, arg2, argN)
bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this
被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

 */
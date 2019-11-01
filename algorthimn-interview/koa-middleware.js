/**
 * 面向切面编程(AOP)
 * 同步的实现方式
 */
Function.prototype.before = function(fn) {
    const self = this;
    return function(...args) {
        // 执行传入方法
        let res = fn.call(this)
        // 如果上一个函数未返回值, 不执行下一个函数
        console.log('res',self)
        if(res) {
            self.apply(this, args)
        }
    }
}

function Function(name){
    console.log('init', name)
    this.method = () => {console.log('method')}
}

var funca = new Function('mac')
var before = funca.before(
    function(){
        console.log("before");
        return true
    }
);
before();
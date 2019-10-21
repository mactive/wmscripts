/**
 * 自己实现一个 bind
 * 返回一个function 然后继续用call向后传递
 */
Function.prototype.myBind = function (ctx, ...args) {
    return (...innerArgs) => this.call(ctx, ...args, ...innerArgs);
};

// test
const a = {
    name: "name of a"
};
function test(...msg) {
    console.log(this.name);
    console.log(...msg);
}
const t = test.myBind(a, "hello");
t("world");


// fun.call(thisArg, arg1, arg2, ...)
// call attaches this into function and executes the function immediately:

var person = {
    name: "James Smith",
    hello: function (thing) {
        console.log(this.name + " says hello " + thing);
    }
}

person.hello("you")
person.hello.call({ name: "mac" }, "world")

// function.bind(thisArg[,arg1[,arg2[, ...]]])
// bind attaches this into function and it needs to be invoked separately like this: not executes immediately
// 先绑定好但是先不执行

var person = {
    name: "James Smith",
    hello: function (thing) {
        console.log(this.name + " says hello " + thing);
    }
}

var bindHelloFunc = person.hello.bind({name: "mickle"})
bindHelloFunc("mountain")






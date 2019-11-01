// 对函数做改造

function withHookBefore (originalFn, hookFn) {
    return function () {
      if (hookFn.apply(this, arguments) === false) {
        return
      }
      return originalFn.apply(this, arguments)
    }
  }

console.dir = withHookBefore(console.dir, () => {console.log("I am hocks")})
// return false 将不再执行原函数
// console.dir = withHookBefore(console.dir, () => {console.log("I am hocks"); return false}) 

console.dir('222')
// 面试金典 chapter 11

// 传统的fibnacci 递归
// 从 0 开始相加, 后一个数是前两个数之和
// 时间复杂度O(2^n) 2的n次方

/**
 * 267914296
 * fibonacci: 2685.0849609375ms
 * fibonacci: 2.685s

 * 267914296
 * fibonacciDynamicEntre: 0.302978515625ms
 * fibonacciDynamicEntre: 0.464ms
 * 
 * 
 */
const count  = 42
console.time('fibonacci')

const fibonacci = (n: number): number => {
    if (n === 0) return 0
    if (n === 1) return 1
    const res = fibonacci(n - 1) + fibonacci(n - 2)
    return res 
}

console.log(fibonacci(count))
console.timeEnd('fibonacci')

/**
 * 存储式的 fibnacci, 不是递归方式的
 * 自上而下的动态规划(记忆法)
 */
const fibonacciDynamic = (i: number, memo: number[] = []): number => {
    if (i === 0 || i === 1) { return i }
    if (memo[i] === 0) {
        memo[i] = fibonacciDynamic(i - 1, memo) + fibonacciDynamic(i - 2, memo)
    }
    // console.log('memo i',memo[i])
    return memo[i]
}

const fibonacciDynamicEntre = (n: number) => {
    let intArray: number[] = []
    for (let index = 0; index < n + 1; index++) {
        intArray.push(0)
    }

return fibonacciDynamic(n, intArray );
}
console.time('fibonacciDynamicEntre')
console.log(fibonacciDynamicEntre(count))
console.timeEnd('fibonacciDynamicEntre')

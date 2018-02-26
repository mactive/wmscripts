// 获得第 N 个斐波那契数列的元素
function genFibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    else {
        return genFibonacci(n - 1) + genFibonacci(n - 2);
    }
}
for (let index = 1; index < 20; index++) {
    console.log(genFibonacci(index));
}

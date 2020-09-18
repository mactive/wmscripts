// 获得第 N 个斐波那契数列的元素
function * fibonacciQ(n:number):IterableIterator<number>{
    const infinite = !n && n!== 0;
    let current = 0;
    let next = 1;

    while(infinite || n--) {
        yield current;
        [current, next] = [next, current + next]
    }
}

// 扩展运算符(spread)是三个点(...),它好比rest参数的逆运算,将一个数组转为用逗号分隔的参数序列
let [start,...first10] = fibonacciQ(100);
console.log(first10)


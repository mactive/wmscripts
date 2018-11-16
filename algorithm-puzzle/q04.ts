/**
 * n个人切棍, 切成每个都是1cm的长度, 问最少切多少current次
 * @param m 个人
 * @param n 长度cm
 * @param current 切分次数 
 */
function cutbar(m:number, n:number, current:number):number {
    if(current >= n) {
        return 0;
    } else if(current < m) {
        // 接下来的根数 是现在根数的2倍
        return 1 + cutbar(m, n, current * 2);
    } else {
        // 加上切分次数
        return 1 + cutbar(m, n, current + m)
    }
}

console.log(cutbar(3, 20, 1))
console.log(cutbar(5, 100, 1))
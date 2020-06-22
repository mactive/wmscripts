
// 连续相加
function recurseAdd(a: number) : number {
    if (a === 1) return 1
    return a + recurseAdd(a - 1);
}

const t = recurseAdd(5)
console.log(t)



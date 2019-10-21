// 判断a是否b的子序列
function isSequence(a, b) {
    let i = 0
    let j = 0

    while(i < a.length && j < b.length) {
        if(a[i] === b[j]) i++
        j++
    }

    return i === a.length
}

// 判断a是否b的子串
function isSequence2(a, b) {
    let index = b.indexOf(a)
    return index
}


console.log(isSequence("abc", "1234a1b2c356"))

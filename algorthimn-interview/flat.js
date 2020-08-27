// 手动实现数组拍平
let arr = [1 , 2, [3, [4, 5], "a"]];
var result = []
const flat = (source) => {
    if (Array.isArray(source)) {
        source.forEach(item => {
            flat(item)
        })
    } else {
        result.push(source)
    }
}

flat(arr)
console.log(result)
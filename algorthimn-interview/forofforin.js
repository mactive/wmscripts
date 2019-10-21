// for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。 
// 所以for in更适合遍历对象，不要使用for in遍历数组。
// 而 for of 对象会直接报错

let obj = {
    "apple": 3.14,
    "banana": 2.55,
    "pear": 1.34
}
let arr = [1,2,3,4]

for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        console.log(key, element)
    }
}

for (const iterator of arr) {
    console.log(iterator)
}
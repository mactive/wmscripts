function quickSort(arr) {
    // 处理边界
    if(arr.length <= 1) { return arr}
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let index = 0; index < arr.length; index++) {
        if(arr[index] < pivot) {
            left.push(arr[index])
        } else {
            right.push(arr[index])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

console.log(quickSort([1,2,4,5,-1,-8,-3,6,7,0]))
console.log(quickSort([1,0]))
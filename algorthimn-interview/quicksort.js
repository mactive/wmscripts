/**
 * 在数据集之中，选择一个元素作为"基准"（pivot）。
 * 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
 * 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 * https://juejin.im/post/5966f57051882568b20dc3e1
 */


function quickSort(arr) {
    if (arr.length <= 1) { return arr; }
    // 找到中间的值
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = []
    let right = []
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]); //pivot会被放到right去
        }
    }
    // 组合两个数组
　　return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort([1,5,6,3,2,9,8,0,-1,-2,-5]))
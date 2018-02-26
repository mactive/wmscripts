/**
 * 从小到大排列 快速排序算法的递归实现
 * @param array 
 */
const quickSort = (array: number[]):number[] => {
    if(array.length < 2) {
        return array;
    }
    const pivot = array[0];
    const keysAreLessPivot = array.slice(1).filter(key => key <= pivot);
    const keysAreMorePivot = array.slice(1).filter(key => key > pivot);
    console.log({keysAreLessPivot, pivot, keysAreMorePivot})
    return [...quickSort(keysAreLessPivot), pivot, ...quickSort(keysAreMorePivot)];
}

// console.log(quickSort([10,5,2,3]));

const quickSortDesc = (array: number[]):number[] => {
    if(array.length < 2) {
        return array;
    }
    const pivot = array[0];
    const keysAreLessPivot = array.slice(1).filter( key => key <= pivot);
    const keysAreMorePivot = array.slice(1).filter( key => key > pivot);
    console.log({keysAreMorePivot, pivot, keysAreLessPivot});
    return [...quickSortDesc(keysAreMorePivot), pivot, ...quickSortDesc(keysAreLessPivot)]
}

console.log(quickSortDesc([10,5,2,8]));


"use strict";
// Selection Sort - O(log n^2)
// Parameter:
// 1. random array
// 1. Finds the smallest value in an array
const findSmallestIndex = (array) => {
    let smallestElement = array[0];
    let smallestIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] < smallestElement) {
            smallestElement = array[i];
            smallestIndex = i;
        }
    }
    return smallestIndex;
};
// 2. sorts the array
const selectionSort = (array) => {
    const sortedArray = [];
    // 这一步很必要, 因为下面会改变array的长度
    const length = array.length;
    for (let i = 0; i < length; i++) {
        const smallestIndex = findSmallestIndex(array);
        // get the element and remove it from array
        const smallestElement = array.splice(smallestIndex, 1)[0];
        console.log('array', array);
        sortedArray.push(smallestElement);
    }
    return sortedArray;
};
let array = [3, 5, 8, 2, 1, 0.2];
console.log(selectionSort(array));

"use strict";
const bubbleSort = (list, pointer = list.length - 1) => {
    // Base case
    if (pointer === 0) {
        return list;
    }
    // recursice case
    for (let i = 0; i < pointer; i++) {
        if (list[i] > list[i + 1]) {
            console.log(list[i], list[i + 1]);
            let temp = list[i + 1];
            list[i + 1] = list[i];
            list[i] = temp;
        }
    }
    return bubbleSort(list, pointer - 1);
};
console.log(bubbleSort([6, 9, 8, 4]));

/**
 * 二分查找
 * 前提 list 必须是一个有序(升/降序)的数组
 * 
 * 比如数组长度是N
 * 简单查找是 O(N)
 * 二分查找是 O(log2N)
 * 
 * @param {*} list 
 * @param {*} item 
 */
const binarySearch = (list, item) => {
  let low = 0;
  let high = list.length - 1;

  while(low < high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid];

    if(guess === item) {
      return mid;
    }
    if(guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}

const myList = [1, 3, 5, 7, 9]
console.log(binarySearch(myList, 5));
console.log(binarySearch(myList, 4));
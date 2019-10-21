// 数组去重

function uniqueArray(list) {
    // 1 1 2 2 4 3 5 5
    // 先排序
    list.sort();
    //
    const size = list.length;
    let slowP = 0;
    for (let fastP = 0; fastP < size; fastP++) {
        if (list[fastP] !== list[slowP]) {
            slowP++
            list[slowP] = list[fastP]
        }
        console.log(list)
    }
    return list.slice(0, slowP + 1);
}
console.log(uniqueArray([1, 1, 2, 2, 3, 4]));
console.log(uniqueArray(["a", "c", "b", "z", "A", "K", "d", "D", "a"]));


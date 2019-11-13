function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        }
        else if (value1 > value2) {
            return 1;
        }
        else {
            return 0;
        }
    };
}
let items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic', value: 13 },
    { name: 'Zeros', value: 37 }
];
console.log(items);
let valueCompareFunc = createComparisonFunction('value');
let sorted = items.sort(valueCompareFunc);
console.log(sorted);

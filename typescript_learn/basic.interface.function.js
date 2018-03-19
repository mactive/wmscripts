let mySum = function (x, y) {
    return x + y;
};
let myMulti = (a, b) => {
    return a * b;
};
let mySearch;
mySearch = (source, substring) => {
    return source.search(substring) !== -1;
};
/**
 * 没有重载之前
 *
 * @param {(number | string)} x
 * @returns {(number | string)}
 */
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
reverse(123);
reverse('abc');

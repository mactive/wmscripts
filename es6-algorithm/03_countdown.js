const countdown = (count) => {
    console.log(count);
    if (count <= 0) {
        return null;
    }
    countdown(count - 1);
    return null;
};
countdown(5);
/**
 * 阶乘 factorial
 * @param x
 */
const fact = (x) => {
    if (x === 1) {
        return 1;
    }
    else {
        return x * fact(x - 1);
    }
};
console.log(fact(5));

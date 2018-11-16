function reverse(str: string) {
    return str.split("").reverse().join("");
}

var num = 11;
while(true) {
    if(
        num.toString() === reverse(num.toString()) &&
        num.toString(2) === reverse(num.toString(2)) &&
        num.toString(8) === reverse(num.toString(8))
    ) {
        console.log(num);
        break;
    }
    num += 2;
}
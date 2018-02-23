const op = "*";
function situation(num) {
    while (num < 999) {
        let c = String(num);
        let val = c.charAt(0) + op + c.charAt(1) + c.charAt(2);
        let valRes = c.charAt(2) + c.charAt(1) + c.charAt(0);
        num += 1;
        if (eval(val) === parseInt(valRes)) {
            console.log(val + '==' + valRes);
            continue;
        }
    }
}
situation(100);

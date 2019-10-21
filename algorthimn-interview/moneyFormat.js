
function moneyFormat(num) {
    // 123456789
    // 123,456,789
    const res = [];
    const decimalIndex = num.indexOf(".");
    const hasDecimal = decimalIndex > -1;
  
    for (let i = num.length - 1; i > -1; i--) {
      let cur = 1;
      while (hasDecimal && i >= decimalIndex) {
        res.unshift(num[i]);
        i--;
      }
      while (cur < 3) {
        res.unshift(num[i]);
        cur++;
        i--;
      }
      res.unshift(num[i]);
      res.unshift(",");
    }
  
    if (res[0] === ",") res.shift();
  
    return res.join("");
  }
  

function moneyFormatReg(num) {
    let reg1 = /(\d)(?=(\d{3})+(?!\d))/  // old
    let reg2 = /(\d)(?=(?:\d{3})+$)/g   // new
    let reg3
    if(num.includes('.')) {
        reg3 = /(\d)(?=(\d{3})+\.)/g   // my
    } else {
        reg3 = /(\d)(?=(\d{3})+$)/g   // my
    }
    
    return num.replace(reg3, $1 => $1 + ",");
}

console.log(moneyFormat("12312123.78"))
console.log(moneyFormatReg("12312123.78"))
console.log(moneyFormat("1234567890"))
console.log(moneyFormatReg("1234567890"));

var number=1234567891.23;
console.log(number.toLocaleString());//1,234,567,891.23

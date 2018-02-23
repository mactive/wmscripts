const op = "*";

function situation(num:number) {
    while(num < 999) {
        let c:string = String(num);
        let val:string = c.charAt(0)+op+c.charAt(1)+c.charAt(2);
        let valRes:string = c.charAt(2)+c.charAt(1)+c.charAt(0);
        num +=1;
        if(eval(val) === parseInt(valRes)){
            console.log(val+'=='+valRes);
            continue;
        }
    }
}

situation(100);


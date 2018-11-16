// 函数的合并
function reverse(x:number): number;
function reverse(x:string): string;
function reverse(x: number | string): number | string {
  if(typeof x === 'number'){
    return Number(x.toString().split('').reverse().join(''));
  } else if(typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}



interface Alarm {
  price: number;
  alert(s: string, n: number): string;
}

interface Alarm {
  decibel: number;
  weight: number;
}

/**
 * 重复定义 decibel, 但是类型改变了
 * 
 * @interface Alarm
 */
interface Alarm {
  decibel: number | string;
}
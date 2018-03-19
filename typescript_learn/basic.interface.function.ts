let mySum = function (x: number, y: number): number {
  return x+y;
}

/**
 * 用接口来约束函数 example 1 
 * 
 * @interface IMySum
 */
interface IMySum {
  (x: number, y: number): number;
}

let myMulti: IMySum = (a: number, b: number ): number => {
  return a * b;
}

/**
 * 用接口来约束函数 example 2
 * 
 * @interface SearchFunc
 */
interface SearchFunc {
  (source: string, subString: string) : boolean;
}

let mySearch: SearchFunc;
mySearch = (source: string, substring: string ) => {
  return source.search(substring) !== -1;
}

/**
 * 重载方法 -1- 参数类型 number
 * 
 * @param {number} x 
 * @returns {number} 
 */
function reverse(x: number): number;

/**
 * 重载方法 -2- 参数类型 number
 * 
 * @param {string} x 
 * @returns {string} 
 */
function reverse(x: string): string;
/**
 * 没有重载之前
 * 
 * @param {(number | string)} x 
 * @returns {(number | string)} 
 */
function reverse(x: number | string ): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

reverse(123);
reverse('abc')





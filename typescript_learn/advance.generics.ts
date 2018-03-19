import { log } from "util";

/**
 * 单一泛型函数
 * 
 * @template T 
 * @param {number} length 
 * @param {T} value 
 * @returns {Array<T>} 
 */
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

let arr1 = createArray<string>(4, 'x');
let arr2 = createArray<number>(5, 2);

/**
 * 多个泛型函数
 * 
 * @template T 
 * @template U 
 * @param {[T, U]} tuple 
 * @returns {[U, T]} 
 */
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, '3'])

/**
 * 如果泛型T 不一定包含属性 length, 容易编译时报错
 * 只是为了跳过编译时报错, 并不能解决你传入了一个本身并没有length 属性的值
 * loggingIdentity(1234) 还是会检查报错
 * 
 * @interface Lengthwise
 */
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg;
}

loggingIdentity('45454');
// loggingIdentity(1234)


/**
 * 多个类型参数之间也可以互相约束
 * 其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
 * 
 * @template T 
 * @template U 
 * @param {T} target 
 * @param {U} source 
 */
function copyField<T extends U, U>(target: T, source: U): T {
  for (const id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}
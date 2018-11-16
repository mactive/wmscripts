"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 单一泛型函数
 *
 * @template T
 * @param {number} length
 * @param {T} value
 * @returns {Array<T>}
 */
function createArray(length, value) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let arr1 = createArray(4, 'x');
let arr2 = createArray(5, 2);
/**
 * 多个泛型函数
 *
 * @template T
 * @template U
 * @param {[T, U]} tuple
 * @returns {[U, T]}
 */
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap([7, '3']);
function loggingIdentity(arg) {
    console.log(arg.length);
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
function copyField(target, source) {
    for (const id in source) {
        target[id] = source[id];
    }
    return target;
}
let target = { a: 1, b: 2, c: 3, d: 4 };
let source = { b: 10, d: 20 };
// source 中不能有 e:15, f:10 的字段
copyField(target, source);

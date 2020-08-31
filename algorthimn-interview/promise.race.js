/**
 * 手写Promise.all
 * 1. 接受一个promise的数组, 返回一个promise 对象
 * 2. 所有promise都执行完成了, 返回一个resolve对象
 * 3. 但凡一个 reject了,reject的值是这个第一个失败promise返回的值。
 * 4. 并行执行, 但是返回结果Arr和输入Arr一致
 */

const { resolve } = require("path");

/**
 * https://www.jianshu.com/p/7e60fc1be1b2
 * Promise.all可以将多个Promise实例包装成一个新的Promise实例。
 * 同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，
 * 而失败的时候则返回最先被reject失败状态的值。
 * 
 * 需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，
 */
let promise1 = new Promise(function (resolve, reject) {
    resolve(1);
    console.log(1)
});
let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(2);
        console.log(2)
    }, 500);
});
let promise3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject('reject error');
        // resolve(3)
        console.log(3)
    }, 300);
});


// 手写promise.race


class FakePromise {
    static race(promiseAry) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(resolve, reject)
            }
        })
    }
}



console.time('cost')
// let promiseRace = Promise.race([promise2, promise3]);
let promiseRace = FakePromise.race([promise2, promise3]);
promiseRace.then(function (res) {
    console.log('promiseRace:', res);
    console.timeEnd('cost')
})
    .catch(e => console.log('promiseRace:', e));


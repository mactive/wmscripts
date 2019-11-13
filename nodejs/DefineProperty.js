let obj = {};
obj.a = '@a';
let a_desc = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(a_desc);
Object.defineProperty(obj, 'b', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: '@b'
});
let b_desc = Object.getOwnPropertyDescriptor(obj, 'b');
console.log(b_desc);
obj.b = 'static b';
// 设定C的值
Object.defineProperty(obj, 'c', {
    get: () => {
        console.log('c is getting');
        return '@C';
    },
    set: (newValue) => {
        console.log('c is assigned');
    },
});
console.log(obj.c);
obj.c = 'static C';

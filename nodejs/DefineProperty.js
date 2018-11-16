var obj = {};
obj.a = '@a';
var a_desc = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(a_desc);
Object.defineProperty(obj, 'b', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: '@b'
});
var b_desc = Object.getOwnPropertyDescriptor(obj, 'b');
console.log(b_desc);
obj.b = 'static b';
Object.defineProperty(obj, 'c', {
    get: function () {
        console.log('c is getting');
        return '@C';
    },
    set: function (newValue) {
        console.log('c is assigned');
    }
});
console.log(obj.c);
obj.c = 'static C';
//# sourceMappingURL=DefineProperty.js.map
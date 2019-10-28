var o = {}; // 创建一个新对象

// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
    value: 37,
    writable: true,
    enumerable: true,
    configurable: true
});

// 对象o拥有了属性a，值为37

let bValue
// 在对象中添加一个属性与存取描述符的示例
Object.defineProperty(o, "b", {
    get: function () {
        return bValue;
    },
    set: function (newValue) {
        console.log('set', newValue)
        bValue = newValue;
    },
    enumerable: true,
    configurable: true
});

o.b =  'i am b' ;

console.log(o.a)
console.log(o.b)


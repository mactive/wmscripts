// 实现深拷贝 不考虑reg math function等其他类型
// JS 值类型 Number, String, Boolean, Undefined, Null, Symbol, Object
// 其中 Object 是引用类型. 不是基本类型 不可预知长度 所以内存会被分类到堆而不是栈上.
// reg math function 等其他类型展示不考虑
function deepCopy(obj) {
    // 如果是 值类型 或 null，则直接return
    if(typeof obj !== Object || obj === null) {
        return obj
    }
    let copy = {}

    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }

    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepCopy(obj[key])
        }
    }

    return copy;
}

const a = {
    a: [
        1,
        [4],
        {
            a: {
                c: [4]
            }
        }
    ]
}

const b = deepCopy(a);

console.dir(JSON.stringify(b));
    console.dir(JSON.stringify(a));
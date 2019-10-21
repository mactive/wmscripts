// 实现深拷贝 不考虑reg math function等其他类型
// JS 值类型 Number, String, Boolean, Undefined, Null, Symbol, Object
// 其中 Object 是引用类型. 不是基本类型 不可预知长度 所以内存会被分类到堆而不是栈上.

function deepCopy(o) {
    if (typeof o !== "object") return o;
    let n;
    if (Array.isArray(o)) {
        n = new Array(o.length)
        o.forEach((v, i) => (n[i] = deepCopy(v)))
    }

    // reg math function 等其他类型展示不考虑
    else if (!Array.isArray(o)) {
        n = {};
        Object.keys(o).forEach(key => {
            n[key] = deepCopy(o[key])
        })
    }

    return n;
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

a.c = "c";
console.dir(a.a[2].a);
console.dir(b.a[2].a);
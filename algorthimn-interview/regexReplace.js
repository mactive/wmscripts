/**
 * 羊肉串格式 转换成 驼峰格式
 * the-best-language -> theBestLanguage
 */

// 只需要找到-后面的那个数()是个group


let source = 'the-best-language'


function toHump(source) {
    const regex = /-(\w)/g
    return source.replace(regex, (all, letter) => {
        console.log(all,letter);
        return letter.toUpperCase()
    })
}

function toShashlik(source) {
    const regex = /([A-Z])/g
    // return source.replace(regex, (all, letter) => {
    //     console.log(all,letter);
    //     return "-"+letter.toLowerCase()
    // })
    // 简单实现
    return source.replace(regex, "-$1").toLowerCase()
}

let humpString= toHump(source);
console.log(humpString)

let originString = toShashlik(humpString)
console.log(originString)
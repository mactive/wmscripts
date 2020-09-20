const { isArray } = require("lodash")

var keysData = {
    applyInfo_0_deliveryRateName: "MT配送（专/快/递）",
    applyInfo_0_deliveryRateFee_0_feeName: "分成",
    applyInfo_0_deliveryRateFee_0_fee: "1",
    applyInfo_0_deliveryRateFee_1_feeName: "保底",
    applyInfo_0_deliveryRateFee_1_fee: "2",
    applyInfo_0_deliveryRateFee_2_feeName: "平台使用费",
    applyInfo_0_deliveryRateFee_2_fee: "3",
    applyInfo_0_startTime: "1599696000",
    applyInfo_0_endTime: "1602720000",
    applyInfo_1_deliveryRateName: "自配",
    applyInfo_1_deliveryRateFee_0_feeName: "分成",
    applyInfo_1_deliveryRateFee_0_fee: "4",
    applyInfo_1_deliveryRateFee_1_feeName: "保底",
    applyInfo_1_deliveryRateFee_1_fee: "5",
    applyInfo_1_deliveryRateFee_2_feeName: "平台使用费",
    applyInfo_1_deliveryRateFee_2_fee: "6",
    applyInfo_1_startTime: "1600473600",
    applyInfo_1_endTime: "1601942400",
    applyInfo_2_deliveryRateName: "企客",
    additionalInfo_otherPlatformOperations: "a",
    additionalInfo_averageDailyFlow: "123",
    additionalInfo_averageDailyOrderNumber: "456",
    additionalInfo_averageCustomerPrice: "789",
    additionalInfo_expectedPlatformOperations: "b",
    reason: "申请理由。。",
}
// 判断是不是数字key的方法
// pre[next] = isNaN(parseInt(item, 10)) ? {} : []

let options = []

function parseJsonRec(keyData, seprator) {
    for (const [subKey, subValue] of Object.entries(keyData)) {
        let tem = {}
        let keyArr = subKey.split(seprator)
        keyArr.reduce((pre, next, index) => {
            pre[next] = {}
            if (index === keyArr.length - 1) {
                pre[next] = subValue
            }
            return pre[next]
        }, tem)
        options.push(tem)
    }
}
function parseJsonWrapper(keyData) {
    if (typeof keyData == 'object') {
        parseJsonRec(keyData, "_",)
    }
    let res = {}
    options.forEach(item => {
        res = mergeDeep(res, item)
    })
    console.dir(JSON.stringify(res))

    reduceLevelByRules(res)
    console.dir(res)
}



// 当前在处理的对象,和当前处理的key
let curObj = null;
let curKey = '';

/**
 * 递归方法, 修改外部传入的引用对象
 * @param {需要修改的对象} obj 
 */
const reduceLevelByRules = (obj) => {
    const keys = Object.keys(obj);

    // 便利所有子对象, 是否有存在 {"0" : {object} } 类型
    const allKeyIsNum = keys.every((k) => {
        return !Number.isNaN(Number(k)) && typeof Number(k) === 'number';
    })
    // 将 {"0" : {object} } 中的object 塞入数组
    if (allKeyIsNum) {
        const values = keys.map((k) => {
            return obj[k];
        })
        curObj[curKey] = values;
    }

    for (const key in obj) {
        curObj = obj;
        if (obj.hasOwnProperty(key)) {
            curKey = key;

            if (isObjectAndNotArray(obj[key])) {
                reduceLevelByRules(obj[key]);
            }
        }
    }
}


/**
 * 判断是否是对象, 但不是数组
 * @param {*} item 
 */
function isObjectAndNotArray(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * 深度merge
 */
function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObjectAndNotArray(target) && isObjectAndNotArray(source)) {
        Object.keys(source).forEach(key => {
            if (isObjectAndNotArray(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

// applyInfo.0.deliverate => 
// applyInfo[deliverate]

function object2Array(jsonData, result) {
    if (!isObjectAndNotArray(jsonData)) {
        return
    }
    for (const [key, value] of Object.entries(jsonData)) {
        if (!isObjectAndNotArray(value)) {
            result[key] = value
            return result
        }
        const intKey = Object.keys(value)[0]
        if (isNaN(parseInt(intKey, 10))) {
            result[key] = {}
            result[key] = object2Array(value, result[key])
        } else {
            result[key] = []

            for (const seq in value) {
                let tt = object2Array(value[seq], result[key])
                result[key].push(tt)
            }
        }
    }
    return result
}


parseJsonWrapper(keysData)

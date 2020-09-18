const { isArray } = require("lodash")

var keysData = {
    applyInfo_0_deliveryRateName: "美团配送（专/快/递）",
    applyInfo_0_deliveryRateFee_0_feeName: "分成",
    applyInfo_0_deliveryRateFee_0_fee: "1",
    applyInfo_0_deliveryRateFee_1_feeName: "保底",
    applyInfo_0_deliveryRateFee_1_fee: "2",
    applyInfo_0_deliveryRateFee_2_feeName: "平台使用费",
    applyInfo_0_deliveryRateFee_2_fee: "3",
    applyInfo_0_startTime: "1599696000",
    applyInfo_0_endTime: "1602720000",
    applyInfo_1_deliveryRateName:"自配",
    applyInfo_1_deliveryRateFee_0_feeName:"分成",
    applyInfo_1_deliveryRateFee_0_fee:"4",
    applyInfo_1_deliveryRateFee_1_feeName:"保底",
    applyInfo_1_deliveryRateFee_1_fee:"5",
    applyInfo_1_deliveryRateFee_2_feeName:"平台使用费",
    applyInfo_1_deliveryRateFee_2_fee:"6",
    applyInfo_1_startTime:"1600473600",
    applyInfo_1_endTime:"1601942400",
    applyInfo_2_deliveryRateName:"企客",
    additionalInfo_otherPlatformOperations:"a",
    additionalInfo_averageDailyFlow:"123",
    additionalInfo_averageDailyOrderNumber:"456",
    additionalInfo_averageCustomerPrice:"789",
    additionalInfo_expectedPlatformOperations:"b",
    reason:"申请理由。。",
}

let options = []

function parseJsonRec(keyData, seprator) {
    for (const [subKey, subValue] of Object.entries(keyData)) {
        // [applyInfo,0,deliveryRateName]
        // obj[][][] = subValue
        let tem = {}
        let keyArr = subKey.split(seprator)
        keyArr.reduce((pre, next, index) => {
            // pre[next] = isNaN(parseInt(item, 10)) ? {} : []
            pre[next] = {}
            if (index === keyArr.length - 1) {
                pre[next] = subValue
            }
            return pre[next]
        }, tem)
        options.push(tem)
        // console.log(JSON.stringify(tem))
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
    // let result = {}
   
    dep(res)
    console.dir(res)
}



let curObj = null;
let curKey = '';

const dep = (obj) => {
 const keys = Object.keys(obj);

 const allKeyIsNum = keys.every((k) => {
   return !Number.isNaN(Number(k)) && typeof Number(k) === 'number';
 })

 if (allKeyIsNum) {
   const map = keys.map((k) => {
     return obj[k];
   })
   curObj[curKey] = map;
 }

 for (const key in obj) {
   curObj = obj;
   if (obj.hasOwnProperty(key)) {
     curKey = key;

     if (toString.call(obj[key]) === "[object Object]") {
       dep(obj[key]);
     }
   }
 }
}


// 两个功能函数
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
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
    if(!isObject(jsonData)){
        return
    }
    for (const [key, value] of Object.entries(jsonData)) {
        if(!isObject(value)){
            result[key] = value
            return result
        }
        const intKey = Object.keys(value)[0]
        if(isNaN(parseInt(intKey, 10))) {
            result[key] = {}
            result[key] = object2Array(value, result[key])
        } else {
            result[key] = []

            for(const seq in value) {
                let tt = object2Array(value[seq], result[key])
                result[key].push(tt)
            }
        }
    }
    return result
}


parseJsonWrapper(keysData)

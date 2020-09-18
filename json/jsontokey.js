var data = require('./tt.json')

// console.log(data)
// 识别数组类型的格式
let options = [];


function parseJsonRec(jsonData, parent, options){
    if(Object.keys(jsonData).length > 0){
        // ts-ignore
        for (const [subKey, subValue] of Object.entries(jsonData)) {
            let k = parent ? `${parent}_${subKey}` : subKey;
            if(typeof jsonData[subKey] == 'object'){
                //递归
                parseJsonRec(jsonData[subKey], k, options)
            }else{
                let opj = {
                    k: k,
                    v: subValue
                }
                options.push(opj)
            }
        }
    }
}
function parseJsonWrapper(jsonData){
    // let jsonData = JSON.parse(jsonDataStr);
    if(typeof jsonData == 'object'){
        parseJsonRec(jsonData, "", options)
    }
}

parseJsonWrapper(data)
options.map(item => {
    console.log(`${item.k}:"${item.v}"`)
})
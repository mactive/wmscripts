const arr = ['a','b','c','d','e'];

arr['name'] = 'mac';
for(let ele in arr) {
    // console.log(ele)
}

for(let key of arr) {
    console.log(key)
}
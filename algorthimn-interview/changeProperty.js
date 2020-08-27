let t = {a:1}
function changeT(res) {
    res = {b:2}
}

console.log('t:', t)
changeT(t)
console.log('t:', t)
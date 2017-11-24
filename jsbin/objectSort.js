var obj = {a2:'000',a1:'aaa',a3:'bbb',b:'ccc'};

for (var prop in obj) {
console.log(`obj.${prop} = ${obj[prop]}`);
}
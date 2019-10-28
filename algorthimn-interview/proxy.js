let handler = {
    get: function(target, name){
        console.log(target[name])
        return name in target ? target[name] : 37;
    }
};

let p = new Proxy({}, handler);

p.a = 1;
p.b = undefined;

console.log(p.a, p.b);    // 1, undefined

console.log('c' in p, p.c);    // false, 37
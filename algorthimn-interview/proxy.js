const target = {
    name: 'Billy Bob',
    age: 15
}

const handler = {
    get (target, key, proxy) {
        const today = new Date();
        console.log(`Get request made for ${key} at ${today}`)
        return Reflect.get(target, key, proxy)
    }
}

const proxyObj = new Proxy(target, handler)
console.log(proxyObj.name)
export function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log('target:', target)
    console.log('propertyKey:', propertyKey)
    console.log('descriptor:', descriptor)
}


class Test {
    @log
    public hello(name: string) : string {
        console.log('hello: ')
        return `return ${name}`
    }
}


let test = new Test()
test.hello('John')
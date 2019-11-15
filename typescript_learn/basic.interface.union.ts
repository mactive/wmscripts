/**
 * union type
 */

function print(text: string | string[]): string {
    if(typeof text === 'string') {
        return text
    } else {
        return text.join(' ')
    }
}

let x = print('hello text')
let y = print(['hello', 'text', 'array'])

// let z = print(5) // Argument of type '5' is not assignable to parameter of type 

console.log(x)
console.log(y)

/**
 * union interface
 */

interface IStudent {
    id: string;
    age: number;
}

interface IWorker {
    company: string;
}

type IUnionType = IStudent | IWorker;

let p: IUnionType = {
    id: '001',
    age: 20,
}
// 可以重新自定义
p = {
    company: 'apple'
}

// you can try this
type ICombineType = IStudent & IWorker;

/**
 * Type Guards in Typescript
 */
class Student {
    study(){

    }
}

class Professor {
    teach() {

    }
}

function getPerson(n: number): Student | Professor {
    if(n === 1) {
        return new Student()
    } else {
        return new Professor()
    }
}

let person: Student | Professor = getPerson(1)
if (person instanceof Student) {
    person.study()
} else {
    person.teach()
}

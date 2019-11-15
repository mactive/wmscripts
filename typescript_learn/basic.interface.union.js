/**
 * union type
 */
function print(text) {
    if (typeof text === 'string') {
        return text;
    }
    else {
        return text.join(' ');
    }
}
let x = print('hello text');
let y = print(['hello', 'text', 'array']);
// let z = print(5) // Argument of type '5' is not assignable to parameter of type 
console.log(x);
console.log(y);
let p = {
    id: '001',
    age: 20,
};
// 可以重新自定义
p = {
    company: 'apple'
};
/**
 * Type Guards in Typescript
 */
class Student {
    study() {
    }
}
class Professor {
    teach() {
    }
}
function getPerson(n) {
    if (n === 1) {
        return new Student();
    }
    else {
        return new Professor();
    }
}
let person = getPerson(1);
if (person instanceof Student) {
    person.study();
}
else {
    person.teach();
}

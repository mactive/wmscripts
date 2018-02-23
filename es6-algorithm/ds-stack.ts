// data-structure-and-algorithms-with-ES6
function stack(data:any[] = [], t:number = 0) {
    let dataStore = data;
    let top = t;

    const stackProto = {
        push (element){
            dataStore[top++] = element;
        },
        pop: () => dataStore.splice(--top,1),
        pop2: () => dataStore.pop(),
        peek: () => dataStore[top-1],
        length: () => top,
        isEmpty: () => top === 0,
        getStack: () => dataStore
    }

    return Object.create(stackProto)
}

const stack1 = stack([1,3,5],3);
stack1.push(7);
stack1.push(9);
console.log(stack1.peek())
console.log(stack1.length())
console.log(stack1.pop())
console.log(stack1.length())

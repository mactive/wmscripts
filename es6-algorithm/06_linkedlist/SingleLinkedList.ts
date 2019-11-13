import List from './List'


class SingleNode<T> {
    public value: T
    public next: SingleNode<T> | null

    constructor(value: T, next: SingleNode<T> | null = null) {
        this.value = value
        this.next = next
    }
}

class SingleLinedList<T> implements List<T> {
    private readonly head: SingleNode<T>

    constructor() {
        this.head = new SingleNode<any>(null)
    }

    public findByValue(value: T): SingleNode<T> | null {
        let p = this.head
        while(p.next) {
            if(p.next.value === value) {
                return p.next
            } else {
                p = p.next
            }
        }
        return p.next
    }

    public findByIndex(index: number): SingleNode<T> | null {
        let p = this.head
        let pos = 0
        while(p.next != null && pos !== index) {
            p = p.next
            pos++
        }
        return p.next
    }

    public insertToHead(value: T): void {
        const newNode = new SingleNode(value, null)
        this.insertNodeToHead(newNode)
    }

    public insertToTail(value: T): void {
        const newNode = new SingleNode(value, null)
        this.insertNodeToTail(newNode)
    }

    private insertNodeToHead(node: SingleNode<T>): void {
        node.next = this.head.next
        this.head.next = node
        console.log('Insert',node.value)
    }

    private insertNodeToTail(node: SingleNode<T>): void {
        let p = this.head
        // 经典向后遍历
        while(p.next !== null) {
            p = p.next
        }
        p.next = node
    }

    public toString(): string {
        let ret: string = ''
        let p = this.head
        while (p.next != null) {
            ret = `${ret} -> ${p.next.value} `
            p = p.next
        }
        return ret
    }
}


const single = new SingleLinedList<string>()
single.insertToHead('T5')
single.insertToHead('T4')
single.insertToHead('T3')
single.insertToHead('T2')
single.insertToHead('T1')

single.insertToTail('T6')
single.insertToTail('T7')
single.insertToTail('T8')
single.insertToTail('T9')


console.log(single.findByValue('T3'))
console.log(single.toString())
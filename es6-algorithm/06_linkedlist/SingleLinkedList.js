"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SingleNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class SingleLinedList {
    constructor() {
        this.head = new SingleNode(null);
    }
    findByValue(value) {
        let p = this.head;
        while (p.next) {
            if (p.next.value === value) {
                return p.next;
            }
            else {
                p = p.next;
            }
        }
        return p.next;
    }
    findByIndex(index) {
        let p = this.head;
        let pos = 0;
        while (p.next != null && pos !== index) {
            p = p.next;
            pos++;
        }
        return p.next;
    }
    insertToHead(value) {
        const newNode = new SingleNode(value, null);
        this.insertNodeToHead(newNode);
    }
    insertToTail(value) {
        const newNode = new SingleNode(value, null);
        this.insertNodeToTail(newNode);
    }
    insertNodeToHead(node) {
        node.next = this.head.next;
        this.head.next = node;
        console.log('Insert', node.value);
    }
    insertNodeToTail(node) {
        let p = this.head;
        // 经典向后遍历
        while (p.next !== null) {
            p = p.next;
        }
        p.next = node;
    }
    toString() {
        let ret = '';
        let p = this.head;
        while (p.next != null) {
            ret = `${ret} -> ${p.next.value} `;
            p = p.next;
        }
        return ret;
    }
}
const single = new SingleLinedList();
single.insertToHead('T5');
single.insertToHead('T4');
single.insertToHead('T3');
single.insertToHead('T2');
single.insertToHead('T1');
single.insertToTail('T6');
single.insertToTail('T7');
single.insertToTail('T8');
single.insertToTail('T9');
console.log(single.findByValue('T3'));
console.log(single.toString());

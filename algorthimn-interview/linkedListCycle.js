var hasCycle = function(head) {
    if(head === null) return false 
    if(head.next === null) return false

    let fast = head.next
    let slow = head

    while(fast && fast.next) {
        if(fast === slow) return true;
        slow = slow.next
        const next = fast.next
        fast = next && next.next
    }

    return false
}
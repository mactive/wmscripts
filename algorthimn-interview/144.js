function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function insertNode(tree, value) {
    var node = tree,
        key;
    while (node.value !== value) {
         key = value < node.value ? 'left' : 'right';
         if (!node[key]) {
             node[key] = new Node(value);
             break;
         }
         node = node[key];
    }
    return tree;
}

var array = [8, 10, 12, 5, 3, 6],
    tree = array.reduce(
        (t, v) => t ? insertNode(t, v) : new Node(v), // Accumulator (acc) (累计器)
        null // Current Value (cur) (当前值)
    );

console.log(tree);

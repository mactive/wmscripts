/**
 * 先从数组构造二叉树
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function Node(val) {
    this.val = val
    this.left = null
    this.right = null
}

/**
 * 
 * @param source 数据
 * @param len 总长度
 * @param index 游标
 */
function buildTreeWithPreorder(source: number[], len: number, index: number) {
    if (index >= len) {
		  return null;
    }

    let treeNode = new Node(source[index])
    treeNode.left = buildTreeWithPreorder(source, len, 2 * index + 1) 
    treeNode.right = buildTreeWithPreorder(source, len, 2 * index + 2)
    return treeNode
}

const ps = [4,2,7,1,3,6,9]
let theTree = buildTreeWithPreorder(ps, ps.length, 0)
console.log(theTree)


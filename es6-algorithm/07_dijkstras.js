"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphD = {};
graphD.start = {};
graphD.start.a = 6;
graphD.start.b = 2;
graphD.a = {};
graphD.a.fin = 1;
graphD.b = {};
graphD.b.a = 3;
graphD.b.fin = 5;
graphD.fin = {};
// the costs table
// 初始默认值
const costs = {};
costs.a = 6;
costs.b = 2;
costs.fin = Infinity;
// the parents table
// 因为start 已经确定, 有的节点是能确定parent的, 不过fin 不行
const parents = {};
parents.a = 'start';
parents.b = 'start';
parents.fin = null;
let processed = [];
function findLowestCostNode(costs) {
    let lowestCost = Infinity;
    let lowestNode = null;
    for (let key of Object.keys(costs)) {
        const cost = costs[key];
        if (cost < lowestCost && processed.indexOf(key) === -1) {
            lowestCost = cost;
            lowestNode = key;
        }
    }
    return lowestNode;
}
let node = findLowestCostNode(costs);
while (node !== null) {
    const cost = costs[node];
    // go through all the neighbors of this node 
    const neighbors = graphD[node];
    for (let nKey of Object.keys(neighbors)) {
        const newCost = cost + neighbors[nKey];
        if (costs[nKey] > newCost) {
            costs[nKey] = newCost;
            parents[nKey] = node;
        }
    }
    processed = processed.concat(node);
    node = findLowestCostNode(costs);
}
console.log(costs);

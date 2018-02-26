import { promisify } from "util";

const graphD: any = {};
graphD.start = {};
graphD.start.a = 5;
graphD.start.b = 2;

graphD.a = {};
graphD.a.c = 4;
graphD.a.d = 2;

graphD.b = {};
graphD.b.a = 8;
graphD.b.d = 7;

graphD.c = {};
graphD.c.d = 6;
graphD.c.fin = 3;

graphD.d = {};
graphD.d.fin = 1;

graphD.fin = {};


// the costs table
// 初始默认值
const costs: any = {};
costs.a = 5;
costs.b = 2;
costs.c = Infinity;
costs.d = Infinity;
costs.fin = Infinity;

// the parents table
// 因为start 已经确定, 有的节点是能确定parent的, 不过fin 不行
const parents: any = {};
parents.a = 'start';
parents.b = 'start';
parents.c = null;
parents.d = null;
parents.fin = null;

let processed: string[] = [];

function findLowestCostNode(costs: any):string {
  let lowestCost = Infinity;
  let lowestNode = null;
  for(let key of Object.keys(costs)) {
    const cost = costs[key];
    if(cost < lowestCost && processed.indexOf(key) === -1) {
      lowestCost = cost;
      lowestNode = key;
    }
  }
  return lowestNode!;
}

let node = findLowestCostNode(costs);

while(node !== null) {
  const cost = costs[node];
  // go through all the neighbors of this node 
  const neighbors = graphD[node];
  for(let nKey of Object.keys(neighbors)) {
    const newCost = cost + neighbors[nKey];
    if(costs[nKey] > newCost) {
      costs[nKey] = newCost;
      parents[nKey] = node;
    } 
  }

  processed = processed.concat(node);
  node = findLowestCostNode(costs);
}

console.log(costs);

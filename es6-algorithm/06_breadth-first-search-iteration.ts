import graph from './06_graph';

const isSeller = (name:string) => name[name.length - 1] === 'm';

/**
 * 搜索关系图谱
 * 
 * @param {string} name 
 * @param {*} graph 
 * @returns {boolean} 
 */
function search(name:string, graph:any): boolean {
  const iter = (waited: string[], visited:  Set<string>): boolean => {
    if(waited.length === 0) {
      return false;
    }
    const [current, ...rest] = waited;
    // 避免重复查找
    if(visited.has(current)) {
      return iter(rest, visited);
    }
    if(isSeller(current)) {
      console.log(`${current} is a mango seller`);
      return true;
    }
    visited.add(current);
    const personFirends = graph[current];
    return iter([...rest, ...personFirends], visited);
  }
  return iter(graph[name], new Set());
};

search('you', graph);
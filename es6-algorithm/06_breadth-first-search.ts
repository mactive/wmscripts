const personIsSeller = (name:string) => name[name.length - 1] === 'm';

const graph:any = {};
graph.you = ['alice', 'bob', 'claire'];
graph.alice = ['peggy'];
graph.bob = ['anuj', 'peggy'];
graph.claire = ['thom', 'jonny'];
graph.anuj = ['nam'];
graph.peggy = [];
graph.thom = [];
graph.jonny = [];
graph.nam = [];

const search = (name: string) => {
  let searchQueue: string[] = [];
  searchQueue = searchQueue.concat(graph[name]);

  const searched: string[] = [];
  while(searchQueue.length) {
    // 第一个元素就是要查找的
    const person: string = searchQueue.shift()!;
    if(searched.indexOf(person) === -1) {
      if(personIsSeller(person)) {
        console.log(`${person} is mango seller!`);
        // return true;
      }
      searchQueue = searchQueue.concat(graph[person]);
      searched.push(person);
    }
  }
  return false;
}

console.log(search('you'))
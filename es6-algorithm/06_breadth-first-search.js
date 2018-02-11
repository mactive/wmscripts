"use strict";
const personIsSeller = (name) => name[name.length - 1] === 'm';
const graph = {};
graph.you = ['alice', 'bob', 'claire'];
graph.alice = ['peggy'];
graph.bob = ['anuj', 'peggy'];
graph.claire = ['thom', 'jonny'];
graph.anuj = ['nam'];
graph.peggy = [];
graph.thom = [];
graph.jonny = [];
graph.nam = [];
const search = (name) => {
    let searchQueue = [];
    searchQueue = searchQueue.concat(graph[name]);
    const searched = [];
    while (searchQueue.length) {
        const person = searchQueue.shift();
        if (searched.indexOf(person) === -1) {
            if (personIsSeller(person)) {
                console.log(`${person} is mango seller!`);
                // return true;
            }
            searchQueue = searchQueue.concat(graph[person]);
            searched.push(person);
        }
    }
    return false;
};
console.log(search('you'));

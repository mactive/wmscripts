class Item {
    constructor(id) {
        this.id = id;
    }
}
class ItemsCache {
    constructor(itemsConstructor) {
        this.itemsConstructor = itemsConstructor;
        this.itemsCache = {};
    }
    createItem(id) {
        if (!!this.itemsCache[id]) {
            return this.itemsCache[id];
        }
        const item = new this.itemsConstructor(id);
        this.itemsCache[id] = item;
        return item;
    }
}
const cache = new ItemsCache(Item);
const item1 = cache.createItem('a');
const item2 = cache.createItem('b');
const item3 = cache.createItem('a');
console.log('item1:', item1);
console.log('item2:', item2);
console.log('item3:', item3);
console.log('imte1 and item3:', item1 === item3);

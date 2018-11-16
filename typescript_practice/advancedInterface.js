var Item = (function () {
    function Item(id) {
        this.id = id;
    }
    return Item;
}());
var ItemsCache = (function () {
    function ItemsCache(itemsConstructor) {
        this.itemsConstructor = itemsConstructor;
        this.itemsCache = {};
    }
    ItemsCache.prototype.createItem = function (id) {
        if (!!this.itemsCache[id]) {
            return this.itemsCache[id];
        }
        var item = new this.itemsConstructor(id);
        this.itemsCache[id] = item;
        return item;
    };
    return ItemsCache;
}());
var cache = new ItemsCache(Item);
var item1 = cache.createItem('a');
var item2 = cache.createItem('b');
var item3 = cache.createItem('a');
console.log('item1:', item1);
console.log('item2:', item2);
console.log('item3:', item3);
console.log('imte1 and item3:', item1 === item3);
//# sourceMappingURL=advancedInterface.js.map
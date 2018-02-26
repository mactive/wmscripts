/**
 * 贪婪算法不一定是最优解, 但是也能有 O(n^2) 的时间复杂度
 * 也比 完全穷举 O(n!) 的时间复杂度低一些.
 * 解决NP完全问题的, 最佳的做法是使用近似算法.
 * 对于NP完全问题, 还没有找到快速解决方案.
 */
let statesNeeded = new Set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az']);
const stations = {};
stations.kone = new Set(['id', 'nv', 'ut']);
stations.ktwo = new Set(['wa', 'id', 'mt']);
stations.kthree = new Set(['or', 'nv', 'ca']);
stations.kfour = new Set(['nv', 'ut']);
stations.kfive = new Set(['ca', 'az']);
const finalStations = new Set();
while (statesNeeded.size) {
    let bestSatation = null;
    let statesCovered = new Set();
    for (let station of Object.keys(stations)) {
        // 某组值
        const states = stations[station];
        // 取 statesNeeded 和 states 的交集
        const covered = new Set([...statesNeeded].filter(x => states.has(x)));
        if (covered.size > statesCovered.size) {
            bestSatation = station;
            statesCovered = covered;
        }
    }
    // 将已经覆盖到从 statesNeeded 中删除
    statesNeeded = new Set([...statesNeeded].filter(x => !statesCovered.has(x)));
    finalStations.add(bestSatation);
}
console.log(finalStations);

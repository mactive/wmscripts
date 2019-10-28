## fiber  纤程

其实协程和线程并不一样，协程本身是没有并发或者并行能力的（需要配合线程），它只是一种控制流程的让出机制。

为了不让渲染阻断用户的响应. react 在但形成的js 中自己搞了 fiber纤程
分为两部分 
* render/reconciliation
* commit

### reconciliation 
可以被打断, diff算法依然可用
React 在 workingProgressTree 上复用 current 上的 Fiber 数据结构来一步地（通过requestIdleCallback）来构建新的 tree，标记处需要更新的节点，放入队列中。

### commit
不可以打断. React讲其所有的变更一次性更新到DOM上
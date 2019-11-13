interface List<T> {
    // ? 可选实现
    insertToHead?(value: T): void

    findByValue(value: T) : void

    findByIndex(index: number): void

    insertToIndex?(value: T): void

    remove?(value: T): void

    insertToTail?(value: T): void

    toString?(): string
}

export default List
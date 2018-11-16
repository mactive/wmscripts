/**
 * Class
 * Object
 *
 * Encapsulation 封装
 *
 * Inheritance 继承
 *
 * Polymorphism 多态 由继承而产生了相关的不同的类，
 * 对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，
 * 但是分别实现了自己的 eat 方法。此时针对某一个实例，
 * 我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，
 * 程序会自动判断出来应该如何执行 eat
 *
 * 修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
 *
 * 接口 Interface 不同类之前共有的属性或方法. 接口可以被类实现(implements). 一个类智能继承自另一个类, 但是可以实现多个接口.
 */
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
        this.catName = `Car ${this.name}`;
        console.log(this.catName);
    }
}
let catA = new Cat('Tom');

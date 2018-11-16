/**
 * 抽象类是不允许被实例化的
 * 抽象类中的抽象方法必须被子类实现
 * 抽象类 智能定义抽象方法
 *
 * @abstract
 * @class Animal
 */
class Animal {
    constructor(name) {
        this.name = name;
    }
}
Animal.NUMBER = 10;
class Cat extends Animal {
    eat() {
        console.log(`${this.name} ${Animal.NUMBER} is eating.`);
    }
    /**
     * 抽象类中的抽象方法必须被子类实现
     *
     * @memberof Cat
     */
    sayHi() {
        console.log('sayHi');
        this.eat();
    }
}
let catA = new Cat('Tom');
catA.sayHi();

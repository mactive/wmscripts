"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function log(target, propertyKey, descriptor) {
    console.log('target:', target);
    console.log('propertyKey:', propertyKey);
    console.log('descriptor:', descriptor);
}
exports.log = log;
class Test {
    hello(name) {
        console.log('hello: ');
        return `return ${name}`;
    }
}
__decorate([
    log
], Test.prototype, "hello", null);
let test = new Test();
test.hello('John');

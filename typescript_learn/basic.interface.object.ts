/**
 * error TS2411: Property 'age' of type 'number' is not assignable 
 * to string index type 'string'.
 * 
 * 因为如果设计了 [xx:any]:any 的样式就会约束已经定义的值, 而 age 是个 number
 * 所以需要给 propName 加上联合类型
 * 
 * @interface Person
 */
interface Person {
  name: string;
  age?: number;
  [propName: string] : string | number;
}


// 只读属性

/**
 * error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
 * 
 * 因为有 readonly 类型约束的 id 只能在初始化的时候被定义, 之后就不能再被定义
 * 
 * @interface Identity
 */
interface Identity {
  readonly id: number;
  name: string;
  age: number;
  [propName: string] : any;
}

let p1: Identity = {
  id: 111,
  name: 'name',
  age: 34
}

// error TS2540: 
// p1.id = 12312312;

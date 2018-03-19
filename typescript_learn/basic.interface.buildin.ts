/**
 * 将一个联合类型的变量指定为一个更加具体的类型
 * 
 * 使用类型断言, 将 something 断言成 string
 * (<string>something)
 * 
 * 注意这里不是类型转换
 * 
 * @param {(string | number)} something 
 * @returns {number} 
 */
function getLength(something: string | number):number {
  if((<string>something).length){
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}

declare var jQuery: (string) => any;

jQuery('#foo')

console.log(Math.pow(10, 2));

// 内置定义
let b: Error = new Error('Error occurred');
let d: Date = new Date();
// not work 因为tsconfig 的 lib 有关的设置
let bodu: HTMLElement = document.body;
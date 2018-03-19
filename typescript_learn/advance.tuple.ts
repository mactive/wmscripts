let xcatliu: [string, number] = ['Xcat', 25];
xcatliu[0] = xcatliu[0].slice(1);
xcatliu[2] = xcatliu[1].toFixed(2);

// 上面的例子中，数组的第三项满足联合类型 string | number。
// xcatliu.push(true) // 这样会报错
console.log(xcatliu)


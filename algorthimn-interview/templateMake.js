/**
 * render("我是{{name}}, 年龄{{age}}", {name: "mac", age: "28"})
 * .+?
 * . 任何字符除了换行
 * + 1->n个
 * ? lazy 这样会一组一组的 不让会匹配很多
 */

 function render(template, data) {
    return template.replace(/\{\{(.+?)\}\}/g, function($1, $2){
        //$1 {{name}}
        //$2 name
        return data[$2]
    })
 }

 console.log(render("我是{{name}}, 年龄{{age}}", {name: "mac", age: "28"}))
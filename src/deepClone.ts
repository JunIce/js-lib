interface DefineObj extends Object {
    [key: string] : any
}
function isArray(obj: DefineObj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}
function isObject(obj: DefineObj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
var clone = (obj: DefineObj) => {
    let c: DefineObj = isArray(obj) ? [] : {} // 定义一个新对象
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if(isObject(obj[key])) {
                c[key] = clone(obj[key])
            }else {
                c[key] = obj[key]
            }
        }
    }
    return c
}

let ab = {
    x : 1,
    y : 'string',
    z : null,
    b : undefined,
    zx : {
        x: 1,
        y: 2
    }
}
let c = [1,2,3]
let d = clone(c)
c[1] = 10
console.log(c, d)
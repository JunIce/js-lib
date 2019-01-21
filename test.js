
function partial(fn) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function() {
        let args1 = Array.prototype.slice.call(arguments);
        return fn.apply(this, args.concat(args1));
    };
}

function compose() {
    let args = arguments;
    let start = args.length - 1;
    return function() {
        let i = start;
        let result = args[start].apply(this, arguments);

        while(i--) {
            result = args[i].call(this, result);
        }
        return result;
    }
}

function add(x, y) {
    return x + y 
}

function upperCase(s) {
    return s.toUpperCase()
}

let dd = compose(upperCase, add)
console.log(dd('hello',' world'))
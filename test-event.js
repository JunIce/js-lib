const Eventproxy = require('./eventproxy')
let event = new Eventproxy()

let count = 0
event.once('say', function(data){
    count += 1;
})
event.emit('say')
console.log(count)
event.emit('say')
console.log(count)
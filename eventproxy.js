const ALL_EVENT = '__ALL__'
function Eventproxy() {
    this._callbacks = {};
    this._fired = {}
}

/**
 * name function name
 * fn function bind
 */
Eventproxy.prototype.addEventListener = function(ev, fn) {
    this._callbacks[ev] = this._callbacks[ev] || [];
    this._callbacks[ev].push(fn);
    return this;
};

Eventproxy.prototype.bind = Eventproxy.prototype.addEventListener;
/**
 * name event name
 * fn function array
 */
Eventproxy.prototype.removeEventListener = function(name, fn) {
    var calls = this._callbacks;
    if(!name) {
        // remove all listeners
        this._callbacks = {};
    }else{
        if(!fn) {
            // remove all listeners for direct name
            calls[name] = [];
        }else{
            var fns = calls[name]
            if(!fns) return this;
            for(var i = 0, len = fns.length; i<len; i++) {
                if(fns[i] === fn) {
                    // remove specifie function
                    fns[i] = null;
                }
            }
        }
    }
    return this;
};

Eventproxy.prototype.unbind = Eventproxy.prototype.removeEventListener;
/**
 * name trigger event
 * data mix array
 */
Eventproxy.prototype.trigger = function(name, data) {
    var list, callback, i, l;
    var both = 2; // 用来区分两种情况，一种是自定义事件，一种是全局事件
    var calls = this._callbacks;
    while (both--) {
        ev = both ? name : ALL_EVENT;
        list = calls[ev];
        if(!list) continue;

        for(i = 0, l = list.length; i < l; i++) {
            if(!(callback = list[i])) {
                list.splice(i,1);
                i--;
                l--;
            }else{
                // arguments 赋值
                var args = [];
                var start = both ? 1 : 0;
                // for(var j = start; j < arguments.length; j++) {
                //     args.push(arguments[j]);
                // }
                var args = [].slice.apply(arguments)
                callback.apply(this, args.slice(start));
            }
        }
    }
    return this;
};

// put the callbacks
Eventproxy.prototype.headbind = function(ev, fn) {
    this._callbacks[ev] = this._callbacks[ev] || [];
    this._callbacks[ev].unshift(fn);
    return this; 
};

// remove all listening fn
Eventproxy.prototype.removeAllListeners = function(ev) {
    this.removeEventListener(ev);
    return this;
}
Eventproxy.prototype.emit = Eventproxy.prototype.trigger;

// immediate trigger
Eventproxy.prototype.immediate = function(ev, fn, data) {
    this.bind(ev, fn);
    this.trigger(ev, data);
    return this;
};

Eventproxy.prototype.all = function() {

};

Eventproxy.prototype.once = function(ev, fn) {
    var self = this, args = arguments;
    let wrapper = function(){
        fn.apply(self, args)
        self.unbind(ev, wrapper)
    }
    this.bind(ev, wrapper);
    return this;
};

module.exports = Eventproxy;
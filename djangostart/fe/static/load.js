String.prototype.join = function(arr) {
    var str = ''
    for (var index in arr) {
        str += String(arr[index])
        str += index == arr.length - 1 ? '' : this
    }
    return str
}

function rgb(a, b, c) {
    return "rgb(" + ",".join([a, b, c]) + ")"
}

Array.prototype.del = function(n) {
    if (n < 0) //如果n<0，则不进行任何操作。
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return '-'.join([S4(), S4(), S4(), S4(), S4(), S4(), S4(), S4()])
}
var clientid =
    sessionStorage.getItem('clientid') ||
    (function() {
        var id = guid()
        sessionStorage.setItem('clientid', id)
        return id
    })()

function random(start, end) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * start + 1);
        case 2:
            return parseInt(Math.random() * (end - start + 1) + start);
        default:
            return 0;
    }
}

document.write(
    //  "<script src='/static/particle_3d_boll.js?t=" + guid() + "'></script>"
    "<script src='/static/canvas_learn.js?t=" + new Date().getTime() + "'></script>" +
    "<script src='/static/canvasBg.js?t=" + new Date().getTime() + "'></script>"
);

// "<link rel='stylesheet' type='text/css' href='lib/aYin/aYin.css'>" +
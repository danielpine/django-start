String.prototype.join = function(arr) {
    var str = ''
    for (var index in arr) {
        str += String(arr[index])
        str += index == arr.length - 1 ? '' : this
    }
    return str
}

Array.prototype.del = function(n) { //n表示第几项，从0开始算起。
    //prototype为对象原型，注意这里为对象增加自定义方法的方法。
    if (n < 0) //如果n<0，则不进行任何操作。
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
    /*
    　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
    　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
     组成的新数组，这中间，刚好少了第n项。
    　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
    */
}

var clientid =
    sessionStorage.getItem('clientid') ||
    (function() {
        var id = guid()
        sessionStorage.setItem('clientid', id)
        return id
    })()

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return '-'.join([S4(), S4(), S4(), S4(), S4(), S4(), S4(), S4()])
}

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

function rgb(a, b, c) {
    return "rgb(" + a + "," + b + "," + c + ")"
}

document.write(
    //  "<script src='/static/particle_3d_boll.js?t=" + guid() + "'></script>"
    // "<script src='/static/canvas_learn.js?t=" + new Date().getTime() + "'></script>"
    "<script src='/static/canvasBg.js?t=" + new Date().getTime() + "'></script>"
);

// //"<script src='lib/3rd/require.js'></script>"+
// "<script src='lib/aYin/aYin.js'></script>" +
// "<link rel='stylesheet' type='text/css' href='lib/aYin/aYin.css'>" +
// //"<script src='lib/3rd/clipboard/clipboard.js'></script>"+
// //"<script src='lib/3rd/scrollReveal.js'></script>"+
// "<script type='text/javascript' src='lib/3rd/particleground/jquery.particleground.min.js'></script>" +
// "<script src='lib/3rd/jquery.mousewheel.js'></script>" +
// "<script src='lib/3rd/jqScrollbar/jquery.mCustomScrollbar.js'></script>" +
// "<link rel='stylesheet' type='text/css' href='lib/3rd/jqScrollbar/jquery.mCustomScrollbar.css'>" +
// //"<script src='lib/3rd/bootstrap4/js/bootstrap.bundle.min.js'></script>"+
// "<script src='lib/3rd/popper.min.js'></script>" +
// "<script src='lib/3rd/vue/vue.js'></script>" +
// "<script src='lib/3rd/vue/vue-i18n.min.js'></script>" +
// "<script src='lib/init/i18n.js'></script>" +
// "<script src='lib/3rd/bootstrap4/js/bootstrap.min.js'></script>" +
// "<script src='lib/3rd/scrollReveal.js'></script>" +
// "<link rel='stylesheet' type='text/css' href='lib/3rd/bootstrap4/css/bootstrap.css'>" +
// "<link rel='stylesheet' type='text/css' href='lib/3rd/font-awesome/web-fonts-with-css/css/fontawesome-all.min.css'>" +
// //"<link rel='stylesheet' href='https://pro.fontawesome.com/releases/v5.0.10/css/all.css' integrity='sha384-KwxQKNj2D0XKEW5O/Y6haRH39PE/xry8SAoLbpbCMraqlX7kUP6KHOnrlrtvuJLR' crossorigin='anonymous'>"+
// "<link rel='stylesheet' type='text/css' href='lib/style/css/main.css'>" +
// //"<link rel='stylesheet/less' type='text/css' href='lib/style/css/main.less'/>"+
// //"<script src='lib/3rd/less/less.js'></script>"+
// "<script src='lib/3rd/wow/wow.min.js'></script>"
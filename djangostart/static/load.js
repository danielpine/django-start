String.prototype.join = function (arr) {
  var str = ''
  for (var index in arr) {
    str += String(arr[index])
    str += index == arr.length - 1 ? '' : this
  }
  return str
}

var clientid =
  sessionStorage.getItem('clientid') ||
  (function () {
    var id = guid()
    sessionStorage.setItem('clientid', id)
    return id
  })()

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring()
  }
  return '-'.join([S4(), S4(), S4(), S4(), S4(), S4(), S4(), S4()])
}

document.write(
  "<script src='/static/particle_3d_boll.js?t=" + guid() + "'></script>"
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
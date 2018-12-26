/* eslint-disable */
function clearStorge() {
  // console.log('关闭窗口')
  if (window.guid) {
    window.localStorage.removeItem(window.guid)
    window.localStorage.removeItem(window.guid + '-optnsched')
    window.localStorage.removeItem(window.guid + '-lowsched')
    window.localStorage.removeItem(window.guid + '-highsched')
    window.localStorage.removeItem(window.guid + '-putsched')
    window.localStorage.removeItem(window.guid + '-calsched')
    window.localStorage.removeItem(window.guid + '-digsched')
    window.localStorage.removeItem(window.guid + '-fwrdsched')
    window.localStorage.removeItem(window.guid + 'lump')
  }
  if (window.childrenWindowArray) {
    var l = childrenWindowArray.length
    for (var i = 0; i < l; i++) {
      childrenWindowArray[i].close()
    }
  }
}
window.onunload = clearStorge
//
// if (typeof window.info === 'undefined') {
//   //判断如果当前页面不为主框架，则将主框架进行跳转
//   var tagert_URL = '/deri-web/loginController.do?login';
//   if (self == top) {
//     window.location.href = tagert_URL;
//   } else {
//     top.location.href = tagert_URL;
//   }
// }
//  close all child windows while them parent close.
if (!window.childrenWindowArray) {
  window.childrenWindowArray = []
}

var fsopen = function (url) {
  window.childrenWindowArray.push(window.open(url))
}
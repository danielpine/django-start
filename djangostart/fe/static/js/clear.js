/* eslint-disable */
function clearStorge() {
  // console.log('关闭窗口')
  if (window.guid) {
    window.localStorage.removeItem(window.guid);
    window.localStorage.removeItem(window.guid + "-optnsched");
    window.localStorage.removeItem(window.guid + "-lowsched");
    window.localStorage.removeItem(window.guid + "-highsched");
    window.localStorage.removeItem(window.guid + "-putsched");
    window.localStorage.removeItem(window.guid + "-calsched");
    window.localStorage.removeItem(window.guid + "-digsched");
    window.localStorage.removeItem(window.guid + "-fwrdsched");
    window.localStorage.removeItem(window.guid + "lump");
  }
  if (window.childrenWindowArray) {
    var l = childrenWindowArray.length;
    for (var i = 0; i < l; i++) {
      childrenWindowArray[i].close();
    }
  }
}
window.onunload = clearStorge;
if (!window.childrenWindowArray) {
  window.childrenWindowArray = [];
}

var fsopen = function(url) {
  window.childrenWindowArray.push(window.open(url));
};

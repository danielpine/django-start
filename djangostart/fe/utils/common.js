export function getTime () {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  if (m < 10) {
    m = '0' + m
  }
  let d = date.getDate()
  console.log(d)
  let time = '' + y + m + d
  return time
}
export function IEVersion () {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}
export function fetchPostFormData (url, json) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // 'application/x-www-form-urlencoded'
    },
    body: json
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      alert('*****' + error)
      throw error
    })
}
export function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
export function getSessionId () {
  console.log()
}

export function getButtonStatus (dealType, book, authorities) {
  var allowTrade = false
  var allowCheck = false
  if (authorities.length > 0) {
    for (let index = 0; index < authorities.length; index++) {
      var authorinfo = authorities[index].split('~')
      var productType = dealType.split('_')[0].toUpperCase()
      switch (productType) {
        case 'FX':
          if (
            dealType.substring(0, 2) === authorinfo[1] &&
            authorinfo[2] === book
          ) {
            if (authorinfo[0] === 'trader') {
              allowTrade = true
            }
            if (authorinfo[0] === 'cheker') {
              allowCheck = true
            }
          }
          break
        case 'XCCS':
          if (
            dealType.toUpperCase() === authorinfo[1] &&
            authorinfo[2] === book
          ) {
            if (authorinfo[0] === 'trader') {
              allowTrade = true
            }
            if (authorinfo[0] === 'cheker') {
              allowCheck = true
            }
          }
          break
        case 'IRS':
        case 'SWAPTION':
        case 'CAPFLOOR':
          var dealTypeR = 'RATE'
          if (
            dealTypeR.toUpperCase() === authorinfo[1] &&
            authorinfo[2] === book
          ) {
            if (authorinfo[0] === 'trader') {
              allowTrade = true
            }
            if (authorinfo[0] === 'cheker') {
              allowCheck = true
            }
          }
          break
        default:
          break
      }
    }
  }
  return [allowTrade, allowCheck]
}

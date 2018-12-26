/* eslint-disable */
var DateUtil = {
    addTime: addTime,
    getNowDateFormat: getNowDateFormat,
    getDateFromNowDate: getDateFromNowDate,
    getNowTimeFormat: getNowTimeFormat,
    getNowDateWithTime: getNowDateWithTime,
    formatDate: formatDate,
    window: window
}

function window() {
    return window
}

// 为String类型变量增加endWith方法用于判断tenor的结尾
function endWith(str) {
    var d = str.length
    var endChar = ''
    if (d > 0) {
        endChar = str.charAt(d - 1)
    }
    return endChar
}
// 小于10的数字前加0
function formatSmallNum(num) {
    var newnum = parseInt(num)
    if (newnum < 10) {
        newnum = 0 + '' + newnum
    }
    return newnum
}
var monthbs = [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
    // 处理加减月时，当日大于28时，将新的日在新的月份中合理化
function adjustNewDay(newyear, newmonth, newday) {
    var newAdjustedDay = newday
    if (monthbs[newmonth - 1] < 1 && newday > 28) {
        if (newmonth !== 2) {
            newAdjustedDay = 30
        } else {
            if (newyear % 4 === 0 && (newyear % 100 !== 0 || newyear % 400 === 0)) {
                newAdjustedDay = 29
            } else {
                newAdjustedDay = 28
            }
        }
    }
    return newAdjustedDay
}
// 获取当月份最大天数
function getMonthMaxDays(newyear, month) {
    var newmonthdays = 31
    if (monthbs[month - 1] < 1) {
        if (month !== 2) {
            newmonthdays = 30
        } else {
            if (newyear % 4 === 0 && (newyear % 100 !== 0 || newyear % 400 === 0)) {
                newmonthdays = 29
            } else {
                newmonthdays = 28
            }
        }
    }
    return newmonthdays
}
// 用来计算增减天数的递归
function recursionDays(year, month, day, delayTime) {
    var newyear = year
    var newmonth = month
    var newday = day + delayTime
    var newmonthdays = getMonthMaxDays(year, month)
    var newdelay = 0
    if (newday <= newmonthdays) {
        newmonth = formatSmallNum(newmonth)
        newday = formatSmallNum(newday)
        return newyear + '-' + newmonth + '-' + newday
    } else {
        newmonthdays = getMonthMaxDays(year, month)
        newmonth = month + 1
        newdelay = newday - newmonthdays
        newday = 0
        if (newmonth > 12) {
            newyear = newyear + 1
            newmonth = newmonth - 12
        }
        return recursionDays(newyear, newmonth, newday, newdelay)
    }
}
// 日期计算(目前只支持tenor为M即月份，可自行扩展)
function addTime(date, delay) {
    if (date.indexOf('-') !== -1) {
        var year = parseInt(date.substring(0, 4))
        var month = parseInt(date.substring(5, 7))
        var day = parseInt(date.substring(8, 10))
    } else {
        year = parseInt(date.substring(0, 4))
        month = parseInt(date.substring(4, 6))
        day = parseInt(date.substring(6, 8))
    }
    var delayTime = 0
    var newdate = year + '-' + month + '-' + day
    var newyear = year
    var newmonth = month
    var newday = day
    if (endWith(delay) === 'M') {
        delayTime = parseInt(delay.substring(0, delay.length - 1))
        newyear = year
        newmonth = month + delayTime
        newday = day
        if (newmonth > 12) {
            newyear = newyear + 1
            newmonth = newmonth - 12
        }
        newday = adjustNewDay(newyear, newmonth, newday)
        newmonth = formatSmallNum(newmonth)
        newday = formatSmallNum(newday)
        newdate = newyear + '-' + newmonth + '-' + newday
    } else if (endWith(delay) === 'D') {
        delayTime = parseInt(delay.substring(0, delay.length - 1))
        newdate = recursionDays(year, month, day, delayTime)
    } else if (endWith(delay) === 'W') {
        delayTime = parseInt(delay.substring(0, delay.length - 1))
        newdate = recursionDays(year, month, day, delayTime * 7)
    } else if (endWith(delay) === 'Y') {
        delayTime = parseInt(delay.substring(0, delay.length - 1))
        newyear = year + delayTime
        newmonth = month
        newday = day
        if (newmonth > 12) {
            newyear = newyear + 1
            newmonth = newmonth - 12
        }
        newday = adjustNewDay(newyear, newmonth, newday)
        newmonth = formatSmallNum(newmonth)
        newday = formatSmallNum(newday)
        newdate = newyear + '-' + newmonth + '-' + newday
    } else {
        delayTime = 365 * delay
        newdate = recursionDays(year, month, day, delayTime)
    }
    return newdate
}
// var nowDate = new Date()
// var nowDateFormat = nowDate.getFullYear() + '-' + ((nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1) : '0' + (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() > 9 ? nowDate.getDate() : '0' + (nowDate.getDate()))
// var nowTimeFormat = (nowDate.getHours() > 9 ? nowDate.getHours() : '0' + (nowDate.getHours())) + ':' + (nowDate.getMinutes() > 9 ? nowDate.getMinutes() : '0' + (nowDate.getMinutes()))
function getNowDateFormat() {
    var nowDate = new Date()
    return (
        nowDate.getFullYear() +
        '-' +
        (nowDate.getMonth() + 1 > 9 ?
            nowDate.getMonth() + 1 :
            '0' + (nowDate.getMonth() + 1)) +
        '-' +
        (nowDate.getDate() > 9 ? nowDate.getDate() : '0' + nowDate.getDate())
    )
}

function getDateFromNowDate(days) {
    var now = new Date()
    now = new Date(now.getTime() + 86400000 * days)
    var yyyy = now.getFullYear()
    var mm = (now.getMonth() + 1).toString()
    var dd = now.getDate().toString()
    if (mm.length === 1) {
        mm = '0' + mm
    }
    if (dd.length === 1) {
        dd = '0' + dd
    }
    return (yyyy + '-' + mm + '-' + dd)
}

function getNowTimeFormat() {
    var nowDate = new Date()
    return (
        (nowDate.getHours() > 9 ? nowDate.getHours() : '0' + nowDate.getHours()) +
        ':' +
        (nowDate.getMinutes() > 9 ?
            nowDate.getMinutes() :
            '0' + nowDate.getMinutes())
    )
}

function getNowDateWithTime() {
    var nowDate = new Date()
    return getNowDateFormat() + '-' + getNowTimeFormat()
}

// format date.
function formatDate(value, cut) {
    if (value !== undefined) {
        var value1 = value.trim()
    } else {
        return ''
    }
    if (value.length === 8) {
        return value.substring(0, 4) + cut + value.substring(4, 6) + cut + value.substring(6, 8)
    } else if (value.length === 6) {
        return value.substring(0, 4) + cut + value.substring(4, 6)
    } else {
        return value1
    }
}
export default DateUtil
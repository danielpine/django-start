/* eslint-disable */
var heroColor = new Array('#BA9658', '#FEF26E')
var enmeyColor = new Array('#00A2B5', '#00FEFE')

//这是一个Tank类
function Tank(id, x, y, direct, color) {
    this.id = id
    this.x = x
    this.y = y
    this.speed = 3
    this.isLive = true
    this.direct = direct
        //一个坦克，需要两个颜色.
    this.color = color
        //上移
    this.moveUp = function() {
            this.y -= this.speed
            this.direct = 0
        }
        //向右
    this.moveRight = function() {
        this.x += this.speed
        this.direct = 1
    }

    //下移
    this.moveDown = function() {
            this.y += this.speed
            this.direct = 2
        }
        //左
    this.moveLeft = function() {
        this.x -= this.speed
        this.direct = 3
    }
}

//用于生成uuid
function guid() {
    function S4() {
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

var clientid =
    localStorage.getItem('clientid') ||
    (function() {
        var id = guid()
        localStorage.setItem('clientid', id)
        return id
    })()

bullet_direct = {
    0: [2, 5],
    1: [5, 2],
    2: [2, 5],
    3: [5, 2]
}

//坦克队列
var tanks = {}

function drawBullet() {
    for (var tid in window.tanks) {
        for (var bullet in window.tanks[tid].tank.bullets) {
            // cxt.fillStyle = window.tanks[tid].tank.tank_color[1]
            cxt.fillStyle = window.tanks[tid].tank.tank_color[0]
            var b = window.tanks[tid].tank.bullets[bullet]
            cxt.fillRect(
                b.x,
                b.y,
                bullet_direct[b.direct][0],
                bullet_direct[b.direct][1]
            )
        }
    }
}

//绘制坦克(敌人坦克和自己的坦克)
function drawTank() {
    //说明所有的坦克都要isLive这个属性
    for (var tid in window.tanks) {
        var tank = window.tanks[tid].tank
        if (tank.isLive) {
            // 血条
            for (var i = 0; i < tank.tank_blood; i++) {
                cxt.strokeStyle = tank.tank_color[0]
                    //设置线条的宽度
                cxt.lineWidth = 1
                cxt.beginPath()
                cxt.moveTo(tank.x + 10 * i - 30, tank.y - 15)
                cxt.lineTo(tank.x + 10 * i - 30 + 5, tank.y - 15)
                cxt.closePath()
                cxt.stroke()
            }
            for (var i = 0; i < 9 - tank.tank_blood; i++) {
                cxt.strokeStyle = '#fff'
                    //设置线条的宽度
                cxt.lineWidth = 1
                cxt.beginPath()
                cxt.moveTo(tank.x + 10 * (i + tank.tank_blood) - 30, tank.y - 15)
                cxt.lineTo(tank.x + 10 * (i + tank.tank_blood) - 30 + 5, tank.y - 15)
                cxt.closePath()
                cxt.stroke()
            }
            cxt.moveTo(tank.x, tank.y)
            switch (tank.direct) {
                case 0: //上
                case 2: // 下
                    //画出自己的坦克，使用前面的绘图技术
                    //设置颜色
                    cxt.fillStyle = tank.tank_color[0]
                        //先画出左面的矩形
                    cxt.fillRect(tank.x, tank.y, 5, 30)
                        //画出右边的矩形(这时请大家思路->一定要一个参照点)
                    cxt.fillRect(tank.x + 15, tank.y, 5, 30)
                        //画出中间矩形
                    cxt.fillRect(tank.x + 6, tank.y + 5, 8, 20)
                        //画出坦克的盖子
                    cxt.closePath()
                    cxt.beginPath()
                    cxt.fillStyle = tank.tank_color[1]
                    cxt.arc(tank.x + 10, tank.y + 15, 4, 0, 360, true)
                    cxt.fill()
                        //画出炮筒(直线)
                    cxt.strokeStyle = tank.tank_color[1]
                        //设置线条的宽度
                    cxt.lineWidth = 1.5
                    cxt.moveTo(tank.x + 10, tank.y + 15)
                    if (tank.direct == 0) {
                        cxt.lineTo(tank.x + 10, tank.y - 5)
                    } else if (tank.direct == 2) {
                        cxt.lineTo(tank.x + 10, tank.y + 35)
                    }
                    cxt.closePath()
                    cxt.stroke()
                    break
                case 1: //右和左
                case 3:
                    //画出自己的坦克，使用前面的绘图技术
                    //设置颜色
                    cxt.fillStyle = tank.tank_color[0]
                        //先画出左面的矩形
                    cxt.fillRect(tank.x, tank.y, 30, 5)
                        //画出右边的矩形(这时请大家思路->一定要一个参照点)
                    cxt.fillRect(tank.x, tank.y + 15, 30, 5)
                        //画出中间矩形
                    cxt.fillRect(tank.x + 5, tank.y + 6, 20, 8)
                        //画出坦克的盖子
                    cxt.closePath()
                    cxt.beginPath()
                    cxt.fillStyle = tank.tank_color[1]
                    cxt.arc(tank.x + 15, tank.y + 10, 4, 0, 360, true)
                    cxt.fill()
                        //画出炮筒(直线)
                    cxt.strokeStyle = tank.tank_color[1]
                        //设置线条的宽度
                    cxt.lineWidth = 1.5
                    cxt.moveTo(tank.x + 15, tank.y + 10)
                        //向右
                    if (tank.direct == 1) {
                        cxt.lineTo(tank.x + 30 + 5, tank.y + 10)
                    } else if (tank.direct == 3) {
                        //向左
                        cxt.lineTo(tank.x - 5, tank.y + 10)
                    }
                    cxt.closePath()
                    cxt.stroke()
                    break
            }
        }
    }
}

function link() {
    if (window.s && window.s.readyState == WebSocket.OPEN) {
        noticeid('tip3', 'WebSocket already open')
    } else {
        /*创建socket连接*/
        var socket = new WebSocket(
            'ws://' + window.location.host + '/rec/tank/?clientid=' + clientid
        )
        socket.onopen = function() {
            noticeid('tip3', 'WebSocket open') //成功连接上Websocket
        }
        socket.onmessage = function(e) {
                var data = JSON.parse(e.data)
                    // // console.log(data)
                if (data && data.code === 1111) {
                    // // console.log(data.status)
                    if (data.status == 1) {
                        window.tanks = data.data
                        flashTankMap()
                    } else if (data.status == 0) {
                        // console.log('游戏结束！')
                    } else if (data.status == 3) {
                        // console.log('受伤了：' + data.message)
                        notice('tip2', 'Blood :' + data.data)
                        notice('tip3', data.message)
                    } else if (data.status == 4) {
                        // console.log('死了：' + data.message)
                        notice('tip3', data.message)
                        delete tanks[data.data]
                    }
                }
            }
            // Call onopen directly if socket is already open
        if (socket.readyState == WebSocket.OPEN) socket.onopen()
        window.s = socket
    }
}

function islinking() {
    return window.s && window.s.readyState == WebSocket.OPEN
}

function send(msg) {
    if (islinking()) {
        window.s.send(JSON.stringify(msg))
    } else {
        $('#tip2').html('连接断开')
    }
}

function flashTankMap() {
    //把画布清理
    cxt.clearRect(0, 0, 1366, 768)
        //我的坦克
    drawTank()
        // noticeid('tip3', '<div align=left>' + JSON.stringify(tanks) + '</div>')
        //画出自己的子弹
    drawBullet()
    if (islinking()) {
        //send(new Msg(0, 'gameinfo', 'tanks', tanks))
    }
}

key_status = {
    16: {
        status: false,
        down: false,
        timer: null
    },
    37: {
        status: false,
        down: false,
        timer: null
    },
    38: {
        status: false,
        down: false,
        timer: null
    },
    39: {
        status: false,
        down: false,
        timer: null
    },
    40: {
        status: false,
        down: false,
        timer: null
    },
    87: {
        status: false,
        down: false,
        timer: null
    },
    68: {
        status: false,
        down: false,
        timer: null
    },
    83: {
        status: false,
        down: false,
        timer: null
    },
    65: {
        status: false,
        down: false,
        timer: null
    },
    32: {
        status: false,
        down: false,
        timer: null
    }
}

// 禁止右键菜单
document.oncontextmenu = function() {
    event.returnValue = false
}

var shot_status = {
    shotting: false,
    timer: null
}

function mousemove() {
    // // console.log(event.movementX, event.movementY)
}

function mousedown() {
    // event.x 鼠标横轴
    // event.y 鼠标纵轴
    // event.keycode 键盘值
    // event.button==0 默认。没有按任何按钮。
    // event.button==1 鼠标左键
    // event.button==2 鼠标右键
    // event.button==3 鼠标左右键同时按下
    // event.button==4 鼠标中键
    // event.button==5 鼠标左键和中键同时按下
    // event.button==6 鼠标右键和中键同时按下
    // event.button==7 所有三个键都按下
    if (event.button == 0) {
        sendcmd(clientid, 32)
    } else if (event.button == 2) {
        if (shot_status.shotting) {
            if (shot_status.timer) {
                window.clearInterval(shot_status.timer)
            }
            shot_status.shotting = false
        } else {
            shot_status.timer = window.setInterval(
                "sendcmd('" + clientid + "', 32)",
                10
            )
            shot_status.shotting = true
        }
    }
}

function keydown() {
    //我怎么知道，玩家按下的是什么键
    //说明当按下键后 事件--->event对象----->事件处理函数()
    var code = event.keyCode //对应字母的ascii码->我们看码表
    var tank = tanks[clientid]
        // console.log(code)
    switch (code) {
        case 87: //W
        case 68: //D
        case 83: //S
        case 65: //A
        case 32: //Space
        case 38: //up
        case 39: //right
        case 40: //down
        case 37: //left
        case 16: //left
            sendcmd_interval(clientid, code)
            break
            // // case 32: //Space
            // //     sendcmd(clientid, code)
            // //     break
            // sendcmd(clientid, code)
            // break
        case 82: //Space
            send(new Msg(1111, 'gamestatus', '', ''))
            break
        case 69: //E
            sendcmd(clientid, code)
            break
    }
}

function keyup() {
    var code = event.keyCode //对应字母的ascii码->我们看码表
        // // console.log('up', code)
    switch (code) {
        case 87: //W
        case 68: //D
        case 83: //S
        case 65: //A
        case 32: //Shot
        case 16: //Shift Shot
        case 38: //up
        case 39: //right
        case 40: //down
        case 37: //left
            sendcmd_interval_cancel(clientid, code)
            break
    }
}

function keypress() {}

function sendcmd_interval(clientid, key) {
    if (!key_status[key].down) {
        key_status[key].timer = window.setInterval(
            "sendcmd('" + clientid + "', " + key + ')',
            20
        )
        key_status[key].down = true
    }
}

function sendcmd_interval_cancel(clientid, key) {
    if (key_status[key].down) {
        window.clearInterval(key_status[key].timer)
        key_status[key].down = false
    }
}

function sendcmd(clientid, code) {
    send(
            new Msg(2222, 'cmd', '', {
                clientid: clientid,
                cmd: code
            })
        )
        // key_status[key].timer = window.setInterval("sendcmd('" + clientid + "', " + code + ",'" + key + "')", 100)
}

function start() {
    if (tanks[clientid]) {
        // console.log('已开始游戏')
    } else {
        var me = new Tank(clientid, 140, 140, 0, heroColor)
        tanks[clientid] = me
            //每隔100毫秒去刷新一次作战区
        window.setInterval('flashTankMap()', 30)
    }
}

function noticeid(id, msg) {
    // $('#' + id).html(msg)
}

function notice(id, msg) {
    $('#' + id).html(msg)
}

function Msg(code, type, message, data) {
    this.code = code
    this.type = type
    this.message = message
    this.data = data
}

$(function() {
    $('#login').click(function() {
        noticeid('tip2', clientid + '：登录中···')
        $('#tankMap').focus()
    })
    $('#link').click(function() {
        noticeid('tip2', clientid + '：连接中···')
        link()
        $('#tankMap').focus()
    })
    $('#start').click(function() {
        noticeid('tip2', clientid + '：开始游戏')
        start()
        $('#tankMap').focus()
    })
    $('#getplayers').click(function() {
        noticeid('tip2', clientid + ': getplayers')
        send(new Msg(1001, 'getplayers', '', ''))
        $('#tankMap').focus()
    })
    $('#inroom').click(function() {
        noticeid('tip2', clientid + ': inroom')
        send(new Msg(1002, 'inroom', '', $('#room').val()))
        $('#tankMap').focus()
    })
    $('#getrooms').click(function() {
        noticeid('tip2', clientid + ': getrooms')
        send(new Msg(1003, 'getrooms', '', ''))
        $('#tankMap').focus()
    })
    $('#gamestatus').click(function() {
        noticeid('tip2', clientid + ': gamestatus')
        notice('tip2', 'Blood :' + '9')
        notice('tip3', 'The Battle has begun !')
        send(new Msg(1111, 'gamestatus', '', ''))
        $('#tankMap').focus()
    })
    $('#ResetAI').click(function() {
        send(new Msg(3333, 'ResetAI', '', ''))
        $('#tankMap').focus()
    })
})
var random = {
    randomInt: function(start, end) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * start + 1);
            case 2:
                return parseInt(Math.random() * (end - start + 1) + start);
            default:
                return 0;
        }
    }
}

function rgb(a, b, c) {
    return "rgb(" + a + "," + b + "," + c + ")"
}

function range() {
    var arr = []
    var s, e
    switch (arguments.length) {
        case 1:
            s = 0
            e = arguments[0]
        case 2:
            s = arguments[0]
            e = arguments[1]
    }
    for (var i = s; i < e; i++) {
        arr.push(i)
    }
    return arr
}


var RENDERERER = {
    text: ['.', '*', '○', '△', '□', '+', 'o', 'O', '#', ],
    init: function() {
        this.reconstructMethod();
        this.setParameters()
        this.bindEvent()
        this.start_game()
    },
    setParameters: function() {
        this.window = $(window);
        this.last_flash = new Date().getTime()
        this.color_404 = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
        this.container = $('#jsi-particle-container');
        this.width = this.container.width();
        this.height = this.container.height();
        this.canvas = $('<canvas />').attr({
            width: this.width,
            height: this.height
        }).html('Your browser does not support the HTML5 canvas tag.').appendTo(this.container);
        this.context = this.canvas.get(0).getContext('2d');
        this.Particles = []
        this.PARTICLE_NUM = 1000
        this.BOLL_MIN_R = 20
        this.boll = new Boll(this.width / 2, this.height / 2, 50, 0, 2 * Math.PI)
        for (var i = 0; i < this.PARTICLE_NUM; i++) {
            this.Particles.push(new Particle(this))
        }
        setInterval(this.increstPartic, 500)
    },
    reconstructMethod: function() {
        this.changeAngle = this.changeAngle.bind(this);
        this.increstPartic = this.increstPartic.bind(this);
        this.keydown = this.keydown.bind(this);
    },
    changeAngle: function(event) {
        var offset = this.container.offset()
        var x = event.clientX - offset.left + this.window.scrollLeft()
        var y = event.clientY - offset.top + this.window.scrollTop()
        this.boll.x = x
        this.boll.y = y
        this.flash_map()
    },
    bindEvent: function() {
        var vm = this
        this.container.on('click', this.setupFigure);
        this.container.on('mousemove', this.changeAngle);
        $("body").eq(0).on('keypress', this.keydown);
    },
    start_game: function() {
        this.flash_map()
    },
    flash_map: function() {
        this.context.clearRect(0, 0, this.width, this.height)
        var dead_prt = []
        for (var i = 0; i < this.PARTICLE_NUM; i++) {
            if (this.Particles[i]) {
                this.context.arc(this.x, this.y, this.r, this.sAngle, this.eAngle, this.counterclockwise);
                if (this.context.isPointInPath(this.Particles[i].x, this.Particles[i].y)) {
                    dead_prt.push(this.Particles[i])
                } else {
                    this.Particles[i].draw(this.context)
                }
            }
        }
        for (var i = 0; i < dead_prt.length; i++) {
            this.Particles = this.Particles.del(this.Particles.indexOf(dead_prt[i]))
        }
        this.boll.r += dead_prt.length / 5
        this.boll.draw(this.context)
        this.context.font = "40px Arial";
        var now = new Date().getTime()
        if (now - this.last_flash > 300) {
            this.color_404 = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
            this.last_flash = now
        }
        this.context.strokeStyle = this.color_404
        this.context.strokeText("Sorry , 404 Not Found.", this.width / 2 - 200, this.height / 2);
        this.context.fillStyle = rgb(255, 255, 255)
        this.context.font = "25px Arial";
        this.context.fillText(JSON.stringify(this.boll), 20, 50);
    },
    increstPartic: function() {
        if (this.Particles.length < this.PARTICLE_NUM) {
            this.Particles.push(new Particle(this))
        }
        if (this.boll.r > this.BOLL_MIN_R) {
            this.boll.r -= 0.001 * this.boll.r
        }
        this.flash_map()
    },
    keydown: function(event) {
        //我怎么知道，玩家按下的是什么键
        //说明当按下键后 事件--->event对象----->事件处理函数()
        var code = event.keyCode //对应字母的ascii码->我们看码表
        switch (code) {
            case 87: //W
            case 38: //W
                this.boll.y -= 10
                break
            case 68: //D
            case 39: //D
                this.boll.x += 10
                break
            case 83: //S
            case 40: //S
                this.boll.y += 10
                break
            case 65: //A
            case 37: //A
                this.boll.x -= 10
                break
            case 32: //Space
            case 82: //Space
                break
        }
        this.flash_map()
    },
    draw: function() {
        var my_gradient = this.context.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(0, "black");
        my_gradient.addColorStop(1, "white");
        // this.context.fillStyle = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
        //this.context.fillStyle = my_gradient
        //this.context.fillRect(0, 0, this.width, this.height);
        var ctx = this.context
            // var gradient = ctx.createLinearGradient(0, 0, 170, 0);
            // gradient.addColorStop("0", "magenta");
            // gradient.addColorStop("0.5", "blue");
            // gradient.addColorStop("1.0", "red");

        // // 用渐变进行填充
        // ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        // ctx.strokeStyle = "#0000ff";
        // ctx.strokeRect(random.randomInt(this.width), random.randomInt(this.height), random.randomInt(this.width) / 2, random.randomInt(this.height) / 2);
        // ctx.font = "30px Verdana";
        // // 创建渐变
        // var gradient = ctx.createLinearGradient(0, 0, this.width, 0);
        // gradient.addColorStop("0", "magenta");
        // gradient.addColorStop("0.5", "blue");
        // gradient.addColorStop("1.0", "red");
        // // 用渐变进行填充
        // ctx.strokeStyle = gradient;
        ctx.strokeStyle = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
        ctx.strokeText(this.text[random.randomInt(this.text.length - 1)], random.randomInt(this.width), random.randomInt(this.height));
        // ctx.beginPath();
        // ctx.lineCap = "miter";
        // ctx.lineJoin = "miter";
        // ctx.miterLimit = 5;
        ctx.lineWidth = 2;
        // ctx.moveTo(20, 20);
        // ctx.lineTo(200, 200);
        // ctx.lineTo(20, 200);
        // ctx.lineTo(20, 100);
        // ctx.lineTo(200, 100);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(20, 20);
        // ctx.quadraticCurveTo(20, 100, 300, 30);
        // ctx.stroke()

        // ctx.beginPath();
        // ctx.moveTo(20, 20);
        // ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
        // ctx.stroke();

        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(20, 20); // 创建开始点
        // ctx.lineTo(100, 20); // 创建水平线
        // ctx.arcTo(150, 20, 150, 70, 50); // 创建弧
        // ctx.lineTo(150, 120); // 创建垂直线
        // ctx.stroke(); // 进行绘制


        // // 红色矩形
        // ctx.beginPath();
        // ctx.lineWidth = "6";
        // ctx.strokeStyle = "red";
        // ctx.rect(5, 5, 290, 140);
        // ctx.stroke();

        // // 绿色矩形
        // ctx.beginPath();
        // ctx.lineWidth = "4";
        // ctx.strokeStyle = "green";
        // ctx.rect(30, 30, 50, 50);
        // ctx.stroke();

        // // 蓝色矩形
        // ctx.beginPath();
        // ctx.lineWidth = "10";
        // ctx.strokeStyle = "blue";
        // ctx.rect(50, 50, 150, 80);
        // ctx.stroke()

        // this.context.fillStyle = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
        // ctx.fillRect(20, 20, 150, 100);
        // ctx.strokeRect(200, 200, 80, 100);

    }
}

function Boll(x, y, r, sAngle, eAngle, counterclockwise) {
    this.x = x
    this.y = y
    this.r = r
    this.sAngle = sAngle
    this.eAngle = eAngle
    this.counterclockwise = counterclockwise
    this.color = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
    this.draw = function(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color
            // ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle, this.counterclockwise);
        // ctx.fill();
        ctx.stroke();
    }
}

function Particle(RENDERER) {
    this.color = rgb(random.randomInt(255), random.randomInt(255), random.randomInt(255))
    this.type = RENDERER.text[random.randomInt(RENDERER.text.length - 1)]
    this.x = random.randomInt(RENDERER.width)
    this.y = random.randomInt(RENDERER.height)

    this.draw = function(ctx) {
        ctx.lineWidth = 2;
        ctx.font = "5px Arial";
        ctx.strokeStyle = this.color
        ctx.strokeText(this.type, this.x, this.y);
    }
}


$(function() {
    RENDERERER.init()
});
// RENDERER.draw()
// setInterval("RENDERER.draw()", 100)
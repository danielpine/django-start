    /////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////      3 D    //////////////////////////////////////////
    //////////////////////////////////////      Boll   //////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    var canvas = document.getElementById("cas"),
      ctx = canvas.getContext("2d"),
      vpx = canvas.width / 2,
      vpy = canvas.height / 2,
      Radius = 150, //整体大球的坐标
      LayerBallNum = 360 / 15, // 横向
      LayerIntervalUp = 360 / 15; //
    balls = [],
      angleX = Math.PI / 100,
      angleY = Math.PI / 100;


    window.addEventListener("mousemove", function (event) {
      var x = event.clientX - canvas.offsetLeft - vpx;
      var y = event.clientY - canvas.offsetTop - vpy;

      angleY = -x * 0.0001;
      angleX = -y * 0.0001;
    });

    var Animation = function () {
      this.init();
    };

    Animation.prototype = {
      isrunning: false,
      init: function () {
        var num = LayerIntervalUp / 2; //layer 的数目    //假定每一层 间隔30  画上半球
        for (var i = 0; i <= num; i++) {
          var l = new layer(i, 1);
          l.draw();
          var l = new layer(i, -1);
          l.draw();
        }

      },

      start: function () {
        this.isrunning = true;
        animate();
      },
      stop: function () {
        this.isrunning = false;
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rotateX();
      rotateY();
      rotateZ();

      for (var i = 0; i < balls.length; i++) {
        balls[i].paint();
      }
      if (animation.isrunning) {
        if ("requestAnimationFrame" in window) {
          requestAnimationFrame(animate);
        } else if ("webkitRequestAnimationFrame" in window) {
          webkitRequestAnimationFrame(animate);
        } else if ("msRequestAnimationFrame" in window) {
          msRequestAnimationFrame(animate);
        } else if ("mozRequestAnimationFrame" in window) {
          mozRequestAnimationFrame(animate);
        }
      }
    }


    var layer = function (num, up) {
      this.radius = Math.sqrt(Math.pow(Radius, 2) - Math.pow(Radius * Math.cos(num * Math.PI * 2 / LayerBallNum),
        2))
      this.x = 0;
      this.y = 0;
      this.up = up;
    }

    layer.prototype = {
      setBalls: function (radius) {
        for (var i = 0; i < LayerBallNum; i++) {
          var angle = 2 * Math.PI / LayerBallNum * i;
          var b = new ball(radius * Math.cos(angle), radius * Math.sin(angle), this.up * Math.sqrt(Math.pow(
            Radius, 2) - Math.pow(radius, 2)), 1.5);
          b.paint();
          balls.push(b);
        }

      },
      draw: function () {
        ctx.beginPath();
        ctx.arc(vpx, vpy, this.radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        this.setBalls(this.radius);
      }
    }

    var ball = function (x, y, z, r) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.r = r;
      this.width = 2 * r;
    }

    ball.prototype = {
      paint: function () {
        var fl = 450 //焦距
        ctx.save();
        ctx.beginPath();
        var scale = fl / (fl - this.z);
        var alpha = (this.z + Radius) / (2 * Radius);
        ctx.arc(vpx + this.x, vpy + this.y, this.r * scale, 0, 2 * Math.PI, true);
        ctx.fillStyle = "rgba(255,255,255," + (alpha + 0.5) + ")";
        ctx.fill();
        ctx.restore();
      }
    }

    function rotateX() {
      var cos = Math.cos(angleX);
      var sin = Math.sin(angleX);
      for (var i = 0; i < balls.length; i++) {
        var y1 = balls[i].y * cos - balls[i].z * sin;
        var z1 = balls[i].z * cos + balls[i].y * sin;
        balls[i].y = y1;
        balls[i].z = z1;
      }
    }

    function rotateY() {
      var cos = Math.cos(angleY);
      var sin = Math.sin(angleY);
      for (var i = 0; i < balls.length; i++) {
        var x1 = balls[i].x * cos - balls[i].z * sin;
        var z1 = balls[i].z * cos + balls[i].x * sin;
        balls[i].x = x1;
        balls[i].z = z1;
      }
    }

    function rotateZ() {
      var cos = Math.cos(angleY);
      var sin = Math.sin(angleY);
      for (var i = 0; i < balls.length; i++) {
        var x1 = balls[i].x * cos - balls[i].y * sin;
        var y1 = balls[i].y * cos + balls[i].x * sin;
        balls[i].x = x1;
        balls[i].y = y1;
      }
    }

    var animation = new Animation();
    animation.start();

    document.getElementById("controlBtn").onclick = function () {
      this.innerText === "开始" ? this.innerText = "停止" : this.innerText = "开始";
      this.innerText === "开始" ? animation.stop() : animation.start();;
    }
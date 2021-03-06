let Progress = function(init) {
    this.init(init)
};
Progress.prototype = {
    init: function(init) {
        this.el = init.el;
        let cvsElement = document.getElementById(this.el)
          , ctx = cvsElement.getContext("2d")
          , width = cvsElement.width
          , height = cvsElement.height
          , degActive = 0
          , timer = null;
        init.deg > 0 && init.deg <= 100 ? this.deg = init.deg : this.deg = 100;
        init.lineWidth !== undefined ? this.lineWidth = init.lineWidth : this.lineWidth = 20;
        this.wh = width > height ? height : width;
        init.circleRadius > 0 && init.circleRadius <= this.wh / 2 - this.lineWidth / 2 ? this.circleRadius = init.circleRadius : this.circleRadius = this.wh / 2 - this.lineWidth / 2;
        init.lineBgColor !== undefined ? this.lineBgColor = init.lineBgColor : this.lineBgColor = '#ccc';
        init.lineColor !== undefined ? this.lineColor = init.lineColor : this.lineColor = '#009ee5';
        init.textColor !== undefined ? this.textColor = init.textColor : this.textColor = '#009ee5';
        init.fontSize !== undefined ? this.fontSize = init.fontSize : this.fontSize = parseInt(this.circleRadius / 2);
        this.timer = init.timer;
        if (window.devicePixelRatio) {
            cvsElement.style.width = width + "px";
            cvsElement.style.height = height + "px";
            cvsElement.height = height * window.devicePixelRatio;
            cvsElement.width = width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        ctx.lineWidth = this.lineWidth;
        timer = setInterval(function() {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, this.circleRadius, 1, 8);
            ctx.strokeStyle = this.lineBgColor;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, this.circleRadius, -Math.PI / 2, degActive * Math.PI / 180 - Math.PI / 2);
            ctx.strokeStyle = this.lineColor;
            ctx.stroke();
            let txt = (parseInt(degActive * 100 / 360) + "%");
            ctx.font = this.fontSize + "px SimHei";
            let w = ctx.measureText(txt).width;
            let h = this.fontSize / 2;
            ctx.fillStyle = this.textColor;
            ctx.fillText(txt, width / 2 - w / 2, height / 2 + h / 2);
            if (degActive >= this.deg / 100 * 360) {
                clearInterval(timer);
                timer = null;
            }
            degActive++;
        }
        .bind(this), this.timer);
    }
};

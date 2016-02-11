define([], function() {
    var View = {
        el: 'question-timer',
        currentTime: 0,
        intervalID:0,
        start: function(time) {
            this.currentTime = time;
            var reps = 0;

            this.intervalID = setInterval((function() {
                if (++reps === time) {
                    this.stop();
                }
                this.update();
            }).bind(this), 1000);
        },
        update: function() {
            document.getElementById(this.el).innerHTML = "00:0" + --this.currentTime;
        },
        stop: function() {
            window.clearInterval(this.intervalID);
        }
    };
    return View;
});
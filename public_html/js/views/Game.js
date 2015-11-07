define(['app', 'tmpl/game', 'views/BaseView', 'utils/api/ws/api_ws', 'jquery-ui'], function(app, tmpl, BaseView, api) {
        var View = BaseView.extend({
        template: tmpl,
        events: {
            "click .js-connect": function() {
                api.startConnection();
                app.preloader.show();
            },
            "click .js-send": function(event) {
                api.sendAnswer(event.target.innerText);
            }
        },
        initialize: function() {
            this.listenTo(app.wsEvents, "wsGameStart", this.onGameStart);
            this.listenTo(app.wsEvents, "wsGameFinished", this.onGameFinish);
            this.listenTo(app.wsEvents, "wsRoundStart", this.onNewRound);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onFinishRound);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);

        },
        onGameStart: function(data) {
            console.log("OnGameStart");
            app.preloader.hide();
        },
        onGameFinish: function(data) {
            console.log("OnGameFinish");
            alert('winner:' + data.winner);
            this.context = undefined;
            this.render();
        },
        onNewRound: function(data) {
            console.log("OnNewRound");
        },
        onFinishRound: function(data) {
            console.log("Finished round");
        },
        load: function() {
            this.present();
            $(".container").addClass('container-wide', 500, 'swing');
        },
        unload: function() {
            this.hide();
            $('.container').removeClass('container-wide', 500, 'swing');
        },
        onNewQuestion: function(data) {
            this.context = data;
            this.render();
            console.log("OnNewQuestui");
        },
        onPlayerConnect: function(data) {
            //console.log(data);
        },
    });
    return View;
});

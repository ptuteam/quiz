define(['app', 'tmpl/game', 'views/BaseView', 'utils/api/ws/api_ws', 'views/game/Question', 'views/game/Finish', 'models/game/Game', 'jquery-ui'], function(app, tmpl, BaseView, api, QuestionView, FinishView, Game) {
    var View = BaseView.extend({
        template: tmpl,
        gameRequire: true,
        loginRequire: true,
        initialize: function() {
            this.listenTo(app.wsEvents, "wsGameFinished", this.onGameFinish);
            this.listenTo(app.wsEvents, "wsGameStart", this.onGameStart);
            this.listenTo(app.wsEvents, "wsRoundStart", this.onNewRound);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onFinishRound);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);
        },
        //Websocket events
        onGameStart: function(data) {
            this.game = new Game(data);
            this.context = this.game;
        },
        onGameFinish: function(data) {
            this.disposeModalIfNeeded();
            api.closeConnection();

            //Obsosnyi kostyl
            var winner = (this.game.player.email === data.winner ? this.game.player : this.game.opponent); 
            var finishView = new FinishView(winner);
            finishView.present();
        },
        onNewRound: function(data) {

        },
        onFinishRound: function(data) {
            this.disposeModalIfNeeded();
            this.game.update(data);
            this.render();
        },
        onNewQuestion: function(data) {
            this.questionView = new QuestionView(data);
            this.questionView.present();
        },
        //View lifycycle
        load: function() {
            this.present();
            $(".container").addClass('container-wide', 500, 'swing');
        },
        unload: function() {
            this.hide();
            this.disposeModalIfNeeded();
            api.closeConnection();
            $('.container').removeClass('container-wide', 500, 'swing');
        },
        disposeModalIfNeeded: function() {
            if (this.questionView) {
                this.questionView.destroy();
            }
        }
    });
    return View;
});
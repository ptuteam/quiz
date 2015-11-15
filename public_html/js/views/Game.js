define(['app', 'tmpl/game', 'views/BaseView', 'utils/api/ws/api_ws', 'views/game/Question', 'models/game/Game', 'jquery-ui'], function(app, tmpl, BaseView, api, QuestionView, Game) {
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
        onGameStart: function(data) {
            this.game = new Game(data);
            this.context = this.game;
        },
        onGameFinish: function(data) {
            if (this.questionView) {
                this.questionView.destroy();
            }
            api.closeConnection();
        },
        onNewRound: function(data) {},
        onFinishRound: function(data) {
            this.questionView.hideModal();
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
            this.onGameFinish();
            $('.container').removeClass('container-wide', 500, 'swing');
        },
    });
    return View;
});
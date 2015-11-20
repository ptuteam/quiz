define(['app', 'tmpl/game/game', 'views/BaseView', 'views/game/Question', 'views/game/Finish', 'models/game/GameManager', 'jquery-ui'], function(app, tmpl, BaseView, QuestionView, FinishView, GameManager) {
    var View = BaseView.extend({
        template: tmpl,
        gameRequire: true,
        loginRequire: true,
        initialize: function() {
            this.listenTo(GameManager, 'startGame', this.onGameStart);
        },
        onGameStart: function(game) {
            this.game = game;
            this.context = this.game;
            //Events
            this.listenTo(this.game, 'gameFinish', this.onGameFinish);
            this.listenTo(this.game, 'newQuestion', this.onNewQuestion);
            this.listenTo(this.game, 'roundStart', this.onRoundStart);
            this.listenTo(this.game, 'roundEnd', this.onRoundEnd);
            this.listenTo(this.game, 'playerDisconnected', this.onPlayerDisconnected)
        },
        onGameFinish: function(winner) {
            this.finishView = new FinishView(winner);
            this.finishView.present();
            this.listenTo(this.finishView, 'onReturn', this.onReturnClick);
        },
        onRoundStart: function() {
            //Do something
        },
        onRoundEnd: function(data) {
            this.disposePopupIfNeeded();
            this.render();
        },
        onNewQuestion: function(data) {
            this.questionView = new QuestionView(data);
            this.questionView.present();
        },
        onPlayerDisconnected: function() {
            this.disposePopupIfNeeded();
        },
        //Handlers
        onReturnClick: function() {
            app.router.navigateToMain();
            this.stopListening(this.game);
            this.stopListening(this.finishView);
            this.game.clean();
            this.game = null;
        },
        //View lifecycle
        load: function() {
            this.present();
            $(".container").addClass('container-wide', 500, 'swing');
        },
        unload: function() {
            this.hide();
            $('.container').removeClass('container-wide', 500, 'swing');
        },
        disposePopupIfNeeded: function() {
            if (this.questionView) {
                this.questionView.hidePopup();
            }
        }
    });
    return View;
});
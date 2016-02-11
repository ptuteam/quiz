define(['app', 'tmpl/game/game', 'tmpl/game/game_map', 'views/BaseView', 'views/game/popup/QuestionPopup', 'views/game/popup/FinishPopup', 'models/game/manager/GameManager', 'jquery-ui'], function(app, tmpl, tmpl2, BaseView, QuestionView, FinishView, GameManager) {
    var View = BaseView.extend({
        template: tmpl,
        gameRequire: true,
        loginRequire: true,
        initialize: function() {
        },
        //Game events
        onGameStart: function(game) {
            this.game = game;
            this.context.game = game;
            //Events
            this.listenTo(this.game, 'gameFinish', this.onGameFinish);
            this.listenTo(this.game, 'newQuestion', this.onNewQuestion);
            this.listenTo(this.game, 'roundStart', this.onRoundStart);
            this.listenTo(this.game, 'roundEnd', this.onRoundEnd);
            this.listenTo(this.game, 'playerDisconnected', this.onPlayerDisconnected);
            this.listenTo(this.game, 'answerResults', this.onAnswerResults);
            this.listenTo(this.game, 'newScores', this.onNewScores);
        },
        onRoundStart: function() {
        },
        onNewScores: function() {
          this.render();
        },
        onNewQuestion: function(data) {
            this.questionView = new QuestionView(data);
            this.questionView.present();
        },
        onAnswerResults: function(data) {
            this.questionView.setResults(data);
        },
        onRoundEnd: function(data) {
            this.disposePopupIfNeeded(this.questionView);
        },
        onPlayerDisconnected: function() {
            this.disposePopupIfNeeded(this.questionView);
        },
        onGameFinish: function(winner) {
            this.finishView = new FinishView(winner);
            this.finishView.present();
            this.listenTo(this.finishView, 'onReturn', this.onReturnClick);
        },
        //Popup functions
        onReturnClick: function() {
            app.router.navigateToMain();
        },
        //View lifecycle
        onViewUnload: function() {
            this.stopListening(this.game);
            this.game.abort();
            this.game = null;
            //Remove popups
            this.disposePopupIfNeeded(this.questionView);
            this.disposePopupIfNeeded(this.finishView);
            
        },
        onViewLoad: function() {
            $(".container").addClass('container_wide', 500, 'swing');
        },
        onViewHide: function() {
            this.onViewUnload();
            this.trigger('unload');
            $('.container').removeClass('container_wide', 500, 'swing');
        }
    });
    return View;
});
define(['app', 'tmpl/game/game', 'tmpl/game/game_map', 'views/BaseView', 'views/game/Question', 'views/game/Finish', 'models/game/GameManager', 'jquery-ui'], function(app, tmpl, tmpl2, BaseView, QuestionView, FinishView, GameManager) {
    var View = BaseView.extend({
        template: tmpl,
        gameRequire: true,
        loginRequire: true,
        initialize: function() {
            this.listenTo(GameManager, 'startGame', this.onGameStart);
        },
        //Game events
        onGameStart: function(game) {
            this.game = game;
            this.template = game.gameType == 0 ? tmpl : tmpl2;
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
        },
        onRoundEnd: function(data) {
            this.disposePopupIfNeeded(this.questionView);
            this.render();
        },
        onNewQuestion: function(data) {
            this.questionView = new QuestionView(data);
            this.questionView.present();
        },
        onPlayerDisconnected: function() {
            this.disposePopupIfNeeded(this.questionView);
        },
        //Popup functions
        onReturnClick: function() {
            app.router.navigateToMain();
        },
        disposePopupIfNeeded: function(popup) {
            if (popup) {
                this.stopListening(popup);
                popup.hidePopup();
            }
        },
        //View lifecycle
        onViewUnload: function() {
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
define(['app', 'tmpl/game/game', 'views/BaseView', 'views/game/Question', 'views/game/Finish', 'models/game/GameManager', 'jquery-ui'], function(app, tmpl, BaseView, QuestionView, FinishView, GameManager) {
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
                popup.hidePopup();
            }
        },
        //View lifecycle
        load: function() {
            this.present();
            $(".container").addClass('container_wide', 500, 'swing');
        },
        unload: function() {
            this.hide();
            this.onViewUnload();
            this.trigger('unload');
            $('.container').removeClass('container_wide', 500, 'swing');
        },
        onViewUnload: function() {
            //Stop listening to the game events
            this.stopListening(this.game);
            this.stopListening(this.finishView);
            //Destroy game
            this.game.abort();
            this.game = null;
            //Remove popups
            this.disposePopupIfNeeded(this.questionView);
            this.disposePopupIfNeeded(this.finishView);
            
        }
    });
    return View;
});
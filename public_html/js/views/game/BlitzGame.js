define(['app', 'models/game/manager/GameManager', 'views/game/BaseGame','views/game/popup/QuestionPopup', 'views/game/popup/FinishPopup'], function(app, GameManager, BaseView, QuestionView, FinishView) {
    var View = BaseView.extend({
        initialize: function() {
            this.listenTo(GameManager, 'startBlitzGame', this.onGameStart);
        },
        onGameStart: function(game) {
            BaseView.prototype.onGameStart.call(this, game);
        },

    });

    return View;
});
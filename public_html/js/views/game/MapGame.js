define(['app', 'models/game/manager/GameManager', 'views/game/BaseGame','views/game/popup/QuestionPopup', 'views/game/popup/FinishPopup', 'views/game/map/Map'], function(app, GameManager, BaseView, QuestionView, FinishView, Map) {
    var View = BaseView.extend({
        initialize: function() {
            this.listenTo(GameManager, 'startMapGame', this.onGameStart);
        },
        onGameStart: function(game) {
            BaseView.prototype.onGameStart.call(this, game);

            this.map = new Map(game.map);

            this.listenTo(this.map, 'ItemClicked', this.onPlayerTurnChoose);

            this.listenTo(this.game, 'playerTurnStart', this.onPlayerTurnStart);
            this.listenTo(this.game, 'playerTurnFinish', this.onPlayerTurnFinish);
        },
        onPlayerTurnStart: function(data) {
            console.log(data);
        },
        onPlayerTurnFinish: function(data) {
            console.log(data);
        },
        onPlayerTurnChoose: function(data) {
            console.log(data);
        },
        render: function() {
            BaseView.prototype.render.call(this);
            this.map.render();
        }

    });

    return View;
});
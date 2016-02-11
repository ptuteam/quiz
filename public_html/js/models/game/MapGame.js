define(['app', 'models/game/BaseGame', 'models/game/map/Map'], function(app, Game, Map) {
    var Model = Game.extend({
        initialize: function(data) {
            Game.prototype.initialize.call(this, data);

            this.map = new Map(data.map, this.getPlayers());

            this.listenTo(app.wsEvents, "wsPlayerTurnStart", this.onPlayerTurnStart);
            this.listenTo(app.wsEvents, "wsPlayerTurnFinish", this.onPlayerTurnFinish);
        },
        //Events
        onPlayerTurnStart: function(data) {
            var isPlayerTurn = this.player.email === data.player;
            this.trigger('playerTurnStart', {isPlayerTurn: isPlayerTurn, allowableMovies: data.allowableMove});

        },
        onPlayerTurnFinish: function(data) {
            this.trigger('playerTurnFinish', data);
        },
        onPlayerChooseArea: function(data) {
            //TODO send id
        },
    });

    return Model;
});

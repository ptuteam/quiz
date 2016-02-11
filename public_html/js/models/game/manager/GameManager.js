define(['app', 'models/game/BlitzGame', 'models/game/MapGame', 'utils/api/ws/api_ws'], function(app, BlitzGame, MapGame, api) {
    var Manager = Backbone.Model.extend({
        game: {},
        initialize: function() {
            this.listenTo(app.wsEvents, 'wsInitRoom', this.onInitRoom);
            this.listenTo(app.wsEvents, 'wsGameStart', this.startGame);
            this.listenTo(app.wsEvents, 'wsGameFinished', this.stopGame);
            this.listenTo(app.wsEvents, "wsPlayerDisconnected", this.onPlayerDisconnected);
        },
        onInitRoom: function(data) {
            this.trigger('initRoom', data);
        },
        searchGame: function(context) {
            if (!api.isOpen()) {
                api.startConnection(context);
            }
        },
        stopSearch: function() {
            api.closeConnection()
        },
        startGame: function(data) {
            if (data.mode === 'BLITZ') {
                this.game = new BlitzGame(data);
                this.trigger('startBlitzGame', this.game);
            } else {
                this.game = new MapGame(data);
                this.trigger('startMapGame', this.game);
            }
            this.listenTo(this.game, 'gameAborted', this.stopGame);
        },
        stopGame: function() {
            api.closeConnection();
            this.stopListening(this.game);
            this.game = null;
        },
    });
    return new Manager();
});
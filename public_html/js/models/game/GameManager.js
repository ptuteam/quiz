define(['app', 'models/game/Game', 'utils/api/ws/api_ws'], function(app, Game, api) {
    var Manager = Backbone.Model.extend({
        game: {},
        gameType: 0,
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
                this.gameType = context.gameType;
                api.startConnection(context);
            }
        },
        stopSearch: function() {
            api.closeConnection()
        },
        startGame: function(data) {
            data.gameType = this.gameType;
            this.game = new Game(data);
            this.listenTo(this.game, 'gameAborted', this.stopGame);
            this.trigger('startGame', this.game);
        },
        stopGame: function() {
            api.closeConnection();
            this.stopListening(this.game);
            this.game = null;
        }
    });
    return new Manager();
});
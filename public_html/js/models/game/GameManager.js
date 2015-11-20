define(['app', 'models/game/Game', 'utils/api/ws/api_ws'], function(app, Game, api) {
    var Manager = Backbone.Model.extend({
        game: {},
        initialize: function() {
            this.listenTo(app.wsEvents, 'wsGameStart', this.startGame);
            this.listenTo(app.wsEvents, 'wsGameFinished', this.stopGame);
            this.listenTo(app.wsEvents, "wsPlayerDisconnected", this.onPlayerDisconnected);
        },
        searchGame: function() {
            api.startConnection();
        },
        stopSearch: function() {
            api.closeConnection()
        },
        startGame: function(data) {
            this.game = new Game(data);
            this.trigger('startGame', this.game);
        },
        stopGame: function() {
            api.closeConnection();
            this.game.clean();
            this.game = null;
        }, 
    });
    return new Manager();
});
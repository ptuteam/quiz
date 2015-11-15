define(['backbone', 'models/game/Player', 'models/game/Question', 'app',], function(Backbone, Player, Question, app) {
    var Model = Backbone.Model.extend({
        initialize: function(data) {
            //Obsosnyi kostyl
            this.player = new Player(data.player);
            this.opponent = new Player(data.opponents[0]);
        },
        update: function(data) {
            this.player.update(data.player);
            this.opponent.update(data.opponents[0]);
        }
    });
    return Model;
});
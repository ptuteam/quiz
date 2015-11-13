define(['backbone', 'models/game/Player', 'models/game/Question', 'app',], function(Backbone, Player, Question, app) {
    var Model = Backbone.Model.extend({
        initialize: function(data) {
            //Obsosnyi kostyl
            this.player = new Player(data.players.find(function(element) {
                return app.session.user.get('email') == element.email;
            }));
            this.opponent = new Player(data.players.find(function(element) {
                return app.session.user.get('email') != element.email;
            }));
        },
        update: function(data) {
            this.player.update(data.players.find(function(element) {
                return app.session.user.get('email') == element.email;
            }));
            this.opponent.update(data.players.find(function(element) {
                return app.session.user.get('email') != element.email;
            }));
        }
    });
    return Model;
});
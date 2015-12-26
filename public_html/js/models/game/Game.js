define(['app', 'models/game/Player', 'models/game/Question'], function(app, Player, Question) {
    var Model = Backbone.Model.extend({
        player: {},
        opponent: {},
        questionNumber: 0,
        initialize: function(data) {
            this.player = new Player(data.player);
            this.opponent = new Player(data.opponents[0]);

            this.listenTo(app.wsEvents, "wsRoundStart", this.onRoundStart);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onRoundEnd);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);
            this.listenTo(app.wsEvents, 'wsGameFinished', this.onGameFinish);
            this.listenTo(app.wsEvents, "wsPlayerDisconnected", this.onPlayerDisconnected);
        },
        update: function(data) {
            this.player.update(data.player);
            this.opponent.update(data.opponents[0]);
        },
        //Events
        onGameFinish: function(data) {
            var winner = (data.winner === this.player.email) ? this.player : this.opponent;
            this.trigger('gameFinish', winner);
        },
        onPlayerDisconnected: function() {
            this.trigger('playerDisconnected');
        },
        onRoundStart: function(data) {
            this.trigger('roundStart');
        },
        onRoundEnd: function(data) {
            this.update(data);
            this.trigger('roundEnd');
        },
        onNewQuestion: function(data) {
            this.questionNumber++;
            data.question.number = this.questionNumber;
            var question = new Question(data.question);
            this.trigger('newQuestion', question);
        },
        abort: function() {
            this.stopListening();
            this.trigger('gameAborted');
            return this;
        }
    });
    return Model;
});
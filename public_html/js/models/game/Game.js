define(['app', 'models/game/Player', 'models/game/Question'], function(app, Player, Question) {
    var Model = Backbone.Model.extend({
        player: {},
        opponent: {},
        questionNumber: 0,
        gameType:0,
        initialize: function(data) {
            this.player = new Player(data.player);
            this.opponent = new Player(data.opponents[0]);
            this.gameType = data.gameType;

            this.listenTo(app.wsEvents, "wsRoundStart", this.onRoundStart);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onRoundEnd);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);
            this.listenTo(app.wsEvents, 'wsGameFinished', this.onGameFinish);
            this.listenTo(app.wsEvents, "wsPlayerDisconnected", this.onPlayerDisconnected);
            this.listenTo(app.wsEvents, "wsAnswerResults", this.onAnswerResults);
            this.listenTo(app.wsEvents, "wsNewScores", this.onNewScores);
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
        onRoundStart: function() {
            this.trigger('roundStart');
        },
        onRoundEnd: function() {
            this.trigger('roundEnd');
        },
        onNewScores: function(data) {
            this.update(data);
            this.trigger('newScores');
        },
        onNewQuestion: function(data) {
            this.questionNumber++;
            data.question.number = this.questionNumber;
            var question = new Question(data.question);
            this.trigger('newQuestion', question);
        },
        onAnswerResults: function(data) {
            this.trigger('answerResults', data);
        },
        abort: function() {
            this.stopListening();
            this.trigger('gameAborted');
            return this;
        }
    });
    return Model;
});
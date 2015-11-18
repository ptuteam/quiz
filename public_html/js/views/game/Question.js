define(['app', 'tmpl/game/question', 'models/game/Question', 'popup', 'jquery-ui'], function(app, tmpl, Question) {
    var view = Backbone.Popup.extend({
        events: {
            'click .js-send': 'onAnswer',
        },
        initialize: function(data) {
            this.question = new Question(data);
            this.listenTo(app.wsEvents, "wsIsCorrectAnswer", this.onCorrectAnswer);
        },
        render: function() {
            this.$el.html(tmpl(this.question));
        },
        present: function() {
            this.render();
            this.showPopup();
        },
        destroy: function() {
            this.hidePopup();
        },
        onAnswer: function(event) {
            this.question.sendAnswer($(event.target).index(), function() {
                $(event.target).addClass('answer-chosen');
            });
        },
        onCorrectAnswer: function(data) {
            this.question.set('answeredCorrectly', data.correct);
        },
    });
    return view;
});
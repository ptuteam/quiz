define(['tmpl/game/question', 'models/game/Question', 'popup'], function(tmpl, Question) {
    var view = Backbone.Popup.extend({
        className: 'popup__container popup__container_large',
        events: {
            'click .js-send': 'onAnswer',
        },
        initialize: function(data) {
            this.question = new Question(data);
        },
        render: function() {
            this.$el.html(tmpl(this.question));
        },
        onAnswer: function(event) {
            this.question.sendAnswer($(event.target).index('.b-question__answer'), function() {
                $(event.target).addClass('answer_chosen');
            });
        },
        onCorrectAnswer: function(data) {
            this.question.set('answeredCorrectly', data.correct);
        },
    });
    return view;
});
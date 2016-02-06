define(['tmpl/game/question', 'models/game/Question', 'views/components/Timer', 'popup'], function(tmpl, Question, Timer) {
    var view = Backbone.Popup.extend({
        className: 'popup__container popup__container_large',
        events: {
            'click .js-send': 'onAnswer',
        },
        initialize: function(data) {
            this.question = new Question(data);
            Timer.start(this.question.time);
        },
        render: function() {
            this.$el.html(tmpl(this.question));
        },
        onAnswer: function(event) {
            this.question.sendAnswer($(event.target).index('.b-question__answer'), function() {
                $(event.target).addClass('answer_chosen');
            });
        },
        setResults: function(data) {
            var index = this.question.answers.indexOf(data.correct);
            $('.js-send').addClass("unclickable").eq(index).addClass("answer_correct");
        },
        onHide: function() {
            console.log('call');
            Timer.stop();
        }
    });
    return view;
});
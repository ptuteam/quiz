define(['app', 'tmpl/components/question', 'models/game/Question', 'backbone.modal', 'jquery-ui'], function(app, tmpl, Question) {
    var view = Backbone.ModalView.extend({
        containerID: 'questionModalContainer',
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
            this.showModal();
        },
        destroy: function() {
            this.hideModal();
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
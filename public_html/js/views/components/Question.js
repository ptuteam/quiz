define(['app', 'tmpl/components/question', 'models/game/Question','backbone.modal'], function(app, tmpl, Question) {
    var view = Backbone.ModalView.extend({
        events: {
            'click .js-send': 'onSendAnswer',
        },
        initialize: function(data) {
            this.question = new Question(data);
        },
        render: function() {
            this.$el.html(tmpl(this.question));
        },
        present: function() {
            this.render();
            this.showModal();
        },
        onSendAnswer: function(event) {
            this.question.sendAnswer(event.target.innerText);
        },
        destroy: function() {
            this.hideModal();
            this.$el.remove();
            this.undelegateEvents();
        }
    });
    return view;
});
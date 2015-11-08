define(['app', 'backbone.modal', 'tmpl/components/question', 'utils/api/ws/api_ws'], function(app, modal, tmpl, api) {
    var view = Backbone.ModalView.extend({
        question: null,
        isAnswered: false,
        events: {
            'click .js-send': 'sendAnswer',
        },
        initialize: function(data) {
            this.question = data;
        },
        render: function() {
            this.$el.html(tmpl(this.question));
            return this;
        },
        present: function(data) {
            this.question = data;
            this.isAnswered = false;
            this.render().showModal();
        },
        sendAnswer: function(event) {
            if (!this.isAnswered) {
                api.sendAnswer(event.target.innerText);
                this.isAnswered = true;
                console.log('Answer sent');
            }
        }
    });
    return view;
});
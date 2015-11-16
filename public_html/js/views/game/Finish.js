define(['app', 'tmpl/game/finish', 'backbone.modal', 'jquery-ui'], function(app, tmpl, Question) {
    var view = Backbone.ModalView.extend({
        containerID: 'finishModalContainer',
        events: {
            'click .js-return': 'onReturn',
        },
        initialize: function(data) {
            this.winner = data;
        },
        render: function() {
            this.$el.html(tmpl(this.winner));
        },
        present: function() {
            this.render();
            this.showModal();
        },
        destroy: function() {
            this.hideModal();
        },
        onReturn: function(event) {
            this.destroy();
            app.router.navigateToMain();
        },
    });
    return view;
});
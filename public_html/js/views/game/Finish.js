define(['app', 'tmpl/game/finish', 'popup', 'jquery-ui'], function(app, tmpl, Question) {
    var view = Backbone.Popup.extend({
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
            this.showPopup();
        },
        destroy: function() {
            this.hidePopup();
        },
        onReturn: function(event) {
            this.destroy();
            app.router.navigateToMain();
        },
    });
    return view;
});
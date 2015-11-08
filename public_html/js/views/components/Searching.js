define(['app', 'backbone.modal', 'tmpl/components/loading', 'utils/api/ws/api_ws'], function(app, modal, tmpl, api) {
    var view = Backbone.ModalView.extend({
        fadeOutDuration: 300,
        events: {
            'click .js-back': 'onBackButton'
        },
        initialize: function() {
            this.$el.html(tmpl());
            this.startSearch();
            this.listenTo(app.wsEvents, 'wsGameStart', this.onGameStart);
        },
        startSearch: function() {
            api.startConnection();
        },
        onBackButton: function() {
            this.hideModal();
            api.closeConnection();
        },
        onGameStart: function() {
            this.hideModal(function() {
                app.router.navigateTo('#game');
            });
        }
    });
    return view;
});
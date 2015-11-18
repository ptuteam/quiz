define(['app', 'tmpl/components/searching', 'utils/api/ws/api_ws', 'popup'], function(app, tmpl, api) {
    var view = Backbone.Popup.extend({
        events: {
            'click .js-back': 'onBackButton'
        },
        initialize: function() {
            this.startSearch();
            this.listenTo(app.wsEvents, 'wsGameStart', this.onGameStart);
        },
        render: function() {
            this.$el.html(tmpl());
            return this
        },
        startSearch: function() {
            api.startConnection();
        },
        onBackButton: function() {
            this.hidePopup();
            api.closeConnection();
        },
        onGameStart: function() {
            setTimeout((function(){
                this.hidePopup(function() {
                    app.router.navigateTo('#game');
                });
            }).bind(this), this.animationDuration);
        }
    });
    return view;
});
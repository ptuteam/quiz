define(['app', 'tmpl/start', 'views/BaseView', 'views/components/Searching', 'utils/api/ws/api_ws'], function(app, tmpl, BaseView, Searching, api) {
    var View = BaseView.extend({
        template: tmpl,
        loginRequire: true,
        events: {
            'click .js-random': 'onRandomGame',
            'click .js-friend': 'onFriendGame',
        },
        initialize: function() {
            this.searching = new Searching();
            this.listenTo(this.searching, 'onBackButton', this.stopSearch);
            this.listenTo(app.wsEvents, 'wsGameStart', this.onGameStart);
        },
        //Events
        onRandomGame: function() {
            this.startSearch();
            this.searching.render().showPopup();
        },
        onFriendGame: function() {
            //TODO
        },
        //Searching
        startSearch: function() {
            api.startConnection();
        },
        stopSearch: function() {
            api.closeConnection();
        },
        //Transtiton
        onGameStart: function() {
            setTimeout((function(){
                this.searching.hidePopup(function() {
                    app.router.navigateTo('#game');
                });
            }).bind(this), this.searching.animationDuration);
        }
    });
    return View;
});
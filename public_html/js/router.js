define(['views/ViewManager'], function(ViewManager) {
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game/:mode': 'gameAction',
            'login': 'loginAction',
            'start': 'startAction',
            '*default': 'defaultAction'
        },
        viewManager: null,
        initialize: function() {
            this.viewManager = new ViewManager({
                el: '.container'
            });
        },
        //Navigation methods
        showView: function(viewKey, data) {
            this.viewManager.presentView(viewKey, data);
        },
        navigateToMain: function() {
            this.navigateTo("#");
        },
        navigateTo: function(url) {
            this.navigate(url, {
                trigger: true
            });
        },
        //Route methods
        defaultAction: function() {
            this.showView(this.viewManager.MAIN_VIEW);
        },
        scoreboardAction: function() {
            this.showView(this.viewManager.SCOREBOARD_VIEW);
        },
        gameAction: function(mode) {
            this.showView(this.viewManager.GAME_VIEW, mode);
        },
        loginAction: function() {
            this.showView(this.viewManager.LOGIN_VIEW);
        },
        startAction: function() {
            this.showView(this.viewManager.START_GAME_VIEW);
        },
    });
    return new Router();
});
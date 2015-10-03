define([
    'app',
    'views/ViewManager'
], function(
    app,
    ViewManager
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultAction'
        },

        viewManager: null,

        initialize: function () {
            this.viewManager = new ViewManager();
        },
        //Navigation methods
        showView: function (viewKey) {
            this.viewManager.presentView(viewKey);
        },
        moveToMain: function() {
            this.moveTo("#");
        },
        moveTo: function(url) {
            this.navigate(url);
        },
        //Routes methods
        defaultAction: function () {
            this.showView(this.viewManager.MAIN_VIEW);
        },
        scoreboardAction: function () {
            this.showView(this.viewManager.SCOREBOARD_VIEW);
        },
        gameAction: function () {
            this.showView(this.viewManager.GAME_VIEW);
        },
        loginAction: function () {
            this.showView(this.viewManager.LOGIN_VIEW);
        }
    });

    return new Router();
});
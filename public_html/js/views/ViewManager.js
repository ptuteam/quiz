define(['app', 'views/Main', 'views/Scoreboard', 'views/Login', 'views/Game'], function(app, Main, Scoreboard, Login, Game) {
    var ViewManager = Backbone.View.extend({
        currentView: null,

        GAME_VIEW: "game",
        LOGIN_VIEW: "login",
        MAIN_VIEW: "main",
        SCOREBOARD_VIEW: "scoreboard",

        views: {
            GAME_VIEW: null,
            LOGIN_VIEW: null,
            MAIN_VIEW: null,
            SCOREBOARD_VIEW: null,
        },

        initialize: function() {
            this.views[this.GAME_VIEW] = new Game();
            this.el.appendChild(this.views[this.GAME_VIEW].el);

            this.views[this.LOGIN_VIEW] = new Login();
            this.el.appendChild(this.views[this.LOGIN_VIEW].el);

            this.views[this.MAIN_VIEW] = new Main();
            this.el.appendChild(this.views[this.MAIN_VIEW].el);
            
            this.views[this.SCOREBOARD_VIEW] = new Scoreboard();
            this.el.appendChild(this.views[this.SCOREBOARD_VIEW].el);
        },
        //Presenting
        presentView: function(viewKey) {
            var view = this.views[viewKey];
            if (this.currentView != null) {
                this.currentView.unload();
            }
            view.load();
            this.currentView = view;
        }
    });
    return ViewManager;
});
define(['app', 'views/Main', 'views/Scoreboard', 'views/Login', 'views/Start', 'views/game/MapGame', 'views/game/BlitzGame'], function(app, Main, Scoreboard, Login, Start, MapGame, BlitzGame) {
    var ViewManager = Backbone.View.extend({
        currentView: null,
        currentViewKey: null,

        START_GAME_VIEW: "start",
        MAP_GAME: "map",
        BLITZ_GAME: "blitz",
        LOGIN_VIEW: "login",
        MAIN_VIEW: "main",
        SCOREBOARD_VIEW: "scoreboard",

        views: {
            START_GAME_VIEW: null,
            MAP_GAME: null,
            BLITZ_GAME: null,
            LOGIN_VIEW: null,
            MAIN_VIEW: null,
            SCOREBOARD_VIEW: null,
        },

        initialize: function() {
            this.views[this.START_GAME_VIEW] = new Start();
            this.el.appendChild(this.views[this.START_GAME_VIEW].el);

            this.views[this.LOGIN_VIEW] = new Login();
            this.el.appendChild(this.views[this.LOGIN_VIEW].el);

            this.views[this.MAIN_VIEW] = new Main();
            this.el.appendChild(this.views[this.MAIN_VIEW].el);
            
            this.views[this.SCOREBOARD_VIEW] = new Scoreboard();
            this.el.appendChild(this.views[this.SCOREBOARD_VIEW].el);

            this.views[this.BLITZ_GAME] = new BlitzGame();
            this.el.appendChild(this.views[this.BLITZ_GAME].el);

            this.views[this.MAP_GAME] = new MapGame();
            this.el.appendChild(this.views[this.MAP_GAME].el);
        },
        //Presenting
        presentView: function(viewKey, data) {
            if (viewKey != this.GAME_VIEW) {
                var view = this.views[viewKey];
                //If login required or game required
                if ((view.loginRequire == true && app.session.get('loggedIn') == false) ||
                    (view.gameRequire == true && app.session.get('isInGame') == false)) {
                    this.goToMain();
                } else {
                    if (this.currentView != null) {
                        this.currentView.unload()
                    }

                    view.load();

                    this.currentView = view;
                    this.currentViewKey = viewKey;
                }
            } else {
                if ((this.currentViewKey === this.BLITZ_GAME && data === this.MAP_GAME) || (this.currentViewKey === this.MAP_GAME && data === this.BLITZ_GAME)) {
                    //nothing to do
                } else {
                    if (app.session.get('isInGame') == false) {
                        this.goToMain();
                    } else {
                        var view = this.views[data];
                        this.el.appendChild(view.el);

                        view.load();
                        this.currentView.unload();

                        this.currentView = view;
                        this.currentViewKey = data;
                    }
                }
            }
        },
        goToMain: function() {
            if(this.currentView == this.views[this.MAIN_VIEW]) {
                this.currentView.load();
            } else {
                app.router.navigateToMain();
            }
        },
    });
    return ViewManager;
});
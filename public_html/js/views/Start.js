define(['app', 'tmpl/start', 'views/BaseView', 'views/components/Searching', 'models/game/GameManager'], function(app, tmpl, BaseView, Searching, GameManager) {
    var View = BaseView.extend({
        template: tmpl,
        loginRequire: true,
        events: {
            'click .js-random': 'onRandomGame',
            'click .js-friend': 'onFriendGame',
        },
        initialize: function() {
            this.listenTo(GameManager, 'startGame', this.startGame);
        },
        //Events
        onRandomGame: function() {
            this.startSearch();
        },
        onFriendGame: function() {
            //TODO
        },
        //Searching
        startSearch: function() {
            this.searching = new Searching();
            this.searching.present();
            
            this.listenTo(this.searching, 'onBackButton', this.stopSearch);
            GameManager.searchGame();
        },
        stopSearch: function() {
            this.stopListening(this.searching);
            this.searching.hidePopup();
            GameManager.stopSearch();
        },
        //Transtiton
        startGame: function(data) {
            setTimeout((function(){
                this.searching.hidePopup(function() {
                    app.router.navigateTo('#game');
                });
            }).bind(this), this.searching.animationDuration);
        }
    });
    return View;
});
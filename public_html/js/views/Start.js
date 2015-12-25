define(['app', 'tmpl/start', 'views/BaseView', 'views/components/Searching', 'views/components/Friend', 'models/game/GameManager'], function(app, tmpl, BaseView, Searching, Friend, GameManager) {
    var View = BaseView.extend({
        template: tmpl,
        loginRequire: true,
        events: {
            'click .js-random': 'onRandomGame',
            'click .js-friend': 'onFriendGame',
        },
        initialize: function() {
            this.listenTo(GameManager, 'startGame', this.onStartGame);
        },
        //Possible modes
        onRandomGame: function() {
            this.popup = new Searching();
            this.popup.present();

            this.listenTo(this.popup, 'onBackButton', function() {
                this.stopSearch();
                this.disposePopupIfNeeded();
            });

            this.startSearch();
        },
        onFriendGame: function() {
            this.popup = new Friend();
            this.popup.present();

            //searching with parameters
            this.listenTo(this.popup, 'onInviteButton', this.startSearch);
            this.listenTo(this.popup, 'onJoinButton', this.startSearch);

            this.listenTo(this.popup, 'onBackButton', this.disposePopupIfNeeded);
            this.listenTo(this.popup, 'onModeBackButton abortSearch', this.stopSearch);
        },
        //Searching
        startSearch: function(context) {
            GameManager.searchGame(context);
        },
        stopSearch: function() {
            GameManager.stopSearch();
        },
        //Transtiton
        onStartGame: function(data) {
            setTimeout((function(){
                this.popup.hidePopup(function() {
                    app.router.navigateTo('#game');
                });
            }).bind(this), this.popup.animationDuration);
        },
        disposePopupIfNeeded: function() {
            if (this.popup) {
                this.stopListening(this.popup);
                this.popup.hidePopup();
            }
        },
    });
    return View;
});
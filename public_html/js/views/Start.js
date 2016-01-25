define(['app', 'tmpl/start', 'views/BaseView', 'views/components/Searching', 'views/components/Friend', 'models/game/GameManager', 'views/components/SegmentControl'], function(app, tmpl, BaseView, Searching, Friend, GameManager, Segment) {
    var View = BaseView.extend({
        template: tmpl,
        loginRequire: true,
        events: {
            'click .js-start': 'makeSearch'
        },
        initialize: function() {
            this.listenTo(GameManager, 'startGame', this.onStartGame);
        },
        onViewLoad: function() {
            this.modeSegment = new Segment(["СЛУЧАЙНЫЙ", "ДРУГ"]);
            this.typeSegment = new Segment(["БЛИЦ", "ДОЛГАЯ"]);
        },
        onViewHide: function() {
            this.modeSegment.remove();
            this.modeSegment = null;

            this.typeSegment.remove();
            this.typeSegment = null;
        },
        render: function() {
            this.$el.html(this.template({
                'arg': this.context,
                'app': app
            }));
            $('#title-searchtype').after(this.modeSegment.render().el);
            $('#title-gametype').after(this.typeSegment.render().el);
        },
        makeSearch: function() {
            if (this.modeSegment.selectedIndex == 0) {
                this.onRandomGame();
            } else {
                this.onFriendGame();
            }
        },
        //Possible modes
        onRandomGame: function() {
            this.popup = new Searching();
            this.popup.present();

            this.listenTo(this.popup, 'onBackButton', function() {
                this.stopSearch();
                this.disposePopupIfNeeded();
            });

            this.startSearch({});
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
            context.gameType = this.typeSegment.selectedIndex;
            GameManager.searchGame(context);
        },
        stopSearch: function() {
            GameManager.stopSearch();
        },
        //Transition
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
        }
    });
    return View;
});
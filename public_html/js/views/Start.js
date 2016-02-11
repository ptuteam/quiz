define(['app', 'tmpl/start', 'views/BaseView', 'views/components/popup/RandomPopup', 'views/components/popup/FriendPopup', 'models/game/manager/GameManager', 'views/components/control/SegmentControl'], function(app, tmpl, BaseView, Searching, Friend, GameManager, Segment) {
    var View = BaseView.extend({
        template: tmpl,
        loginRequire: true,
        events: {
            'click .js-start': 'onStartButton'
        },
        initialize: function() {
            this.listenTo(GameManager, 'startBlitzGame startMapGame', this.onStartGame);
        },
        onViewLoad: function() {
            this.typeSegment = new Segment(["СЛУЧАЙНЫЙ", "ДРУГ"]);
            this.modeSegment = new Segment(["БЛИЦ", "ДОЛГАЯ"]);
        },
        onViewHide: function() {
            this.modeSegment.remove();
            this.typeSegment.remove();

            this.typeSegment = null;
            this.modeSegment = null;

        },
        render: function() {
            this.$el.html(this.template({
                'arg': this.context,
                'app': app
            }));
            $('#title-searchtype').after(this.typeSegment.render().el);
            $('#title-gametype').after(this.modeSegment.render().el);
        },
        onStartButton: function() {
            var gameType = this.typeSegment.selectedIndex;
            var gameMode = this.modeSegment.selectedIndex;

            if (gameType == 0) {
                this.onRandomGame(gameMode);
            } else {
                this.onFriendGame(gameMode);
            }
        },
        //Possible modes
        onRandomGame: function(mode) {
            this.popup = new Searching();
            this.popup.present();

            this.listenTo(this.popup, 'onBackButton', function() {
                this.stopSearch();
                this.disposePopupIfNeeded(this.popup);
            });

            this.startSearch({mode: mode});
        },
        onFriendGame: function(mode) {
            this.popup = new Friend({mode: mode});
            this.popup.present();

            //searching with parameters
            this.listenTo(this.popup, 'onInviteButton', this.startSearch);
            this.listenTo(this.popup, 'onJoinButton', this.startSearch);
            this.listenTo(this.popup, 'onModeBackButton abortSearch', this.stopSearch);
            this.listenTo(this.popup, 'onBackButton', (function(){
                this.disposePopupIfNeeded(this.popup);
            }).bind(this));
        },
        //Searching
        startSearch: function(context) {
            GameManager.searchGame(context);
        },
        stopSearch: function() {
            GameManager.stopSearch();
        },
        //Transition
        onStartGame: function(data) {
            setTimeout((function(){
                var mode = data.mode == 0 ? 'blitz' : 'map';
                this.popup.hidePopup(function() {
                    app.router.navigateTo('#game/' + mode);
                });
            }).bind(this), this.popup.animationDuration);
        },
    });
    return View;
});
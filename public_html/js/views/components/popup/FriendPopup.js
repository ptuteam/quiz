define(['views/components/popup/FriendInvitePopup', 'views/components/popup/FriendJoinPopup', 'tmpl/components/friend', 'popup'], function(FriendInvite, FriendJoin, tmpl) {
    var view = Backbone.Popup.extend({
        events: {
            'click .js-back': 'onBackButton',
            'click .js-invite': 'onInviteButton',
            'click .js-join': 'onJoinButton',
        },
        initialize: function(options) {
          this.mode = options.mode;
        },
        render: function() {
            this.$el.html(tmpl());
            return this
        },
        //Event handlers
        onBackButton: function() {
            this.trigger('onBackButton', this);
        },
        onModeBackButton: function() {
            $('#wrapper').show();
            this.trigger('onModeBackButton');
        },
        onInviteButton: function() {
            var view = new FriendInvite();
            this.listenTo(view, "onBackButton", this.onModeBackButton);
            
            this.trigger('onJoinButton', {'type': 1, mode: this.mode});

            this.replaceMain(view);
        },
        onJoinButton:  function() {
            var view = new FriendJoin();
            this.listenTo(view, "onBackButton", this.onModeBackButton);
            this.listenTo(view, "onInputFocus", this.onInputFocus);

            this.listenTo(view, "onRoomJoinButton", function(roomId) {
                this.trigger('onJoinButton', {'type': 2, 'roomId': roomId, mode: this.mode});
            });

            this.replaceMain(view);
        },
        onInputFocus: function() {
            this.trigger('abortSearch');
        },
        //View managers
        replaceMain: function(view) {
            $('#wrapper').hide();
            $('.b-friend-game').append(view.render().$el);
        },
        
    });
    return view;
});
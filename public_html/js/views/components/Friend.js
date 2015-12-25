define(['views/components/FriendInvite', 'views/components/FriendJoin', 'tmpl/components/friend', 'popup'], function(FriendInvite, FriendJoin, tmpl) {
    var view = Backbone.Popup.extend({
        events: {
            'click .js-back': 'onBackButton',
            'click .js-invite': 'onInviteButton',
            'click .js-join': 'onJoinButton',
        },
        render: function() {
            this.$el.html(tmpl());
            return this
        },
        //Event handlers
        onBackButton: function() {
            this.trigger('onBackButton', this);
        },
        onInviteButton: function() {
            var view = new FriendInvite();
            this.listenTo(view, "onBackButton", this.onModeBackButton);
            
            this.trigger('onJoinButton', {'type': 1});

            this.replaceMain(view);
        },
        onJoinButton:  function() {
            var view = new FriendJoin();
            this.listenTo(view, "onBackButton", this.onModeBackButton);

            this.listenTo(view, "onRoomJoinButton", function(roomId) {
                this.trigger('onJoinButton', {'type': 2, 'roomId': roomId});
            });

            this.replaceMain(view);
        },
        //View managers
        replaceMain: function(view) {
            $('#wrapper').hide();
            $('.b-friend-game').append(view.render().$el);
        },
        onModeBackButton: function() {
            $('#wrapper').show();
            this.trigger('onModeBackButton');
        }
    });
    return view;
});
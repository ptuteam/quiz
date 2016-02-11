define(['../../../models/game/manager/GameManager', 'tmpl/components/friend_invite'], function(GameManager, tmpl) {
    var view = Backbone.View.extend({
        events: {
            'click .js-back': 'onBackButton',
        },
        context: {},
        initialize: function() {
            this.listenTo(GameManager, 'initRoom', this.onInitRoom);
        },
        render: function() {
            this.$el.html(tmpl({'arg':this.context}));
            return this
        },
        onInitRoom: function(room) {
            document.getElementsByClassName("b-friend-invite__room")[0].innerHTML = room.roomId;
        },
        onBackButton: function() {
            this.trigger('onBackButton', this);
            this.remove();
        },
    });
    return view;
});
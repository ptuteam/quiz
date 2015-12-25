define(['backbone', 'tmpl/components/friend_join'], function(Backbone, tmpl) {
    var view = Backbone.View.extend({
        events: {
            'click .js-back': 'onBackButton',
            'click .js-join-room': 'onRoomJoin',
            'keypress': function(event) {
                if (event.keyCode === 13) {
                    this.onRoomJoin();
                }
            }
        },
        render: function() {
            this.$el.html(tmpl());
            return this
        },
        onRoomJoin: function() {
            var input = document.getElementById('input_room');
            if (this.validate(input)) {
                this.trigger('onRoomJoinButton', input.value);
            }
        },
        onBackButton: function() {
            this.trigger('onBackButton', this);
            this.remove();
        },
        validate: function(input) {
            input.setAttribute('type', 'number');
            input.setAttribute('min', '0');
            if (input.checkValidity() && input.value.lenght != 0) {
                $(input).removeClass('room_invalid');
                return true;
            } else {
                $(input).addClass("room_invalid");
                return false;
            }
        }
    });
    return view;
});
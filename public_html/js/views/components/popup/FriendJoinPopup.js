define(['backbone', '../loader/Spinner', 'tmpl/components/friend_join'], function(Backbone, Spinner, tmpl) {
    var view = Backbone.View.extend({
        events: {
            'click .js-back': 'onBackButton',
            'click .js-join-room': 'onRoomJoinButton',
            'keypress': function(event) {
                if (event.keyCode === 13) {
                    this.onRoomJoinButton();
                }
            },
            'focus .b-friend-join__room': function() {
                this.trigger('onInputFocus');
                Spinner.hide();
            }
        },
        render: function() {
            this.$el.html(tmpl());
            return this
        },
        onRoomJoinButton: function() {
            var input = document.getElementById('input_room');
            if (this.validate(input)) {
                this.trigger('onRoomJoinButton', input.value);
                input.blur();
                Spinner.show();
            }
        },
        onBackButton: function() {
            this.trigger('onBackButton', this);
            this.remove();
        },
        validate: function(input) {
            input.setAttribute('type', 'number');
            input.setAttribute('min', '0');
            if (input.checkValidity() && input.value.length != 0) {
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
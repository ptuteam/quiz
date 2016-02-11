define(['../../../tmpl/game/finish', 'popup'], function(tmpl) {
    var view = Backbone.Popup.extend({
        events: {
            'click .js-return': 'onReturn',
        },
        initialize: function(data) {
            this.winner = data;
        },
        render: function() {
            this.$el.html(tmpl(this.winner));
        },
        onReturn: function(event) {
            this.trigger('onReturn');
        },
    });
    return view;
});
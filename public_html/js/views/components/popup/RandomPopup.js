define(['../../../tmpl/components/searching', 'popup'], function(tmpl) {
    var view = Backbone.Popup.extend({
        events: {
            'click .js-back': 'onBackButton'
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html(tmpl());
            return this
        },
        onBackButton: function() {
            this.trigger('onBackButton', this);
        },
    });
    return view;
});
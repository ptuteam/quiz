define(['tmpl/components/searching', 'utils/api/ws/api_ws', 'popup'], function(tmpl, api) {
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
            this.trigger('onBackButton');
            this.hidePopup();
        },
    });
    return view;
});
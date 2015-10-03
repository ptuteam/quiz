define([
    'app'
], function(
    app
){
    var BaseView = Backbone.View.extend({

        loginRequire: false,
        el: 'body',

        dispose: function() {
            this.hide();
        },

        load: function() {
            this.render();
            this.show();
        },

        render: function () {
            this.$el.html(this.template());
        },

        show: function () {
            $(this.el).show();
        },

        hide: function () {
            $(this.el).hide();
        }
    });

    return BaseView;
});
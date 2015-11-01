define(['app'], function(app) {
    var BaseView = Backbone.View.extend({
        loginRequire: false,
        context: null,
        //View lifecycle
        unload: function() {
            this.hide();
        },
        load: function() {
            this.present();
        },
        //Overrides
        render: function() {
            this.$el.html(this.template({
                'arg': this.context
            }));
        },
        //View appearance
        show: function() {
            $(this.el).show();
        },
        hide: function() {
            $(this.el).hide();
        },
        present: function() {
            this.render();
            this.show();
        }
    });
    return BaseView;
});
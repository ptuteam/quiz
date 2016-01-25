define(['app'], function(app) {
    var BaseView = Backbone.View.extend({
        loginRequire: false,
        gameRequire: false,
        context: null,
        //View lifecycle
        unload: function() {
            this.onViewHide();
            this.hide();
        },
        load: function() {
            this.onViewLoad();
            this.present();
        },
        //Overrides
        render: function() {
            this.$el.html(this.template({
                'arg': this.context,
                'app': app
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
        },
        onViewLoad: function() {

        },
        onViewHide: function() {

        }
    });
    return BaseView;
});
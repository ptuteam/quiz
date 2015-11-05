define(['app', 'tmpl/main', 'views/BaseView'], function(app, tmpl, BaseView) {
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-logout': 'logoutAction'
        },
        logoutAction: function() {
            app.session.logout();
            this.present();
        },
        render: function() {
            this.$el.html(this.template({
                'arg': this.context,
                'app': app
            }));
            app.preloader.hide();
        },
    });
    return View;
});
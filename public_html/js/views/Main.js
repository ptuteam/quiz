define(['app', 'tmpl/main', 'views/BaseView'], function(app, tmpl, BaseView) {
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-logout': 'logoutAction',
        },
        logoutAction: function() {
            app.session.logout();
            this.present();
        },
    });
    return View;
});
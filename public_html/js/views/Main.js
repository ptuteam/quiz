define(['app', 'tmpl/main', 'views/BaseView', 'utils/api/ws/api_game'], function(app, tmpl, BaseView, api) {
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-logout': 'logoutAction'
        },
        logoutAction: function() {
            app.session.logout();
            this.present();
        },
    });
    return View;
});
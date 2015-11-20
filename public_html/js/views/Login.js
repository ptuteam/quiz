define(['app', 'tmpl/login', 'views/BaseView', 'utils/AuthUtils'], function(app, tmpl, BaseView, utils) {
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-google': function(event) { this.login(app.session.GOOGLE_AUTH); },
            'click .js-guest': function(event) { this.login(app.session.GUEST_AUTH); },
        },
        //Login
        login: function(provider) {
            app.session.authorize(provider);
        }
    });
    return View;
});
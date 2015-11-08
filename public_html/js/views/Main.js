define(['app', 'tmpl/main', 'views/BaseView', 'utils/api/ws/api_ws', 'views/components/Searching'], function(app, tmpl, BaseView, api, Loading) {
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-logout': 'logoutAction',
            'click .js-start': 'searchGame'
        },
        logoutAction: function() {
            app.session.logout();
            this.present();
        },
        searchGame: function() {
            var view = new Loading();
            view.render().showModal();
        },
    });
    return View;
});
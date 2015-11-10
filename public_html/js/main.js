define(['backbone', 'router', 'app', 'models/Session'], function(Backbone, router, app, Session) {
    app.session = new Session();
    app.router = router;
    window.onSocialAuth = function() {
        app.session.checkAuth(function(isAuthorized) {
            if (isAuthorized) {
                app.router.navigateToMain();
            }
        });
    };
    app.session.checkAuth(function() {
        Backbone.history.start();
    });
});
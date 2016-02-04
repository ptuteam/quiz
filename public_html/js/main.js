define(['backbone', 'router', 'app', 'models/Session'], function(Backbone, router, app, Session) {
    $(function(){
        var rx = /INPUT|SELECT|TEXTAREA/i;

        $(document).bind("keydown keypress", function(e){
            if( e.which == 8 ){ // 8 == backspace
                if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                    e.preventDefault();
                }
            }
        });
    });

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
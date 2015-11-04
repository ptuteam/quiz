define(['backbone', 'app', 'models/User'], function(Backbone, app, UserModel) {
    var Model = Backbone.Model.extend({
        GOOGLE_AUTH: 0,
        GUEST_AUTH: 1,
        defaults: {
            loggedIn: false,
        },
        initialize: function() {
            this.user = UserModel;
        },
        authorize: function(provider) {
            switch (provider) {
                case this.GOOGLE_AUTH:
                    app.api.auth.googleAuth();
                    break;
                case this.GUEST_AUTH:
                    app.api.auth.guestAuth();
                    break;
            }
        },
        checkAuth: function(callback) {
            var self = this;
            app.api.user.getUser().then(
                function(userdata) {
                    self.user.set(userdata);
                    self.set('loggedIn', true);
                    callback(true);
                },
                function() {
                    callback(false);
                }
            );
        },
        logout: function() {
            app.api.auth.logout();
            this.user = UserModel;
            this.set('loggedIn', false);
        }
    });
    return Model;
});
define(['backbone', 'app'], function(Backbone, app) {
    var Model = Backbone.Model.extend({
    	GOOGLE_AUTH: 0,
    	GUEST_AUTH:1,

        defaults: {
            loggedIn: false,
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
        }
    });
    return Model;
});
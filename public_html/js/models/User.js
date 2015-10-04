define([
	'backbone'
], function(
	Backbone
){

    var User = Backbone.Model.extend({
        defaults: {
        	"user_id": "",
            "first_name": "",
            "last_name": "",
            "avatar": ""
        }
    });

    return User;
});
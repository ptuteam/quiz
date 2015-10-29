define([
	'backbone',
	'syncs/UserSync'
], function(
	Backbone,
	UserSync
){
    var Model = Backbone.Model.extend({
        sync: UserSync,
        defaults: {
            "first_name": "",
            "last_name": "",
            "avatar": "",
            "email": "",
        }
    });

    return new Model();
});
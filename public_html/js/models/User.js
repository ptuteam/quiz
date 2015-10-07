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
            "email": "",
            "password": ""
        }
    });

    return new Model();
});
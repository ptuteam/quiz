define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
    	defaults: {
    		"first_name": "",
    		"score": 0
    	}
    });

    return Model;
});
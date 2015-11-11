define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
        initialize: function(data) {
        	this.player = {};
        	this.opponent = {};
        },
        startGame: function() {

        },
        finishGame: function() {
        	
        }
    });
    return Model;
});
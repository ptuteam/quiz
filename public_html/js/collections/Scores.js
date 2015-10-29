define([
    'models/Score',
    'syncs/ScoreSync'

], function(
    Score,
    ScoresSync
){

    var Collection = Backbone.Collection.extend({
    	model: Score,
        sync: ScoresSync,

    	comparator: function(score) {
    		return -score.get('score');
    	},
    });

    return Collection;
});
define(['models/Score', 'syncs/ScoreSync'], function(Score, ScoresSync) {
    var Collection = Backbone.Collection.extend({
        model: Score,
        sync: ScoresSync,
        comparator: function(score) {
            return -score.get('score');
        },
        onLoad: function(data) {
        	this.set(data);
        	this.trigger('scores_loaded');
        	localStorage.setItem('scores', JSON.stringify(data));
        },
        onErrorLoad: function() {
        	this.set(JSON.parse(localStorage.getItem('scores')));
        	this.trigger('scores_loaded');
        }
    });
    return Collection;
});
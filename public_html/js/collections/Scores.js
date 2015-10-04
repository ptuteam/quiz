define([
    'backbone',
    'models/Score'
], function(
    Backbone,
    Score
){

    var Collection = Backbone.Collection.extend({
    	model: Score,

    	comparator: function(score) {
    		return -score.get('score');
    	},

        fill: function() {
            var data = [
                {first_name:"Слабый", score:345},
                {first_name:"Johnsoon", score:5234},
                {first_name:"Отец", score:632},
                {first_name:"Нормальный", score:7457},
                {first_name:"Ненормальный", score:1245},
                {first_name:"Псих", score:7876},
                {first_name:"Profi", score:200},
                {first_name:"CrAzY GIRL120", score:87655},
                {first_name:"Главный", score:2135},
                {first_name:"Friend", score:2346},
            ];
            this.reset();
            for(var i = 0; i < data.length; ++i) {
                this.add(new Score(data[i]));
            }
            this.trigger('scores_fetched');
        }
    });

    return Collection;
});
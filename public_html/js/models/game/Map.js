define(['backbone', 'Area'], function(Backbone) {
    var Model = Backbone.Model.extend({
        segments:[],
        initialize: function(data) {
            this.segments = [];
            for (var i = 0; i < 12; ++i) {
                this.segments.push(new Area({value:200}));
            }
        },
        getPlayerTerritory: function(player) {
            
        },
    });
    return Model;
});
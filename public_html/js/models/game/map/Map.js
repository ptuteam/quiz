define(['backbone'], function(Backbone) {
    var Area = Backbone.Model.extend({
        value: 200,
        owner: null,
        color: null,
        areaID: 0,
        initialize: function(options) {
            this.value = options.value;
            this.owner = options.owner;
            this.areaID = options.areaID;
        },
        setOwner: function(owner) {
            this.owner = owner;
        },
        setValue: function(value) {
            this.value = value;
        }
    });

    var Model = Backbone.Model.extend({
        segments:[],
        initialize: function(data, players) {
            this.segments = [];
            for (var i = 0; i < data.length; ++i) {
                var owner = players.filter(function(obj) {
                    return obj.email === data[i].user;
                })[0];

                this.segments.push(new Area({value: data[i].value, owner: owner, areaID: data[i].id}));
            }
        },
        getPlayerTerritory: function(player) {
            return this.segments.filter(function(obj) {
                return obj.owner === player;
            })
        },
    });
    return Model;
});

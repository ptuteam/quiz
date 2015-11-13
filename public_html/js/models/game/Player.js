define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
        defaults: {
            name: "",
            avatar: "",
            score: "0"
        },
        initialize: function(data) {
            this.name = data.first_name;
            this.avatar = data.avatar;
            this.score = data.score;
        },
        update: function(data) {
            this.score = data.score
        }
    });
    return Model;
});
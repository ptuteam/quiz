define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
        defaults: {
            name: "",
            lastname: "",
            email: "",
            avatar: "",
            score: "0",
            playerID: 0,
        },
        initialize: function(data) {
            this.name = data.first_name;
            this.lastname = data.last_name;
            this.email = data.email;
            this.avatar = data.avatar;
            this.score = data.score;
            this.playerID = data.playerID;
        },
        update: function(data) {
            this.score = data.score
        }
    });
    return Model;
});
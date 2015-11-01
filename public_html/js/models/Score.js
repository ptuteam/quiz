define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
        defaults: {
            "first_name": "",
            "last_name": "",
            "avatar": "",
            "score": 0
        }
    });
    return Model;
});
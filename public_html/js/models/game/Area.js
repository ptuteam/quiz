define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
        value: 200,
        owner: null,
        initialize: function(options) {
            this.value = options.value;
            this.owner = options.owner;
        },
        setOwner: function(owner) {
            this.owner = owner;
        },
        setValue: function(value) {
            this.value = value;
        }
    });
    return Model;
});
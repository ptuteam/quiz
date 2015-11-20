define(['backbone', 'utils/api/ws/api_ws'], function(Backbone, Api) {
    var Model = Backbone.Model.extend({
        answeredIndex: -1,
        answeredCorrectly: null,
        defaults: {
        	title: "",
        	isSent: false,
        },
        initialize: function(data) {
        	this.title = data.title;
        	this.answers = data.answers;
        },
        sendAnswer: function(index, callback) {
        	if (!this.isSent()) {
                this.answeredIndex = index;
        		Api.sendAnswer(this.answers[index]);
                if (callback) {
                    callback();
                }
        	}
        },
        isSent: function() {
            return this.answeredIndex != -1;
        }

    });
    return Model;
});
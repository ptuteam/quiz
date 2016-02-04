define(['backbone', 'utils/api/ws/api_ws'], function(Backbone, Api) {
    var Model = Backbone.Model.extend({
        answeredIndex: -1,
        defaults: {
        	title: "",
        	isSent: false,
            time: 0,
        },
        initialize: function(data) {
        	this.title = data.title;
        	this.answers = data.answers;
            this.time = 7;
            this.number = data.number;
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
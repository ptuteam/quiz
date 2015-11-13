define(['backbone', 'utils/api/ws/api_ws'], function(Backbone, Api) {
    var Model = Backbone.Model.extend({
        defaults: {
        	title: "",
        	isSent: false,
        },
        initialize: function(data) {
        	this.title = data.question;
        	this.answers = data.answers;
        },
        sendAnswer: function(answer) {
        	if (!this.isSent) {
        		console.log('Answer sent');
        		Api.sendAnswer(answer);
        		this.isSent = true;
        	}
        }

    });
    return Model;
});
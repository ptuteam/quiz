define(['app', 'tmpl/game', 'views/BaseView', 'utils/api/ws/api_ws'], function(app, tmpl, BaseView, api) {
    var View = BaseView.extend({
        template: tmpl,
        events: {
        	"click .js-connect": function() {api.startConnection();},
        	"click .js-send": function(event) {
        		api.sendAnswer(event.target.innerText);
        	}
        },
        initialize: function() {
        	this.listenTo(app.wsEvents, "wsGameStart", this.onGameStart);
        	this.listenTo(app.wsEvents, "wsGameFinished", this.onGameFinish);
        	this.listenTo(app.wsEvents, "wsRoundStart", this.onNewRound);
        	this.listenTo(app.wsEvents, "wsRoundEnd", this.onFinishRound);
        	this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);

        },
        onGameStart: function(data) {
            console.log("OnGameStart");
        },
        onGameFinish: function(data) {
            console.log("OnGameFinish");
            alert('winner:' + data.winner);
        	this.context = undefined;
        	this.render();
        },
        onNewRound: function(data) {
        	console.log("OnNewRound");

        },
        onFinishRound: function(data) {
        	console.log("Finished round");

        },
        onNewQuestion: function(data) {
        	this.context = data;
        	this.render();
            console.log("OnNewQuestui");


        },
        onPlayerConnect: function(data) {
        	//console.log(data);

        },
    });
    return View;
});
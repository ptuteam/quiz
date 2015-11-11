define(['app', 'tmpl/game', 'views/BaseView', 'utils/api/ws/api_ws', 'views/components/Question', 'jquery-ui'], function(app, tmpl, BaseView, api, QuestionView) {
    var View = BaseView.extend({
        template: tmpl,
        initialize: function() {
            this.listenTo(app.wsEvents, "wsGameFinished", this.onGameFinish);
            this.listenTo(app.wsEvents, "wsGameStart", this.onGameStart);
            this.listenTo(app.wsEvents, "wsRoundStart", this.onNewRound);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onFinishRound);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);

            this.opponent = null;
        },
        onGameStart: function(data) {
            var opponent = data.players.find(function(element) {
                return app.session.user.get('email') != element.email;
            });
            this.context = {"opponent": opponent};
            console.log(this.context.opponent.email);

        },
        onGameFinish: function(data) {
            this.questionView.destroy();
            console.log('Game finished');
            console.log(data);
        },
        onNewRound: function(data) {
            console.log("OnNewRound");
        },
        onFinishRound: function(data) {
            this.questionView.hideModal();
        },
        onNewQuestion: function(data) {
            this.questionView = new QuestionView(data);
            this.questionView.present();
        },
        //Animation
        load: function() {
            this.present();
            $(".container").addClass('container-wide', 500, 'swing');
        },
        unload: function() {
            this.hide();
            $('.container').removeClass('container-wide', 500, 'swing');
        },
    });
    return View;
});
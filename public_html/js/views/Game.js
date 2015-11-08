define(['app', 'tmpl/game', 'views/BaseView', 'utils/api/ws/api_ws', 'views/components/Question', 'jquery-ui'], function(app, tmpl, BaseView, api, QuestionModal) {
    var View = BaseView.extend({
        template: tmpl,
        initialize: function() {
            this.listenTo(app.wsEvents, "wsGameFinished", this.onGameFinish);
            this.listenTo(app.wsEvents, "wsRoundStart", this.onNewRound);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onFinishRound);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);
            this.questionModal = new QuestionModal();
        },
        onGameFinish: function(data) {
            console.log('Game finished');
            console.log(data);
        },
        onNewRound: function(data) {
            console.log("OnNewRound");
        },
        onFinishRound: function(data) {
            this.questionModal.hideModal();
        },
        onNewQuestion: function(data) {
            this.questionModal.present(data);
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
define(['tmpl/scoreboard', 'views/BaseView', 'models/Score', 'collections/Scores'], function(tmpl, BaseView, Score, Scores) {
    var View = BaseView.extend({
        template: tmpl,
        collection: new Scores(),
        initialize: function() {
            this.context = this.collection;
            this.listenTo(this.collection, 'scores_loaded', this.onLoadComplete);
        },
        load: function() {
            this.collection.fetch();
        },
        onLoadComplete: function() {
            this.present();
        }
    });
    return View;
});
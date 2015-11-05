define(['app', 'backbone', 'tmpl/scoreboard', 'views/BaseView', 'models/Score', 'collections/Scores'], function(app, Backbone, tmpl, BaseView, Score, Scores) {
    var View = BaseView.extend({
        template: tmpl,
        collection: new Scores(),
        initialize: function() {
            this.context = this.collection;
            this.listenTo(this.collection, 'scores_fetched', this.onLoadComplete);
        },
        load: function() {
            //Fetching score...
            app.preloader.show();
            this.collection.fetch();
        },
        onLoadComplete: function() {
            this.present();
            app.preloader.hide();
        }
    });
    return View;
});
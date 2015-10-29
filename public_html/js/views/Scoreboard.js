define([
    'backbone',
    'tmpl/scoreboard',
    'views/BaseView',
    'models/Score',
    'collections/Scores'
], function(
    Backbone,
    tmpl,
    BaseView,
    Score,
    Scores
){
    var View = BaseView.extend({
        template: tmpl,
        collection: new Scores(),

        initialize: function() {
            this.context = this.collection;
            this.listenTo(this.collection, 'scores_fetched', this.onLoadComplete);
        },

        load: function() {
            //Fetching score...
            this.collection.fetch();
        },

        onLoadComplete: function() {
            this.present();
        }

    });

    return View;
});
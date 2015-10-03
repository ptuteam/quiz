define([
    'backbone',
    'tmpl/scoreboard',
    'views/BaseView'
], function(
    Backbone,
    tmpl,
    BaseView
){
    var View = BaseView.extend({
        template: tmpl
    });

    return View;
});
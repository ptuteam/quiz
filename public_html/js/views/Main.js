define([
    'backbone',
    'tmpl/main',
    'views/BaseView'
], function(
    Backbone,
    tmpl,
    BaseView
){
    var View = BaseView.extend({
        template: tmpl,
    });

    return View;
});
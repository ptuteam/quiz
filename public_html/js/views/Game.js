define(['backbone', 'tmpl/game', 'views/BaseView'], function(Backbone, tmpl, BaseView) {
    var View = BaseView.extend({
        template: tmpl
    });
    return View;
});
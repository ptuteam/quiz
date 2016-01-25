define(['app', 'tmpl/game/game_map', 'views/BaseView'], function(app, tmpl, BaseView) {
    var View = BaseView.extend({
        template: tmpl,
        initialize: function() {
        }
    });
    return View;
});
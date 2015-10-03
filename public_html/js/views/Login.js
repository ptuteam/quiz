define([
    'backbone',
    'tmpl/login',
    'views/BaseView'
], function(
    Backbone,
    tmpl,
    BaseView
){
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-submit': function() {$('#login_form').submit();},
            'keyup': function() {if(event.keyCode == 13){this.$("#login_form").submit();}},
        }
    });

    return View;
});
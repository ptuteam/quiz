define([
    'app',
    'backbone',
    'tmpl/login',
    'views/BaseView',
    'utils/AuthUtils'

], function(
    app,
    Backbone,
    tmpl,
    BaseView,
    utils
){
    var View = BaseView.extend({
        template: tmpl,
        events: {
            'click .js-submit': function(event) {this.openAuthPopup();},
            'keyup': function(event) {if(event.keyCode == 13){this.openAuthPopup(event);}}
        },

        //Validation
        isValidForm: function() {
            //return $("#login_form").valid();
        },

        //Submitting
        openAuthPopup: function() {
            var popUpTitle = 'Авторизация';
            var GUEST_OAUTH_URL = 'http://127.0.0.1:8081/api/v1/auth/guest'
            utils.openPopup(GUEST_OAUTH_URL, popUpTitle);
        }
    });

    return View;
});
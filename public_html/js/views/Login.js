define([
    'backbone',
    'tmpl/login',
    'views/BaseView',
    'models/User',
    'lib/jquery.validate',

], function(
    Backbone,
    tmpl,
    BaseView,
    User
){
    var View = BaseView.extend({
        template: tmpl,
        user: User,
        events: {
            'click .js-submit': function(event) {this.submit(event);},
            'keyup': function(event) {if(event.keyCode == 13){this.submit(event);}}
        },

        //Validation
        isValidForm: function() {
            return $("#login_form").valid();
        },

        //Submitting
        submit: function(event) {
            event.preventDefault();
            if (this.isValidForm()) {
                var pass = this.$("input[name=password]").val();
                var email = this.$("input[name=email]").val();

                this.user.set({"email": email, "password": pass});
                this.user.save();
            }
        }
    });

    return View;
});
define([], function() {
    var View = {
        el: '#loader-wrapper',
        show: function() {
            $(this.el).fadeIn('fast');
        },
        hide: function() {
            $(this.el).fadeOut('fast');
        }
    };
    return View;
});
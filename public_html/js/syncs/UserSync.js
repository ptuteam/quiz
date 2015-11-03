define(['app'], function(app) {
    return function(method, model, options) {
        var methods = {
            'read': {
                send: function() {
                    this.loadData();
                },
                loadData: function() {
                    app.api.user.getUser().then(this.successLoadingHandler, this.errorLoadingHandler);
                },
                successLoadingHandler: function(data) {
                    model.set(data);
                },
                errorLoadingHandler: function(message) {
                    model.trigger('user_fetch:error', message);
                }
            },
        };
        return methods[method].send();
    };
});
define(['app'], function(app) {
    return function(method, collection, options) {
        var methods = {
            'read': {
                send: function() {
                    this.loadData();
                },
                loadData: function() {
                    app.api.scores.loadRating().then(this.successLoadingHandler, this.errorLoadingHandler);
                },
                successLoadingHandler: function(data) {
                    collection.onLoad(data);
                },
                errorLoadingHandler: function(message) {
                    collection.onErrorLoad();
                }
            },
        };
        return methods[method].send();
    };
});
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
                    collection.set(data);
                    collection.trigger('scores_fetched');
                },
                errorLoadingHandler: function(message) {
                    collection.trigger('scores_fetch:error', message);
                }
            },
        };
        return methods[method].send();
    };
});
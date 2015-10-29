define(['jquery'], function($) {
    return (function() {
        // Private vars
        var LOAD_RATING_URL = '/api/v1/scores';

        return {
            loadRating: function() {
                var def = $.Deferred();
                var scores = $.get(LOAD_RATING_URL);

                scores.done(function(data) {
                    if (data.error == null) {
                        def.resolve(data.users);
                    } else {
                        def.reject(data.error.description);
                    }
                });
                scores.fail(function() {
                    def.reject("Ошибка подключения");
                });
                return def;
            }
        }
    })();
});
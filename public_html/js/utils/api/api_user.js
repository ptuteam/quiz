define(['jquery', 'utils/AuthUtils'], function($, util) {
    return (function() {
        var USER_GET_URL = '/api/v1/user/get';
        return {
            getUser: function() {
                var def = $.Deferred();
                var user = $.get(USER_GET_URL).done(function(data) {
                    def.resolve(data.user);
                }).fail(function() {
                    def.reject("Ошибка подключения");
                });
                return def.promise();
            }
        }
    })();
});
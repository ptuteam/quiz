define([
    'app'
], function(
    app
) {

    return function(method, model, options) {
        var methods = {
            'create': {
                send: function() {
                    $.ajax({
                    type: "POST",
                        url: '/api/v1/auth/signin',
                        data: JSON.stringify(model.toJSON())
                });
                }
            },
        };

        return methods[method].send();
    };
});
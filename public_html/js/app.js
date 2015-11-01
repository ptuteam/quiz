define(["jquery", "underscore", "backbone", "utils/api/api_scores", "utils/api/api_auth"], function($, _, Backbone, ApiScores, ApiAuth) {
    var app = {
        "api": {
            "scores": ApiScores,
            "auth": ApiAuth,
        },
    };
    return app;
});
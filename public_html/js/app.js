define(["jquery", "underscore", "backbone", "views/components/Preloader", "utils/api/api_scores", "utils/api/api_auth", "utils/api/api_user"], function($, _, Backbone, Preloader, ApiScores, ApiAuth, ApiUser) {
    var app = {
        api: {
            scores: ApiScores,
            auth: ApiAuth,
            user: ApiUser
        },
        session: null,
        router: null,
        preloader: Preloader,
        wsEvents: new _.extend({}, Backbone.Events),
    };
    return app;
});
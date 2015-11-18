require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        'jquery-ui': "lib/jquery-ui/jquery-ui.min",
        'popup': "lib/popup"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: '$',
        },
        'popup': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});
require(['main']);
define([
    "jquery", 
    "underscore",
    "backbone",
    "utils/api/api_scores"
],
function(
    $,
    _,
    Backbone,
    ApiScores
){
    var app = {
    	"api": {
        	"scores": ApiScores,
        },
    };

    return app;
});
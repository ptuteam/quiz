define(["app"], function(app) {
    return (function() {
        var GAME_START = 1;
        var NEW_SCORES = 2;
        var GAME_FINISHED =3;
        var PLAYER_DISCONNECTED = 4;
        var NEW_QUESTION = 5;
        var ANSWER = 6;
        var TOO_MANY_ROOMS = 7;
        var NEW_PLAYER_CONNECT = 8;
        var ROUND_START = 9;
        var ANSWER_RESULTS = 10;
        var INIT_ROOM = 11;
        var ROUND_END = 17;

        return {
            ANSWER_CODE: ANSWER,
            onMessage: function(message) {
                var data = JSON.parse(message.data);
                switch(data.code) {
                    case GAME_START: {
                        app.wsEvents.trigger("wsGameStart", data);
                        break;
                    }
                    case NEW_SCORES: {
                        app.wsEvents.trigger("wsNewScores", data);
                        break;
                    }
                    case GAME_FINISHED: {
                        app.wsEvents.trigger("wsGameFinished", data);
                        break;
                    }
                    case PLAYER_DISCONNECTED: {
                        app.wsEvents.trigger("wsPlayerDisconnected", data);
                        break;
                    }
                    case NEW_QUESTION: {
                        app.wsEvents.trigger("wsNewQuestion", data);
                        break;
                    }
                    case TOO_MANY_ROOMS: {
                        app.wsEvents.trigger("wsTooManyRooms", data);
                        break;
                    }
                    case NEW_PLAYER_CONNECT: {
                        app.wsEvents.trigger("wsNewPlayerConnect", data);
                        break;
                    }
                    case ROUND_START: {
                        app.wsEvents.trigger("wsRoundStart", data);
                        break;
                    }
                    case ANSWER_RESULTS: {
                        app.wsEvents.trigger('wsAnswerResults', data);
                        break;
                    }
                    case INIT_ROOM: {
                        app.wsEvents.trigger("wsInitRoom", data);
                        break;
                    }
                    case ROUND_END: {
                        app.wsEvents.trigger("wsRoundEnd", data);
                        break;
                    }
                }
            },
        }
    })()
});
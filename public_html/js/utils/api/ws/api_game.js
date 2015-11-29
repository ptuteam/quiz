define(["app"], function(app) {
    return (function() {
        var GAME_START = 1;
        var ROUND_END = 2;
        var GAME_FINISHED =3;
        var PLAYER_DISCONNECTED = 4;
        var NEW_QUESTION = 5;
        var ANSWER = 6;
        var TOO_MANY_ROOMS = 7;
        var NEW_PLAYER_CONNECT = 8;
        var ROUND_START = 9;
        var IS_CORRECT_ANSWER = 10;
        var ROOM_PLAYERS = 11;


        return {
            ANSWER_CODE: ANSWER,
            onMessage: function(message) {
                var data = JSON.parse(message.data);
                switch(data.code) {
                    case GAME_START: {
                        app.wsEvents.trigger("wsGameStart", data);
                        break;
                    }
                    case ROUND_END: {
                        app.wsEvents.trigger("wsRoundEnd", data);
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
                    case IS_CORRECT_ANSWER: {
                        app.wsEvents.trigger('wsIsCorrectAnswer', data);
                    }
                    case ROOM_PLAYERS: {
                        app.wsEvents.trigger("wsRoomPlayers", data);
                        break;
                    }
                }
            },
        }
    })()
});
define(["app", "utils/api/ws/api_game"], function(app, api_game) {
    return (function() {
        var BASE_URL =  'ws://' + location.host + '/gameplay';

        return {
            currentApi: null,
            startConnection: function(context) {
                var url = this.buildURL(context, url);

            	var webSocket = new WebSocket(url);
            	this.socket = webSocket;

                this.setListeners();
            },        
            closeConnection: function() {
                if (this.socket) {
                    this.socket.close();
                    this.socket = null;
                }
            },
            setListeners: function() {
                this.currentApi = api_game;

                this.socket.onopen = this.onOpen;
                this.socket.onmessage = this.currentApi.onMessage;
                this.socket.onclose = this.onClose;
                this.socket.onerror = this.onError;
            },
            onOpen: function() {
            	console.log("Socket is opened");
            },
            onClose: function() {
            	console.log("Socket is closed");
            },
            onMessage: function(message) {
            	console.log(message.data);
            },
            onError:function() {
            	console.log("Socket is fucked");
            },
            send: function(data) {
                this.socket.send(data);
            },
            sendAnswer: function(answer) {
                var data = {
                    code: api_game.ANSWER_CODE,
                    answer: answer
                };
                this.send(JSON.stringify(data));
            },
            isOpen: function() {
                return (this.socket != null);
            },
            buildURL: function(context) {
                var url = BASE_URL;
                var RANDOM_GAME  = 0;
                var INVITE_FRIEND_GAME = 1;
                var JOIN_FRIEND_GAME = 2;
                var BLITZ_GAME = 0;
                var MAP_GAME = 1;

                if (context) {
                    if (context.type == INVITE_FRIEND_GAME) {
                        url = url + '?type=' + context.type;
                    } else if (context.type == JOIN_FRIEND_GAME) {
                        url = url + '?type=' + context.type;
                        url = url + '&roomId=' + context.roomId;
                    } else {
                        url = url + '?type=' + RANDOM_GAME;
                    }
                    if (context.mode == BLITZ_GAME) {
                        url = url + '&mode=BLITZ'
                    } else if (context.mode == MAP_GAME) {
                        url = url + '&mode=MAPGAME'
                    }
                }

                return url;
            }
        }
    })();
});
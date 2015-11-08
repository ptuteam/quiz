define(["app", "config", "utils/api/ws/api_game"], function(app, config, api_game) {
    return {
        WS_URL: 'ws://' + location.host + '/gameplay',
        currentApi: null,

        startConnection: function() {
        	var webSocket = new WebSocket(this.WS_URL);

        	this.socket = webSocket;
        	this.currentApi = api_game;

        	webSocket.onopen = this.onOpen;
        	webSocket.onmessage = this.currentApi.onMessage;
        	webSocket.onclose = this.onClose;
        	webSocket.onerror = this.onError;
        },

        closeConnection: function() {
            this.socket.close();
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
        sendAnswer: function(title) {
            var data = {
                "code": 6,
                "answer": title
            };

            this.socket.send(JSON.stringify(data));
        }
    };
});
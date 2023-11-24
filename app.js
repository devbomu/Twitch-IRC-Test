const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    
    // Send CAP (optional), PASS, and NICK messages
    connection.sendUTF('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
    connection.sendUTF('NICK justinfan1231315615231651');

    // The username of a streamer
    var login = 'woowakgood';

    // The id of a chatter you're trying to find
    var chatterId = '138802499';

    connection.sendUTF('JOIN #' + login);

    var userIdStart, userIdEnd;
    var userId;
    var chatStart, chatEnd;
    var chat;

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            userIdStart = message.utf8Data.indexOf('user-id=') + 7;
            userIdEnd = message.utf8Data.indexOf(';', userIdStart+1);
            userId = message.utf8Data.substring(userIdStart+1, userIdEnd);

            chatStart = message.utf8Data.indexOf(login + ' :') + login.length + 1;
            chatEnd = message.utf8Data.length - 2;
            chat = message.utf8Data.substring(chatStart+1, chatEnd);

            chatterId === userId ? console.log(chat) : null;
        }
    });
});

client.connect('ws://irc-ws.chat.twitch.tv:80');
// server indítás nodemon server.js
var io = require('socket.io').listen(8000);
// Socket server SETUP
    io.configure(function() {
    // send minified client
    io.enable('browser client minification');
    // apply etag caching logic based on version number
    io.enable('browser client etag');
    // gzip the file
    io.enable('browser client gzip');
    // reduce logging
    io.set('log level', 1);
    // enable all transports
    io.set('transports', [
        'websocket',
        'flashsocket', // cookie-s SESSION ID-t nem kezel!
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]);
});

io.sockets.on('connection', function(socket) {
    //globalSocket = io.sockets; // sockdet globalizálása;
    console.log('SOCKET CONNECTION');
    //socket név + szoba regisztráció

    socket.on('pos', function(positions) {
          //console.log(positions);
        //socket.emit('positions', positions);
        socket.broadcast.emit('positions', positions);

    });
    // SERVER LEFT / DISCONNECT
    socket.on('disconnect', function() {
        console.log('SOCKET DISCONNECT');
        //socket.get('userData', function(error, userData) {});
    });
});

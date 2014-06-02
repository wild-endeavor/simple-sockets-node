var socketIO = require('socket.io');



function createChat (server) {
  var allTheSockets = [];
  var guestnumber = 1;
  var nicknames = {};  // keys:
  var io = socketIO.listen(server);
  io.sockets.on('connection', function(socket) {
    console.log("----- Initiating socket -----------");
    allTheSockets.push(socket);
    nicknames[socket.id] = "turing_" + guestnumber;
    // socket.emit('nickname', { nickname: nicknames[socket.id] });
    guestnumber++;

    // Handle incoming messages
    socket.on('message', function(data) {
      console.log(data);
      io.sockets.emit('message', { text: data.text, nickname: nicknames[socket.id] });
    });

    // Handle nickname change requests
    socket.on('nicknameChangeRequest', function(data) {
      if (data.nickname !== "") {
        nicknames[socket.id] = data.nickname;
      }
      socket.emit('nicknameChangeResponse', {nickname: nicknames[socket.id]});
    });

    // Handle disconnecting users
    socket.on('disconnect', function() {
      var idx = allTheSockets.indexOf(socket);
      allTheSockets.splice(idx, 1);
    })
  });
  return true;
}


exports.createChat = createChat;
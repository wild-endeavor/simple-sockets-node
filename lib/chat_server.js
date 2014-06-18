var socketIO = require('socket.io');
var und = require('../public/javascripts/underscore');
var db = require("./lib/db");

function handleIncomingMessage(io, socket) {
  console.log(data);
  io.sockets.emit("message", {
    text: data.text,
    nickname: nicknames[socket.id]
  });
}

function handleDisconnect(io, socket) {

}

function createChat (server) {
  var allTheSockets = [];
  var guestnumber = 1;
  var nicknames = {};  // keys:
  var io = socketIO.listen(server);
  io.sockets.on('connection', function(socket) {
    console.log("----- Initiating socket -----");

    var ipAddress = socket.handshake.address;

    function publishNicknames() {
      var names_only = [];
      und(nicknames).each(function(value) {
        names_only.push(value);
      });
      io.sockets.emit('memberListing', { participants: names_only });
      console.log(names_only);
    }

    allTheSockets.push(socket);
    nicknames[socket.id] = "turing_" + guestnumber;
    socket.emit('nickname', { nickname: nicknames[socket.id] });
    guestnumber++;

    publishNicknames();

    socket.on('message', handleIncomingMessage);

    // Handle nickname change requests
    socket.on('nicknameChangeRequest', function(data) {
      if (data.nickname !== "") {
        nicknames[socket.id] = data.nickname;
      }
      socket.emit('nicknameChangeResponse', {nickname: nicknames[socket.id]});
      publishNicknames();
    });

    // Handle disconnecting users
    socket.on('disconnect', function() {
      var idx = allTheSockets.indexOf(socket);
      allTheSockets.splice(idx, 1);
      delete nicknames[socket.id];
      publishNicknames();
    })
  });
  return true;
}


exports.createChat = createChat;
(function(root) {

  var uneChat = root.uneChat = (root.uneChat || {});

  var Chat = uneChat.Chat = function (socket) {
    this.socket = socket;
  }

  Chat.prototype.sendMessage = function(messageType, data) {
    this.socket.emit(messageType, data);
  };

  Chat.prototype.registerChannel = function (msgType, callback) {
    this.socket.on(msgType, callback);
  };

})(this);



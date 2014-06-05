(function(root) {

  var uneChat = root.uneChat = (root.uneChat || {});

  var ChatUi = uneChat.ChatUi = function(chatObj) {
    this.chatObj = chatObj;
  };

  // From the server
  ChatUi.prototype.handleIncomingMessage = function(data) {
    var $li = $("<li>");
    $li.text(data.nickname + " says: " + data.text);
    $('#messages').append($li);
  };

  ChatUi.prototype.handleNicknameResponse = function(data) {
    $("#username-input").val(data.nickname);
  };

  ChatUi.prototype.memberListingRefresh = function(data) {
    $ul = $("<ul>");
    _(data.participants).each(function(val) {
      $li = $("<li>");
      $li.html(val);
      $ul.append($li);
    });
    $("#participants").html($ul);
  };

  // Sends message to server
  ChatUi.prototype.sendMessage = function(message) {
    this.chatObj.sendMessage("message", { text: message });
  };

  ChatUi.prototype.changeNickname = function(nickname) {
    this.chatObj.sendMessage("nicknameChangeRequest", { nickname: nickname });
  };

})(this);


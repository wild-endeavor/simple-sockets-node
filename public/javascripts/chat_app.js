$(function() {
  var socket = io.connect();
  var chatObj = new uneChat.Chat(socket);
  var chatUiObj = new uneChat.ChatUi(chatObj);
  chatObj.registerChannel('message', chatUiObj.handleIncomingMessage);
  chatObj.registerChannel('nicknameChangeResponse',
     chatUiObj.handleNicknameResponse);

  // Make initial request to change nickname to something invalid.
  $('#username').submit(function (event) {
    event.preventDefault();
    var nickname = $(event.currentTarget).serializeJSON().user.nickname;
    chatUiObj.changeNickname(nickname);
  });

  chatUiObj.changeNickname("");

  $('#message-input').submit(function (event) {
    event.preventDefault();
    var message = $(event.currentTarget).serializeJSON().message.text;
    chatUiObj.sendMessage(message);
    $('#message-input').find("input").val("");
  });
});

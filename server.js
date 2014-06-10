var http = require('http');
var url = require('url');
var route = require('./router').route;
var requestHandlers = require('./request_handlers');
var createChat = require('./lib/chat_server').createChat;
var port = process.env.PORT || 8880;

var handle = {};
handle["/"] = requestHandlers.start;

var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  route(handle, pathname, response, request);
}).listen(port);

createChat(server);

console.log("Server running at http://localhost:" + port);


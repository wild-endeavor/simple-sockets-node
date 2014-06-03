var http = require('http');
var url = require('url');
var route = require('./router').route;
var requestHandlers = require('./request_handlers');
var createChat = require('./lib/chat_server').createChat;
var port = process.env.PORT || 8880;

var handle = {};
handle["/"] = requestHandlers.start;

console.log(route);

var server = http.createServer(function (request, response) {
  // console.log("RESPONSE");
  // console.log(response);
  // console.log("REQUEST");
  // console.log(request);
  var pathname = url.parse(request.url).pathname;
  route(handle, pathname, response, request);

  // response.writeHead(200, {'Content-Type': 'text/plain'});
 //  response.end('I AM THE DEVIL');
}).listen(port);

createChat(server);


console.log("Server running at http://localhost:" + port);

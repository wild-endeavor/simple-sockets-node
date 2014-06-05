var fs = require('fs');

function route(handleMatcher, pathname, response, request) {
  if (typeof handleMatcher[pathname] === "function") {
    handleMatcher[pathname](response);
  } else {
    var path = "." + pathname;
    console.log(path);
    fs.readFile(path, {encoding: "utf8"}, function(err, data) {
      if (err) {
        console.log("fs error");
        console.log("Error 404");
        response.writeHead(404, {"Content-Type": "text/plain" });
        response.write("Content not found.");
        response.end("Error loading something.");
      }
      response.writeHead(200);
      response.end(data);
    });
  }
}

exports.route = route;


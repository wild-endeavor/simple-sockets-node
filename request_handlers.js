
var exec = require("child_process").exec;
var fs = require('fs');

function start(response) {
  console.log("Request handler 'start' was called.");
  var content = "empty";

  fs.readFile("./public/index.html", {encoding: "utf8"}, function(err, data) {
    if (err) {
      console.log("fs error");
    }
    response.writeHead(200, {"Content-Type": "text/html" });
    response.write(data);
    response.end();

  });
}

function upload(response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("in upload");
    response.end();
}

exports.start = start;
exports.upload = upload;
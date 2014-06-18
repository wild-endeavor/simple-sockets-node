var mongoose = require("mongoose");
var schemas = require("./lib/schemas");

mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

var Session = mongoose.model("Session", schemas.session);
var ChatLog = mongoose.model("chatlog", schema.chatlog);

module.exports.Session = Session;
module.exports.ChatLog = ChatLog;



var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var session = new Schema({
  loginTime: { type: Date, default: Date.now },
  logoutTime: Date,
  ipAddress: String
});

var chatLog = new Schema({
  ipAddress: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports.session = session;
module.exports.chatLog = chatLog;

//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });
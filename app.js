var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser")
var createChat = require("./lib/chat_server").createChat;

var routes = require("./routes/index");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("port", port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);
// app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get("port"), function() {
  console.log('Server running on port %d', server.address().port);
});

createChat(server);



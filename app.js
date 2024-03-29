/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var templates = require('./routes/templates');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//Pretty print jade
app.set('view options', {
    pretty: true
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    // app.use(express.errorHandler());
    app.configure('development', function() {
        app.use(express.errorHandler());
        app.locals.pretty = true;
    });
};

app.get('/', routes.index);
app.get('/welcome', routes.index);
app.get(/^\/page\/(\w+)$/, templates.choise);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

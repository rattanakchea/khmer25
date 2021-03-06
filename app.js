var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // use mongose driver for connecting with mongodb

var routes = require('./routes/index');
var users = require('./routes/users');
var apiV1 = require('./routes/api/v1')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allow cross domain request
app.use(function(req, res, next) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');  // restrict it to the required domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

    // Set custom headers for CORS
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, X-Access-Token, X-Key');
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/api/v1', apiV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    res.json({
      'message': err.message,
      'error': err
    });
  });

  mongoose.connect('mongodb://localhost/khmer25');
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  mongoose.connect('mongodb://localhost/khmer25');
});


module.exports = app;

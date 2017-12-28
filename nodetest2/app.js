var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Database URL
var url = 'localhost:27017/nodetest2';
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db;
// Misc.
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.disable('etag');


var dbClient = require('mongodb').MongoClient;

dbClient.connect(('mongodb://' + url), function(err, database) {
  if (err) {
    console.log("================================")
    console.log("Error: Cannot connect to MongoDB");
    console.log("================================")
    process.exit();
  } else {
    console.log("================================")
    console.log("  Priests Vs Thieves PRE-ALPHA  ");
    console.log("================================")
   db = monk(url);
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

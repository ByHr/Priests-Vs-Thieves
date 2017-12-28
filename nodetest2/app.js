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
//Function global variables
var attempt = 0;
var max_attempt = 5;

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
   database.close();
  }

});

setInterval(checkTimeout, 10000);


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

//Functions

function checkTimeout() {
  dbClient.connect(('mongodb://' + url), function(err, database) {
    if (err) {
      attempt++;
      if (attempt > max_attempt) {
        console.log("================================")
        console.log(" Error: MongoDB connection lost ");
        console.log("     !SERVER SHUTTING DOWN!     ")
        console.log("================================")
        process.exit();
      }
      console.log("================================")
      console.log(" Error: MongoDB connection lost ");
      if (attempt < max_attempt) {
        console.log("           Attempt #" + attempt + "           ");
      } else {
        console.log("          LAST ATTEMPT          ")
      }
      console.log("================================")
    } else {
      if (attempt != 0) {
        console.log("================================")
        console.log("   Connection re-established!   ")
        console.log("================================")
      }
      attempt = 0;
      database.close();
    }
  });
}

module.exports = app;

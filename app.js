var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var InitiateMongoServer = require("./config/db");
var mainRouter = require('./routes/main');
var passport    =  require("passport");
var bodyParser  =  require("body-parser");
var LocalStrategy =  require("passport-local");
var passportLocalMongoose =  require("passport-local-mongoose");
var User  =  require("./model/user");

var app = express();
// Initiate Mongo Server
InitiateMongoServer();

app.use(require("express-session")({
  secret:"expressapp",//decode or encode session
      resave: false,          
      saveUninitialized:false    
  }));

  passport.serializeUser(User.serializeUser());       //session encoding
  passport.deserializeUser(User.deserializeUser());   //session decoding
  passport.use(new LocalStrategy(User.authenticate()));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev')); // For dubugging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
// console.log(res.locals.message);
//   // render the error page
//   res.status(err.status || 500);
//   res.render('404');
// });
// 

module.exports = app;

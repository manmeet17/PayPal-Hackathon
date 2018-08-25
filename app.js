var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// var indexRouter = require('./routes/index');
const config = require('./config/db');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var youtubeRouter = require('./routes/youtube');
var mediumRouter = require('./routes/medium');
var session=require('express-session');
var passport = require('passport');
var app = express();

mongoose.Promise=global.Promise;
mongoose.connect(config.db_url,(err)=>{
  if(err) console.log("Error connecting to db ",err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/index.js')(app, passport);
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events',eventsRouter);
app.use('/youtube',youtubeRouter);
app.use('/medium',mediumRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
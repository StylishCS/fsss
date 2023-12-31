var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

mongoose.connect('mongodb+srv://joeshirf:joo2330768@mern-stack-project.aiizvnr.mongodb.net/')
.then(()=>console.log('connected to mongoose db...'))
.catch(err=>console.error(err.message));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);



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

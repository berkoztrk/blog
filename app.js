const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uuid = require('uuid/v4');
const session = require('express-session');
const mongoose = require("mongoose");
const appConfig = require("./config");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogsRouter = require('./routes/blogs');

var app = express();
var db;

mongoose.connect(appConfig.dbConnectionString,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connection succesful.")
});


app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'blog',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Restricted areas
app.use(function(req,res,next)  {
  var restrictedPaths = [
    '/blogs/create',
    '/blogs/edit',
    '/blogs/list',
    '/blogs/delete'
  ];

  if(!req.session.user){
    for(var i = 0;i< restrictedPaths.length; i++){
      if(req.path.includes(restrictedPaths[i])){
        res.redirect('/users/login')
      }
    }
  }
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs',blogsRouter)

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

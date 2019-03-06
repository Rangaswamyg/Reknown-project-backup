var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');


var indexrouter = require('./routes/index');
var userrouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

//connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LIVEDATA_MASTERS')
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));




//adding middleware -cors
app.use(cors({
  origin:['http://localhost:4200'],
  'Access-Control-Allow-Origin': '*',
  credentials:true
}));

app.use(logger('dev'));
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


//passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// routes
app.use('/',indexrouter);
app.use('/user',userrouter);


//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  //set locals, only providing error in developement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');

});


module.exports = app;

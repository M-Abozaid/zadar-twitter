var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require("mongoose")
// var index = require('./routes/index');
var users = require('./routes/users');
var hbs = require("./hbsEngine")
var config = require("./config")
const request = require("request-promise")
mongoose.connect(config.DB_URL)
var db = mongoose.connection;
db.on('error', function(err){

  console.log('error with db connection ', err)
});
db.once('open', function callback () {
  console.log("h");
});

var app = express();
app.engine('hbs', hbs.engine)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/users', users);

app.get("/fblogin",function(req,res,next){

  res.header('Access-Control-Allow-Origin', 'facebook.com');
  res.render("fb_login",{layout: false})

  // request({
  //   method: 'GET',
  //   url: "https://www.facebook.com/v2.12/dialog/oauth&redirect_uri=https://powerful-cove-51904.herokuapp.com/users/fblogincallback&state=sht",
  //   json: true,
  //   qs: {
  //     // 'grant_type': 'fb_exchange_token',
  //     'client_id': process.env.FB_APP_ID,
  //     // 'client_secret': process.env.FB_APP_SECRET,
  //     // 'fb_exchange_token': shortTermToken//'EAACbB2a1vC4BALQvNe24sc9CaS6HfQmCHBtnJN1oIfCafXHc2dO5lRwLQOlbQJYLfxluecEdbqpgKdfzSLAs23yhw2zpXoYBB1QBN8enDSzwpLIZB96gfwePEHj7RgNAZA6tuBgZCqfYpwUCquBCpLA6FeMW4D1ZACy3VQxqmBPvGl21TZBZBIyEZCEPGZB9MwZCiw9RD0APf5gZDZD'
  //   }
  // }).then(r=>{
  
  //   res.send(r)
  
  // })
})
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
//
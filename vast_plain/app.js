var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var zw_db = require ('./app_server/models/db');

var index = require('./app_server/routes/index');


var loc8rExpressRoutes = require('./app_server/loc8r/routes/index');
var loc8rAngularRoutes = require('./app_server/loc8r/routes/main');
var loc8rApiRoutes = require('./app_server/loc8r/api/routes/index');

var users = require('./app_server/routes/users');

var app = express();
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.get('/', function (req, res) {  res.send('Hello World!')})
//app.get('/', (req, res) =>res.send('Hello Express'));
app.use('/', index);
//app.use('/loc8r', loc8rExpressRoutes);
app.use('/loc8r', loc8rAngularRoutes);
app.use('/api/loc8r', loc8rApiRoutes);

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
//this is moved to www
//app.listen(8000, function () {  console.log('Example app listening on port 8000!')})

module.exports = app;

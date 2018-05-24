require('dotenv').load();

var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var credentials = require('./meadowlark/js/credentials.js');

var index = require('./app_server/routes/index');

var loc8r_db = require ('./loc8r/api/models/db');
var spblogger_db = require ('./spblogger/api/models/db');
var movie_db = require ('./movie/api/models/db');
var zw_passport = require('./loc8r/api/config/passport');
var install = require('./spblogger/api/modules/install');

//install.generateAdmin();

//var loc8rExpressRoutes = require('./loc8r/server/routes/index');
//var loc8rAngularRoutes = require('./loc8r/server/routes/main');
var loc8rApiRoutes = require('./loc8r/api/routes/index');
var spBloggerApiRoutes = require('./spblogger/api/routes/posts');
var movieApiRoutes = require('./movie/api/routes/index');

var users = require('./app_server/routes/users');
var meadowlark = require('./meadowlark/meadowlark');


var app = express();
//console.log("dir name is " + __dirname);
//app.set('views', [ path.join(__dirname, 'meadowlark', 'views'), path.join(__dirname, 'app_server', 'views') ]);
app.set('views',  path.join(__dirname, 'app_server', 'views') );
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front_end_devl')));
app.use(express.static(path.join(__dirname, 'loc8r/client')));
app.use('/spblogger', express.static(path.join(__dirname, 'spblogger')));
app.use('/movie', express.static(path.join(__dirname, 'movie/client')));
app.use('/home', express.static(path.join(__dirname, 'zwu')));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}));
//app.get('/', function (req, res) {  res.send('Hello World!')})
//app.get('/', (req, res) =>res.send('Hello Express'));


app.use('/', index);
//app.use('/loc8r', loc8rExpressRoutes);
//app.use('/loc8r', loc8rAngularRoutes);
app.use('/api/loc8r', loc8rApiRoutes);
app.use('/api/spblogger', spBloggerApiRoutes);
app.use('/api/movie', movieApiRoutes);

app.use('/loc8r', function(req, res) {
  res.sendFile(path.join(__dirname, 'loc8r','client', 'loc8r.html'));
});

app.use('/users', users);

//meadowlark using node and express

var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  layoutsDir: 'app_server/views/meadowlark/layouts',
  partialsDir: 'app_server/views/meadowlark/partials',
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/meadowlark', meadowlark);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  if(err.name === "UnauthorizedError") {
    res.status(401);
    res.json({
      "message": err.name + ":" + err.message
    });
  }
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

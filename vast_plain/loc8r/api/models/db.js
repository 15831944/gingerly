var mongoose = require('mongoose');

// LOCAL DB
var dbURI = 'mongodb://localhost/Loc8r';
//var dbURI = 'mongodb://heroku_wgjnlstq:xibm145@ds133331.mlab.com:33331/heroku_wgjnlstq';
//LIVE DB
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://heroku_wgjnlstq:xibm145@ds133331.mlab.com:33331/heroku_wgjnlstq';
}


mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected' );
});

gracefulShutdown = function(msg, cb) {
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + msg);
    cb();
  })
};

process.on('SIGINT',  function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});
process.on('SIGTERM', function(){
  gracefulShutdown('Heroku app shutdonw', function(){
    proess.exit(0);
  });
});

require('../models/locations');
require('../models/users');

var path = require('path');
var fs = require('fs');
var formidable = require('formidable');


  
var dataDir = __dirname+'/data';
var vacationPhotoDir =dataDir + 'vacation-photo';
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if(!fs.existsSync(vacationPhotoDir)) fs.mkdirSync(vacationPhotoDir);
  
function saveContestEntry(contestName, email, year, month, photoPath) {
    //to do later
}

exports.vacationPhoto = function(req, res) {
    var now = new Date();
    res.render('meadowlark/contest/vacation-photo.handlebars', {
      year: now.getFullYear(),
      month: now.getMonth()
    });
  };


exports.vacationPhotoProcessPost = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    if (err) return res.redirect(303, 'error');
    if (err) {
      req.session.flash = {
        type: 'danger',
        intro: 'Oops',
        message: 'There was an error processing your submission.' + 
        ' Please try again.',
      };
      return res.redirect(303, '/meadowlark/contest/vacation-photo');
    }

    var photo = files.photo;
    var dir = vacationPhotoDir + '/' + Date.now();
    var path = dir + '/' + photo.name;
    fs.mkdirSync(dir);
    fs.renameSync(photo.path, dir+'/' + photo.name);
    saveContestEntry('vacation-photo', field.email, req.params.year, req.params.month, path);
    req.session.flash = {
      type: 'success',
      intro: 'good luck',
      message: 'you have entered into the contest.',
    };

    return res.redirect(303, '/meadowlark/contest/vacation-photo/entries');
    //res.redirect(303, '/meadowlark/thank-you');
  });
};

exports.vacationPhotoEntries = function(req, res) {
  res.render('meadowlark/contest/vacation-photo/entries.handlebars');
};
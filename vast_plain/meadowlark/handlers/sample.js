exports.nurseryRhyme = function(req, res ) {
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    res.render('meadowlark/nursery-rhyme.handlebars', {fortune: fortune.getFortune()});
  };
  
  exports.nurseryRhymeData =  function(req, res ) {
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    res.json({
      animal: 'squirrel',
      bodyPart: 'tail',
      adjective: 'bushy',
      noun: 'heck',
    });
  };
  
  exports.jqueryTest = function(req, res) {
      res.render('meadowlark/jquery-test');
  }
  
  
var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');


router.get('/', function(req, res){
  res.send('API GET handler -TESTING ONLY');
});


router.route('/movies')
  .get(function(req, res){
    console.log("enter api movies get");
    Movie.find(function(err, movies) {
      if(err)
        res.send(err);
      res.json(movies);
    });
  })
  .post(function(req, res) {
    console.log("enter api movies post");
    var movie = new Movie(req.body);
    movie.save(function(err){
      if(err)
        res.send(err);
      res.send({message: 'Movie Added'});
    });
  });

router.route('/movies/:id')
  .put(function(req, res) {
    console.log("enter api movies id put" + req.params.id );
    Movie.findOne({_id: req.params.id}).exec(function(err, movie) {
      if (err)
        res.send(err);
      for (prop in req.body) {
        movie[prop] = req.body[prop];
      }
      movie.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: 'Movie updated.'});
      })
    })

  })
  .get(function(req, res) {
    console.log("enter api movies id get" + req.params.id);
    Movie.findOne({_id: req.params.id}).exec(function(err, movie) {
      if(err)
        res.send(err);
      res.json(movie);
    });
  })
  .delete(function(req,res) {
    Movie.remove({_id: req.params.id}, function(err, movie) {
      if (err)
        res.send(err);
      res.json({message: 'Successfully deleted.'});
    });
  });

module.exports = router;

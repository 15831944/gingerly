var express = require('express');
var router = express.Router();
var Post = require('../models/post');


router.get('/', function(req, res){
  res.send('API GET handler -TESTING ONLY');
});


router.route('/posts')
  .get(function(req, res){
    console.log("enter api posts get");
    Post.find(function(err, posts) {
      if(err)
        res.send(err);
      res.json(posts);
    });
  })
  .post(function(req, res) {
    console.log("enter api posts post");
    var post = new Post(req.body);
    post.save(function(err){
      if(err)
        res.send(err);
      res.send({message: 'Post Added'});
    });
  });

router.route('/posts/:id')
  .put(function(req, res) {
    console.log("enter api posts id put" + req.params.id );
    Post.findOne({_id: req.params.id}).exec(function(err, post) {
      if (err)
        res.send(err);
      for (prop in req.body) {
        post[prop] = req.body[prop];
      }
      post.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: 'Post updated.'});
      })
    })

  })
  .get(function(req, res) {
    console.log("enter api posts id get" + req.params.id);
    Post.findOne({_id: req.params.id}).exec(function(err, post) {
      if(err)
        res.send(err);
      res.json(post);
    });
  })
  .delete(function(req,res) {
    Post.remove({_id: req.params.id}, function(err, post) {
      if (err)
        res.send(err);
      res.json({message: 'Successfully deleted.'});
    });
  });

module.exports = router;

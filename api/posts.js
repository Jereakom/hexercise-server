var express = require('express');
var connection = require('../modules/newconnect.js');
var posts = express();
var result = connection.select();
posts.get('/api/posts', function(req, res) {
  res.send(result);
});

posts.get('/api/posts/search', function(req, res) {
  res.send("posts search page");
});
posts.get('/api/posts/:id', function(req, res) {
  res.send("posts get, with id "+req.params.id);
});

posts.listen(80, function () {
  console.log('Example app listening on port 80!');
});

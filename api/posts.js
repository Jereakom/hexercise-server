require('dotenv').config();
var express = require('express');
var connection = require('../modules/newconnect.js');
var posts = express();
var pgp = require("pg-promise")(/*options*/);

var conn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  ssl: 'true'
};

var db = pgp(conn);

var port = process.env.PORT || 80


posts.get('/api/posts', function(req, res) {

  db.one('select * from posts;')
  .then(function (data) {
        res.status(200)
          .json({
            data: data
          });
      })
      .catch(function (err) {
        return next(err);
      });
});

posts.get('/api/posts/search', function(req, res) {
  res.send("posts search page");
});
posts.get('/api/posts/:id', function(req, res) {
  res.send("posts get, with id "+req.params.id);
});

posts.listen(port, function () {
  console.log('Example app listening on port 80!');
});

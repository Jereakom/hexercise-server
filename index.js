require('dotenv').config();
var express = require('express');

var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');

var cors = require('cors');
var multer = require('multer');

var bodyParser = require('body-parser');
var config = require ('./config/config.js');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var models = require('./models');

// models.sequelize.sync({force: true});
// models.User.sync({force: true});
// models.Post.sync({force: true});

// Config cloudinary storage for multer-storage-cloudinary
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: '',
  allowedFormats: ['jpg', 'png']
});

var parser = multer({ storage: storage });

app.set('port', config.web.port);

app.post('/upload', parser.single('image'), function (req, res) {
  console.log(req.file);
  res.sendStatus(201);
});

app.post('/register', function(req, res, err) {
  var profileImage = 'https://api.adorable.io/avatars/285/'+req.body.username+'@hexercise.io.png';
  models.User.create({
    username: req.body.username,
    password: req.body.password,
    profileImage: profileImage,
    profileImageThumb: profileImage
  }).then(function(user) {
    res.json(user);
  }).catch(function(err){
    res.send('User already exists');
  });;
});

app.post('/login', function(req, res, err) {
    models.User.findAll({
      attributes: {
        exclude: ['password', 'updatedAt', 'createdAt']
      },
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(user) {
      res.json(user);
    }).catch(function(err){
      res.json('Something went wrong');
    });;
});

app.get('/users', function (req, res, err){
  models.User.findAll({
    attributes: {
    exclude: ['password', 'updatedAt', 'createdAt']
  }}).then(function(u){
        res.json(u);
    }).catch(function(err){
      res.json('Could not retrieve users');
    });;
});

app.get('/users/:id', function (req, res, err){
  models.User.findOne({
    attributes: {
      exclude: ['password', 'updatedAt', 'createdAt']
    },
    where: {
      id: req.params.id
    }
  }).then(function(r){
    if (r === null)
    {
      throw err;
    }
    res.json(r);
  }).catch(function(err){
    res.json('Could not find user');
  });;
});

app.get('/users/:id/posts', function (req, res, err){
  models.Post.findAll({
    attributes: {
      exclude: ['UserId']
    },
    where: {
      UserId: req.params.id
    }
  }).then(function(r){
    res.json(r);
  }).catch(function(err){
    res.json('Could not find user');
  });;
});

app.get('/users/:id/posts/:postId', function (req, res, err){
  models.Post.findAll({
    attributes: {
      exclude: ['UserId']
    },
    where: {
      UserId: req.params.id,
      id: req.params.postId
    }
  }).then(function(r){
    res.json(r);
  }).catch(function(err){
    res.json('Could not find post');
  });;
});

app.post('/users', function (req, res, err){
  models.User.create({
    username: req.body.username,
    password: req.body.password,
    profileImage: req.body.profileImage,
    profileImageThumb: req.body.profileImage
  }).then(function(i) {
    res.json(i);
  }).catch(function(err){
    res.send('Cannot create user');
  });
});

app.delete('/users/:id', function (req, res, err){
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(r){
    res.json(r);
  }).catch(function(err){
    res.json('Could not delete user');
  });;
});

app.post('/posts', function (req, res, err){
  var tags = req.body.caption.match(/(#\w+)/ig);
  tags = tags.toString().match(/\w+/ig);
  models.Post.create({
    UserId: req.body.UserId,
    image: req.body.image,
    imageThumbnail: req.body.image,
    caption: req.body.caption,
    tags: tags
  }).then(function(response){
    res.json(response);
  });
});

app.get('/posts', function (req, res, err){
  models.Post.findAll({
    include: [{
      model: models.User,
      attributes:{
        exclude: ['password', 'updatedAt', 'createdAt']
      }
    }],
    attributes: {
      exclude: ['password', 'updatedAt', 'createdAt', 'UserId']
    }
  }).then(function(results){
    res.json(results);
  }).catch(function(err){
      res.json('Could not retrieve posts');
  });
});

app.get('/posts/:id', function (req, res, err){
  models.Post.findOne({
    include: [{
      model: models.User,
      attributes:{
        exclude: ['password', 'updatedAt', 'createdAt']
      }
    }],
    attributes: {
      exclude: ['password', 'updatedAt', 'createdAt', 'UserId']
    }, where:{
      id: req.params.id
    }
  }).then(function(results){
    res.json(results);
  }).catch(function(err){
      res.json('Could not retrieve posts');
  });
});

app.delete('/posts/:id', function (req, res, err){
  models.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(results){
    res.json(results);
  }).catch(function(err){
      res.json('Could not retrieve posts');
  });
});

app.delete('/users/:UserId/posts/:id', function (req, res, err){
  models.Post.destroy({
    where: {
      id: req.params.id,
      UserId: req.params.UserId
    }
  }).then(function(results){
    res.json(results);
  }).catch(function(err){
      res.json('Could not retrieve posts');
  });
});

app.get('/', function (req, res){
  res.send('Hello world');
});

app.get('*', function (req, res){
  res.redirect('/');
});


// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

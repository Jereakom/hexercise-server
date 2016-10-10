require('dotenv').config();
var Sequelize = require('sequelize');

var config = require('../config/config.js');

var sequelize = new Sequelize(config.db.url, {
  dialectOptions: {
    ssl:true
  }
});

var User = sequelize.import('../models/user.js');
var Post = sequelize.import('../models/post.js');
require('../models/relations.js');

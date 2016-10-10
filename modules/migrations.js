require('dotenv').config();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.CONN_STRING, {
  dialectOptions: {
    ssl:true
  }
});

var Post = sequelize.define('Post', {
  image: {
    type: Sequelize.STRING
  },
  imageThumbnail: {
    type: Sequelize.STRING
  },
  caption: {
    type: Sequelize.STRING
  }
});

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique:true
  },
  pwd: {
    type: Sequelize.STRING
  },
  profileImage: {
    type: Sequelize.STRING
  },
  profileImageThumb: {
    type: Sequelize.STRING
  }
});

User.sync({force: true}).then(function (users) {
  console.log(users)
});

Post.sync({force: true}).then(function (posts){
  console.log(posts)
});

Post.belongsTo(User);

Post.hasOne(User);

User.hasMany(Post);

User.belongsToMany(Post, {through: 'UserPost', as: 'Likes'});

Post.belongsToMany(User, {through: 'UserPost', as: 'Likes'});

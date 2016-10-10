require('dotenv').config();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.CONN_STRING, {
  dialectOptions: {
    ssl:true
  }
});
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    username: 'Test',
    password: 'pwd'
  });
});

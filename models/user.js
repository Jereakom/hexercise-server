module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        unique:true
      },
      password: {
        type: DataTypes.STRING
      },
      profileImage: {
        type: DataTypes.STRING
      },
      profileImageThumb: {
        type: DataTypes.STRING
      }
    }, {
      classMethods: {
        associate: function(models) {

        User.hasMany(models.Post);

        User.hasMany(models.Comment);

        User.belongsToMany(models.Post, {through: 'UserPostLikes', as: 'Likes'});
        }
      }
    });
    return User;
  };

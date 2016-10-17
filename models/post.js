module.exports = function(sequelize, DataTypes){
    var Post = sequelize.define('Post', {
      image: {
        type: DataTypes.STRING
      },
      imageThumbnail: {
        type: DataTypes.STRING
      },
      caption: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      Poster: {
        type: DataTypes.JSONB()
      }
    }, {
      classMethods: {
        associate: function(models) {

        Post.belongsTo(models.User, {onDelete:'CASCADE'});

        Post.belongsToMany(models.User, {through: 'UserPostLikes', as: 'Likes'});

        Post.hasMany(models.Comment);
        }
      }
    });
    return Post;
  };

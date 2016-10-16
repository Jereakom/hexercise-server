module.exports = function(sequelize, DataTypes){
    var Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      }
    }, {
      classMethods: {
        associate: function(models) {

        Comment.belongsTo(models.User, {onDelete:'CASCADE'});

        Comment.belongsTo(models.Post, {onDelete:'CASCADE'});
        }
      }
    });
    return Comment;
  };

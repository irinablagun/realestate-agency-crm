export default (sequelize, DataTypes) => {
    const Comments = sequelize.define(
      'comments',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        text: DataTypes.STRING,
        created_date: DataTypes.DATE,
        deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        timestamps: false,
        underscored: true
      }
    );
  
    Comments.associate = (models) => {
        Comments.belongsTo(models.User, {
          foreignKey: 'creator_id',
          targetKey: 'id'
        });
        Comments.belongsTo(models.Transaction, {
          foreignKey: 'comment_id',
          targetKey: 'id'
        });
    };

    return Comments;
  }
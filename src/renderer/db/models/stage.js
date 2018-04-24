export default (sequelize, DataTypes) => {
    const Stage = sequelize.define(
      'stage',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: true
          }
        },
      },
      {
        timestamps: false,
        underscored: true
      }
    );

    return Stage;
  }
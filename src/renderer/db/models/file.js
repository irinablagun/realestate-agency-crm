export default (sequelize, DataTypes) => {
  const File = sequelize.define(
    'file',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  return File;
}

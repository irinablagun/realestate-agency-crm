export default (sequelize, DataTypes) => {
  const RealtyCategory = sequelize.define(
    'realty_category',
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
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  return RealtyCategory;
}
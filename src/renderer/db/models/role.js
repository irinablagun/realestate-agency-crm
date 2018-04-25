export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cost: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  return Role;
}

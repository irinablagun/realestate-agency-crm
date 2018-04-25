export default (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'group',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  Group.associate = (models) => {
    Group.belongsTo(models.Role, {
      foreignKey: 'role_id',
      targetKey: 'id'
    });
  };


  return Group;
}

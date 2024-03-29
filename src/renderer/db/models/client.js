export default (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'client',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fio: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      type: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      status: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      phone: DataTypes.STRING,
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

  Client.associate = (models) => {
    Client.belongsTo(models.User, {
      foreignKey: 'responsible_id',
      targetKey: 'id'
    });
  };

  return Client;
}
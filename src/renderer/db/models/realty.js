export default (sequelize, DataTypes) => {
  const Realty = sequelize.define(
    'realty',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
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
      rooms: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      description: DataTypes.STRING,
      price: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
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

  Realty.associate = (models) => {
    Realty.belongsTo(models.User, {
      foreignKey: 'creator_id',
      targetKey: 'id'
    });
    Realty.belongsTo(models.RealtyCategory, {
      foreignKey: 'category_id',
      targetKey: 'id'
    });
  };

  return Realty;
}
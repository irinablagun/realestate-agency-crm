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
      photos: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue('photos'));
        },
        set: function (value) {
          this.setDataValue('photos', JSON.stringify(value));
        },
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
      },

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
    Realty.belongsTo(models.Client, {
      foreignKey: 'seller_id',  // конфликт
      targetKey: 'id'
    });
    Realty.belongsTo(models.RealtyCategory, {
      foreignKey: 'category_id',
      targetKey: 'id'
    });
  };

  return Realty;
}

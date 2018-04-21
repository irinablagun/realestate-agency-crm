import Sequelize from 'sequelize';
import sequelize from '../../libs/sequelize';

const UnitModel = sequelize.define(
  'unit',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    desc: Sequelize.STRING,
    delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

export default UnitModel;
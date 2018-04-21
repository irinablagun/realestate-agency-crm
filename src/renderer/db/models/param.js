import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

const ParamModel = sequelize.define(
  'param',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    key: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    desc: Sequelize.STRING
  },
  {
    underscored: true
  }
);

export default ParamModel;

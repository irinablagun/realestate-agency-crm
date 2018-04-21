import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

import UserModel from './user';

const ProviderModel = sequelize.define(
  'provider',
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
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: UserModel,
        key: 'id'
      }
    },
    email: Sequelize.STRING,
    data: Sequelize.JSON
  },
  {
    underscored: true
  }
);

export default ProviderModel;

import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

import UserModel from './user';
import ProductModel from './product';
import ProviderModel from './provider';

const ModeProductModel = sequelize.define(
  'move_product',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    number: Sequelize.STRING,
    qty: {
      type: Sequelize.REAL,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: Sequelize.REAL,
      validate: {
        notEmpty: true
      }
    },
    comment: Sequelize.STRING,
    type: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: Sequelize.DATE,
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
    provider_id: {
      type: Sequelize.INTEGER,
      references: {
        model: ProviderModel,
        key: 'id'
      }
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: ProductModel,
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

export default ModeProductModel;

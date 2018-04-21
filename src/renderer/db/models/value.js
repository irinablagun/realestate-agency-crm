import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

import CategoryParamModel from './category_param';
import ProductModel from './product';

const ValueModel = sequelize.define(
  'value',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_param_id: {
      type: Sequelize.INTEGER,
      references: {
        model: CategoryParamModel,
        key: 'id'
      }
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: ProductModel,
        key: 'id'
      }
    },
    value: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    underscored: true
  }
);

export default ValueModel;
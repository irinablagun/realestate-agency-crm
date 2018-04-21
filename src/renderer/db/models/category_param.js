import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

import CategoryModel from './category';
import ParamModel from './param';

const CategoryParamModel = sequelize.define(
  'category_param',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: CategoryModel,
        key: 'id'
      }
    },
    param_id: {
      type: Sequelize.INTEGER,
      references: {
        model: ParamModel,
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

export default CategoryParamModel;

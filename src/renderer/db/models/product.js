import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

import CategoryModel from './category';
import UnitModel from './unit';

const ProductModel = sequelize.define(
  'product',
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
    qty: Sequelize.REAL,
    price: Sequelize.REAL,
    purchase_price: Sequelize.REAL,
    mark_up: Sequelize.INTEGER,
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: CategoryModel,
        key: 'id'
      }
    },
    unit_id: {
      type: Sequelize.INTEGER,
      references: {
        model: UnitModel,
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: false
  }
);

export default ProductModel;

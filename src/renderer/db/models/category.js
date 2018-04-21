import sequelize from '../../libs/sequelize';
import Sequelize from 'sequelize';

const CategoryModel = sequelize.define(
  'category',
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
    parent_id: Sequelize.INTEGER
  },
  {
    timestamps: false,
    underscored: true
  }
);

export default CategoryModel;
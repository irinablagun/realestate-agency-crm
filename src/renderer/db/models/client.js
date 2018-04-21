import Sequelize from 'sequelize';
import sequelize from '../../libs/sequelize';

const ClientModel = sequelize.define(
  'client',
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

export default ClientModel;
import Sequelize from 'sequelize';

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  operatorsAliases: Sequelize.Op,
  storage: 'db/database.sqlite',
  logging: false
});

export default sequelize;

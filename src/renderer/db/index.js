import Sequelize from 'sequelize';

const models = {
    Role: require('./models/role').default,
    Group: require('./models/group').default,
    File: require('./models/file').default,
    User: require('./models/user').default,
    Client: require('./models/client').default,
    RealtyCategory: require('./models/realtyCategory').default,
    Realty: require('./models/realty').default,
    Stage: require('./models/stage').default,
    Transaction: require('./models/transaction').default,
    Comments: require('./models/comments').default,
    Invoice: require('./models/invoice').default,
    Payment: require('./models/payment').default,
};

export const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    operatorsAliases: Sequelize.Op,
    storage: 'db/database.sqlite',
    logging: false
});

Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize);

    if ('associate' in model) {
        model.associate(models);
    }

    models[modelName] = model;
});

window.models = models;
export default models;

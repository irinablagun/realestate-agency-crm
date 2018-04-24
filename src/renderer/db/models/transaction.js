export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_date: DataTypes.DATE,
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'creator_id',
      targetKey: 'id'
    });
    Transaction.belongsTo(models.Client, {
      foreignKey: 'client_id',
      targetKey: 'id'
    });
    Transaction.belongsTo(models.Realty, {
      foreignKey: 'realty_id',
      targetKey: 'id'
    });
    Transaction.belongsTo(models.Stage, {
      foreignKey: 'stage_id',
      targetKey: 'id'
    });
  };

  return Transaction;
}
export default (sequelize, DataTypes) => {
    const Invoice = sequelize.define(
      'invoice',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        created_date: DataTypes.DATE,
        sum: DataTypes.INTEGER,
        complete: {
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

    Invoice.associate = (models) => {
      Invoice.belongsTo(models.Client, {
      foreignKey: 'client_id',
      targetKey: 'id'
    });
  };
  
    return Invoice;
  }
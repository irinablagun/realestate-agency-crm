export default (sequelize, DataTypes) => {
    const Payment = sequelize.define(
      'payment',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        created_date: DataTypes.DATE,
        sum: DataTypes.INTEGER
      },
      {
        timestamps: false,
        underscored: true
      }
    );
  
    Payment.associate = (models) => {
        Payment.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        targetKey: 'id'
      });
    };
  
    return Payment;
  }
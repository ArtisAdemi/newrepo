module.exports = (sequelize, DataTypes) => {
    // Creating Sequelize DB model
    const Orders = sequelize.define("Orders", {
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        additionalInfo: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    // This creates a table with many to many relation
    Orders.associate = (models) => {
        Orders.belongsTo(models.Users, { foreignKey: 'UserId' });
        Orders.belongsToMany(models.Products, { through: 'Order_Products' });
    };

    return Orders;
}

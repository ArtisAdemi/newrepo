module.exports = (sequelize, DataTypes) => {
    // Creating Sequelize DB model
    const Order_Products = sequelize.define("Order_Products", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
    });

    return Order_Products;
}

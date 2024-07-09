module.exports = (sequelize, DataTypes) => {
    // Creating DB Model
    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        }
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.Products, { through: 'Wishlist' });
        Users.belongsToMany(models.Products, {
            through: models.StockNotifications,
            as: 'InterestedProducts',
            foreignKey: 'userId'
        });
        Users.hasMany(models.Orders, { foreignKey: 'UserId' });
    };

    return Users;
}
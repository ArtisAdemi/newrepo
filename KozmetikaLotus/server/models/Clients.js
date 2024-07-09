module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define("Clients", {
        // Define columns for the Clients table
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    });

    // Define associations
    
    Clients.associate = (models) => {
        Clients.belongsTo(models.Users, { foreignKey: 'userId' });
    };
    return Clients;
};
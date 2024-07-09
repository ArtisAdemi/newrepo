module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Images;
}
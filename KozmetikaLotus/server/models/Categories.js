module.exports = (sequelize, DataTypes) => {
    // Create DB Model
    const Categories = sequelize.define("Categories", { //Name of Column
        // Table Fields 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Categories.associate = (models) => {
        Categories.hasMany(models.Subcategory); // Assuming 'Subcategory' is the correct model name
    };

    return Categories
}

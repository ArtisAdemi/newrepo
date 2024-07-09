// models/brand.js
module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
      }
    });

    Brand.associate = models => {
        Brand.hasMany(models.Products, { foreignKey: 'BrandId' }); // Connect brands to products
    };
  
    return Brand;
  };
  
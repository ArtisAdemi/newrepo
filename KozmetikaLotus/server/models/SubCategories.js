module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Subcategory.associate = (models) => {
    Subcategory.belongsTo(models.Categories);
    Subcategory.belongsToMany(models.Products, { through: 'Product_Categories' });
  };

  return Subcategory;
};
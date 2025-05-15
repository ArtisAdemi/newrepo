// Migration script to update product quantities
const db = require("../models");
const { Op } = require("sequelize");
const Products = db.Products;

async function migrateProductQuantities() {
  try {
    console.log("Starting product quantity migration...");
    
    // Get all products that have inStock true but null/undefined quantity
    const products = await Products.findAll({
      where: {
        inStock: true,
        [Op.or]: [
          { quantity: null },
          { quantity: { [Op.is]: null } }
        ]
      }
    });

    console.log(`Found ${products.length} products with inStock=true but no quantity value`);

    // Update each product with a default quantity of 11
    const updatePromises = products.map(product => {
      return product.update({ quantity: 11 });
    });

    await Promise.all(updatePromises);
    console.log(`Successfully updated ${products.length} in-stock products with quantity=11`);

    // Get all products that have inStock false but null/undefined quantity
    const outOfStockProducts = await Products.findAll({
      where: {
        inStock: false,
        [Op.or]: [
          { quantity: null },
          { quantity: { [Op.is]: null } }
        ]
      }
    });

    console.log(`Found ${outOfStockProducts.length} products with inStock=false but no quantity value`);

    // Update each out-of-stock product with a quantity of 0
    const updateOutOfStockPromises = outOfStockProducts.map(product => {
      return product.update({ quantity: 0 });
    });

    await Promise.all(updateOutOfStockPromises);
    console.log(`Successfully updated ${outOfStockProducts.length} out-of-stock products with quantity=0`);

    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error during migration:", err);
    process.exit(1);
  }
}

// Run the migration
migrateProductQuantities();

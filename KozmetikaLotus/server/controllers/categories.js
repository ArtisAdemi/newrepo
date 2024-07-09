const db = require("../models");
const Categories = db.Categories;
const Subcategory = db.Subcategory

 
// Controller functions

// Get categories
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


// Post Category

const registerCategory = async (req, res) => {
    const { name } = req.body;
    try{
        
        // Create a new category in database
        const newCategory = await Categories.create({
            name: name
        });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getSubCategories = async (req, res) => {
    const {id} = req.params

    try {

        const subCategories = await Subcategory.findAll({
            where: {CategoryId : id}
        })

        res.json(subCategories)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
}



// export controller functions
module.exports = {
    getCategories,
    registerCategory,
    getSubCategories,
};
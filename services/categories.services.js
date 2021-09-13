const categoriesModel = require('../models/categories.model')
const { v4: uuidv4 } = require('uuid');


const getCategoriesArrayQuery = async () => {
    try {
        let categories = await categoriesModel.findAllCategories({})
        return categories;
    } catch (err) {
        throw err
    }
}

const insertCategoryQuery = async (req) => {
    try {

        let addCategoryData = {
            id: uuidv4(),
            name: req.body.name,
            order: req.body.order
        }

        let categoryData = await categoriesModel.insertCategory(addCategoryData)

        return categoryData

    } catch (err) {
        throw err
    }
}

const getSingleCategoryQuery = async (req) => {
    try {
        const {id} = req.params

        let categoryData = await categoriesModel.findCategory(id)

        return categoryData
    } catch (err) {
        throw err
    }
}

const updateCategoryQuery = async (req) => {
    try {
        let updateCategoryData = {
            name: req.body.name,
            order: req.body.order
        }
        const {id} = req.params

        let updatedCatoryData = await categoriesModel.updateCategoryData({id: id}, updateCategoryData)
        return updatedCatoryData

    } catch (err) {
        throw err
    }
}

const deleteCategoryQuery = async (req) => {
    try {
        const {id} = req.params

        let categoryData = await categoriesModel.deleteCategory(id)

        return categoryData

    } catch (err) {
        throw err
    }
}


module.exports = {
    deleteCategoryQuery: deleteCategoryQuery,
    updateCategoryQuery: updateCategoryQuery,
    getSingleCategoryQuery: getSingleCategoryQuery,
    insertCategoryQuery: insertCategoryQuery,
    getCategoriesArrayQuery: getCategoriesArrayQuery
}
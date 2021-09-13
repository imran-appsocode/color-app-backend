const categoryService = require('../services/categories.services')
const helperFunctions  = require('../helpers/common')


const getCategories = async (req, res) => {
    try {
        let categories = await categoryService.getCategoriesArrayQuery();

        if (categories && categories.length > 0){
            return await helperFunctions.returnResponse(categories, 'categories found.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'Categories not found', true, 403, res)
        }
    } catch (err) {
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)

    }
}

const addCategory = async (req, res) => {
    try {
        let category = await categoryService.insertCategoryQuery(req)
        if (category){
            return await helperFunctions.returnResponse(category, 'category added successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'Categories not added', true, 403, res)
        }

    } catch (err) {
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)

    }
}

const getCategory = async (req, res) => {
    try {
        let categories = await categoryService.getSingleCategoryQuery(req);
        if (categories){
            return await helperFunctions.returnResponse(categories, 'categories found.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'Category not found', true, 403, res)
        }
    } catch (err) {
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)

    }
}

const updateCategory = async (req, res) => {
    try {
        let categories = await categoryService.updateCategoryQuery(req);
        if (categories){
            return await helperFunctions.returnResponse(categories, 'categories updated.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'Category not updated', true, 403, res)
        }
    } catch (err) {
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)

    }
}

const deleteCategory = async (req, res) => {
    try {
        let categories = await categoryService.deleteCategoryQuery(req);
        if (categories){
            return await helperFunctions.returnResponse(categories, 'categories deleted.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'Category not found', true, 403, res)
        }
    } catch (err) {
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)

    }
}

module.exports = {
    getCategories: getCategories,
    addCategory: addCategory,
    getCategory: getCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}
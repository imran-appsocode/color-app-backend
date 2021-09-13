const themeServices = require('../services/themes.services')
const helperFunctions  = require('../helpers/common')

const addTheme = async (req, res) => {
    try {
        const insertedThemeData = await themeServices.insertThemeService(req)

        if (insertedThemeData){
            return await helperFunctions.returnResponse(insertedThemeData, 'Theme added successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'Theme not added', true, 403, res)
        }
    } catch (err){
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const addFavourite = async (req, res) => {
    try {
        const addDevice = await themeServices.addDevice(req)

        if (addDevice){
            return await helperFunctions.returnResponse(addDevice, 'favourite list updated successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'favourites not updated', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const addIcon = async (req, res) => {
    try {
        const themeData = await themeServices.addIcon(req)
        if (themeData){
            return await helperFunctions.returnResponse(themeData, 'icons list updated successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'icons not updated', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const updateTheme = async (req, res) => {
    try {
        const themeData = await themeServices.updateTheme(req)
        if (themeData){
            return await helperFunctions.returnResponse(themeData, 'theme updated successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'theme not updated', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}
const updateIcon = async (req, res) => {
    try {
        const themeData = await themeServices.updateThemeIcon(req)
        if (themeData){
            return await helperFunctions.returnResponse(themeData, 'theme icon updated successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'icon not updated', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}


const getAllthemes = async (req, res) => {
    try {
        const themes = await themeServices.fetchThemes(req)

        if (themes){
            return await helperFunctions.returnResponse(themes, 'themes found successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'themes not found', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}


const getAllIconsAgainstTheme = async (req, res) => {
    try {
        const themes = await themeServices.iconsByTheme(req)

        if (themes){
            return await helperFunctions.returnResponse(themes, 'icons found successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'icons not found', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const getAllIcons = async (req, res) => {
    try {
        const themes = await themeServices.getAllIcons(req)

        if (themes){
            return await helperFunctions.returnResponse(themes, 'icons found successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'icons not found', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const getSingleTheme = async (req, res) => {
    try {
        const themeData  = await themeServices.singleThemeById(req)
        if (themeData){
            return await helperFunctions.returnResponse(themeData, 'theme found successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'theme not found', true, 403, res)
        }

    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const getSingleIconsAgainstTheme = async (req, res) =>{
    try {
        const iconData = await themeServices.getSingleIcon(req)

        if (iconData && Object.keys(iconData).length > 0){
            return await helperFunctions.returnResponse(iconData, 'icon found successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'icon not found', true, 403, res)
        }

    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const deleteIcon = async (req, res) => {
    try {
        const updatedData = await themeServices.deleteIconData(req)

        if (updatedData){
            return await helperFunctions.returnResponse({}, 'icon deleted successfuly.', false, 200, res)

        } else {
            return await helperFunctions.returnResponse({}, 'icon not found.', false, 403, res)
        }

    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

const getAllthemesByCategory = async (req, res) => {
    try {
        const themes = await themeServices.fetchThemesByCategory(req)

        if (themes){
            return await helperFunctions.returnResponse(themes, 'themes found successfuly.', false, 200, res)
        } else {
            return await helperFunctions.returnResponse({}, 'themes not found', true, 403, res)
        }
    } catch (err) {
        console.log('err', err.message)
        return await helperFunctions.returnResponse({}, 'Something went wrong', true, 403, res)
    }
}

module.exports = {
    addTheme: addTheme,
    addFavourite: addFavourite,
    addIcon: addIcon,
    updateTheme: updateTheme,
    updateIcon: updateIcon,
    getAllthemes: getAllthemes,
    getAllIconsAgainstTheme: getAllIconsAgainstTheme,
    getAllIcons: getAllIcons,
    getSingleTheme: getSingleTheme,
    getSingleIconsAgainstTheme: getSingleIconsAgainstTheme,
    deleteIcon: deleteIcon,
    getAllthemesByCategory: getAllthemesByCategory
}
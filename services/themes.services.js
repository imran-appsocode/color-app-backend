const themesModel = require('../models/themes.model')
const { v4: uuidv4 } = require('uuid');
const helperFunction = require('../helpers/common')


const insertThemeService = async (req) => {
    try {
        let bgImage = ''
        let themeImage = ''

        if (req.files.themeImage){
            themeImage = await helperFunction.uploadImageOnAWS(req.files.themeImage)
        }

        if (req.files.backgroundImage){
             bgImage = await helperFunction.uploadImageOnAWS(req.files.backgroundImage)
        }



        let insertThemeData = {
            id: uuidv4(),
            categoryId: req.body.categoryId ? req.body.categoryId : '',
            name: req.body.name,
            backgroundColor: req.body.backgroundColor ? req.body.backgroundColor : '',
            image: themeImage ? themeImage : '',
            backgroundImage: bgImage ? bgImage : ''
        }

        // console.log('insertThemeData', insertThemeData)
        const addData = await themesModel.insertTheme(insertThemeData)
        return addData;
    } catch (err){
        throw err
    }
}


const addDevice = async (req) => {
    try {
        const filter = {
            id: req.body.id
        }
        const liked = await checkThemeIsFavourite(req)

        let dataToUpdate = {}

        console.log('liked', liked)

        if (liked){
            dataToUpdate = {
                $pull: {favourites: req.body.deviceId}
            }

        } else {
            dataToUpdate = {
                $push: {favourites: req.body.deviceId}
            }

        }
        console.log('dataToUpdate', dataToUpdate)
        const updatedData = await themesModel.updateThemeData(filter, dataToUpdate)

        return updatedData
    } catch (err) {
        throw err
    }
}

const checkThemeIsFavourite = async (req) => {
    try {
        const themeData = await themesModel.findTheme(req.body.id)
        let result = false;
        if (themeData){
            let favouriteData = themeData.favourites;
            if(favouriteData.includes(req.body.deviceId)){
                result = true;
            } else {
                result = false;
            }
        }

        return result;
    } catch (err) {
        throw err
    }
}


const addIcon = async (req) => {
    try {

        let imageURL = '';
        let iconImage = '';
        let shortcutImage = '';

        if (req.files.imageURL) {
            imageURL = await helperFunction.uploadImageOnAWS(req.files.imageURL)
        }
        if (req.files.iconImage) {
            iconImage = await helperFunction.uploadImageOnAWS(req.files.iconImage)
        }

        if (req.files.shortcutImage) {
            shortcutImage = await helperFunction.uploadImageOnAWS(req.files.shortcutImage)
        }







        const filter = {
            id: req.body.id
        }
        let iconData = {
            id: uuidv4(),
            imageURL: imageURL ? imageURL : '',
            iconImage: iconImage ? iconImage : '',
            iconStyle: req.body.iconStyle ? req.body.iconStyle : '',
            iconColor: req.body.iconColor ? req.body.iconColor : ''
        }

        let shortcutData = {
            id: uuidv4(),
            name: req.body.name ? req.body.name : '',
            shortcutImage: shortcutImage ? shortcutImage : '',
            useCount: req.body.useCount ? req.body.useCount : 0
        }
        if (req.body.name){
            iconData.shortcut = shortcutData
        }

        const dataToUpdate = {
            $push: {icons: iconData}
        }

        const updatedData = await themesModel.updateThemeData(filter, dataToUpdate)

        return updatedData
    } catch (err) {
        throw err
    }
}

const updateTheme = async (req) => {
    try {
        console.log('req.files', req.body.prevImage)
        console.log('req.files', req.body.prevBackgroundImage)


        let bgImage = ''
        let themeImage = ''

        if (req.files.themeImage){
            themeImage = await helperFunction.uploadImageOnAWS(req.files.themeImage)
        }

        if (req.files.backgroundImage){
             bgImage = await helperFunction.uploadImageOnAWS(req.files.backgroundImage)
        }


        let dataToUpdate = {
            categoryId: req.body.categoryId ? req.body.categoryId : '',
            name: req.body.name,
            backgroundColor: req.body.backgroundColor ? req.body.backgroundColor : '',
            image: themeImage ? themeImage : req.body.prevImage,
            backgroundImage: bgImage ? bgImage : req.body.prevBackgroundImage
        }

        const filter = {
            id: req.params.id
        }
        console.log('dataToUpdate', dataToUpdate)

        const updatedData = await themesModel.updateThemeData(filter, dataToUpdate)

        return updatedData
    } catch (err) {
        throw err
    }
}

const updateThemeIcon = async (req) => {
    try {
        const {id} = req.params
        console.log('req', req.body)


        let imageURL = '';
        let iconImage = '';
        let shortcutImage = '';

        if (req.files.imageURL) {
            imageURL = await helperFunction.uploadImageOnAWS(req.files.imageURL)
        }
        if (req.files.iconImage) {
            iconImage = await helperFunction.uploadImageOnAWS(req.files.iconImage)
        }

        if (req.files.shortcutImage) {
            shortcutImage = await helperFunction.uploadImageOnAWS(req.files.shortcutImage)
        }

        const filter = {id: req.body.id, "icons.id": id}

        let shortcutData = {
            name: req.body.name ? req.body.name : '',
            shortcutImage: shortcutImage ? shortcutImage : req.body.prevShortcutImage,
            useCount: req.body.useCount ? req.body.useCount : 0
        }
        const dataToUpdate = {
            $set: {
                'icons.$.imageURL': imageURL ? imageURL : req.body.prevImageURL,
                'icons.$.iconImage': iconImage ? iconImage : req.body.prevIconImage,
                'icons.$.iconStyle': req.body.iconStyle ? req.body.iconStyle : '',
                'icons.$.iconColor': req.body.iconColor ? req.body.iconColor : '',
                'icons.$.shortcut': shortcutData

            }
        }
        const updatedData = await themesModel.updateThemeData(filter, dataToUpdate)

        return updatedData
    } catch (err) {
        throw err
    }
}

const fetchThemes = async (req) => {
    try {
        let allThemes = await themesModel.findAllThemes({})
        allThemes = attachBaseUrlWithImages(allThemes)

        return allThemes
    } catch (err) {
      throw err
    }
}

const attachBaseUrlWithImages = async (themesArray) => {
    try {
        for (let theme of themesArray){
            theme.image = (theme.image)  ? process.env.s3_bucket_url+theme.image : ''
            theme.backgroundImage = (theme.backgroundImage)  ? process.env.s3_bucket_url+theme.backgroundImage : ''
        }

        return themesArray
    } catch (err) {
        throw err
    }
}

const iconsByTheme = async (req) => {
    try {
        const {themeId} = req.params

        let iconsData = await themesModel.findTheme(themeId);

        if (iconsData.icons && iconsData.icons.length > 0) {

            iconsData = iconsData.icons

            iconsData.map( icon => {
                icon.imageURL = (icon.imageURL) ? process.env.s3_bucket_url+icon.imageURL : ''
                icon.iconImage = (icon.iconImage) ? process.env.s3_bucket_url+icon.iconImage : ''

                if (icon.shortcut){
                    icon.shortcut.shortcutImage = (icon.shortcut.shortcutImage) ? process.env.s3_bucket_url+icon.shortcut.shortcutImage : ''
                }
            })
        } else {
            iconsData = []
        }

        return iconsData

    } catch (err) {
        throw err
    }
}


const getAllIcons = async (req) => {
    try {
        const {themeId} = req.params

        let iconsData = await themesModel.findTheme(themeId);

        if (iconsData.icons && iconsData.icons.length > 0) {

            iconsData = iconsData.icons

            iconsData.map( icon => {
                icon.imageURL = (icon.imageURL) ? process.env.s3_bucket_url+icon.imageURL : ''
                icon.iconImage = (icon.iconImage) ? process.env.s3_bucket_url+icon.iconImage : ''
                icon.themeId = themeId
                icon.shortcutId = icon.shortcut ? icon.shortcut.id : ''

                if (icon.shortcut){
                    icon.shortcut.shortcutImage = (icon.shortcut.shortcutImage) ? process.env.s3_bucket_url+icon.shortcut.shortcutImage : ''
                }
            })
        } else {
            iconsData = []
        }

        return iconsData

    } catch (err) {
        throw err
    }
}


const singleThemeById = async (req) => {
    try {
        const {id} = req.params
        const themeData  = await themesModel.findTheme(id)
        return themeData;
    } catch (err) {
        throw err
    }
}

const getSingleIcon = async (req) => {
    try {
        const {themeId, iconId} = req.params
        let iconData = await themesModel.findAllThemes({id: themeId, "icons.id": iconId})
        if (iconData && iconData.length > 0) {
            iconData = iconData[0].icons.filter(index => index.id === iconId)
            iconData = iconData ? iconData[0] : {}
        }

        return iconData
    } catch (err) {
        throw err
    }

}


const deleteIconData = async (req) => {
    try {
        const {themeId, iconId} = req.params
        const filter = {id: themeId}
        const query = {$pull: {icons: {id: iconId}}}

        const updatedData = await themesModel.updateThemeData(filter, query)

        return updatedData
    } catch (err) {
        throw err
    }
}

const fetchThemesByCategory = async (req) => {
    try {
        const {categoryId}  = req.params
        let allThemes = await themesModel.findAllThemes({categoryId: categoryId})
        allThemes = await attachBaseUrlWithImages(allThemes)

        return allThemes
    } catch (err) {
        throw err

    }

}

const addThemeAndShortcutId = async () => {
    try {

    } catch (err) {
        throw err
    }
}


module.exports = {
    insertThemeService: insertThemeService,
    addDevice: addDevice,
    addIcon: addIcon,
    updateTheme: updateTheme,
    updateThemeIcon: updateThemeIcon,
    fetchThemes: fetchThemes,
    iconsByTheme: iconsByTheme,
    singleThemeById: singleThemeById,
    getSingleIcon: getSingleIcon,
    deleteIconData: deleteIconData,
    fetchThemesByCategory: fetchThemesByCategory,
    getAllIcons: getAllIcons
}
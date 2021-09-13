var express = require('express');
var router = express.Router();
const themesCtrl = require('../controllers/themes.controller')
const upload = require("../helpers/uploadFile");


router.get('/', themesCtrl.getAllthemes)
router.get('/category-wise/:categoryId', themesCtrl.getAllthemesByCategory)
router.get('/:id', themesCtrl.getSingleTheme)

// router.post('/', upload.fields([
//     { name: 'themeImage', maxCount: 1 },
//     { name: 'backgroundImage', maxCount: 1 }
// ]),themesCtrl.addTheme)


router.post('/', themesCtrl.addTheme)



router.post('/favourites', themesCtrl.addFavourite)

// router.post('/icons', upload.fields([
//     { name: 'imageURL', maxCount: 1 },
//     { name: 'iconImage', maxCount: 1 },
//     { name: 'shortcutImage', maxCount: 1 }
// ]), themesCtrl.addIcon)

router.post('/icons', themesCtrl.addIcon)

router.patch('/:id', upload.fields([
    { name: 'themeImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
]),themesCtrl.updateTheme)

router.patch('/icons/:id', upload.fields([
    { name: 'imageURL', maxCount: 1 },
    { name: 'iconImage', maxCount: 1 },
    { name: 'shortcutImage', maxCount: 1 }
]), themesCtrl.updateIcon)

router.get('/icons/:themeId', themesCtrl.getAllIconsAgainstTheme)
router.get('/icons/mobile-view/:themeId', themesCtrl.getAllIcons)
router.get('/icons/:themeId/:iconId', themesCtrl.getSingleIconsAgainstTheme)
router.delete('/icons/:themeId/:iconId', themesCtrl.deleteIcon)

module.exports = router;

var express = require('express');
var router = express.Router();
const categoryCtrl = require('../controllers/categories.controller')


router.get('/', categoryCtrl.getCategories)
router.post('/', categoryCtrl.addCategory)
router.get('/:id', categoryCtrl.getCategory)
router.put('/:id', categoryCtrl.updateCategory)
router.delete('/:id', categoryCtrl.deleteCategory)

module.exports = router;
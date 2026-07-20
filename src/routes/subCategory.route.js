const express = require('express');
const { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategory.controller');
const router = express.Router();

router.get('/getallsubcategories', getAllSubCategories);
router.get('/:id', getSubCategoryById);
router.post('/createsubcategory', createSubCategory);
router.put('/update/:id', updateSubCategory);
router.delete('/delete/:id', deleteSubCategory);

module.exports = router;
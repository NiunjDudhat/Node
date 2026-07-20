const express = require('express');
const { getAllCategoris, createCategory, getCategoryByID, updateCategory, deleteCategory, activeCategory, addCategory, allCategoris, getSingleCategory, editCategory, removeCategory } = require('../controllers/category.controller');
const validate = require('../middlewares/validate.middleware');
const { getCategoryByIdSchema, updateCategorySchema, addCategorySchema } = require('../validations/category.validation');
const upload = require('../middlewares/upload.middleware');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

// router.get('/getAllCategories', auth(["admin", "employee", 'User']), getAllCategoris);
router.get('/getAllCategories', getAllCategoris);
router.get('/singlecategory/:id', validate(getCategoryByIdSchema), getCategoryByID);
// router.get('/singlecategory/', validate(getCategoryByIdSchema), getCategoryByID);   // get categoey by id with query
router.post('/createcategory', auth(["admin", "employee", 'User']), validate(addCategorySchema), upload.single('category_img'), createCategory);
router.put('/update/:id', validate(updateCategorySchema), upload.single('category_img'), updateCategory);
// router.put('/update', validate(updateCategorySchema), updateCategory);   // update category with query id
router.delete('/delete/:id',auth(["admin", "employee", 'User']), deleteCategory);
router.get('/count-active', activeCategory);
// router.get('/most-products', mostProducts);


// Mysql route
// router.get('/get/allCategory', allCategoris);
// router.get('/get/:id', getSingleCategory);
// router.post('/addCategory', upload.single('category_img'), addCategory);
// router.put('/edit/:id', upload.single('category_img'), editCategory);
// router.delete('/remove/:id', removeCategory);

module.exports = router;
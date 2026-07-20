const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, addProduct, allProduct, assignTagToProduct, getTagToProduct, removeTagToProduct } = require('../controllers/product.controller');
const router = express.Router();

// Here this is Mongo route
// router.get('/getallproducts', getAllProducts);
// router.get('/:id', getProductById);
// router.post('/createproduct', createProduct);
// router.put('/update/:id', updateProduct);
// router.delete('/delete/:id', deleteProduct);


// Here this is MySQL route
router.get('/allproducts', allProduct);
router.post('/addproduct', addProduct);
router.post('/assigntagtoproduct', assignTagToProduct);
router.get('/gettagtoproduct', getTagToProduct);
router.get('/removetagtoproduct', removeTagToProduct);

module.exports = router;
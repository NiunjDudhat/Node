const express = require('express');
const { getAllCarts, getCartById, updateCart, deleteCart, createCart } = require('../controllers/cart.controller');
const router = express.Router();

router.get('/getallcarts', getAllCarts);
router.get('/:id', getCartById);
router.post('/createcart', createCart);
router.put('/update/:id', updateCart);
router.delete('/delete/:id', deleteCart);

module.exports = router;
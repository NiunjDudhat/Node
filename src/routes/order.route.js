const express = require('express');
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/order.controller');
const router = express.Router();

router.get('/getallorders', getAllOrders);
router.get('/:id', getOrderById);
router.post('/createorder', createOrder);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);

module.exports = router;
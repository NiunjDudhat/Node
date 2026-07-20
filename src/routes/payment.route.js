const express = require('express');
const { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment, paymentSuccess } = require('../controllers/payment.controller');
const router = express.Router();

router.get('/getallpayments', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/createpayment', createPayment);
router.put('/update/:id', updatePayment);
router.delete('/delete/:id', deletePayment);

router.post('/verify-payment', paymentSuccess);



module.exports = router;
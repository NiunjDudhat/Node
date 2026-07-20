const express = require('express');
const { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller');
const router = express.Router();

router.get('/getalltransactions', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/createtransaction', createTransaction);
router.put('/update/:id', updateTransaction);
router.delete('/delete/:id', deleteTransaction);

module.exports = router;
const transactionService = require('../services/transaction.service')

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.findAllTransactions();

        if(!transactions){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch transactions.'
            })
        }

        res.status(200).json({
            success: true,
            data: transactions,
            message: 'Transactions fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.findTransactionById(req);

        if(!transaction){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Transaction not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: transaction,
            message: 'Transaction fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.createTransaction(req);

        if(!transaction){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create transaction.'
            })
        }

        res.status(200).json({
            success: true,
            data: transaction,
            message: 'Transaction created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.updateTransactionById(req, req);

        if(!transaction){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update transaction.'
            })
        }

        res.status(200).json({
            success: true,
            data: transaction,
            message: 'Transaction updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.deleteTransactionById(req);

        if(!transaction){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete transaction.'
            })
        }

        res.status(200).json({
            success: true,
            data: transaction,
            message: 'Transaction deleted successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
}
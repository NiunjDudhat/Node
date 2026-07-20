const paymentService = require('../services/payment.service')

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.findAllPayments();

        if(!payments){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch payments.'
            })
        }

        res.status(200).json({
            success: true,
            data: payments,
            message: 'Payments fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.findPaymentById(req);

        if(!payment){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Payment not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: payment,
            message: 'Payment fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req);

        if(!payment){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create payment.'
            })
        }

        res.status(200).json({
            success: true,
            data: payment,
            message: 'Payment created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updatePayment = async (req, res) => {
    try {
        const payment = await paymentService.updatePaymentById(req, req);

        if(!payment){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update payment.'
            })
        }

        res.status(200).json({
            success: true,
            data: payment,
            message: 'Payment updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deletePayment = async (req, res) => {
    try {
        const payment = await paymentService.deletePaymentById(req);

        if(!payment){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete payment.'
            })
        }

        res.status(200).json({
            success: true,
            data: payment,
            message: 'Payment deleted successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const paymentSuccess = async (req, res) => {
    try {
        const payment = await paymentService.paymentSuccessService(req, res);

        if(!payment){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to payment success.'
            })
        }

        res.status(200).json({
            success: true,
            data: payment,
            message: 'Payment Success successfully.'
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
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    paymentSuccess
}
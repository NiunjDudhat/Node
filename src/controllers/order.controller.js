const orderService = require('../services/order.service')


const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.findAllOrders();

        if(!orders){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch orders.'
            })
        }

        res.status(200).json({
            success: true,
            data: orders,
            message: 'Order fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.findOrderById(req);

        if(!order){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Order not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
            message: 'Order fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req, res);
        console.log("order++++", order);

        if(!order){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create order.'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
            message: 'Order created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrderById(req, req);

        if(!order){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update order.'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
            message: 'Order updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await orderService.deleteOrderById(req);

        if(!order){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete order.'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
            message: 'Order deleted successfully.'
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
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}
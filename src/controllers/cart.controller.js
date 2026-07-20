const cartService = require('../services/cart.service')

const getAllCarts = async (req, res) => {
    try {
        const carts = await cartService.findAllCarts();

        if(!carts){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch cart.'
            })
        }

        res.status(200).json({
            success: true,
            data: carts,
            message: 'Cart fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getCartById = async (req, res) => {
    try {
        const cart = await cartService.findCartById(req);

        if(!cart){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Cart not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: cart,
            message: 'Cart fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart(req);

        if(!cart){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create cart.'
            })
        }

        res.status(200).json({
            success: true,
            data: cart,
            message: 'Cart created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const cart = await cartService.updateCartById(req, req);

        if(!cart){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update cart.'
            })
        }

        res.status(200).json({
            success: true,
            data: cart,
            message: 'Cart updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        const cart = await cartService.deleteCartById(req);

        if(!cart){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete cart.'
            })
        }

        res.status(200).json({
            success: true,
            data: cart,
            message: 'Cart deleted successfully.'
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
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
}
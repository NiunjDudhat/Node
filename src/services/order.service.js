const Razorpay = require('razorpay');
const Order = require("../models/order.model")


const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

exports.findAllOrders = async (req, res) => {
    return await Order.find();
}

exports.findOrderById = async (req, res) => {
    return await Order.findById(req.params.id);
}

exports.createOrder = async (req, res) => {
    
    const options = {
        amount: req.body.total_amount * 100,
        currency: req.body.currency,
        receipt: req.body.receipt
    }

    const order = await razorpay.orders.create(options);

    const orderRZP = {
        orderRZP_id: order.id,
        total_amount: order.amount / 100,
        currency: order.currency,
        receipt: order.receipt,
        ...req.body
    }

    return await Order.create(orderRZP);
}

exports.updateOrderById = async (req, res) => {
    return await Order.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteOrderById = async (req, res) => {
    return await Order.findByIdAndDelete(req.params.id);
}
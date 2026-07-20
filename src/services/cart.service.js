const Cart = require("../models/cart.model")

exports.findAllCarts = async (req, res) => {
    return await Cart.find();
}

exports.findCartById = async (req, res) => {
    return await Cart.findById(req.params.id);
}

exports.createCart = async (req, res) => {
    return await Cart.create(req.body);
}

exports.updateCartById = async (req, res) => {
    return await Cart.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteCartById = async (req, res) => {
    return await Cart.findByIdAndDelete(req.params.id);
}
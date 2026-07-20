const Product = require("../models/product.model")

exports.findAllProducts = async (req, res) => {
    return await Product.find();
}

exports.findProductById = async (req, res) => {
    return await Product.findById(req.params.id);
}

exports.createProduct = async (req, res) => {
    return await Product.create(req.body);
}

exports.updateProductById = async (req, res) => {
    return await Product.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteProductById = async (req, res) => {
    return await Product.findByIdAndDelete(req.params.id);
}
const Variant = require("../models/variant.model")

exports.findAllVariants = async (req, res) => {
    return await Variant.find();
}

exports.findVariantById = async (req, res) => {
    return await Variant.findById(req.params.id);
}

exports.createVariant = async (req, res) => {
    return await Variant.create(req.body);
}

exports.updateVariantById = async (req, res) => {
    return await Variant.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteVariantById = async (req, res) => {
    return await Variant.findByIdAndDelete(req.params.id);
}
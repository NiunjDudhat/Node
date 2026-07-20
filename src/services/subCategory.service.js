const SubCategory = require("../models/subcategory.model")

exports.findAllSubcategories = async (req, res) => {
    return await SubCategory.find();
}

exports.findSubcategoryById = async (req, res) => {
    return await SubCategory.findById(req.params.id);
}

exports.createSubcategory = async (req, res) => {
    return await SubCategory.create(req.body);
}

exports.updateSubcategoryById = async (req, res) => {
    return await SubCategory.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteSubcategoryById = async (req, res) => {
    return await SubCategory.findByIdAndDelete(req.params.id);
}
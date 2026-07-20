const User = require("../models/user.model")

exports.findAllUsers = async (req, res) => {
    return await User.find();
}

exports.findUserById = async (req, res) => {
    return await User.findById(req.params.id);
}

exports.createUser = async (req, res) => {
    return await User.create(req.body);
}

exports.updateUserById = async (req, res) => {
    return await User.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteUserById = async (req, res) => {
    return await User.findByIdAndDelete(req.params.id);
}
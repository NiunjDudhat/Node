const Transaction = require("../models/transaction.model")

exports.findAllTransactions = async (req, res) => {
    return await Transaction.find();
}

exports.findTransactionById = async (req, res) => {
    return await Transaction.findById(req.params.id);
}

exports.createTransaction = async (req, res) => {
    return await Transaction.insertMany(req.body);
}

exports.updateTransactionById = async (req, res) => {
    return await Transaction.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteTransactionById = async (req, res) => {
    return await Transaction.findByIdAndDelete(req.params.id);
}
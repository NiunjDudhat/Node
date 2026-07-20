const Review = require("../models/review.model")

exports.findAllReviews = async (req, res) => {
    return await Review.find();
}

exports.findReviewById = async (req, res) => {
    return await Review.findById(req.params.id);
}

exports.createReview = async (req, res) => {
    return await Review.create(req.body);
}

exports.updateReviewById = async (req, res) => {
    return await Review.findByIdAndUpdate(req.params.id, req.body);
}

exports.deleteReviewById = async (req, res) => {
    return await Review.findByIdAndDelete(req.params.id);
}
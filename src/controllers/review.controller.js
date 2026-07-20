const reviewService = require('../services/review.service')

const getAllReviews = async (req, res) => {
    try {
        const review = await reviewService.findAllReviews();

        if(!review){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch review.'
            })
        }

        res.status(200).json({
            success: true,
            data: review,
            message: 'Review fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getReviewById = async (req, res) => {
    try {
        const review = await reviewService.findReviewById(req);

        if(!review){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Review not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: review,
            message: 'Review fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview(req);

        if(!review){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create review.'
            })
        }

        res.status(200).json({
            success: true,
            data: review,
            message: 'Review created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateReview = async (req, res) => {
    try {
        const review = await reviewService.updateReviewById(req, req);

        if(!review){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update review.'
            })
        }

        res.status(200).json({
            success: true,
            data: review,
            message: 'Review updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await reviewService.deleteReviewById(req);

        if(!review){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete Review.'
            })
        }

        res.status(200).json({
            success: true,
            data: review,
            message: 'Review deleted successfully.'
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
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}
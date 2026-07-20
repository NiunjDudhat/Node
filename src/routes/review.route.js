const express = require('express');
const { getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require('../controllers/review.controller');
const router = express.Router();

router.get('/getallreviews', getAllReviews);
router.get('/:id', getReviewById);
router.post('/createreview', createReview);
router.put('/update/:id', updateReview);
router.delete('/delete/:id', deleteReview);

module.exports = router;
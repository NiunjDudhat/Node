const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        rating: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
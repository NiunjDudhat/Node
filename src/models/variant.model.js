const mongoose = require('mongoose');
const { Schema } = mongoose;

const variantSchema = new Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        price: {
            type: Number,
            default: 0,
            require: true
        },
        stock: {
            type: Number,
            default: 0,
            require: true
        },
        attributes: {
            type: Object,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variant = mongoose.model('variant', variantSchema);

module.exports = Variant;
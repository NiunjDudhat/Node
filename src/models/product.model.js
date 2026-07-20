const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        }, 
        description: {
            type: String,
            trim: true,
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

const Product = mongoose.model('products', productSchema);

module.exports = Product;
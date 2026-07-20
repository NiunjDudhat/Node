const mongoose = require('mongoose');
const { Schema } = mongoose;

const subcategorySchema = new Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        subcategory_name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        }, 
        subcategory_desc: {
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

const SubCategory = mongoose.model('subcategories', subcategorySchema);

module.exports = SubCategory;
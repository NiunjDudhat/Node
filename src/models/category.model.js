const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        category_name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        }, 
        category_desc: {
            type: String,
            trim: true,
            default: null
        },
        category_img: {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
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

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
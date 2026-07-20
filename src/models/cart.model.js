const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    items: {
      type: [
        {
          product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
          }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
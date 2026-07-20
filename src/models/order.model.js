const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    seller_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Users', // assuming seller is also a user
      required: true
    },
    orderRZP_id: {
      type: String,
      require: true
    },
    products: {
      type: [
        {
          product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          },
          price: {
            type: Number,
            required: true,
            default: 0
          }
        },
      ],
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
      trim: true
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: [
        'Created',
        'Pending',
        'Confirmed',
        'Shipped',
        'Delivered',
        'Cancelled'
      ],
      default: 'Pending'
    },
    currency: {
      type: String,
      require: true
    }, 
    receipt: {
      type: String,
      require: true
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
);

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true
    },
    payment_id: {
      type: String,
      require: true
    },
    signature: {
      type: String
    },
    amount: {
      type: Number,
      required: true
    },

    gateway: {
      type: String,
      enum: ["Razorpay", "Stripe", "COD"],
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
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

const Payment = mongoose.model("payments", paymentSchema);

module.exports = Payment;
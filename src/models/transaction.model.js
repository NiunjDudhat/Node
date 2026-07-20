const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    payment_id: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true
    },
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    transaction_id: {
      type: String,       // Here use the gateway transaction ID, but currently use the dummy ID.
      required: true,
      unique: true
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
    type: {
      type: String,
      enum: ["Payment", "Refund"],
      default: "Payment"
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending"
    },
    method: {
      type: String, // UPI, Card, NetBanking
      default: ""
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

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;
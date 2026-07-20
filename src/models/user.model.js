const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    mobileNo: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
      default: ''
    },
    password: {
      type: String,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['User', 'Seller'],
      default: 'User'
    },
    refreshToken: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
      type: Number,
      default: ''
    },
    otpExpired: {
      type: Date,
      default: ''
    },
    googleId: {
      type: String,
      default: ''
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

const User = mongoose.model('Users', userSchema);

module.exports = User;
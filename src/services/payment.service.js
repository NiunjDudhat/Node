const Order = require("../models/order.model");
const Payment = require("../models/payment.model")
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');

exports.findAllPayments = async (req, res) => {
    return await Payment.find();
}

exports.findPaymentById = async (req, res) => {
    return await Payment.findById(req.params.id);
}

exports.createPayment = async (req, res) => {
    return await Payment.create(req.body);
}

exports.updatePaymentById = async (req, res) => {
    return await Payment.findByIdAndUpdate(req.params.id, req.body);
}

exports.deletePaymentById = async (req, res) => {
    return await Payment.findByIdAndDelete(req.params.id);
}

exports.paymentSuccessService = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

    const secret = process.env.KEY_SECRET;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
    if (isValidSignature) {
        // Update the order with payment details
        const order = await Order.findOne({}, {orderRZP_id: razorpay_order_id});
        console.log("order+++", order);

        order.status = 'Created';
        await order.save();

        const payment = {
            order_id: order._id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
            amount: amount,
            gateway: "Razorpay",
            status: 'Paid'
        }
        return await Payment.create(payment);
    }

}
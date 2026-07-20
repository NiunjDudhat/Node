const express = require("express");
const router = express.Router();

const AuthRoute = require('./auth.route');
const CategoryRoute = require('./category.route');
const SubCategoryRoute = require('./subCategory.route');
const ProductRoute = require('./product.route');
const VariantRoute = require('./variant.route');
const ReviewRoute = require('./review.route');
const UserRoute = require('./user.route');
const CartRoute = require('./cart.route');
const OrderRoute = require('./order.route');
const PaymentRoute = require('./payment.route');
const TransactionRoute = require('./transaction.route');
const TermsRoute = require('./terms.route');
const TagRoute = require('./tag.route');

router.use('/auth', AuthRoute);
router.use('/category', CategoryRoute);
router.use('/subcategory', SubCategoryRoute);
router.use('/product', ProductRoute);
router.use('/variant', VariantRoute);
router.use('/review', ReviewRoute);
router.use('/user', UserRoute);
router.use('/cart', CartRoute);
router.use('/order', OrderRoute);
router.use('/payment', PaymentRoute);
router.use('/transaction', TransactionRoute);
router.use('/terms', TermsRoute);
router.use('/tags', TagRoute);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrder } = require('../controllers/ordersController');
const { getOrderProducts, addOrderProducts, updateOrderProduct } = require('../controllers/orderProductsController');

router.post('/', createOrder);
router.patch('/:order_id', updateOrder);
router.get('/:order_id', getOrder);
router.get('/:order_id/products', getOrderProducts);
router.post('/:order_id/products', addOrderProducts);
router.patch('/:order_id/products/:product_id', updateOrderProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', auth.userAuth, OrdersController.getAllOrders);
router.post('/', auth.userAuth, OrdersController.saveOrders);

module.exports = router;

const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.getAllOrders = (req, res, next) => {
  // console.log(req.userData);
  if (req.userData.userType == 'user') {
    console.log(req.userData);
    Order.find({ user: req.userData.id })
      .sort('-createdAt')
      .populate({
        path: 'product',
      })
      .populate('user')
      .exec()
      .then((orders) => {
        return res.status(200).json({
          count: orders.length,
          orders: orders,
        });
      })
      .catch((error) => {
        next(error);
      });
    return;
  }

  let o;
  if (req.userData.userType == 'admin' && req.query.all) o = Order.find();
  else {
    o = Order.find({ user: req.userData.userId });
  }

  o.select()
    .populate({
      path: 'product',
      populate: {
        path: 'category',
      },
    })
    .populate('user')
    .sort('-created_at')
    .exec()
    .then((orders) => {
      res.status(200).json({
        count: orders.length,
        orders: orders,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.saveOrders = (req, res, next) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;

  console.log(req.body.products);

  let carts;
  try {
    carts = JSON.parse(JSON.stringify(req.body.products));
    console.log(carts);
    if (!firstName.trim() || !lastName.trim() || !address.trim()) {
      res.status(400);
      res.json({
        error: {
          message: 'firstName , lastName , address Required..',
        },
      });
      return;
    }
  } catch (error) {
    res.status(400);
    if (!carts) {
      res.json({
        error: {
          message: 'Products Required..',
        },
      });
      return;
    }
    res.json({
      error: {
        message: 'firstName , lastName , address Required..',
      },
    });
    return;
  }

  let orders = [];
  for (let i = 0; i < carts.length; i++) {
    orders.push(createOrder(req, carts[i], firstName, lastName, address));
  }

  Order.create(orders)
    .then((orders) => {
      return res.status(201).json({
        message: 'Orders was created',
        orders,
      });
    })
    .catch((error) => {
      next(error);
    });
};

function createOrder(req, productInfo, firstName, lastName, address) {
  return new Order({
    _id: mongoose.Types.ObjectId(),
    product: productInfo.productId,
    quantity: productInfo.quantity,
    price: productInfo.price,
    user: req.userData.id,
    firstName,
    lastName,
    address,
  });
}

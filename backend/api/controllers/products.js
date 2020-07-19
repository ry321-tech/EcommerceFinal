const mongoose = require('mongoose');
const Product = require('../models/Product');
const ErrorResponse = require('../../utils/errorResponse');

// @desc        Get all Product
// @route       GET /api/produscts
// @access      Private
exports.getAllProducts = async (req, res, next) => {
  try {
    let allProduct = await Product.find();
    if (!allProduct) {
      return next(new ErrorResponse(`No Product`, 404));
    }
    res.status(200).json(allProduct);
  } catch (err) {
    return next(new ErrorResponse(`Something Went wrong`, 500));
  }
};

// @desc        Create Product
// @route       POST /api/produscts
// @access      Private (Only Admin)

// exports.createOneProduct = (req, res, next) => {
//   const product = createProduct(req);
//   console.log(req.body);


//   product
//       .save()
//       .then(product => {
//           res.status(200).json({
//               message: 'Product Created Successfully!',
//               product: {
//                   _id: product._id,
//                   name: product.name,
//                   category: product.category,
//                   price: product.price,
//                   productImage: product.productImage
//               }
//           });
//       })
//       .catch(error => {
//           next(error);
//       });
// };

exports.createOneProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    };

    const createProduct = await Product.create(product);

    res.status(200).json({
      message: 'Product Created Successfully!',
      product: {
        name: product.name,
        price: product.price,
        productImage: product.productImage,
      },
    });
  } catch (err) {
    return next(new ErrorResponse(`Something Went wrong`, 500));
  }
};

// @desc        Get a Product by ID
// @route       GET /api/produscts/:id
// @access      Private (Only Admin)
exports.getProductById = async (req, res, next) => {
  try {
    let singleProduct = await Product.findById(req.params.id);
    if (!singleProduct) {
      return next(new ErrorResponse(`No Product`, 404));
    }
    res.status(200).json(singleProduct);
  } catch (err) {
    return next(new ErrorResponse(`Something Went wrong`, 500));
  }
};

// function createProduct(req) {
//   return new Product({
//       _id: new mongoose.Types.ObjectId(),
//       name: req.body.name,
//       price: req.body.price,
//       category: req.body.category,
//       productImage: req.file.path
//   });
// }
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../../utils/errorResponse');
const User = require('../models/User');

exports.isAdmin = (req, res, next) => {
  if (req.userData.userType == 'admin') return res.json(true);
  else return res.json(false);
};

// @desc        Create Single User
// @route       POST /api/users/create
// @access      Private
exports.createUser = async (req, res, next) => {
  try {
    const { name, phone, email, password, userType } = req.body;
    // console.log(req.body);
    const user = await User.create({
      name,
      phone,
      email,
      password,
      userType,
    });
    res.status(201).json({
      msg: 'User Created Successfully',
    });
  } catch (err) {
    return next(
      new ErrorResponse(`Duplicate Value Entered ${err.message}`, 400)
    );
  }
};

// @desc        Create Single User
// @route       POST /api/users/login
// @access      Public

exports.loginUserAndAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    if (!email || !password) {
      return next(new ErrorResponse('Please Provide Email and Password', 400));
    }

    // check for user
    const user = await User.findOne({ email }).select('+password');
    // console.log(user);

    if (!user) return next(new ErrorResponse('Invalid Credentials', 401));

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('Invalid Credentials', 401));

    const token = user.getSignedJwtToken();

    // console.log(token);
    res.status(200).json({
      msg: 'User logged in',
      token,
    });

    // sendTokenResponse(user, 200, res);
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};
// Get token from Model, craete Cookie and Send response
// const sendTokenResponse = (user, statusCode, res) => {
//   const token = user.getSignedJwtToken();
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   //   if (process.env.NODE_ENV === 'production') {
//   //     options.secure = true;
//   //   }

//   //   console.log(options);
//   res.status(statusCode).cookie('token', token, options).json({
//     msg: 'User logged in'
//     token,
//   });
// };

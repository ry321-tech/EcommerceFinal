const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auths = {};

const handleError = async (error, next) => {
  if (error) {
    error.message = 'Auth Failed!!!';
    error.status = 401;
    next(error);
  } else {
    const error = new Error();
    error.message = 'Auth Failed!!';
    error.status = 401;
    next(error);
  }
};

auths.userAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;

        const user = await User.findById(req.userData.id);
        decodedToken.userType = user.userType;

        next();
      } else {
        handleError(null, next);
      }
    } else {
      handleError(null, next);
    }
  } catch (error) {
    handleError(error, next);
  }
};

auths.adminAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      // console.log(token);
      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;

        const user = await User.findById(req.userData.id);

        decodedToken.userType = user.userType;

        if (decodedToken.userType != 'admin') {
          throw new Error();
        }
        next();
      } else {
        handleError(null, next);
      }
    } else {
      handleError(null, next);
    }
  } catch (error) {
    handleError(error, next);
  }
};

module.exports = auths;

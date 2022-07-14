const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(' ')[1];
  }
console.log("--- Protect Token ----", token);
  if (!token) {
    return next(new ErrorHandler(404, 'token-invalid'));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id).select('-password');

    if (!user) {
      return next(new ErrorHandler(404, 'user-not-found'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(404, 'authorize-invalid'));
  }
}
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  // Check token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user
      const user = await User.findById(decoded.id).select('-password');

      // Check there is a user
      if (!user) {
        res.status(401);
        throw new Error('Not Authorize, Invalid token');
      }

      req.user = user;

      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error('Not Authorize');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorize, No token');
  }
});

module.exports = { protect };

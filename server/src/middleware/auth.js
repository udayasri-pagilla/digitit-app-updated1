const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Authorization header missing');
    err.status = 401;
    return next(err);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      return next(err);
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
}

module.exports = auth;

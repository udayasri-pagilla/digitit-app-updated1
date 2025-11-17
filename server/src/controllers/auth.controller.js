const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

async function signup(req, res, next) {
  try {
    let { email, password, role, teacherId, teacherEmail } = req.validated;

    if (role === 'student') {
      // allow teacherEmail as convenience
      if (!teacherId && teacherEmail) {
        const teacher = await User.findOne({ email: teacherEmail });
        if (!teacher) {
          const err = new Error('teacherEmail does not reference any user');
          err.status = 400; return next(err);
        }
        teacherId = teacher._id.toString();
      }

      if (!teacherId) {
        const err = new Error('teacherId (ObjectId) is required for role "student"');
        err.status = 400; return next(err);
      }
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        const err = new Error('teacherId is not a valid ObjectId');
        err.status = 400; return next(err);
      }
      const teacher = await User.findById(teacherId);
      if (!teacher) {
        const err = new Error('teacherId does not reference any user');
        err.status = 400; return next(err);
      }
      if (teacher.role !== 'teacher') {
        const err = new Error('teacherId must reference a user with role "teacher"');
        err.status = 400; return next(err);
      }
    }

    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error('Email already registered');
      err.status = 400;
      return next(err);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, role, teacherId: teacherId || null });

    res.status(201).json({
      success: true,
      user: { id: user._id, email: user.email, role: user.role, teacherId: user.teacherId }
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.validated;
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('Invalid credentials'); err.status = 401; return next(err);
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      const err = new Error('Invalid credentials'); err.status = 401; return next(err);
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

    // populate teacher email if user is student
    let teacher = null;
    if (user.role === 'student' && user.teacherId) {
      const t = await User.findById(user.teacherId).select('email _id');
      if (t) teacher = { id: t._id, email: t.email };
    }

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, role: user.role, teacher: teacher }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login };
